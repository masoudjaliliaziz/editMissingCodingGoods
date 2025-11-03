import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCodingGoodsItem } from "../api/addData";
import type { IUpdateCodingGoodsParams } from "../types/apiTypes";

export function useUpdateCodingGoods() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, updates }: IUpdateCodingGoodsParams) =>
      updateCodingGoodsItem(itemId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["codingGoodsTitle"] });
    },

    onError: (error) => {
      console.error("خطا در بروزرسانی آیتم:", error);
    },
  });
}
