import { useQuery } from '@tanstack/react-query';
import { getJourneys } from '../apis/api';

export const useJourneys = (params, trigger) => {
  return useQuery({
    queryKey: ['journeys', params, trigger],
    queryFn: () => getJourneys(params),
    enabled: !!params.from && !!params.to,
    staleTime: 0
  });
};