import { useQuery } from "@tanstack/react-query";
import { getHero } from "../actions/get-hero";

export const useHero = (idSlug: string) => {
  return useQuery({
    queryKey: ["hero", idSlug],
    queryFn: () => getHero(idSlug),
    staleTime: 1000 * 60 * 5, //  5 minutos
    retry: false,
  });
};
