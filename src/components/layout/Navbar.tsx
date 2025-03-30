import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, UserCircle, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import { useUser } from '../../contexts/UserContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <motion.div 
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white w-full max-w-md h-full overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-penafort-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="py-8 text-center">
              <ShoppingCart size={48} className="mx-auto mb-4 text-penafort-gray-300" />
              <p className="text-penafort-text-secondary">Your cart is empty</p>
              <Button 
                onClick={onClose} 
                className="mt-4"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4 border-b border-penafort-gray-100 pb-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-penafort-text-secondary">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center">
                      <button 
                        className="w-8 h-8 rounded-l-md border border-penafort-gray-200 flex items-center justify-center hover:bg-penafort-gray-100"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center border-t border-b border-penafort-gray-200">
                        {item.quantity}
                      </span>
                      <button 
                        className="w-8 h-8 rounded-r-md border border-penafort-gray-200 flex items-center justify-center hover:bg-penafort-gray-100"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <button 
                      className="p-2 text-penafort-text-secondary hover:text-red-500 transition-colors"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-penafort-gray-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link 
                  to="/checkout" 
                  className="btn-primary w-full flex justify-center"
                  onClick={onClose}
                >
                  Checkout
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useUser();

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

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren",
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren",
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
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

        <div className="hidden md:flex items-center space-x-3">
          <button 
            className="p-2 rounded-full hover:bg-penafort-gray-100 transition-colors duration-300 relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={24} className="text-penafort-text-primary" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-penafort-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <UserCircle className="h-6 w-6 text-penafort-text-primary" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="w-full flex">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/orders" className="w-full flex">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="w-full flex">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="btn-primary">
              Sign In
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-2 md:hidden z-10">
          <button 
            className="p-2 rounded-full hover:bg-penafort-gray-100 transition-colors duration-300 relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={22} className="text-penafort-text-primary" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-penafort-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
          
          <button
            className="p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-penafort-text-primary" />
            ) : (
              <Menu size={24} className="text-penafort-text-primary" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="fixed inset-0 bg-white flex flex-col justify-center items-center space-y-8 z-40 md:hidden pt-20"
            >
              <motion.div variants={itemVariants}>
                <Link
                  to="/"
                  className={`nav-link text-xl ${isActive('/') ? 'text-penafort-green' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/products"
                  className={`nav-link text-xl ${isActive('/products') ? 'text-penafort-green' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/about"
                  className={`nav-link text-xl ${isActive('/about') ? 'text-penafort-green' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  to="/contact"
                  className={`nav-link text-xl ${isActive('/contact') ? 'text-penafort-green' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-8">
                {isAuthenticated ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-center mb-2">
                      <p className="text-xl font-medium">{user?.name}</p>
                      <p className="text-penafort-text-secondary text-sm">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="btn-secondary w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 font-medium flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <Link
                      to="/login"
                      className="btn-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="btn-secondary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {isCartOpen && <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
