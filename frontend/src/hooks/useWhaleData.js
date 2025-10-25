import useSWR from 'swr';
import apiClient from '../services/apiClient';
import ENDPOINTS from '../services/endpoints';

const fetcher = (url) => apiClient.get(url);

export const useWhaleData = (params = {}) => {
  const { limit = 50, sortBy = 'totalVolume' } = params;
  const queryString = new URLSearchParams({ limit, sortBy }).toString();
  
  const { data, error, isLoading, mutate } = useSWR(
    `${ENDPOINTS.whale.getWhales}?${queryString}`,
    fetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    whales: data?.data || [],
    isLoading,
    isError: error,
    mutate,
  };
};

export const useWalletDetails = (address) => {
  const { data, error, isLoading } = useSWR(
    address ? ENDPOINTS.whale.trackWallet(address) : null,
    fetcher,
    {
      refreshInterval: 60000,
    }
  );

  return {
    wallet: data?.data || null,
    isLoading,
    isError: error,
  };
};

export const useRecentWhaleTransactions = (limit = 20) => {
  const { data, error, isLoading } = useSWR(
    `${ENDPOINTS.whale.getRecentTransactions}?limit=${limit}`,
    fetcher,
    {
      refreshInterval: 15000, // Refresh every 15 seconds
    }
  );

  return {
    transactions: data?.data || [],
    isLoading,
    isError: error,
  };
};

export const useWalletAnalysis = (address) => {
  const { data, error, isLoading } = useSWR(
    address ? ENDPOINTS.whale.analyzeWallet(address) : null,
    fetcher
  );

  return {
    analysis: data?.data || null,
    isLoading,
    isError: error,
  };
};
