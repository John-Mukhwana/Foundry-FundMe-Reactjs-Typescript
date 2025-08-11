import { Info, DollarSign, GitCommit, TrendingUp, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useFundMeContract } from '@/hooks/useFundMeContract';
import { truncateAddress, formatUsd } from '@/utils/format';

export default function ContractInfo() {
  const {
    minimumUsd,
    version,
    priceFeed,
    owner,
    isLoadingMinimumUsd,
    isLoadingVersion,
    isLoadingPriceFeed,
    isLoadingOwner,
  } = useFundMeContract();

  return (
    <motion.div 
      className="bg-gradient-crypto rounded-xl shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-heading font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center space-x-2">
        <Info className="w-5 h-5 text-accent-500" />
        <span>Contract Information</span>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Minimum USD */}
        <Card className="bg-white dark:bg-neutral-800 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Minimum USD</span>
              <DollarSign className="w-4 h-4 text-secondary-500" />
            </div>
            {isLoadingMinimumUsd ? (
              <Skeleton className="h-6 w-16" />
            ) : (
              <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-50" data-testid="text-minimum-usd">
                {minimumUsd ? formatUsd(Number(minimumUsd) / 1e18) : '$0.00'}
              </span>
            )}
          </CardContent>
        </Card>
        
        {/* Version */}
        <Card className="bg-white dark:bg-neutral-800 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Version</span>
              <GitCommit className="w-4 h-4 text-secondary-500" />
            </div>
            {isLoadingVersion ? (
              <Skeleton className="h-6 w-8" />
            ) : (
              <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-50" data-testid="text-version">
                {version ? version.toString() : '0'}
              </span>
            )}
          </CardContent>
        </Card>
        
        {/* Price Feed */}
        <Card className="bg-white dark:bg-neutral-800 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Price Feed</span>
              <TrendingUp className="w-4 h-4 text-secondary-500" />
            </div>
            {isLoadingPriceFeed ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              <span className="text-sm font-mono text-neutral-900 dark:text-neutral-50" data-testid="text-price-feed">
                {priceFeed ? truncateAddress(priceFeed) : '0x0000...0000'}
              </span>
            )}
          </CardContent>
        </Card>
        
        {/* Owner */}
        <Card className="bg-white dark:bg-neutral-800 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Owner</span>
              <Crown className="w-4 h-4 text-accent-500" />
            </div>
            {isLoadingOwner ? (
              <Skeleton className="h-6 w-20" />
            ) : (
              <span className="text-sm font-mono text-neutral-900 dark:text-neutral-50" data-testid="text-owner">
                {owner ? truncateAddress(owner) : '0x0000...0000'}
              </span>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
