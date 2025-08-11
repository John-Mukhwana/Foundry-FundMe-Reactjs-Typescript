import { useState, useEffect } from 'react';
import { Crown, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFundMeContract } from '@/hooks/useFundMeContract';
import { useAccount } from 'wagmi';
import { toast } from '@/hooks/use-toast';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

function ConfirmationModal({ isOpen, onClose, onConfirm, title, description }: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-neutral-800 dark:text-neutral-100">
            {title}
          </h3>
        </div>
        
        <p className="text-neutral-600 dark:text-neutral-300 mb-6">
          {description}
        </p>
        
        <div className="flex space-x-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="destructive"
            className="flex-1"
          >
            Confirm
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function OwnerPanel() {
  const { address } = useAccount();
  const {
    isOwner,
    withdraw,
    cheaperWithdraw,
    isWithdrawPending,
    isWithdrawSuccess,
    isWithdrawError,
    isCheaperWithdrawPending,
    isCheaperWithdrawSuccess,
    isCheaperWithdrawError,
  } = useFundMeContract();

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showCheaperWithdrawModal, setShowCheaperWithdrawModal] = useState(false);

  // Handle transaction success/error
  useEffect(() => {
    if (isWithdrawSuccess) {
      toast({
        title: "Withdrawal Successful! 💰",
        description: "Funds have been successfully withdrawn from the contract.",
        variant: "default",
      });
      setShowWithdrawModal(false);
    }
  }, [isWithdrawSuccess]);

  useEffect(() => {
    if (isCheaperWithdrawSuccess) {
      toast({
        title: "Cheaper Withdrawal Successful! ⚡",
        description: "Funds have been successfully withdrawn using the cheaper method.",
        variant: "default",
      });
      setShowCheaperWithdrawModal(false);
    }
  }, [isCheaperWithdrawSuccess]);

  useEffect(() => {
    if (isWithdrawError) {
      toast({
        title: "Withdrawal Failed",
        description: "Failed to withdraw funds. You may not have permission or there might be insufficient funds.",
        variant: "destructive",
      });
      setShowWithdrawModal(false);
    }
  }, [isWithdrawError]);

  useEffect(() => {
    if (isCheaperWithdrawError) {
      toast({
        title: "Cheaper Withdrawal Failed",
        description: "Failed to withdraw funds using cheaper method. You may not have permission or there might be insufficient funds.",
        variant: "destructive",
      });
      setShowCheaperWithdrawModal(false);
    }
  }, [isCheaperWithdrawError]);

  const handleWithdraw = () => {
    setShowWithdrawModal(true);
  };

  const handleCheaperWithdraw = () => {
    setShowCheaperWithdrawModal(true);
  };

  const confirmWithdraw = async () => {
    await withdraw();
  };

  const confirmCheaperWithdraw = async () => {
    await cheaperWithdraw();
  };

  // Don't render if user is not connected or not the owner
  if (!address || !isOwner) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-accent-500/10 to-secondary-500/10 border border-accent-200 dark:border-accent-800 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-lg font-heading font-semibold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center space-x-2">
              <Crown className="w-5 h-5 text-accent-500" />
              <span>Owner Functions</span>
            </h3>
            
            <div className="space-y-3">
              <Button
                onClick={handleWithdraw}
                disabled={isWithdrawPending}
                className="w-full bg-accent-500 hover:bg-accent-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                data-testid="button-withdraw"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isWithdrawPending ? 'Withdrawing...' : 'Withdraw Funds'}
                </span>
              </Button>
              
              <Button
                onClick={handleCheaperWithdraw}
                disabled={isCheaperWithdrawPending}
                className="w-full bg-secondary-500 hover:bg-secondary-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                data-testid="button-cheaper-withdraw"
              >
                <Download className="w-4 h-4" />
                <span>
                  {isCheaperWithdrawPending ? 'Withdrawing...' : 'Cheaper Withdraw'}
                </span>
              </Button>
              
              <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                Only the contract owner can withdraw funds
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        onConfirm={confirmWithdraw}
        title="Confirm Withdrawal"
        description="Are you sure you want to withdraw all funds from the contract? This action cannot be undone."
      />
      
      <ConfirmationModal
        isOpen={showCheaperWithdrawModal}
        onClose={() => setShowCheaperWithdrawModal(false)}
        onConfirm={confirmCheaperWithdraw}
        title="Confirm Cheaper Withdrawal"
        description="Are you sure you want to withdraw all funds using the cheaper method? This action cannot be undone."
      />
    </>
  );
}
