import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin, LightbulbIcon } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Competitions', path: '/competitions' },
    { name: 'Registration', path: '/registration' },
    { name: 'Accommodation', path: '/accommodation' },
    { name: 'Contact', path: '/contact' },
  ];
//added
  return (
    <footer className="bg-gradient-to-b from-white to-slate-50 text-slate-800 border-t border-slate-100">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and About */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 font-montserrat font-bold text-xl group">
              <LightbulbIcon className="h-6 w-6 text-sky-600 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-slate-800 group-hover:text-sky-600 transition-colors">ADHYAYAN 2026</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              A Festival of Fire, A Symphony of Scholars. The flagship medical symposium and innovation summit hosted by Andhra Medical College, Visakhapatnam.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/andhra_medical_college?igsh=MXAzYW1pdW8zZGx4MA%3D%3D&utm_source=qr" 
                className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center hover:bg-sky-500/10 hover:text-sky-600 border border-slate-200 hover:border-sky-500/30 transition-all duration-300 shadow-sm" 
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.instagram.com/aadhyayan_.26?igsh=MXN0eDNkNnlsamtidQ==" 
                className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center hover:bg-sky-500/10 hover:text-sky-600 border border-slate-200 hover:border-sky-500/30 transition-all duration-300 shadow-sm" 
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-montserrat font-semibold mb-6 tracking-wide uppercase text-xs">Quick Links</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-slate-500 hover:text-sky-600 transition-colors text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-slate-900 font-montserrat font-semibold mb-6 tracking-wide uppercase text-xs">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <Mail size={18} className="text-sky-600 shrink-0 mt-0.5" />
                <span className="text-slate-600">andhramedicalcollege100@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone size={18} className="text-sky-600 shrink-0 mt-0.5" />
                <span className="text-slate-600">+91 7658943811 </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-sky-600 shrink-0 mt-0.5" />
                <span className="text-slate-500 leading-relaxed">
                  Andhra Medical College, Maharanipeta, Visakhapatnam, Andhra Pradesh - 530002
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-slate-900 font-montserrat font-semibold mb-6 tracking-wide uppercase text-xs">Stay Updated</h4>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">
              Subscribe to our newsletter for the latest updates on ADHYAYAN 2026.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 bg-slate-100 border border-slate-200 text-slate-800 placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 text-sm transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="w-full btn-primary text-sm py-3 text-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs font-medium">
            © {currentYear} ADHYAYAN 2026, Andhra Medical College. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
            <Link to="/terms" className="hover:text-sky-600 transition-colors">Terms & Conditions</Link>
            <Link to="/refund-policy" className="hover:text-sky-600 transition-colors">Refund & Cancellation Policy</Link>
            <Link to="/privacy-policy" className="hover:text-sky-600 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
