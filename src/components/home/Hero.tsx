
import React from 'react';
import { ArrowRight, ShoppingBag, Shield, Truck } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/70 pointer-events-none"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0icmdiYSg3NiwgMTc1LCA4MCwgMC4wNSkiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-xl">
            <span className="inline-block px-4 py-2 bg-penafort-green/10 text-penafort-green rounded-full font-medium animate-fade-in">
              Fresh Groceries Delivered
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-penafort-text-primary hero-text-shadow animate-fade-in animate-delay-100">
              Fresh <span className="text-penafort-green">Quality</span> Groceries at Your Doorstep
            </h1>
            <p className="text-lg text-penafort-text-secondary animate-fade-in animate-delay-200">
              Discover the finest selection of fresh produce, household essentials, and premium products at competitive prices. Serving Iba, Ojo, Lagos, with convenience and quality.
            </p>
            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in animate-delay-300">
              <a href="#shop" className="btn-primary flex items-center gap-2">
                Shop Now <ArrowRight size={18} />
              </a>
              <a href="#about" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          
          <div className="relative animate-fade-in-right animate-delay-400">
            <div className="aspect-square max-w-lg w-full mx-auto bg-white rounded-full overflow-hidden p-6 shadow-xl shadow-penafort-green/10 animate-pulse-gentle">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-penafort-green-light/30 via-penafort-green/20 to-penafort-green-dark/30">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                  alt="Fresh vegetables" 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                />
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 md:right-12 animate-float">
              <div className="glass-card rounded-2xl p-4 shadow-lg">
                <div className="bg-penafort-green text-white p-2 rounded-lg inline-block mb-2">
                  <ShoppingBag size={20} />
                </div>
                <p className="text-penafort-text-primary font-medium">Premium Quality</p>
              </div>
            </div>
            
            <div className="absolute top-10 -left-6 md:left-10 animate-float" style={{ animationDelay: "1s" }}>
              <div className="glass-card rounded-2xl p-4 shadow-lg">
                <div className="bg-penafort-green text-white p-2 rounded-lg inline-block mb-2">
                  <Truck size={20} />
                </div>
                <p className="text-penafort-text-primary font-medium">Fast Delivery</p>
              </div>
            </div>
            
            <div className="absolute -top-6 right-20 animate-float" style={{ animationDelay: "2s" }}>
              <div className="glass-card rounded-2xl p-4 shadow-lg">
                <div className="bg-penafort-green text-white p-2 rounded-lg inline-block mb-2">
                  <Shield size={20} />
                </div>
                <p className="text-penafort-text-primary font-medium">100% Secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
