import { useEffect, useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { useFundMeContract } from '@/hooks/useFundMeContract';
import { useEthPrice } from '@/hooks/useEthPrice';
import { useReadContract } from 'wagmi';
import { FUNDME_CONTRACT_ADDRESS, FUNDME_ABI } from '@/utils/constants';
import { formatEther } from 'viem';
import { Line } from 'react-chartjs-2';

// Chart.js imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Title,
  Legend
);

interface FundingDataPoint {
  date: string;
  totalEth: number;
  totalUsd: number;
}

export default function FundingChart() {
  const { priceFeed } = useFundMeContract();
  const { ethPrice } = useEthPrice(priceFeed as `0x${string}`);
  const { data: fundersWithAmounts } = useReadContract({
    address: FUNDME_CONTRACT_ADDRESS,
    abi: FUNDME_ABI,
    functionName: 'getFundersWithAmounts',
  });

  // Prepare simple bar chart data for each funder
  let funderLabels: string[] = [];
  let funderEth: number[] = [];
  if (fundersWithAmounts && Array.isArray(fundersWithAmounts[0]) && Array.isArray(fundersWithAmounts[1]) && ethPrice > 0) {
    funderLabels = fundersWithAmounts[0].map((addr: string, i: number) => `Funder ${i + 1}`);
    funderEth = fundersWithAmounts[1].map((amt: any) => Number(formatEther(BigInt(amt))));
  }

  // Gradient fill for line chart
  const chartRef = useRef<any>(null);
  const getGradient = (ctx: CanvasRenderingContext2D, area: any) => {
    const gradient = ctx.createLinearGradient(0, area.top, 0, area.bottom);
    gradient.addColorStop(0, 'rgba(20,184,166,0.4)');
    gradient.addColorStop(1, 'rgba(20,184,166,0.05)');
    return gradient;
  };

  const chartData = {
    labels: funderLabels,
    datasets: [
      {
        label: 'ETH Funded',
        data: funderEth,
        fill: true,
        borderColor: 'rgba(20, 184, 166, 1)',
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return 'rgba(20,184,166,0.2)';
          return getGradient(ctx, chartArea);
        },
        tension: 0.5,
        pointBackgroundColor: 'rgba(20, 184, 166, 1)',
        pointBorderColor: '#fff',
        pointRadius: 7,
        pointHoverRadius: 10,
        borderWidth: 3,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#0f172a',
          font: { size: 16, weight: 'bold', family: 'Inter, sans-serif' },
          padding: 20,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `ETH: ${context.parsed.y.toFixed(4)}`;
          }
        },
        backgroundColor: 'rgba(20,184,166,0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'var(--accent-500)',
        borderWidth: 2,
        cornerRadius: 10,
        displayColors: true,
        padding: 16,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(0,0,0,0.04)' },
        ticks: { color: '#0f172a', font: { size: 15, family: 'Inter, sans-serif' }, padding: 10 },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(20,184,166,0.08)' },
        ticks: { color: '#0f172a', font: { size: 15, family: 'Inter, sans-serif' }, callback: (val: any) => val + ' ETH', padding: 10 },
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="bg-white dark:bg-neutral-800 shadow-md">
        <CardContent className="p-6">
          <h2 className="text-xl font-heading font-bold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-secondary-500" />
            <span>Funders ETH Contributions</span>
          </h2>
          <div className="relative h-80 sm:h-96" data-testid="chart-funding">
            <Line ref={chartRef} data={chartData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
