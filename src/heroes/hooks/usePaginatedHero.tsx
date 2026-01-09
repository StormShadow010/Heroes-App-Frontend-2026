import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-age.action";

interface Props {
  page: string;
  limit: string;
  category: string;
}

export const usePaginatedHero = ({ page, limit, category = "all" }: Props) => {
  return useQuery({
    queryKey: ["heroes", { page, limit, category }],
    queryFn: () => getHeroesByPageAction(+page, +limit, category),
    staleTime: 1000 * 60 * 5, //  5 minutos
  });
};
