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
  const [funders, setFunders] = useState<Funder[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { priceFeed } = useFundMeContract();
  const { ethPrice } = useEthPrice(priceFeed as `0x${string}`);

  useEffect(() => {
    async function fetchFunders() {
      setIsLoading(true);
      try {
        // Get funders count
        const { data: fundersCount } = useReadContract({
          address: FUNDME_CONTRACT_ADDRESS,
          abi: FUNDME_ABI,
          functionName: "getFundersCount",
        });
        if (!fundersCount) {
          setFunders([]);
          setIsLoading(false);
          return;
        }
        const fundersArr: Funder[] = [];
        for (let i = 0; i < Number(fundersCount); i++) {
          const { data: funderAddress } = useReadContract({
            address: FUNDME_CONTRACT_ADDRESS,
            abi: FUNDME_ABI,
            functionName: "getFunder",
            args: [BigInt(i)],
          });
          if (!funderAddress) continue;
          const { data: amountFunded } = useReadContract({
            address: FUNDME_CONTRACT_ADDRESS,
            abi: FUNDME_ABI,
            functionName: "getAddressToAmountFunded",
            args: [funderAddress],
          });
          const ethAmount = amountFunded
            ? Number(formatWeiToEth(BigInt(amountFunded)))
            : 0;
          fundersArr.push({
            address: funderAddress,
            amount: BigInt(amountFunded || 0),
            ethAmount,
            usdAmount: ethAmount * ethPrice,
          });
        }
        setFunders(fundersArr);
      } catch (err) {
        setFunders([]);
      }
      setIsLoading(false);
    }
    if (ethPrice > 0) {
      fetchFunders();
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

          <div
            className="space-y-3 max-h-96 overflow-y-auto"
            data-testid="list-funders"
          >
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
