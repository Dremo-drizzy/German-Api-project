import { useQuery } from '@tanstack/react-query';
import { getTripDetails } from '../apis/api';


export const useTripDetails = (tripId, lineName = '', enabled = true) => {
  return useQuery({
    queryKey: ['tripDetails', tripId, lineName],
    queryFn: () => getTripDetails(tripId),
    enabled: enabled && !!tripId,
    staleTime: 60000 
  });
};