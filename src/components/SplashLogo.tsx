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
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Logo on top */}
            <div className="relative z-10 flex flex-col items-center gap-4 mt-[-10vh] mb-8">
              <motion.div
                className="p-4 rounded-3xl"
              >
                <img
                  src="/logo.jpeg"
                  alt="ADHYAYAN Logo"
                  className="h-48 w-48 md:h-72 md:w-72 object-contain"
                />
              </motion.div>
            </div>

            {/* White ECG Pulse Line below logo */}
            <div className="relative w-full h-48 pointer-events-none">
              <svg
                className="w-full h-full text-blue-500"
                viewBox="0 0 1000 200"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M 0 100 L 350 100 L 370 70 L 390 100 L 410 100 L 420 130 L 440 10 L 460 190 L 470 100 L 490 100 L 520 40 L 550 100 L 580 100 L 590 115 L 610 20 L 630 170 L 640 100 L 670 100 L 700 60 L 730 100 L 1000 100"
                  stroke="currentColor"
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLogo;
