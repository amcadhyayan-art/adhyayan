import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/images/logo.png';

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Competitions', path: '/competitions' },
    { name: 'Accommodation', path: '/accommodation' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHome = pathname === '/';
  const showDarkBg = isScrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showDarkBg 
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-75 z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-3 font-montserrat font-bold text-xl text-white group"
        >
          <span className="flex items-center">
            <img 
              src={logo}
              alt="AMC Logo" 
              className="h-12 w-12"
            />
          </span>
          <span className="tracking-tight text-white group-hover:text-sky-400 transition-colors">
            ADHYAYAN 2026
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `font-montserrat text-sm font-medium transition-colors duration-300 border-b-2 pb-1 ${
                  isActive 
                    ? 'text-sky-400 font-semibold border-sky-400' 
                    : 'text-slate-300 hover:text-sky-400 border-transparent'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none text-white"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-lg border-b border-slate-800 shadow-lg md:hidden"
            >
              <nav className="flex flex-col py-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-6 py-3 font-montserrat text-slate-300 hover:bg-slate-900 hover:text-sky-400 transition-colors ${
                        isActive ? 'text-sky-400 font-semibold border-l-2 border-sky-400 bg-slate-900/50' : ''
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;