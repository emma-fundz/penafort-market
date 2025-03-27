
import React from 'react';
import { ArrowRight } from 'lucide-react';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Fresh Organic Vegetables',
    price: '₦3,500',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    category: 'Produce'
  },
  {
    id: 2,
    name: 'Premium Kitchen Essentials',
    price: '₦12,999',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    category: 'Home Goods'
  },
  {
    id: 3,
    name: 'Imported Dairy Products',
    price: '₦4,750',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    category: 'Dairy'
  },
  {
    id: 4,
    name: 'Artisanal Bread Collection',
    price: '₦2,800',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
    category: 'Bakery'
  }
];

// Sample categories
const categories = [
  {
    id: 1,
    name: 'Fresh Produce',
    icon: '🥕',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Dairy & Eggs',
    icon: '🥚',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Bakery',
    icon: '🍞',
    image: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Household',
    icon: '🧹',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Beverages',
    icon: '🥤',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    name: 'Snacks',
    icon: '🍫',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
  }
];

const FeaturedProducts = () => {
  return (
    <section id="products" className="py-20 px-6 md:px-12 bg-penafort-gray-50">
      <div className="container mx-auto">
        {/* Categories */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-3">
                Shop by Category
              </h2>
              <p className="text-penafort-text-secondary max-w-lg">
                Explore our wide range of products organized by category for your convenience.
              </p>
            </div>
            <a href="#browse-all" className="mt-4 md:mt-0 flex items-center text-penafort-green font-medium hover:underline">
              Browse All Categories
              <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <div key={category.id} className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 z-10"></div>
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                  <h3 className="font-medium text-lg">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Featured Products */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-3">
                Featured Products
              </h2>
              <p className="text-penafort-text-secondary max-w-lg">
                Discover our handpicked selection of premium quality products.
              </p>
            </div>
            <a href="#view-all" className="mt-4 md:mt-0 flex items-center text-penafort-green font-medium hover:underline">
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
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium text-lg text-penafort-text-primary">{product.name}</h3>
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
      </div>
    </section>
  );
};

export default FeaturedProducts;
