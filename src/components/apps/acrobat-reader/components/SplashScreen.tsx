import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AcrobatReaderLogo } from '@/assets';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="acrobat-splash-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img src={AcrobatReaderLogo} alt="Adobe Acrobat Reader" className="acrobat-splash-logo" />
    </motion.div>
  );
};
