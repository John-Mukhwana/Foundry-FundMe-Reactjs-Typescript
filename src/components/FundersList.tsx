import { useState, useEffect } from 'react';
import { Users, ChevronDown, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEthPrice } from '@/hooks/useEthPrice';
import { useFundMeContract } from '@/hooks/useFundMeContract';
import { truncateAddress, formatWeiToEth, formatEthToUsd } from '@/utils/format';

interface Funder {
  address: string;
  amount: bigint;
  ethAmount: number;
  usdAmount: number;
}

export default function FundersList() {
  const [funders, setFunders] = useState<Funder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { priceFeed } = useFundMeContract();
  const { ethPrice } = useEthPrice(priceFeed as `0x${string}`);

  useEffect(() => {
    if (ethPrice > 0) {
      // Display sample funder data for demonstration
      const sampleFunders: Funder[] = [
        {
          address: '0x1234567890123456789012345678901234567890',
          amount: BigInt('50000000000000000'), // 0.05 ETH in Wei
          ethAmount: 0.05,
          usdAmount: 0.05 * ethPrice,
        },
        {
          address: '0x9876543210987654321098765432109876543210',
          amount: BigInt('100000000000000000'), // 0.1 ETH in Wei
          ethAmount: 0.1,
          usdAmount: 0.1 * ethPrice,
        },
        {
          address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
          amount: BigInt('250000000000000000'), // 0.25 ETH in Wei
          ethAmount: 0.25,
          usdAmount: 0.25 * ethPrice,
        },
        {
          address: '0x5555666677778888999900001111222233334444',
          amount: BigInt('75000000000000000'), // 0.075 ETH in Wei
          ethAmount: 0.075,
          usdAmount: 0.075 * ethPrice,
        },
        {
          address: '0xaaaabbbbccccddddeeeeffffgggghhhhiiiijjjj',
          amount: BigInt('120000000000000000'), // 0.12 ETH in Wei
          ethAmount: 0.12,
          usdAmount: 0.12 * ethPrice,
        },
      ];
      
      setFunders(sampleFunders);
    }
  }, [ethPrice]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white dark:bg-neutral-800 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading font-semibold text-neutral-800 dark:text-neutral-100 flex items-center space-x-2">
              <Users className="w-5 h-5 text-secondary-500" />
              <span>Funders</span>
            </h2>
            <Badge variant="secondary" className="bg-accent-500 text-white">
              {funders.length}
            </Badge>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto" data-testid="list-funders">
            {funders.length === 0 && !isLoading ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                <p className="text-neutral-500 dark:text-neutral-400">
                  No funders yet. Be the first to fund this project!
                </p>
              </div>
            ) : (
              funders.map((funder, index) => (
                <motion.div
                  key={`${funder.address}-${index}`}
                  className="flex items-center justify-between p-3 bg-gradient-crypto rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  data-testid={`card-funder-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index % 3 === 0 ? 'bg-accent-500' : 
                      index % 3 === 1 ? 'bg-secondary-500' : 'bg-accent-400'
                    }`}>
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-mono text-sm text-neutral-700 dark:text-neutral-300" data-testid={`text-funder-address-${index}`}>
                      {truncateAddress(funder.address)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-neutral-900 dark:text-neutral-50" data-testid={`text-funder-eth-${index}`}>
                      {funder.ethAmount.toFixed(4)} ETH
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400" data-testid={`text-funder-usd-${index}`}>
                      {formatEthToUsd(funder.ethAmount, ethPrice)}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            
            {isLoading && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-accent-500"></div>
              </div>
            )}
          </div>
          

        </CardContent>
      </Card>
    </motion.div>
  );
}
