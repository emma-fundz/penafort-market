
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-4 bg-white/95 backdrop-blur-md shadow-md'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 z-10">
          <img
            src="/lovable-uploads/544cdfd4-727e-4912-8839-1159f7740524.png"
            alt="Penafort Supermarket"
            className="h-12 w-auto"
          />
          <span className="font-display font-bold text-xl md:text-2xl text-penafort-text-primary">
            Penafort
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'text-penafort-green after:w-full' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`nav-link ${isActive('/products') ? 'text-penafort-green after:w-full' : ''}`}
          >
            Products
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'text-penafort-green after:w-full' : ''}`}
          >
            About Us
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'text-penafort-green after:w-full' : ''}`}
          >
            Contact
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-penafort-gray-100 transition-colors duration-300">
            <ShoppingCart size={24} className="text-penafort-text-primary" />
          </button>
          <Link to="/products" className="btn-primary">
            Shop Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-10 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-penafort-text-primary" />
          ) : (
            <Menu size={24} className="text-penafort-text-primary" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-white flex flex-col justify-center items-center space-y-8 transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen
              ? 'opacity-100 visible'
              : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <Link
            to="/"
            className={`nav-link text-xl ${isActive('/') ? 'text-penafort-green' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`nav-link text-xl ${isActive('/products') ? 'text-penafort-green' : ''}`}
          >
            Products
          </Link>
          <Link
            to="/about"
            className={`nav-link text-xl ${isActive('/about') ? 'text-penafort-green' : ''}`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={`nav-link text-xl ${isActive('/contact') ? 'text-penafort-green' : ''}`}
          >
            Contact
          </Link>
          <div className="flex flex-col mt-8 space-y-4">
            <Link
              to="/products"
              className="btn-primary"
            >
              Shop Now
            </Link>
            <button
              className="flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
