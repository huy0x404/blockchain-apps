import useSWR from 'swr';
import apiClient from '../services/apiClient';
import ENDPOINTS from '../services/endpoints';

const fetcher = (url) => apiClient.get(url);

export const useAirdropData = (params = {}) => {
  const { status, chain, limit = 50 } = params;
  const queryParams = new URLSearchParams();
  
  if (status) queryParams.append('status', status);
  if (chain) queryParams.append('chain', chain);
  if (limit) queryParams.append('limit', limit);

  const { data, error, isLoading, mutate } = useSWR(
    `${ENDPOINTS.airdrop.getAll}?${queryParams.toString()}`,
    fetcher,
    {
      refreshInterval: 60000, // Refresh every minute
      revalidateOnFocus: true,
    }
  );

  return {
    airdrops: data?.data || [],
    count: data?.count || 0,
    isLoading,
    isError: error,
    mutate,
  };
};

export const useActiveAirdrops = () => {
  const { data, error, isLoading } = useSWR(
    ENDPOINTS.airdrop.getActive,
    fetcher,
    {
      refreshInterval: 120000, // Refresh every 2 minutes
    }
  );

  return {
    airdrops: data?.data || [],
    count: data?.count || 0,
    isLoading,
    isError: error,
  };
};

export const useUpcomingAirdrops = () => {
  const { data, error, isLoading } = useSWR(
    ENDPOINTS.airdrop.getUpcoming,
    fetcher,
    {
      refreshInterval: 300000, // Refresh every 5 minutes
    }
  );

  return {
    airdrops: data?.data || [],
    count: data?.count || 0,
    isLoading,
    isError: error,
  };
};

export const useAirdropById = (id) => {
  const { data, error, isLoading } = useSWR(
    id ? ENDPOINTS.airdrop.getById(id) : null,
    fetcher
  );

  return {
    airdrop: data?.data || null,
    isLoading,
    isError: error,
  };
};

export const useTwitterAirdrops = (project = '') => {
  const { data, error, isLoading } = useSWR(
    `${ENDPOINTS.airdrop.searchTwitter}?project=${project}`,
    fetcher,
    {
      refreshInterval: 600000, // Refresh every 10 minutes
    }
  );

  return {
    airdrops: data?.data || [],
    count: data?.count || 0,
    isLoading,
    isError: error,
  };
};
