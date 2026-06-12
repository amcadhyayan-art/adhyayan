import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/images/logo.png';

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
          <div className="flex flex-col items-center justify-center gap-8 px-4">
            {/* Rotating glowing ring container */}
            <div className="relative w-32 h-32 md:w-44 md:h-44 flex items-center justify-center">
              {/* Glowing Outer Ring */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-t-sky-500 border-r-indigo-500 border-b-transparent border-l-transparent animate-spin" 
                style={{ animationDuration: '1.2s' }} 
              />
              <div 
                className="absolute inset-2 md:inset-3 rounded-full border border-dashed border-sky-500/20 animate-spin" 
                style={{ animationDuration: '4s', animationDirection: 'reverse' }} 
              />
              
              {/* Logo Card with Pulse */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-3xl md:rounded-[2rem] shadow-glass backdrop-blur-md"
              >
                <img
                  src={logo}
                  alt="AMC Logo"
                  className="h-16 w-16 md:h-22 md:w-22 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                />
              </motion.div>
            </div>

            {/* Shimmer/Pulse Text */}
            <div className="flex flex-col items-center gap-2 mt-2">
              <h2 className="font-outfit font-extrabold text-2xl md:text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-indigo-400 animate-pulse text-center">
                ADHYAYAN 2026
              </h2>
              <p className="text-slate-500 text-xs md:text-sm font-montserrat tracking-widest uppercase mt-1">
                Loading...
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashLogo;
