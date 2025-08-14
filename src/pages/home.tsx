import { motion } from 'framer-motion';
import Header from '@/components/Header';
import ContractInfo from '@/components/ContractInfo';
import FundingChart from '@/components/FundingChart';
import FundSection from '@/components/FundSection';
import UserFundedAmount from '@/components/UserFundedAmount';
import FundersList from '@/components/FundersList';
import OwnerPanel from '@/components/OwnerPanel';
import StatsOverview from '@/components/StatsOverview';
import ConfirmationModal from '@/components/ConfirmationModal';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Contract Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ContractInfo />
        </motion.div>


        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Funding Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FundSection />
            <UserFundedAmount />
          </motion.div>

          {/* Right Column - Funders and Owner Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FundersList />
            <OwnerPanel />
          </motion.div>
        </div>

        
        {/* Funding Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FundingChart />
        </motion.div>

        {/* Statistics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <StatsOverview />
        </motion.div>
      </main>

      {/* Confirmation Modal */}
      <ConfirmationModal />
    </div>
  );
}
