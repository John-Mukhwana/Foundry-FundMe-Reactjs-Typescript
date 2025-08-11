import { formatEther, parseEther } from 'viem';

/**
 * Format Wei to ETH with specified decimal places
 */
export function formatWeiToEth(wei: bigint, decimals: number = 4): string {
  const eth = formatEther(wei);
  return parseFloat(eth).toFixed(decimals);
}

/**
 * Format ETH amount to USD based on current price
 */
export function formatEthToUsd(ethAmount: number, ethPrice: number): string {
  const usdValue = ethAmount * ethPrice;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(usdValue);
}

/**
 * Format USD value as currency
 */
export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Truncate Ethereum address for display
 */
export function truncateAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Convert ETH string input to Wei bigint
 */
export function parseEthInput(ethInput: string): bigint {
  if (!ethInput || ethInput === '') return BigInt(0);
  try {
    return parseEther(ethInput);
  } catch {
    return BigInt(0);
  }
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Check if minimum funding requirement is met
 */
export function isMinimumFundingMet(ethAmount: number, ethPrice: number, minimumUsd: number): boolean {
  const usdValue = ethAmount * ethPrice;
  return usdValue >= minimumUsd;
}
