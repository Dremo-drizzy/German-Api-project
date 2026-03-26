import { useQuery } from "@tanstack/react-query";
import { searchLocations } from "../apis/api";

export const useLocations = (query) => {
  return useQuery({
    queryKey: ["locations", query?.trim() || ""],
    queryFn: () => searchLocations(query?.trim() || ""),
    enabled: !!query && query.trim().length >= 2,
    staleTime: 5 * 60 * 1000,
  });
};
