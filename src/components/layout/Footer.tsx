
import React from 'react';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img
                src="/lovable-uploads/544cdfd4-727e-4912-8839-1159f7740524.png"
                alt="Penafort Supermarket"
                className="h-10 w-auto"
              />
              <span className="font-display font-bold text-xl text-penafort-text-primary">
                Penafort
              </span>
            </div>
            <p className="text-penafort-text-secondary mb-6">
              Your trusted neighborhood supermarket offering fresh groceries, quality household items, and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#facebook" className="w-10 h-10 bg-penafort-gray-100 rounded-full flex items-center justify-center transition-colors hover:bg-penafort-green hover:text-white">
                <Facebook size={18} />
              </a>
              <a href="#twitter" className="w-10 h-10 bg-penafort-gray-100 rounded-full flex items-center justify-center transition-colors hover:bg-penafort-green hover:text-white">
                <Twitter size={18} />
              </a>
              <a href="#instagram" className="w-10 h-10 bg-penafort-gray-100 rounded-full flex items-center justify-center transition-colors hover:bg-penafort-green hover:text-white">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-penafort-text-primary">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#home" className="text-penafort-text-secondary hover:text-penafort-green transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="text-penafort-text-secondary hover:text-penafort-green transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="text-penafort-text-secondary hover:text-penafort-green transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  About Us
                </a>
              </li>
              <li>
                <a href="#location" className="text-penafort-text-secondary hover:text-penafort-green transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Location
                </a>
              </li>
              <li>
                <a href="#contact" className="text-penafort-text-secondary hover:text-penafort-green transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-penafort-text-primary">Categories</h3>
            <ul className="space-y-4">
              <li>
                <a href="#fresh-produce" className="text-penafort-text-secondary hover:text-penafort-green transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Fresh Produce
                </a>
              </li>
              <li>
                <a href="#dairy-eggs" className="text-penafort-text-secondary hover:text-penafort-green transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Dairy & Eggs
                </a>
              </li>
              <li>
                <a href="#bakery" className="text-penafort-text-secondary hover:text-penafort-green transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Bakery
                </a>
              </li>
              <li>
                <a href="#household" className="text-penafort-text-secondary hover:text-penafort-green transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Household
                </a>
              </li>
              <li>
                <a href="#beverages" className="text-penafort-text-secondary hover:text-penafort-green transition-colors flex items-center">
                  <ArrowRight size={14} className="mr-2" />
                  Beverages
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-penafort-text-primary">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin size={18} className="text-penafort-green mr-3 shrink-0 mt-1" />
                <span className="text-penafort-text-secondary">
                  Penafort Supermarket, Iba, Ojo, Lagos State, Nigeria
                </span>
              </li>
              <li className="flex">
                <Phone size={18} className="text-penafort-green mr-3 shrink-0" />
                <span className="text-penafort-text-secondary">
                  +234 123 456 7890
                </span>
              </li>
              <li className="flex">
                <Mail size={18} className="text-penafort-green mr-3 shrink-0" />
                <span className="text-penafort-text-secondary">
                  info@penafortsupermarket.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-penafort-gray-200 mt-12 pt-8 text-center text-penafort-text-secondary">
          <p>&copy; {new Date().getFullYear()} Penafort Supermarket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
