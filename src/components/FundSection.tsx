import { useState, useEffect } from 'react';
import { Send, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFundMeContract } from '@/hooks/useFundMeContract';
import { useEthPrice } from '@/hooks/useEthPrice';
import { useAccount } from 'wagmi';
import { parseEthInput, formatEthToUsd, formatUsd, isMinimumFundingMet } from '@/utils/format';
import { toast } from '@/hooks/use-toast';

export default function FundSection() {
  const [ethAmount, setEthAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const [usdEquivalent, setUsdEquivalent] = useState(0);
  const { address } = useAccount();
  
  const { 
    fund, 
    minimumUsd, 
    priceFeed,
    isFundPending, 
    isFundSuccess, 
    isFundError,
    refetchUserFunded 
  } = useFundMeContract();
  
  const { ethPrice } = useEthPrice(priceFeed as `0x${string}`);

  // Calculate USD equivalent when ETH amount or price changes
  useEffect(() => {
    const ethValue = parseFloat(ethAmount) || 0;
    const usdValue = ethValue * ethPrice;
    setUsdEquivalent(usdValue);
    if (usdAmount !== '') {
      // If user entered USD, update ETH field
      const usdVal = parseFloat(usdAmount) || 0;
      if (ethPrice > 0) {
        setEthAmount((usdVal / ethPrice).toFixed(4));
      }
    }
  }, [ethAmount, ethPrice, usdAmount]);

  // Handle transaction success
  useEffect(() => {
    if (isFundSuccess) {
      toast({
        title: "Funding Successful! 🎉",
        description: `Successfully funded ${ethAmount} ETH to the project.`,
        variant: "default",
      });
      setEthAmount('');
      refetchUserFunded();
    }
  }, [isFundSuccess, ethAmount, refetchUserFunded]);

  // Handle transaction error
  useEffect(() => {
    if (isFundError) {
      toast({
        title: "Funding Failed",
        description: "Failed to fund the project. Please try again.",
        variant: "destructive",
      });
    }
  }, [isFundError]);

  const handleFund = async () => {
    if (!address) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to fund the project.",
        variant: "destructive",
      });
      return;
    }

    const ethValue = parseFloat(ethAmount);
    if (!ethValue || ethValue <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid ETH amount.",
        variant: "destructive",
      });
      return;
    }

    const minimumUsdValue = minimumUsd ? Number(minimumUsd) / 1e18 : 50;
    if (!isMinimumFundingMet(ethValue, ethPrice, minimumUsdValue)) {
      toast({
        title: "Amount Below Minimum",
        description: `Minimum funding amount is ${formatUsd(minimumUsdValue)}`,
        variant: "destructive",
      });
      return;
    }

    try {
      const weiAmount = parseEthInput(ethAmount);
      await fund(weiAmount);
    } catch (error) {
      console.error('Funding error:', error);
    }
  };

  const minimumUsdValue = minimumUsd ? Number(minimumUsd) / 1e18 : 50;
  const isAmountValid = ethAmount && isMinimumFundingMet(parseFloat(ethAmount), ethPrice, minimumUsdValue);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="gradient-border">
        <div className="bg-white dark:bg-neutral-800 rounded-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-heading font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center space-x-2">
              <Send className="w-5 h-5 text-accent-500" />
              <span>Fund Project</span>
            </h2>
            
            <div className="space-y-4">
              {/* USD Amount Input */}
              <div>
                <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  USD Amount
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={usdAmount}
                    onChange={(e) => setUsdAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors text-lg font-mono pr-16"
                    data-testid="input-usd-amount"
                  />
                  <div className="absolute right-3 top-3">
                    <span className="text-neutral-500 dark:text-neutral-400 font-medium">USD</span>
                  </div>
                </div>
              </div>
              {/* ETH Amount Input */}
              <div>
                <Label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  ETH Amount
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.0001"
                    min="0"
                    placeholder="0.0"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors text-lg font-mono pr-16"
                    data-testid="input-eth-amount"
                  />
                  <div className="absolute right-3 top-3">
                    <span className="text-neutral-500 dark:text-neutral-400 font-medium">ETH</span>
                  </div>
                </div>
              </div>
              
              {/* USD Conversion Display */}
              <Card className="bg-neutral-50 dark:bg-neutral-700">
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">USD Equivalent:</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-50" data-testid="text-usd-equivalent">
                      {formatEthToUsd(parseFloat(ethAmount) || 0, ethPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-neutral-600 dark:text-neutral-300">Current ETH Price:</span>
                    <span className="font-medium text-secondary-500" data-testid="text-eth-price">
                      {formatEthToUsd(1, ethPrice)}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              {/* Fund Button */}
              <Button
                onClick={handleFund}
                disabled={!address || !isAmountValid || isFundPending}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                  isAmountValid 
                    ? 'bg-accent-500 hover:bg-accent-600 text-white' 
                    : 'bg-neutral-300 dark:bg-neutral-600 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'
                }`}
                data-testid="button-fund"
              >
                <Zap className="w-5 h-5" />
                <span>
                  {isFundPending ? 'Funding...' : 'Fund Project'}
                </span>
              </Button>
              
              {/* Minimum Amount Notice */}
              <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                Minimum funding amount: {formatUsd(minimumUsdValue)}
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
