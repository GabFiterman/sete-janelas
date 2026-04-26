import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bootAnimation } from '@/assets';
import useUIStore from '@/store/uiStore';

import './boot-screen.scss';

const BOOT_TIME = 2220;

export default function BootScreen() {
  const { isBooting, setIsBooting } = useUIStore();

  useEffect(() => {
    if (isBooting) {
      const timer = setTimeout(() => {
        setIsBooting(false);
      }, BOOT_TIME);

      return () => clearTimeout(timer);
    }
  }, [isBooting, setIsBooting]);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <div className="boot-content">
            <img src={bootAnimation} alt="Starting Windows" className="boot-gif" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
