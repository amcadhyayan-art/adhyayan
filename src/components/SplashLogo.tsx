import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashLogoProps {
  onComplete: () => void;
}

const SplashLogo: React.FC<SplashLogoProps> = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);

  const dismiss = () => {
    setExiting(true);
    setTimeout(onComplete, 800); // Allow fade-out animation to complete
  };

  useEffect(() => {
    // Auto-dismiss after 2.5 seconds
    const timer = setTimeout(dismiss, 2500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Full Screen Green ECG Pulse Line */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-48 pointer-events-none">
              <svg 
                className="w-full h-full text-emerald-500" 
                viewBox="0 0 1000 200" 
                preserveAspectRatio="none" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M 0 100 L 350 100 L 370 70 L 390 100 L 410 100 L 420 130 L 440 10 L 460 190 L 470 100 L 490 100 L 520 40 L 550 100 L 580 100 L 590 115 L 610 20 L 630 170 L 640 100 L 670 100 L 700 60 L 730 100 L 1000 100"
                  stroke="#10b981" // Green line
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0.8 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ 
                    duration: 3.5, 
                    ease: "easeInOut" 
                  }}
                />
              </svg>
            </div>

            {/* Logo in the center */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="p-4 rounded-3xl"
              >
                <img
                  src="/logo.jpeg"
                  alt="ADHYAYAN Logo"
                  className="h-20 w-20 md:h-28 md:w-28 object-contain drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                />
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="font-outfit font-extrabold text-xl md:text-2xl tracking-widest text-white/90 text-center uppercase"
              >
                ADHYAYAN 2026
              </motion.h2>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLogo;
