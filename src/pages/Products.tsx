
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { ShoppingBag, Filter, ArrowUpDown } from 'lucide-react';

const Products = () => {
  // Mock product data - in a real app this would come from an API
  const products = [
    {
      id: 1,
      name: 'Fresh Organic Tomatoes',
      category: 'Vegetables',
      price: 2.99,
      image: 'https://images.unsplash.com/photo-1546750670-725a588310bc?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Whole Grain Bread',
      category: 'Bakery',
      price: 3.49,
      image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Farm Fresh Eggs',
      category: 'Dairy & Eggs',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 4, 
      name: 'Premium Olive Oil',
      category: 'Pantry',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1619021897626-dd7cdb333ba3?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 5,
      name: 'Organic Bananas',
      category: 'Fruits',
      price: 1.99,
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 6,
      name: 'Fresh Orange Juice',
      category: 'Beverages',
      price: 4.49,
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1000&auto=format&fit=crop'
    },
  ];

  const categories = ['All', 'Fruits', 'Vegetables', 'Bakery', 'Dairy & Eggs', 'Pantry', 'Beverages'];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="bg-penafort-green/10 py-12">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-penafort-text-primary mb-4">
                Our Products
              </h1>
              <p className="text-penafort-text-secondary text-lg">
                Discover our wide range of fresh, quality products at competitive prices
              </p>
            </div>
          </div>
        </div>

        {/* Product Listing */}
        <div className="container mx-auto px-6 md:px-12 py-12">
          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-full text-sm border border-penafort-gray-200 hover:border-penafort-green hover:bg-penafort-green/5 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-penafort-gray-200 hover:border-penafort-green hover:bg-penafort-green/5 transition-colors">
                <Filter size={16} />
                <span>Filter</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-penafort-gray-200 hover:border-penafort-green hover:bg-penafort-green/5 transition-colors">
                <ArrowUpDown size={16} />
                <span>Sort</span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="product-card group">
                <div className="mb-4 aspect-square rounded-lg overflow-hidden bg-penafort-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-penafort-text-primary mb-1">{product.name}</h3>
                    <p className="text-penafort-text-secondary text-sm">{product.category}</p>
                  </div>
                  <p className="font-bold text-penafort-green">${product.price.toFixed(2)}</p>
                </div>
                <button className="w-full flex items-center justify-center gap-2 btn-primary mt-3">
                  <ShoppingBag size={18} />
                  <span>Add to Cart</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
