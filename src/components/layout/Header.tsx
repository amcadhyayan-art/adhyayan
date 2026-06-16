import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/images/logo.png';
import { API_BASE_URL } from '../../config';

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [eventCategories, setEventCategories] = useState<string[]>(['Active Events', 'Passive Events', 'Competitions', 'Culturals']);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/competitions`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const dynamicCats = Array.from(new Set(data.map((c: any) => c.category || 'General')));
          const combined = new Set(['Active Events', 'Passive Events', 'Competitions', 'Culturals', ...dynamicCats]);
          setEventCategories(Array.from(combined).filter(c => c !== 'General' && c !== 'Scientific' && c !== 'Creative'));
        }
      })
      .catch(err => console.error("Failed to fetch categories:", err));
  }, []);

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
    { name: 'Events', path: '/competitions', isDropdown: true },
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
          className="flex items-center gap-2 sm:gap-3 font-montserrat font-bold text-base sm:text-lg md:text-xl text-white group"
        >
          <span className="flex items-center">
            <img 
              src={logo}
              alt="AMC Logo" 
              className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11"
            />
          </span>
          <span className="tracking-tight text-white group-hover:text-sky-400 transition-colors">
            ADHYAYAN 2026
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-3 lg:space-x-6 relative">
          {navItems.map((item) => (
            item.isDropdown ? (
              <div 
                key={item.name} 
                className="relative group"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center gap-1 font-montserrat text-xs lg:text-sm font-medium transition-colors duration-300 border-b-2 pb-1 ${
                      isActive || pathname === item.path
                        ? 'text-sky-400 font-semibold border-sky-400' 
                        : 'text-slate-300 hover:text-sky-400 border-transparent'
                    }`
                  }
                >
                  {item.name} <ChevronDown className="h-3.5 w-3.5" />
                </NavLink>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden py-2 z-50"
                    >
                      {eventCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setIsDropdownOpen(false);
                            navigate(`/competitions?category=${encodeURIComponent(category)}`);
                          }}
                          className="w-full text-left px-4 py-2 text-sm font-montserrat text-slate-300 hover:text-sky-400 hover:bg-slate-800 transition-colors"
                        >
                          {category}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `font-montserrat text-xs lg:text-sm font-medium transition-colors duration-300 border-b-2 pb-1 ${
                    isActive 
                      ? 'text-sky-400 font-semibold border-sky-400' 
                      : 'text-slate-300 hover:text-sky-400 border-transparent'
                  }`
                }
              >
                {item.name}
              </NavLink>
            )
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
                  item.isDropdown ? (
                    <div key={item.name} className="flex flex-col">
                      <div className="px-6 py-3 font-montserrat text-slate-300 font-semibold flex items-center justify-between border-l-2 border-transparent">
                        <NavLink 
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={({ isActive }) => isActive ? 'text-sky-400' : ''}
                        >
                          {item.name}
                        </NavLink>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                      <div className="pl-10 pr-6 pb-2 space-y-1">
                        {eventCategories.map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setIsMenuOpen(false);
                              navigate(`/competitions?category=${encodeURIComponent(category)}`);
                            }}
                            className="block w-full text-left py-2 text-sm font-montserrat text-slate-400 hover:text-sky-400 transition-colors"
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `px-6 py-3 font-montserrat text-slate-300 hover:bg-slate-900 hover:text-sky-400 transition-colors ${
                          isActive ? 'text-sky-400 font-semibold border-l-2 border-sky-400 bg-slate-900/50' : 'border-l-2 border-transparent'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  )
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