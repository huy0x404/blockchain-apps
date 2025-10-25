import useSWR from 'swr';
import apiClient from '../services/apiClient';
import ENDPOINTS from '../services/endpoints';

const fetcher = (url) => apiClient.get(url);

export const useAIAnalyzer = () => {
  const analyzeWallet = async (address) => {
    try {
      const response = await apiClient.get(ENDPOINTS.ai.analyzeWallet(address));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const analyzeToken = async (chain, address) => {
    try {
      const response = await apiClient.get(ENDPOINTS.ai.analyzeToken(chain, address));
      return response;
    } catch (error) {
      throw error;
    }
  };

  const generateInsights = async (marketData) => {
    try {
      const response = await apiClient.post(ENDPOINTS.ai.generateInsights, {
        data: marketData,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const predictBehavior = async (address) => {
    try {
      const response = await apiClient.get(ENDPOINTS.ai.predictBehavior(address));
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    analyzeWallet,
    analyzeToken,
    generateInsights,
    predictBehavior,
  };
};

export const useWalletAIAnalysis = (address) => {
  const { data, error, isLoading } = useSWR(
    address ? ENDPOINTS.ai.analyzeWallet(address) : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    analysis: data?.data || null,
    isLoading,
    isError: error,
  };
};

export const useTokenAIAnalysis = (chain, address) => {
  const { data, error, isLoading } = useSWR(
    chain && address ? ENDPOINTS.ai.analyzeToken(chain, address) : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    analysis: data?.data || null,
    isLoading,
    isError: error,
  };
};
