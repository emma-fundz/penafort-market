
import React from 'react';
import { ShoppingBag, Star, Truck, Shield } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-2 md:mb-3">
            Why Choose Penafort?
          </h2>
          <p className="text-sm sm:text-base text-penafort-text-secondary max-w-lg">
            We pride ourselves on providing the best shopping experience for our customers.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
          <div className="bg-penafort-green/10 p-3 sm:p-4 rounded-full inline-block mb-3 sm:mb-4">
            <ShoppingBag size={20} className="text-penafort-green sm:size-24" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-penafort-text-primary mb-1 sm:mb-2">Fresh & Quality Products</h3>
          <p className="text-xs sm:text-sm text-penafort-text-secondary">We source the freshest products from trusted suppliers to ensure quality.</p>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
          <div className="bg-penafort-green/10 p-3 sm:p-4 rounded-full inline-block mb-3 sm:mb-4">
            <Star size={20} className="text-penafort-green sm:size-24" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-penafort-text-primary mb-1 sm:mb-2">Affordable Prices</h3>
          <p className="text-xs sm:text-sm text-penafort-text-secondary">Enjoy competitive pricing on all our products and regular promotions.</p>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
          <div className="bg-penafort-green/10 p-3 sm:p-4 rounded-full inline-block mb-3 sm:mb-4">
            <Truck size={20} className="text-penafort-green sm:size-24" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-penafort-text-primary mb-1 sm:mb-2">Fast & Reliable Delivery</h3>
          <p className="text-xs sm:text-sm text-penafort-text-secondary">Get your groceries delivered to your doorstep in no time.</p>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
          <div className="bg-penafort-green/10 p-3 sm:p-4 rounded-full inline-block mb-3 sm:mb-4">
            <Shield size={20} className="text-penafort-green sm:size-24" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-penafort-text-primary mb-1 sm:mb-2">Customer Satisfaction</h3>
          <p className="text-xs sm:text-sm text-penafort-text-secondary">Your satisfaction is our priority, with excellent service guaranteed.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
