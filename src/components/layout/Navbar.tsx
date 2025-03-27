
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-4 bg-white/95 backdrop-blur-md shadow-md'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2 z-10">
          <img
            src="/lovable-uploads/544cdfd4-727e-4912-8839-1159f7740524.png"
            alt="Penafort Supermarket"
            className="h-12 w-auto"
          />
          <span className="font-display font-bold text-xl md:text-2xl text-penafort-text-primary">
            Penafort
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="nav-link">
            Home
          </a>
          <a href="#products" className="nav-link">
            Products
          </a>
          <a href="#about" className="nav-link">
            About Us
          </a>
          <a href="#location" className="nav-link">
            Location
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-penafort-gray-100 transition-colors duration-300">
            <ShoppingCart size={24} className="text-penafort-text-primary" />
          </button>
          <a href="#shop" className="btn-primary">
            Shop Now
          </a>
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
          <a
            href="#home"
            className="nav-link text-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </a>
          <a
            href="#products"
            className="nav-link text-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </a>
          <a
            href="#about"
            className="nav-link text-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About Us
          </a>
          <a
            href="#location"
            className="nav-link text-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Location
          </a>
          <a
            href="#contact"
            className="nav-link text-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>
          <div className="flex flex-col mt-8 space-y-4">
            <a
              href="#shop"
              className="btn-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop Now
            </a>
            <button
              className="flex items-center justify-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
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
