import type { ICodingGoodsListItem } from "../types/apiTypes";

const BASE_URL = "https://portal.zarsim.com";
const LIST_TITLE = "codinggoods";

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

export async function updateCodingGoodsItem(
  itemId: number,
  updates: Partial<ICodingGoodsListItem>
): Promise<boolean> {
  try {
    console.log("شروع بروزرسانی آیتم:", itemId, updates);
    // First, get the current item to get the etag
    const getResponse = await fetch(
      `${BASE_URL}/_api/web/lists/getbytitle('${LIST_TITLE}')/items(${itemId})`,
      {
        method: "GET",
        headers: {
          Accept: "application/json;odata=verbose",
        },
      }
    );

    if (!getResponse.ok) {
      throw new Error(`خطا در دریافت آیتم: ${getResponse.statusText}`);
    }

    const currentItem = await getResponse.json();
    const etag = currentItem.d.__metadata.etag;
    const contentType = currentItem.d.__metadata.type;

    // Prepare the update payload with proper metadata
    const updatePayload = {
      ...updates,
      __metadata: {
        type: contentType,
      },
    };

    // Update the item with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const updateResponse = await fetch(
        `${BASE_URL}/_api/web/lists/getbytitle('${LIST_TITLE}')/items(${itemId})`,
        {
          method: "POST",
          headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-HTTP-Method": "MERGE",
            "If-Match": etag,
            "X-RequestDigest": await getFormDigest(),
          },
          body: JSON.stringify(updatePayload),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        throw new Error(
          `خطا در بروزرسانی آیتم: ${updateResponse.statusText} - ${errorText}`
        );
      }

      // SharePoint MERGE operations often return empty response body
      // We don't need to parse the response, just check if it was successful
      console.log("بروزرسانی با موفقیت انجام شد");
      return true;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("درخواست بروزرسانی timeout شد");
      }
      throw error;
    }
  } catch (err) {
    console.error("خطا در بروزرسانی آیتم:", err);
    throw err;
  }
}

async function getFormDigest(): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/_api/contextinfo`, {
      method: "POST",
      headers: {
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
      },
    });

    if (!response.ok) {
      throw new Error(`خطا در دریافت Form Digest: ${response.statusText}`);
    }

    const data = await response.json();
    const formDigest = data.d.GetContextWebInformation.FormDigestValue;

    if (!formDigest) {
      throw new Error("Form Digest دریافت نشد");
    }

    console.log("Form Digest دریافت شد");
    return formDigest;
  } catch (err) {
    console.error("خطا در دریافت Form Digest:", err);
    throw err;
  }
}
