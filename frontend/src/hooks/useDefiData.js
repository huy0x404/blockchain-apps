import useSWR from 'swr';
import apiClient from '../services/apiClient';
import ENDPOINTS from '../services/endpoints';

const fetcher = (url) => apiClient.get(url);

export const useDefiData = () => {
  const { data: protocols, error: protocolsError, isLoading: protocolsLoading } = useSWR(
    ENDPOINTS.defi.getProtocols,
    fetcher,
    {
      refreshInterval: 300000, // Refresh every 5 minutes
    }
  );

  const { data: tvl, error: tvlError, isLoading: tvlLoading } = useSWR(
    ENDPOINTS.defi.getTVL,
    fetcher,
    {
      refreshInterval: 300000,
    }
  );

  const { data: chains, error: chainsError, isLoading: chainsLoading } = useSWR(
    ENDPOINTS.defi.getChains,
    fetcher,
    {
      refreshInterval: 600000, // Refresh every 10 minutes
    }
  );

  return {
    protocols: protocols?.data || [],
    tvl: tvl?.data?.totalTVL || 0,
    chains: chains?.data || [],
    isLoading: protocolsLoading || tvlLoading || chainsLoading,
    isError: protocolsError || tvlError || chainsError,
  };
};

export const useTopProtocols = (limit = 10) => {
  const { data, error, isLoading } = useSWR(
    `${ENDPOINTS.defi.getTopProtocols}?limit=${limit}`,
    fetcher,
    {
      refreshInterval: 300000,
    }
  );

  return {
    protocols: data?.data || [],
    isLoading,
    isError: error,
  };
};

export const useProtocolDetails = (name) => {
  const { data, error, isLoading } = useSWR(
    name ? ENDPOINTS.defi.getProtocolDetails(name) : null,
    fetcher
  );

  return {
    protocol: data?.data || null,
    isLoading,
    isError: error,
  };
};

export const useYieldPools = (filters = {}) => {
  const { chain, project, minTvl = 0 } = filters;
  const queryParams = new URLSearchParams();
  
  if (chain) queryParams.append('chain', chain);
  if (project) queryParams.append('project', project);
  if (minTvl) queryParams.append('minTvl', minTvl);

  const { data, error, isLoading } = useSWR(
    `${ENDPOINTS.defi.getPools}?${queryParams.toString()}`,
    fetcher,
    {
      refreshInterval: 300000,
    }
  );

  return {
    pools: data?.data || [],
    count: data?.count || 0,
    isLoading,
    isError: error,
  };
};

export const useTokenPairs = (chain, address) => {
  const { data, error, isLoading } = useSWR(
    chain && address ? ENDPOINTS.defi.getTokenPairs(chain, address) : null,
    fetcher,
    {
      refreshInterval: 60000,
    }
  );

  return {
    pairs: data?.data?.pairs || [],
    isLoading,
    isError: error,
  };
};
