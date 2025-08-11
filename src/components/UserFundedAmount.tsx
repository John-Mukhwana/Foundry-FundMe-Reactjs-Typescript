import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useFundMeContract } from '@/hooks/useFundMeContract';
import { useEthPrice } from '@/hooks/useEthPrice';
import { useAccount } from 'wagmi';
import { formatWeiToEth, formatEthToUsd } from '@/utils/format';

export default function UserFundedAmount() {
  const { address } = useAccount();
  const { userFundedAmount, priceFeed, isLoadingUserFunded } = useFundMeContract();
  const { ethPrice } = useEthPrice(priceFeed as `0x${string}`);

  if (!address) {
    return (
      <Card className="bg-neutral-50 dark:bg-neutral-800 shadow-sm">
        <CardContent className="p-6 text-center">
          <p className="text-neutral-500 dark:text-neutral-400">
            Connect your wallet to view your contribution
          </p>
        </CardContent>
      </Card>
    );
  }

  const ethAmount = userFundedAmount ? parseFloat(formatWeiToEth(userFundedAmount)) : 0;
  const usdValue = ethAmount * ethPrice;
  const progressPercentage = Math.min((ethAmount / 1) * 100, 100); // Assuming 1 ETH as a reference for progress

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-neutral-50 dark:bg-neutral-800 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-heading font-semibold text-neutral-800 dark:text-neutral-100 mb-3 flex items-center space-x-2">
            <User className="w-4 h-4 text-accent-500" />
            <span>Your Contribution</span>
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600 dark:text-neutral-300">Total Funded:</span>
              {isLoadingUserFunded ? (
                <Skeleton className="h-5 w-20" />
              ) : (
                <span className="font-semibold text-neutral-900 dark:text-neutral-50" data-testid="text-user-funded-eth">
                  {formatWeiToEth(userFundedAmount || BigInt(0))} ETH
                </span>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-neutral-600 dark:text-neutral-300">USD Value:</span>
              {isLoadingUserFunded ? (
                <Skeleton className="h-5 w-20" />
              ) : (
                <span className="font-semibold text-secondary-500" data-testid="text-user-funded-usd">
                  {formatEthToUsd(ethAmount, ethPrice)}
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              <Progress value={progressPercentage} className="h-2" />
              <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                {progressPercentage.toFixed(1)}% of personal milestone
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
