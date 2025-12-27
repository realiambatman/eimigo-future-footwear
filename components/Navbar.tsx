import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PageView } from '../types';

interface NavbarProps {
  onNavigate: (page: PageView) => void;
  currentPage: PageView;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const { items, toggleCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks: { label: string; value: PageView }[] = [
    { label: 'HOME', value: 'home' },
    { label: 'SHOP', value: 'shop' },
    { label: 'BLOG', value: 'blog' },
    { label: 'ABOUT', value: 'about' },
    { label: 'TRACK ORDER', value: 'track' },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-brand-surfaceHighlight shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center z-50 cursor-pointer gap-2" 
            onClick={() => handleNavClick('home')}
          >
            <img src="images/eimigologo.png" alt="Eimigo Logo" className="h-8 w-auto" />
            <span className="text-2xl font-bold tracking-tighter text-brand-text font-logo">
              EIMIGO<span className="text-brand-accent text-3xl">.</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((item) => (
              <button 
                key={item.value} 
                onClick={() => handleNavClick(item.value)}
                className={`text-sm font-bold transition-colors tracking-wide ${
                  currentPage === item.value 
                    ? 'text-brand-text border-b-2 border-brand-accent' 
                    : 'text-brand-textMuted hover:text-brand-text'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-6 z-50">            
            <button 
              onClick={() => handleNavClick('auth')}
              className="hidden md:flex bg-brand-text text-white px-5 py-2 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-brand-accent hover:text-black transition-all"
            >
              Login
            </button>

            <button className="text-brand-textMuted hover:text-brand-text hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={toggleCart} className="relative text-brand-textMuted hover:text-brand-text group">
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-accent text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {itemCount}
                </span>
              )}
            </button>
            <button 
              className="lg:hidden text-brand-text"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Solid Background */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 lg:hidden pt-28 px-8 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-8 text-2xl font-bold tracking-tight">
          {navLinks.map((item) => (
            <button 
              key={item.value} 
              onClick={() => handleNavClick(item.value)}
              className={`text-left transition-colors ${
                currentPage === item.value ? 'text-brand-text pl-4 border-l-4 border-brand-accent' : 'text-brand-textMuted'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="h-px bg-brand-surfaceHighlight w-full my-4"></div>
          <button 
            onClick={() => handleNavClick('auth')}
            className="text-left text-brand-text hover:text-brand-accent transition-colors flex items-center gap-2 text-lg"
          >
            Login / Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};