import { BASE_URL } from "./base";

export async function getFormDigest(): Promise<string> {
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

    return formDigest;
  } catch (err) {
    console.error("خطا در دریافت Form Digest:", err);
    throw err;
  }
}
