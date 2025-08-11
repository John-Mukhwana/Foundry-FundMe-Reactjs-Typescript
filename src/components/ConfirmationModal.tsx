import { AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ConfirmationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  title?: string;
  description?: string;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen = false,
  onClose = () => {},
  onConfirm = () => {},
  title = "Confirm Action",
  description = "Are you sure you want to proceed with this action?",
  isLoading = false,
}: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-md w-full mx-4"
          >
            <Card className="bg-white dark:bg-neutral-800 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-white" />
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
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1"
                    data-testid="button-cancel-modal"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={onConfirm}
                    disabled={isLoading}
                    className="flex-1"
                    data-testid="button-confirm-modal"
                  >
                    {isLoading ? 'Processing...' : 'Confirm'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
