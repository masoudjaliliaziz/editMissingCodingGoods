import type { ICodingGoodsListItem } from "../types/apiTypes";
import { BASE_URL, LIST_TITLE } from "./base";

export async function loadCodingGoodsTitle(): Promise<ICodingGoodsListItem[]> {
  let allResults: ICodingGoodsListItem[] = [];
  let nextUrl = `${BASE_URL}/_api/web/lists/getbytitle('${LIST_TITLE}')/items`;

  try {
    while (nextUrl) {
      const response = await fetch(nextUrl, {
        method: "GET",
        headers: {
          Accept: "application/json;odata=verbose",
        },
      });

      const data = await response.json();

      allResults = [...allResults, ...data.d.results];

      nextUrl = data.d.__next || null;
    }

    return allResults;
  } catch (err) {
    console.error("خطا در دریافت آیتم‌ها:", err);
    return [];
  }
}
