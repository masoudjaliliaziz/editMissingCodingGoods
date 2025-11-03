import type { ICodingGoodsListItem } from "../types/apiTypes";
import { BASE_URL, LIST_TITLE, LIST_GUID } from "./base";

interface LoadOptions {
  searchTerm?: string;
  filterFields?: string[];
}

/**
 * دریافت همه آیتم‌های لیست از SharePoint
 * همزمان می‌تواند با فیلتر سرور انجام شود
 */
export async function loadCodingGoodsTitle(
  options?: LoadOptions
): Promise<ICodingGoodsListItem[]> {
  let allResults: ICodingGoodsListItem[] = [];

  // اول از GUID تلاش می‌کنیم، اگر کار نکرد از Title استفاده می‌کنیم
  let listEndpoint = LIST_GUID
    ? `guid('${LIST_GUID}')`
    : `getbytitle('${LIST_TITLE}')`;

  // ساخت query parameters برای فیلتر (در صورت نیاز)
  const queryParams = new URLSearchParams();
  queryParams.append("$select", "*");
  queryParams.append("$top", "5000"); // حداکثر تعداد برای یک request

  // اگر searchTerm داده شده، فیلتر اضافه می‌کنیم
  if (options?.searchTerm && options.searchTerm.trim()) {
    const searchLower = options.searchTerm.toLowerCase().trim();
    const fields = options.filterFields || ["Title", "sharhmahsolbarayefactor"];

    // ساخت فیلتر OData
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

      // اگر با GUID خطا داد و هنوز retry نکرده‌ایم، با Title امتحان می‌کنیم
      if (!response.ok && !retryWithTitle && LIST_GUID) {
        console.warn("خطا با GUID، تلاش با Title...");
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

      // بررسی وجود data.d
      if (!data || !data.d) {
        console.error("پاسخ نامعتبر از سرور:", data);
        break;
      }

      // بررسی وجود results
      if (data.d.results && Array.isArray(data.d.results)) {
        allResults = [...allResults, ...data.d.results];
      } else if (Array.isArray(data.d)) {
        // اگر results نباشد ولی data.d آرایه باشد
        allResults = [...allResults, ...data.d];
      }

      // بررسی برای pagination
      nextUrl = data.d.__next || null;
      if (nextUrl && retryWithTitle) {
        // اگر pagination داریم و با Title کار می‌کنیم، URL را اصلاح می‌کنیم
        nextUrl = nextUrl.replace(/guid\([^)]+\)/, listEndpoint);
      }
    }

    return allResults;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌ها:", err);

    // اگر هنوز retry نکرده‌ایم و GUID استفاده کرده بودیم، یکبار با Title امتحان می‌کنیم
    if (!retryWithTitle && LIST_GUID) {
      console.warn("تلاش مجدد با Title...");
      try {
        return await loadCodingGoodsTitleWithTitle(options);
      } catch (retryErr) {
        console.error("خطا در retry:", retryErr);
      }
    }

    return [];
  }
}

/**
 * دریافت داده با استفاده از Title (fallback)
 */
async function loadCodingGoodsTitleWithTitle(
  options?: LoadOptions
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
