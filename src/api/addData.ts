import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUpdateCodingGoods } from "../hooks/useUpdateCodingGoods";
import type {
  ICodingGoodsListItem,
  IUseEditFieldReturn,
} from "../types/apiTypes";
import { BASE_URL, LIST_TITLE, LIST_GUID } from "./base";
import { getFormDigest } from "./getFromDigest";

export async function updateCodingGoodsItem(
  itemId: number,
  updates: Partial<ICodingGoodsListItem>
): Promise<boolean> {
  let listEndpoint = LIST_GUID
    ? `guid('${LIST_GUID}')`
    : `getbytitle('${LIST_TITLE}')`;

  let retryWithTitle = false;

  try {
    let getResponse = await fetch(
      `${BASE_URL}/_api/web/lists/${listEndpoint}/items(${itemId})`,
      {
        method: "GET",
        headers: {
          Accept: "application/json;odata=verbose",
        },
      }
    );

    if (!getResponse.ok && !retryWithTitle && LIST_GUID) {
      listEndpoint = `getbytitle('${LIST_TITLE}')`;
      retryWithTitle = true;

      getResponse = await fetch(
        `${BASE_URL}/_api/web/lists/${listEndpoint}/items(${itemId})`,
        {
          method: "GET",
          headers: {
            Accept: "application/json;odata=verbose",
          },
        }
      );
    }

    if (!getResponse.ok) {
      if (!retryWithTitle && LIST_GUID && getResponse.status === 404) {
        return await updateCodingGoodsItemWithTitle(itemId, updates);
      }

      const errorText = await getResponse.text();
      throw new Error(
        `خطا در دریافت آیتم: ${getResponse.status} ${getResponse.statusText} - ${errorText}`
      );
    }

    const currentItem = await getResponse.json();
    const etag = currentItem.d.__metadata.etag;
    const contentType = currentItem.d.__metadata.type;

    const updatePayload = {
      ...updates,
      __metadata: {
        type: contentType,
      },
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const updateResponse = await fetch(
        `${BASE_URL}/_api/web/lists/${listEndpoint}/items(${itemId})`,
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
        if (!retryWithTitle && LIST_GUID && updateResponse.status === 404) {
          clearTimeout(timeoutId);
          return await updateCodingGoodsItemWithTitle(itemId, updates);
        }

        const errorText = await updateResponse.text();
        throw new Error(
          `خطا در بروزرسانی آیتم: ${updateResponse.statusText} - ${errorText}`
        );
      }

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

    if (!retryWithTitle && LIST_GUID && err instanceof Error) {
      const errorWithStatus = err as Error & { status?: number };
      const isNotFoundError =
        err.message.includes("Not Found") ||
        err.message.includes("404") ||
        errorWithStatus.status === 404;

      if (isNotFoundError) {
        try {
          return await updateCodingGoodsItemWithTitle(itemId, updates);
        } catch (retryErr) {
          console.error("خطا در retry بروزرسانی:", retryErr);
          throw retryErr;
        }
      }
    }

    throw err;
  }
}

async function updateCodingGoodsItemWithTitle(
  itemId: number,
  updates: Partial<ICodingGoodsListItem>
): Promise<boolean> {
  const listEndpoint = `getbytitle('${LIST_TITLE}')`;

  const getResponse = await fetch(
    `${BASE_URL}/_api/web/lists/${listEndpoint}/items(${itemId})`,
    {
      method: "GET",
      headers: {
        Accept: "application/json;odata=verbose",
      },
    }
  );

  if (!getResponse.ok) {
    const errorText = await getResponse.text();
    throw new Error(
      `خطا در دریافت آیتم: ${getResponse.statusText} - ${errorText}`
    );
  }

  const currentItem = await getResponse.json();
  const etag = currentItem.d.__metadata.etag;
  const contentType = currentItem.d.__metadata.type;

  const updatePayload = {
    ...updates,
    __metadata: {
      type: contentType,
    },
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const updateResponse = await fetch(
      `${BASE_URL}/_api/web/lists/${listEndpoint}/items(${itemId})`,
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

    return true;
  } catch (error: unknown) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("درخواست بروزرسانی timeout شد");
    }
    throw error;
  }
}

export function useEditField(
  selectedItem: ICodingGoodsListItem | null,
  fieldName: "codesaze" | "codearman" | "codeesnova",
  successMessage: string,
  errorMessage: string,
  onUpdate: (item: ICodingGoodsListItem) => void
): IUseEditFieldReturn {
  const [editingValue, setEditingValue] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const updateMutation = useUpdateCodingGoods();

  useEffect(() => {
    if (!selectedItem) {
      setEditingValue("");
      setIsEditing(false);
    }
  }, [selectedItem]);

  const handleEdit = () => {
    if (selectedItem) {
      const currentValue = selectedItem[fieldName] || "";
      setEditingValue(currentValue);
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!selectedItem) return;

    const currentValue = selectedItem[fieldName] || "";
    if (editingValue !== currentValue) {
      try {
        await updateMutation.mutateAsync({
          itemId: selectedItem.ID,
          updates: { [fieldName]: editingValue },
        });

        onUpdate({
          ...selectedItem,
          [fieldName]: editingValue,
        });

        setIsEditing(false);
        toast.success(successMessage);
      } catch (error) {
        console.error("خطا در بروزرسانی:", error);
        toast.error(errorMessage);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditingValue("");
    setIsEditing(false);
  };

  return {
    editingValue,
    isEditing,
    handleEdit,
    handleSave,
    handleCancel,
    setEditingValue,
    isSaving: updateMutation.isPending,
  };
}
