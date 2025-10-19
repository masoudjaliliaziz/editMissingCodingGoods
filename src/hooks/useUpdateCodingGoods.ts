import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCodingGoodsItem } from "../api/getData";
import type { ICodingGoodsListItem } from "../types/apiTypes";

interface UpdateCodingGoodsParams {
  itemId: number;
  updates: Partial<ICodingGoodsListItem>;
}

export function useUpdateCodingGoods() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, updates }: UpdateCodingGoodsParams) =>
      updateCodingGoodsItem(itemId, updates),
    onSuccess: () => {
      // Invalidate and refetch the coding goods data
      queryClient.invalidateQueries({ queryKey: ["codingGoodsTitle"] });
    },
    onError: (error) => {
      console.error("خطا در بروزرسانی آیتم:", error);
    },
  });
}
