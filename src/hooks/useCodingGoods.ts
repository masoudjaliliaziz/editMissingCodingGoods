import { useQuery } from "@tanstack/react-query";
import { loadCodingGoodsTitle } from "../api/getData";

export function useCodingGoodsTitle() {
  return useQuery({
    queryKey: ["codingGoodsTitle"],
    queryFn: () => loadCodingGoodsTitle(),
  });
}
