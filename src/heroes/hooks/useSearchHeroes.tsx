import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "../actions/search-heroes.action";

export const useSearchHeroes = (name: string, strength?: string) => {
  return useQuery({
    queryKey: ["heroesSearch", { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5, //5 minutos
  });
};
