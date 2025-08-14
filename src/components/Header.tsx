import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Wallet, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useAccount, useChainId, useSwitchChain, useDisconnect } from "wagmi";
import { useAppKit } from "@reown/appkit/react";
import { truncateAddress } from "@/utils/format";
import { SEPOLIA_CHAIN_ID, FUNDME_CONTRACT_ADDRESS } from "@/utils/constants";

export default function Header() {
  // Removed dark mode logic
  const [menuOpen, setMenuOpen] = useState(false);
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
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  useEffect(() => {
      if (!isConnected) {
        setWalletCleared(true);
        // Optionally, clear other wallet-related state here
      } else {
        setWalletCleared(false);
        close(); // Close wallet modal after successful connection
      }
    }, [isConnected, close]);

  return (
    <motion.header
      className="bg-primary-500 shadow-sm sticky top-0 z-50 w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 w-full">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-3 sm:mb-0">
            <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-white">
              FundMe
            </h1>
          </div>

          {/* Hamburger menu for small screens */}
          <div className="sm:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen((open) => !open)}
              className="p-2 text-white hover:bg-primary-600 rounded-lg transition-colors"
              aria-label="Toggle menu"
              data-testid="button-toggle-menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
          {/* Main nav buttons, responsive */}
          <div className={`flex flex-wrap gap-2 sm:gap-4 items-center justify-center sm:justify-end w-full sm:w-auto overflow-x-auto ${menuOpen ? '' : 'hidden sm:flex'}`}>
            <Button
              onClick={() => window.open(`https://sepolia.etherscan.io/address/${FUNDME_CONTRACT_ADDRESS}`, '_blank')}
              className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              data-testid="button-view-transactions"
            >
              <span>View Transactions</span>
            </Button>
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
