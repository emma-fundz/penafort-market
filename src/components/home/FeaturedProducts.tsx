
import React, { useState } from 'react';
import { ArrowRight, ShoppingCart, Star } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

// Sample product data
const products = [
  {
    id: 1,
    name: 'Fresh Organic Vegetables',
    price: '₦3,500',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    category: 'Produce',
    rating: 4.8,
    discount: 10
  },
  {
    id: 2,
    name: 'Premium Kitchen Essentials',
    price: '₦12,999',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    category: 'Home Goods',
    rating: 4.5
  },
  {
    id: 3,
    name: 'Imported Dairy Products',
    price: '₦4,750',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    category: 'Dairy',
    rating: 4.7,
    discount: 15
  },
  {
    id: 4,
    name: 'Artisanal Bread Collection',
    price: '₦2,800',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    category: 'Bakery',
    rating: 4.9,
    discount: 5
  }
];

// Sample categories with more detailed information
const categories = [
  {
    id: 1,
    name: 'Fresh Produce',
    icon: '🥕',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    description: 'Fresh fruits and vegetables sourced from local farmers',
    items: ['Tomatoes', 'Peppers', 'Oranges', 'Apples', 'Greens']
  },
  {
    id: 2,
    name: 'Dairy & Eggs',
    icon: '🥚',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    description: 'Premium dairy products and farm-fresh eggs',
    items: ['Milk', 'Cheese', 'Yogurt', 'Eggs', 'Butter']
  },
  {
    id: 3,
    name: 'Bakery',
    icon: '🍞',
    image: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    description: 'Freshly baked bread, pastries, and cakes',
    items: ['Bread', 'Cakes', 'Pastries', 'Cookies', 'Doughnuts']
  },
  {
    id: 4,
    name: 'Cooking Oils',
    icon: '🧴',
    image: 'https://images.unsplash.com/photo-1583946099390-4cb6027fe18e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    description: 'Variety of cooking oils for all your culinary needs',
    items: ['Palm Oil', 'Groundnut Oil', 'Olive Oil', 'Vegetable Oil', 'Coconut Oil']
  },
  {
    id: 5,
    name: 'Beverages',
    icon: '🥤',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    description: 'Refreshing drinks and beverages',
    items: ['Soft Drinks', 'Juices', 'Water', 'Energy Drinks', 'Tea & Coffee']
  },
  {
    id: 6,
    name: 'Local Market Items',
    icon: '🍲',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    description: 'Traditional local food items and ingredients',
    items: ['Yam', 'Plantain', 'Garri', 'Beans', 'Local Spices']
  }
];

// Special offers data
const specialOffers = [
  {
    id: 1,
    title: "Weekend Sale - 25% OFF",
    description: "Get 25% off on all fresh produce this weekend!",
    expiryDate: "2023-06-30T23:59:59",
    backgroundColor: "bg-gradient-to-r from-orange-500 to-amber-500"
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free",
    description: "On all bakery items - limited time offer!",
    expiryDate: "2023-07-15T23:59:59",
    backgroundColor: "bg-gradient-to-r from-cyan-500 to-blue-500"
  },
  {
    id: 3,
    title: "New Customers - 10% Discount",
    description: "Use code WELCOME10 at checkout",
    expiryDate: "2023-08-01T23:59:59",
    backgroundColor: "bg-gradient-to-r from-pink-500 to-purple-500"
  },
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Aisha Mohammed",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    text: "Penafort Supermarket has the freshest produce in Lagos. Their delivery is always on time and the staff is very friendly!",
    rating: 5
  },
  {
    id: 2,
    name: "Emeka Okafor",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I've been shopping here for 3 years now. The quality is consistent and prices are very reasonable compared to other stores.",
    rating: 4
  },
  {
    id: 3,
    name: "Funmi Adeyemi",
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
    text: "Their bakery section is amazing! I always get compliments when I bring their bread and cakes to family gatherings.",
    rating: 5
  }
];

