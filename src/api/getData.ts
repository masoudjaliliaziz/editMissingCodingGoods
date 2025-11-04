import type { ICodingGoodsListItem, ILoadOptions } from "../types/apiTypes";
import { BASE_URL, LIST_TITLE, LIST_GUID } from "./base";

export async function loadCodingGoodsTitle(
  options?: ILoadOptions
): Promise<ICodingGoodsListItem[]> {
  let allResults: ICodingGoodsListItem[] = [];

  let listEndpoint = LIST_GUID
    ? `guid('${LIST_GUID}')`
    : `getbytitle('${LIST_TITLE}')`;

  const queryParams = new URLSearchParams();
  queryParams.append("$select", "*");
  queryParams.append("$top", "5000");

  if (options?.searchTerm && options.searchTerm.trim()) {
    const searchLower = options.searchTerm.toLowerCase().trim();
    const fields = options.filterFields || ["Title", "sharhmahsolbarayefactor"];

    const filters = fields.map((field) => {
      return `substringof('${searchLower}',tolower(${field}))`;
    });
    queryParams.append("$filter", filters.join(" or "));
  }

  let nextUrl = `${BASE_URL}/_api/web/lists/${listEndpoint}/items?${queryParams.toString()}`;
  let retryWithTitle = false;

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl, {
        method: "GET",
        headers: {
          Accept: "application/json;odata=verbose",
        },
      });

      if (!response.ok && !retryWithTitle && LIST_GUID) {
        listEndpoint = `getbytitle('${LIST_TITLE}')`;
        nextUrl = `${BASE_URL}/_api/web/lists/${listEndpoint}/items?${queryParams.toString()}`;
        retryWithTitle = true;
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `خطا در دریافت آیتم‌ها: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();

      if (!data || !data.d) {
        console.error("پاسخ نامعتبر از سرور:", data);
        break;
      }

      if (data.d.results && Array.isArray(data.d.results)) {
        allResults = [...allResults, ...data.d.results];
      } else if (Array.isArray(data.d)) {
        allResults = [...allResults, ...data.d];
      }

      nextUrl = data.d.__next || null;
      if (nextUrl && retryWithTitle) {
        nextUrl = nextUrl.replace(/guid\([^)]+\)/, listEndpoint);
      }
    }

    return allResults;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌ها:", err);

    if (!retryWithTitle && LIST_GUID) {
      try {
        return await loadCodingGoodsTitleWithTitle(options);
      } catch (retryErr) {
        console.error("خطا در retry:", retryErr);
      }
    }

    return [];
  }
}

async function loadCodingGoodsTitleWithTitle(
  options?: ILoadOptions
): Promise<ICodingGoodsListItem[]> {
  let allResults: ICodingGoodsListItem[] = [];
  const listEndpoint = `getbytitle('${LIST_TITLE}')`;

  const queryParams = new URLSearchParams();
  queryParams.append("$select", "*");
  queryParams.append("$top", "5000");

  if (options?.searchTerm && options.searchTerm.trim()) {
    const searchLower = options.searchTerm.toLowerCase().trim();
    const fields = options.filterFields || ["Title", "sharhmahsolbarayefactor"];
    const filters = fields.map((field) => {
      return `substringof('${searchLower}',tolower(${field}))`;
    });
    queryParams.append("$filter", filters.join(" or "));
  }

  let nextUrl = `${BASE_URL}/_api/web/lists/${listEndpoint}/items?${queryParams.toString()}`;

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
      },
    });

    if (!response.ok) {
      throw new Error(`خطا در دریافت آیتم‌ها: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data || !data.d) {
      break;
    }

    if (data.d.results && Array.isArray(data.d.results)) {
      allResults = [...allResults, ...data.d.results];
    }

    nextUrl = data.d.__next || null;
  }

  return allResults;
}
