import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { FUNDME_CONTRACT_ADDRESS, FUNDME_ABI } from '@/utils/constants';
import { toast } from '@/hooks/use-toast';

/**
 * Custom hook for reading FundMe contract data
 */
export function useFundMeContract() {
  const { address } = useAccount();

  // Read contract functions
  const { data: minimumUsd, isLoading: isLoadingMinimumUsd } = useReadContract({
    address: FUNDME_CONTRACT_ADDRESS,
    abi: FUNDME_ABI,
    functionName: 'MINIMUM_USD',
  });

  const { data: version, isLoading: isLoadingVersion } = useReadContract({
    address: FUNDME_CONTRACT_ADDRESS,
    abi: FUNDME_ABI,
    functionName: 'getVersion',
  });

  const { data: priceFeed, isLoading: isLoadingPriceFeed } = useReadContract({
    address: FUNDME_CONTRACT_ADDRESS,
    abi: FUNDME_ABI,
    functionName: 'getPriceFeed',
  });

  const { data: owner, isLoading: isLoadingOwner } = useReadContract({
    address: FUNDME_CONTRACT_ADDRESS,
    abi: FUNDME_ABI,
    functionName: 'getOwner',
  });

  const { data: userFundedAmount, isLoading: isLoadingUserFunded, refetch: refetchUserFunded } = useReadContract({
    address: FUNDME_CONTRACT_ADDRESS,
    abi: FUNDME_ABI,
    functionName: 'getAddressToAmountFunded',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Write contract functions
  const {
    writeContract: writeFund,
    isPending: isFundPending,
    isSuccess: isFundSuccess,
    isError: isFundError,
  } = useWriteContract();

  const {
    writeContract: writeWithdraw,
    isPending: isWithdrawPending,
    isSuccess: isWithdrawSuccess,
    isError: isWithdrawError,
  } = useWriteContract();

  const {
    writeContract: writeCheaperWithdraw,
    isPending: isCheaperWithdrawPending,
    isSuccess: isCheaperWithdrawSuccess,
    isError: isCheaperWithdrawError,
  } = useWriteContract();

  // Fund function
  const fund = async (ethAmount: bigint) => {
    try {
      writeFund({
        address: FUNDME_CONTRACT_ADDRESS,
        abi: FUNDME_ABI,
        functionName: 'fund',
        value: ethAmount,
      });
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Failed to submit funding transaction",
        variant: "destructive",
      });
    }
  };

  // Withdraw function
  const withdraw = async () => {
    try {
      writeWithdraw({
        address: FUNDME_CONTRACT_ADDRESS,
        abi: FUNDME_ABI,
        functionName: 'withdraw',
      });
    } catch (error) {
      toast({
        title: "Withdrawal Failed",
        description: "Failed to submit withdrawal transaction",
        variant: "destructive",
      });
    }
  };

  // Cheaper withdraw function
  const cheaperWithdraw = async () => {
    try {
      writeCheaperWithdraw({
        address: FUNDME_CONTRACT_ADDRESS,
        abi: FUNDME_ABI,
        functionName: 'cheaperWithdraw',
      });
    } catch (error) {
      toast({
        title: "Withdrawal Failed",
        description: "Failed to submit cheaper withdrawal transaction",
        variant: "destructive",
      });
    }
  };

  // Check if current user is owner
  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase();

  // Get funder by index
  const getFunder = (index: number) => {
    return useReadContract({
      address: FUNDME_CONTRACT_ADDRESS,
      abi: FUNDME_ABI,
      functionName: 'getFunder',
      args: [BigInt(index)],
    });
  };

  return {
    // Contract data
    minimumUsd,
    version,
    priceFeed,
    owner,
    userFundedAmount,
    isOwner,
    
    // Loading states
    isLoadingMinimumUsd,
    isLoadingVersion,
    isLoadingPriceFeed,
    isLoadingOwner,
    isLoadingUserFunded,
    
    // Transaction functions
    fund,
    withdraw,
    cheaperWithdraw,
    getFunder,
    
    // Transaction states
    isFundPending,
    isFundSuccess,
    isFundError,
    isWithdrawPending,
    isWithdrawSuccess,
    isWithdrawError,
    isCheaperWithdrawPending,
    isCheaperWithdrawSuccess,
    isCheaperWithdrawError,
    
    // Utilities
    refetchUserFunded,
  };
}
