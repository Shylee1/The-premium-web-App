import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'ABOUT', path: '/about' },
    { name: 'USE CASES', path: '/use-cases' },
    { name: 'DOCS', path: '/docs' },
    { name: 'NEWS', path: '/news' },
    { name: 'PRICING', path: '/pricing' },
    { name: 'INVESTORS', path: '/investors' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-[#143D36] px-6 py-4 flex justify-between items-center shadow-[0_0_20px_rgba(20,61,54,0.3)]"
      >
        <Link to="/" className="text-2xl font-black italic tracking-tighter hover:text-[#43a881] transition">
          NEURUS<span className="text-[#43a881]">AGI</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-xs font-mono text-[#A2AFA4]">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className="transition hover:text-[#43a881]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden text-[#43a881] p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 right-6 w-48 z-40 bg-black/95 backdrop-blur-xl border border-[#143D36] rounded-lg shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col text-sm font-mono text-[#A2AFA4]">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className="transition border-b border-[#143D36]/30 px-4 py-3 hover:bg-[#143D36]/50 hover:text-[#43a881]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
