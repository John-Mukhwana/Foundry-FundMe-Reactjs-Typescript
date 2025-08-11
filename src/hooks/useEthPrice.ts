import { useReadContract } from 'wagmi';
import { PRICE_FEED_ABI } from '@/utils/constants';

/**
 * Hook to fetch current ETH/USD price from Chainlink price feed
 */
export function useEthPrice(priceFeedAddress?: `0x${string}`) {
  const { data: priceData, isLoading, error } = useReadContract({
    address: priceFeedAddress,
    abi: PRICE_FEED_ABI,
    functionName: 'latestRoundData',
    query: {
      enabled: !!priceFeedAddress,
      staleTime: 60000, // 1 minute cache
      refetchInterval: 60000, // Refetch every minute
    },
  });

  // Extract price from Chainlink response (8 decimals)
  const ethPrice = priceData ? Number(priceData[1]) / 1e8 : 0;

  return {
    ethPrice,
    isLoading,
    error,
    rawData: priceData,
  };
}
