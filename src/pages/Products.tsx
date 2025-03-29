
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Filter, ArrowUpDown, X } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageTransition from '../components/layout/PageTransition';
import { useToast } from '@/hooks/use-toast';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

// Mock product data - in a real app this would come from an API
const allProducts = [
  {
    id: 1,
    name: 'Fresh Organic Tomatoes',
    category: 'Vegetables',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1546750670-725a588310bc?q=80&w=1000&auto=format&fit=crop',
    description: 'Locally grown organic tomatoes perfect for salads and cooking.'
  },
  {
    id: 2,
    name: 'Whole Grain Bread',
    category: 'Bakery',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=1000&auto=format&fit=crop',
    description: 'Freshly baked whole grain bread made with organic flour.'
  },
  {
    id: 3,
    name: 'Farm Fresh Eggs',
    category: 'Dairy & Eggs',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=1000&auto=format&fit=crop',
    description: 'Free-range eggs from local farms, rich in nutrients.'
  },
  {
    id: 4, 
    name: 'Premium Olive Oil',
    category: 'Pantry',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1619021897626-dd7cdb333ba3?q=80&w=1000&auto=format&fit=crop',
    description: 'Extra virgin olive oil imported from Mediterranean olive groves.'
  },
  {
    id: 5,
    name: 'Organic Bananas',
    category: 'Fruits',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1000&auto=format&fit=crop',
    description: 'Sweet and ripe organic bananas harvested at peak freshness.'
  },
  {
    id: 6,
    name: 'Fresh Orange Juice',
    category: 'Beverages',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1000&auto=format&fit=crop',
    description: 'Freshly squeezed orange juice with no added sugars or preservatives.'
  },
  {
    id: 7,
    name: 'Sourdough Bread',
    category: 'Bakery',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1585478259715-7c86af5e6f65?q=80&w=1000&auto=format&fit=crop',
    description: 'Traditional sourdough bread made with a century-old starter.'
  },
  {
    id: 8,
    name: 'Fresh Strawberries',
    category: 'Fruits',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=1000&auto=format&fit=crop',
    description: 'Sweet and juicy strawberries picked at the perfect ripeness.'
  },
];

type ProductDetailDrawerProps = {
  product: any;
  isOpen: boolean;
  onClose: () => void;
};

const ProductDetailDrawer = ({ product, isOpen, onClose }: ProductDetailDrawerProps) => {
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    });
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-end md:items-center">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="bg-white w-full max-w-2xl rounded-t-2xl md:rounded-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-colors z-10"
          >
            <X size={20} />
          </button>
          
          <div className="h-64 md:h-80 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-penafort-text-primary">{product.name}</h2>
                <p className="text-penafort-text-secondary text-sm">{product.category}</p>
              </div>
              <span className="text-2xl font-bold text-penafort-green">${product.price.toFixed(2)}</span>
            </div>
            
            <p className="text-penafort-text-secondary mb-6">{product.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center">
                <button className="w-10 h-10 rounded-l-lg border border-penafort-gray-200 flex items-center justify-center hover:bg-penafort-gray-100">-</button>
                <span className="w-12 h-10 flex items-center justify-center border-t border-b border-penafort-gray-200">1</span>
                <button className="w-10 h-10 rounded-r-lg border border-penafort-gray-200 flex items-center justify-center hover:bg-penafort-gray-100">+</button>
              </div>
              
              <button 
                className="flex-1 btn-primary flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </button>
            </div>
            
            <div className="border-t border-penafort-gray-200 pt-6">
              <h3 className="font-medium mb-4">You might also like</h3>
              <div className="grid grid-cols-3 gap-4">
                {allProducts.slice(0, 3).map(relatedProduct => (
                  <div key={relatedProduct.id} className="text-center">
                    <div className="aspect-square rounded-lg overflow-hidden mb-2">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs truncate">{relatedProduct.name}</p>
                    <p className="text-xs font-medium text-penafort-green">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState(allProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();

  const categories = ['All', 'Fruits', 'Vegetables', 'Bakery', 'Dairy & Eggs', 'Pantry', 'Beverages'];

  useEffect(() => {
    // If category is in URL, set it as selected
    if (category && categories.includes(category)) {
      setSelectedCategory(category);
    }
  }, [category]);

  useEffect(() => {
    // Filter products when category changes
    if (selectedCategory === 'All') {
      setProducts(allProducts);
    } else {
      setProducts(allProducts.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    // Update URL with category
    if (category === 'All') {
      navigate('/products');
    } else {
      navigate(`/products/category/${category}`);
    }
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleAddToCart = (product: any, event: React.MouseEvent) => {
    event.stopPropagation();
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <motion.div 
            className="bg-penafort-green/10 py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="container mx-auto px-6 md:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-penafort-text-primary mb-4">
                  {selectedCategory === 'All' ? 'Our Products' : selectedCategory}
                </h1>
                <p className="text-penafort-text-secondary text-lg">
                  Discover our wide range of fresh, quality products at competitive prices
                </p>
              </div>
            </div>
          </motion.div>

          {/* Product Listing */}
          <div className="container mx-auto px-6 md:px-12 py-12">
            {/* Filters and Sort */}
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                      selectedCategory === category 
                        ? 'border-penafort-green bg-penafort-green/10 text-penafort-green' 
                        : 'border-penafort-gray-200 hover:border-penafort-green hover:bg-penafort-green/5'
                    }`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
              <div className="flex gap-2">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter size={16} />
                      <span>Filter</span>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">Filter Options</h4>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Filter by price, rating, or other criteria</p>
                        <div className="grid gap-2">
                          <label className="text-xs">Price Range</label>
                          <div className="flex items-center gap-2">
                            <input type="text" placeholder="Min" className="input-field w-1/2 py-1 text-sm" />
                            <span>-</span>
                            <input type="text" placeholder="Max" className="input-field w-1/2 py-1 text-sm" />
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="w-full">Apply Filters</Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ArrowUpDown size={16} />
                      <span>Sort</span>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">Sort Options</h4>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Sort products by different criteria</p>
                        <div className="grid gap-2">
                          <button className="text-left p-2 hover:bg-penafort-green/5 rounded-md">Price: Low to High</button>
                          <button className="text-left p-2 hover:bg-penafort-green/5 rounded-md">Price: High to Low</button>
                          <button className="text-left p-2 hover:bg-penafort-green/5 rounded-md">Newest First</button>
                          <button className="text-left p-2 hover:bg-penafort-green/5 rounded-md">Popularity</button>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {products.map((product) => (
                <motion.div 
                  key={product.id} 
                  className="product-card group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  onClick={() => handleProductClick(product)}
                >
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
                  <motion.button 
                    className="w-full flex items-center justify-center gap-2 btn-primary mt-3"
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>

        <Footer />
        
        {/* Product Detail Drawer */}
        {selectedProduct && (
          <ProductDetailDrawer 
            product={selectedProduct} 
            isOpen={isDrawerOpen} 
            onClose={() => setIsDrawerOpen(false)}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default Products;
