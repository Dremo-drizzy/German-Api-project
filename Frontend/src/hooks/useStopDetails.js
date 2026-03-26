import { useQuery } from '@tanstack/react-query';
import { getStopDetails } from '../apis/api';

export const useStopDetails = (stopId, enabled = true) => {
  return useQuery({
    queryKey: ['stopDetails', stopId],
    queryFn: () => getStopDetails(stopId),
    enabled: enabled && !!stopId,
    staleTime: 5 * 60 * 1000 
  });
};