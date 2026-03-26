import { useQuery } from '@tanstack/react-query';
import { getNearbyStops } from '../apis/api';

export const useNearbyStops = (lat, lon, distance = 1000, enabled = true) => {
  return useQuery({
    queryKey: ['nearbyStops', lat, lon, distance],
    queryFn: () => getNearbyStops(lat, lon, distance),
    enabled: enabled && !!lat && !!lon,
    staleTime: 60000 
  });
};