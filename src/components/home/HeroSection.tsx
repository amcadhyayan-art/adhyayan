import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, Sparkles } from 'lucide-react';
import logo from '../../assets/images/logo.png';

const HeroSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-07-09T09:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-[#020617] overflow-hidden">
      {/* Background Image and decoration */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/HEROBG.jpeg" 
          alt="Hero Background" 
          className="w-full h-full object-cover opacity-45 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/50 via-[#020617]/80 to-[#020617] pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-12 md:pt-36 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-white/5 border border-white/10 p-2 rounded-3xl shadow-glass backdrop-blur-md hover:border-sky-500/30 transition-all duration-300 w-64 sm:w-72 md:w-80 aspect-[16/9] overflow-hidden flex items-center justify-center">
              <video 
                autoPlay 
                muted 
                playsInline
                className="w-full h-full object-contain rounded-2xl"
              >
                <source src="/logoanimation.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <Sparkles className="h-4 w-4 text-sky-400" />
            <span className="text-xs font-semibold text-slate-300 font-montserrat uppercase tracking-wider">The Symphony of Scholars</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-outfit font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight mb-6 text-white"
          >
            ADHYAYAN <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">2026</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-xl md:text-2xl text-slate-300 font-montserrat font-medium mb-3">
              Illuminating the Art of Medicine
            </p>
            <p className="text-sky-400 font-montserrat font-semibold text-base md:text-lg tracking-wide uppercase">
              Illuminate Minds, Ignite Innovations
            </p>
          </motion.div>

          {/* Countdown timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-10 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-glass"
          >
            <div className="text-center">
              <span className="block text-2xl md:text-4xl font-extrabold font-outfit text-sky-400">{timeLeft.days}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Days</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl md:text-4xl font-extrabold font-outfit text-sky-400">{timeLeft.hours}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Hours</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl md:text-4xl font-extrabold font-outfit text-sky-400">{timeLeft.minutes}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Mins</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl md:text-4xl font-extrabold font-outfit text-sky-400">{timeLeft.seconds}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Secs</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-2.5 mb-10 text-slate-300 font-medium"
          >
            <CalendarDays className="h-5 w-5 text-sky-400" />
            <span className="font-montserrat text-sm md:text-base">July 9-16, 2026 | Andhra Medical College, Visakhapatnam</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/workshops" className="btn-primary px-8 py-3.5">
              Register Now
            </Link>
            <Link to="/schedule" className="btn-secondary px-8 py-3.5">
              View Schedule
            </Link>
            <a 
              href="/AMC ADHYAYAN'26 Brochure.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              download
              className="btn-secondary px-8 py-3.5"
            >
              Download Brochure
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