// Component for the star rating
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={16} 
          className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mr-0.5`} 
        />
      ))}
      <span className="ml-1 text-sm text-penafort-text-secondary">{rating.toFixed(1)}</span>
    </div>
  );
};

const FeaturedProducts = () => {
  const [selectedTimerIndex, setSelectedTimerIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 35,
    seconds: 20
  });

  // In a real app, you would implement a real countdown timer here

  return (
    <section id="products" className="py-20 px-6 md:px-12 bg-penafort-gray-50">
      <div className="container mx-auto">
        {/* Categories */}
        <div id="categories" className="mb-20 scroll-mt-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-3">
                Shop by Category
              </h2>
              <p className="text-penafort-text-secondary max-w-lg">
                Explore our wide range of products organized by category for your convenience.
              </p>
            </div>
            <a href="/products" className="mt-4 md:mt-0 flex items-center text-penafort-green font-medium hover:underline">
              Browse All Categories
              <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <div key={category.id} className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-penafort-green/15 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10"></div>
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                  <h3 className="font-medium text-lg">{category.name}</h3>
                  <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-2 transition-all duration-300">
                    <p className="text-sm text-white/80 mb-2">{category.description}</p>
                    <a href="/products" className="inline-flex items-center text-xs font-medium text-white bg-penafort-green/80 py-1 px-2 rounded">
                      Shop Now <ArrowRight size={12} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Special Offers */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-3">
                Special Offers
              </h2>
              <p className="text-penafort-text-secondary max-w-lg">
                Don't miss out on these limited-time deals and promotions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialOffers.map((offer, index) => (
              <div 
                key={offer.id} 
                className={`${offer.backgroundColor} rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-penafort-green/15 transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <h3 className="text-xl font-bold mb-2 relative z-10">{offer.title}</h3>
                <p className="text-white/80 mb-4 relative z-10">{offer.description}</p>
                
                <div className="bg-white/20 p-3 rounded-lg inline-block mb-4">
                  <div className="flex space-x-2 text-sm">
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-lg">{timeLeft.days}</span>
                      <span className="text-xs">Days</span>
                    </div>
                    <span className="text-lg font-bold">:</span>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-lg">{timeLeft.hours}</span>
                      <span className="text-xs">Hours</span>
                    </div>
                    <span className="text-lg font-bold">:</span>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-lg">{timeLeft.minutes}</span>
                      <span className="text-xs">Mins</span>
                    </div>
                    <span className="text-lg font-bold">:</span>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-lg">{timeLeft.seconds}</span>
                      <span className="text-xs">Secs</span>
                    </div>
                  </div>
                </div>
                
                <a href="/products" className="inline-block bg-white text-penafort-text-primary px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-opacity">
                  Shop Now
                </a>
              </div>
            ))}
          </div>
        </div>
        
        {/* Featured Products */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-3">
                Featured Products
              </h2>
              <p className="text-penafort-text-secondary max-w-lg">
                Discover our handpicked selection of premium quality products.
              </p>
            </div>
            <a href="/products" className="mt-4 md:mt-0 flex items-center text-penafort-green font-medium hover:underline">
              View All Products
              <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="product-card group">
                <div className="relative mb-4 overflow-hidden rounded-xl aspect-square">
                  <span className="absolute top-2 left-2 z-10 px-2 py-1 bg-penafort-green text-white text-xs font-medium rounded-full">
                    {product.category}
                  </span>
                  {product.discount && (
                    <span className="absolute top-2 right-2 z-10 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                      {product.discount}% OFF
                    </span>
                  )}
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="btn-primary">
                      <ShoppingCart size={16} className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
                <h3 className="font-medium text-lg text-penafort-text-primary">{product.name}</h3>
                <RatingStars rating={product.rating} />
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-penafort-green">{product.price}</span>
                  <button className="p-2 bg-penafort-green/10 text-penafort-green rounded-full transition-all duration-300 hover:bg-penafort-green hover:text-white">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-3">
                Customer Testimonials
              </h2>
              <p className="text-penafort-text-secondary max-w-lg">
                Hear what our satisfied customers have to say about their shopping experience.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-penafort-text-primary">{testimonial.name}</h4>
                    <RatingStars rating={testimonial.rating} />
                  </div>
                </div>
                <p className="text-penafort-text-secondary italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Why Choose Us */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-3">
                Why Choose Penafort?
              </h2>
              <p className="text-penafort-text-secondary max-w-lg">
                We pride ourselves on providing the best shopping experience for our customers.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <div className="bg-penafort-green/10 p-4 rounded-full inline-block mb-4">
                <ShoppingBag size={24} className="text-penafort-green" />
              </div>
              <h3 className="text-xl font-bold text-penafort-text-primary mb-2">Fresh & Quality Products</h3>
              <p className="text-penafort-text-secondary">We source the freshest products from trusted suppliers to ensure quality.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <div className="bg-penafort-green/10 p-4 rounded-full inline-block mb-4">
                <Star size={24} className="text-penafort-green" />
              </div>
              <h3 className="text-xl font-bold text-penafort-text-primary mb-2">Affordable Prices</h3>
              <p className="text-penafort-text-secondary">Enjoy competitive pricing on all our products and regular promotions.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <div className="bg-penafort-green/10 p-4 rounded-full inline-block mb-4">
                <Truck size={24} className="text-penafort-green" />
              </div>
              <h3 className="text-xl font-bold text-penafort-text-primary mb-2">Fast & Reliable Delivery</h3>
              <p className="text-penafort-text-secondary">Get your groceries delivered to your doorstep in no time.</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <div className="bg-penafort-green/10 p-4 rounded-full inline-block mb-4">
                <Shield size={24} className="text-penafort-green" />
              </div>
              <h3 className="text-xl font-bold text-penafort-text-primary mb-2">Customer Satisfaction</h3>
              <p className="text-penafort-text-secondary">Your satisfaction is our priority, with excellent service guaranteed.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
