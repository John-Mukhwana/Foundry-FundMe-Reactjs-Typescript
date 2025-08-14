import { useState, useEffect } from "react";
import { Users, ChevronDown, User } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useEthPrice } from "../hooks/useEthPrice";
import { useFundMeContract } from "../hooks/useFundMeContract";
import {
  truncateAddress,
  formatWeiToEth,
  formatEthToUsd,
} from "../utils/format";
import { FUNDME_CONTRACT_ADDRESS, FUNDME_ABI } from "../utils/constants";
import { useReadContract } from "wagmi";

interface Funder {
  address: string;
  amount: bigint;
  ethAmount: number;
  usdAmount: number;
}

export default function FundersList() {
  const [fundersState, setFundersState] = useState<Funder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { priceFeed } = useFundMeContract();
  const { ethPrice } = useEthPrice(priceFeed as `0x${string}`);

  // Use new contract function to get all funders and their amounts
  const { data: fundersWithAmounts, isLoading: isFundersLoading } =
    useReadContract({
      address: FUNDME_CONTRACT_ADDRESS,
      abi: FUNDME_ABI,
      functionName: "getFundersWithAmounts",
    });

  // Use new contract function to get total funded
  const { data: totalFunded } = useReadContract({
    address: FUNDME_CONTRACT_ADDRESS,
    abi: FUNDME_ABI,
    functionName: "getTotalFunded",
  });

  // Parse funders and amounts
  const parsedFunders: Funder[] = [];
  if (
    fundersWithAmounts &&
    Array.isArray(fundersWithAmounts[0]) &&
    Array.isArray(fundersWithAmounts[1])
  ) {
    for (let i = 0; i < fundersWithAmounts[0].length; i++) {
      const address = fundersWithAmounts[0][i];
      const amount = BigInt(fundersWithAmounts[1][i]);
      const ethAmount = Number(formatWeiToEth(amount));
      parsedFunders.push({
        address,
        amount,
        ethAmount,
        usdAmount: ethAmount * ethPrice,
      });
    }
  }

  // Calculate total funded ETH and USD
  const totalEth = totalFunded
    ? Number(formatWeiToEth(BigInt(totalFunded)))
    : 0;
  const totalUsd = totalEth * ethPrice;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white dark:bg-neutral-800 shadow-md">
        <CardContent className="p-6">

          {/* Title and Icon */}
          <div className="flex items-center mb-6 space-x-2">
            <Users className="w-6 h-6 text-accent-500" />
            <h2 className="text-xl font-heading font-semibold text-neutral-800 dark:text-neutral-100">List of Funders</h2>
          </div>
           {/* Number of Funders */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">Funders: {parsedFunders.length}</span>
          </div>
          {/* Total Funded Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div
                className="text-2xl font-bold text-primary-500"
                data-testid="text-total-eth"
              >
                {totalEth.toFixed(4)} ETH
              </div>
              <div
                className="text-lg text-neutral-500 dark:text-neutral-400"
                data-testid="text-total-usd"
              >
                {formatEthToUsd(totalEth, ethPrice)}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Total Funded
              </div>
            </div>
            <Badge variant="secondary" className="bg-accent-500 text-white">
              {parsedFunders.length}
            </Badge>
          </div>

          <div
            className="space-y-3 max-h-96 overflow-y-auto"
            data-testid="list-funders"
          >
            {parsedFunders.length === 0 && !isFundersLoading ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                <p className="text-neutral-500 dark:text-neutral-400">
                  No funders yet. Be the first to fund this project!
                </p>
              </div>
            ) : (
              parsedFunders.map((funder, index) => (
                <motion.div
                  key={`${funder.address}-${index}`}
                  className="flex items-center justify-between p-3 bg-gradient-crypto rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  data-testid={`card-funder-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index % 3 === 0
                          ? "bg-accent-500"
                          : index % 3 === 1
                          ? "bg-secondary-500"
                          : "bg-accent-400"
                      }`}
                    >
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span
                      className="font-mono text-sm text-neutral-700 dark:text-neutral-300"
                      data-testid={`text-funder-address-${index}`}
                    >
                      {truncateAddress(funder.address)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div
                      className="font-semibold text-neutral-900 dark:text-neutral-50"
                      data-testid={`text-funder-eth-${index}`}
                    >
                      {funder.ethAmount.toFixed(4)} ETH
                    </div>
                    <div
                      className="text-xs text-neutral-500 dark:text-neutral-400"
                      data-testid={`text-funder-usd-${index}`}
                    >
                      {formatEthToUsd(funder.ethAmount, ethPrice)}
                    </div>
                  </div>
                </motion.div>
              ))
            )}

            {isFundersLoading && (
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
