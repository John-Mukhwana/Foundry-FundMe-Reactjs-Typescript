import { useState, useEffect } from "react";
import { DollarSign, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { useReadContract } from "wagmi";
import { FUNDME_CONTRACT_ADDRESS, FUNDME_ABI } from "../utils/constants";
import { useFundMeContract } from "../hooks/useFundMeContract";
import { useEthPrice } from "../hooks/useEthPrice";
import { formatWeiToEth, formatEthToUsd, formatNumber } from "../utils/format";

export default function StatsOverview() {
  const [totalFunded, setTotalFunded] = useState(0);
  const [totalFunders, setTotalFunders] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Use new contract function to get total funded
  const { data: totalFundedData } = useReadContract({
    address: FUNDME_CONTRACT_ADDRESS,
    abi: FUNDME_ABI,
    functionName: "getTotalFunded",
  });

  // Use new contract function to get funders count
  const { data: totalFundersData } = useReadContract({
    address: FUNDME_CONTRACT_ADDRESS,
    abi: FUNDME_ABI,
    functionName: "getFundersCount",
  });

  const { priceFeed } = useFundMeContract();
  const { ethPrice } = useEthPrice(priceFeed as `0x${string}`);

  // Calculate total funded ETH and USD
  const totalEth = totalFundedData
    ? Number(formatWeiToEth(BigInt(totalFundedData)))
    : 0;
  const totalUsd = totalEth * ethPrice;

  useEffect(() => {
    setTotalFunded(totalEth);
    setTotalFunders(totalFundersData ? Number(totalFundersData) : 0);
    setIsLoading(false);
  }, [totalEth, totalFundersData]);

  const successRate = 95; // Static success rate for demo

  const stats = [
    {
      title: "Total Funded",
      value: `${totalFunded.toFixed(2)} ETH`,
      subtitle: formatEthToUsd(totalFunded, ethPrice),
      icon: DollarSign,
      color: "bg-accent-500",
      testId: "text-total-funded",
    },
    {
      title: "Total Funders",
      value: formatNumber(totalFunders),
      subtitle: "Growing Daily",
      icon: Users,
      color: "bg-secondary-500",
      testId: "text-total-funders",
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      subtitle: "High Trust",
      icon: TrendingUp,
      color: "bg-accent-400",
      testId: "text-success-rate",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-white dark:bg-neutral-800 shadow-md">
            <CardContent className="p-6 text-center">
              <div
                className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>

              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded mb-1"></div>
                  <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                </div>
              ) : (
                <>
                  <div
                    className="text-2xl font-heading font-bold text-neutral-900 dark:text-neutral-50 mb-1"
                    data-testid={stat.testId}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                    {stat.title}
                  </div>
                  <div
                    className={`font-semibold ${
                      stat.title === "Success Rate"
                        ? "text-success-500"
                        : "text-secondary-500"
                    }`}
                  >
                    {stat.subtitle}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
