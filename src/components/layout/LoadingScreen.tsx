'use client'

import { motion } from 'framer-motion';

interface LoadingScreenProps {
    text?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ text = "Hold on tight, our service is coming to you!" }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--light-bg)] dark:bg-[var(--dark-bg)]">
            <motion.div
                className="w-16 h-16 border-4 border-dashed rounded-full border-[var(--custom-accent)] animate-spin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            />
            <motion.p
                className="ml-4 text-lg font-medium text-[var(--light-text)] dark:text-[var(--dark-text)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {text}
            </motion.p>
        </div>
    );
};

export default LoadingScreen;
