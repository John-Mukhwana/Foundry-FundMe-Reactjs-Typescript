import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Zap, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useAccount, useChainId, useSwitchChain, useDisconnect } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { truncateAddress } from "@/utils/format";
import { SEPOLIA_CHAIN_ID } from "@/utils/constants";

export default function Header() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { open, close } = useAppKit();
  const { disconnect } = useDisconnect();
  const [isNetworkSwitching, setIsNetworkSwitching] = useState(false);
  const [walletCleared, setWalletCleared] = useState(false);

  const isCorrectNetwork = chainId === SEPOLIA_CHAIN_ID;

  const handleNetworkSwitch = async () => {
    if (!isCorrectNetwork && switchChain) {
      setIsNetworkSwitching(true);
      try {
        await switchChain({ chainId: SEPOLIA_CHAIN_ID });
      } catch (error) {
        console.error("Failed to switch network:", error);
      } finally {
        setIsNetworkSwitching(false);
      }
    }
  };

  const handleWalletConnect = () => {
    open();
  };

  const handleDisconnect = () => {
    disconnect();
    close(); // Close the wallet modal after disconnect
  };

  useEffect(() => {
    if (!isConnected) {
      setWalletCleared(true);
      // Optionally, clear other wallet-related state here
    } else {
      setWalletCleared(false);
    }
  }, [isConnected]);

  return (
    <motion.header
      className="bg-primary-500 shadow-sm sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-white">
              FundMe
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Network Status */}
            {isConnected && (
              <div className="hidden sm:flex items-center space-x-2">
                {isCorrectNetwork ? (
                  <div className="flex items-center space-x-2 bg-secondary-500 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                    <span className="text-white text-sm font-medium">
                      Sepolia
                    </span>
                  </div>
                ) : (
                  <Button
                    onClick={handleNetworkSwitch}
                    disabled={isNetworkSwitching}
                    className="bg-error-500 hover:bg-error-600 text-white px-3 py-1 rounded-full text-sm"
                    data-testid="button-switch-network"
                  >
                    {isNetworkSwitching ? "Switching..." : "Wrong Network"}
                  </Button>
                )}
              </div>
            )}

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="p-2 text-white hover:bg-primary-600 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
              data-testid="button-toggle-theme"
            >
              {isDark ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            {/* Wallet Connect & Disconnect Buttons */}
            {isConnected ? (
              <>
                <Button
                  onClick={handleWalletConnect}
                  className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  data-testid="button-connect-wallet"
                >
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {truncateAddress(address)}
                  </span>
                  <span className="sm:hidden">Connected</span>
                </Button>
                <Button
                  onClick={handleDisconnect}
                  className="bg-error-500 hover:bg-error-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ml-2"
                  data-testid="button-disconnect-wallet"
                >
                  Disconnect
                </Button>
              </>
            ) : (
              <Button
                onClick={handleWalletConnect}
                className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                data-testid="button-connect-wallet"
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Wallet</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
