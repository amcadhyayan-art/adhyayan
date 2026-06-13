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
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-16 pointer-events-none">
              <svg 
                className="w-full h-full text-emerald-500" 
                viewBox="0 0 1000 100" 
                preserveAspectRatio="none" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M 0 50 L 150 50 L 165 40 L 175 60 L 185 50 L 195 25 L 205 75 L 215 50 L 230 50 L 240 42 L 250 58 L 260 50 L 440 50 L 455 35 L 470 65 L 480 50 L 495 10 L 510 90 L 525 50 L 540 50 L 550 40 L 560 60 L 570 50 L 750 50 L 765 42 L 775 58 L 785 50 L 795 20 L 805 80 L 815 50 L 830 50 L 840 45 L 850 55 L 860 50 L 1000 50"
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
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="p-4 rounded-3xl"
              >
                <img
                  src="/logo.jpeg"
                  alt="ADHYAYAN Logo"
                  className="h-20 w-20 md:h-28 md:w-28 object-contain drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                />
              </motion.div>
              
              <h2 className="font-outfit font-extrabold text-xl md:text-2xl tracking-widest text-white/90 animate-pulse text-center uppercase">
                ADHYAYAN 2026
              </h2>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLogo;
