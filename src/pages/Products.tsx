
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, ArrowUpDown } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageTransition from '../components/layout/PageTransition';
import { useToast } from '@/hooks/use-toast';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import ProductCard from '../components/products/ProductCard';
import ProductDetailDrawer from '../components/products/ProductDetailDrawer';
import ProductPagination from '../components/products/ProductPagination';
import { productCategories, initialProducts, generateProducts } from '../utils/productDataGenerator';

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

const PRODUCTS_PER_PAGE = 12;

const Products = () => {
  // Get route parameters and search parameters
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get page from URL or default to 1
  const pageFromUrl = parseInt(searchParams.get('page') || '1');
  
  // State management
  const [allProducts, setAllProducts] = useState<any[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(pageFromUrl);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOption, setSortOption] = useState<string>('default');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Generate more products when needed (simulating API call)
  const loadMoreProducts = () => {
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const moreProducts = generateProducts(500);
      setAllProducts(prev => [...prev, ...moreProducts]);
      setIsLoading(false);
    }, 500);
  };

  // Load initial data
  useEffect(() => {
    // This would be an API call in a real application
    if (allProducts.length < 1000) {
      loadMoreProducts();
    }
  }, []);

  // Update category from URL parameter
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('All');
    }
  }, [category]);

  // Update URL when page changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', currentPage.toString());
    setSearchParams(newParams);
  }, [currentPage]);

  // Filter products based on selected category and price range
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });
  }, [allProducts, selectedCategory, priceRange]);

  // Sort products based on selected sort option
  const sortedProducts = useMemo(() => {
    switch (sortOption) {
      case 'price-asc':
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case 'name-asc':
        return [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return filteredProducts;
    }
  }, [filteredProducts, sortOption]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle category selection
  const handleCategoryClick = (categoryName: string) => {
    setCurrentPage(1); // Reset to first page when changing category
    if (categoryName === 'All') {
      navigate('/products');
    } else {
      navigate(`/products/category/${categoryName}`);
    }
  };

  // Handle product click
  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  // Handle add to cart
  const handleAddToCart = (product: any, event: React.MouseEvent) => {
    event.stopPropagation();
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    });
  };

  // Find related products (same category)
  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return allProducts
      .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
      .slice(0, 6);
  }, [selectedProduct, allProducts]);

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
                {['All', ...productCategories].map((categoryName) => (
                  <motion.button
                    key={categoryName}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                      selectedCategory === categoryName 
                        ? 'border-penafort-green bg-penafort-green/10 text-penafort-green' 
                        : 'border-penafort-gray-200 hover:border-penafort-green hover:bg-penafort-green/5'
                    }`}
                    onClick={() => handleCategoryClick(categoryName)}
                  >
                    {categoryName}
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
                        <p className="text-sm text-muted-foreground">Filter by price range</p>
                        <div className="grid gap-2">
                          <label className="text-xs">Price Range</label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="number" 
                              value={priceRange[0]} 
                              onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                              className="input-field w-1/2 py-1 text-sm" 
                              min="0"
                            />
                            <span>-</span>
                            <input 
                              type="number" 
                              value={priceRange[1]} 
                              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                              className="input-field w-1/2 py-1 text-sm" 
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full" 
                        onClick={() => setCurrentPage(1)} // Reset to first page when filtering
                      >
                        Apply Filters
                      </Button>
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
                          <button 
                            className={`text-left p-2 hover:bg-penafort-green/5 rounded-md ${sortOption === 'price-asc' ? 'bg-penafort-green/10 text-penafort-green' : ''}`}
                            onClick={() => setSortOption('price-asc')}
                          >
                            Price: Low to High
                          </button>
                          <button 
                            className={`text-left p-2 hover:bg-penafort-green/5 rounded-md ${sortOption === 'price-desc' ? 'bg-penafort-green/10 text-penafort-green' : ''}`}
                            onClick={() => setSortOption('price-desc')}
                          >
                            Price: High to Low
                          </button>
                          <button 
                            className={`text-left p-2 hover:bg-penafort-green/5 rounded-md ${sortOption === 'name-asc' ? 'bg-penafort-green/10 text-penafort-green' : ''}`}
                            onClick={() => setSortOption('name-asc')}
                          >
                            Name: A to Z
                          </button>
                          <button 
                            className={`text-left p-2 hover:bg-penafort-green/5 rounded-md ${sortOption === 'name-desc' ? 'bg-penafort-green/10 text-penafort-green' : ''}`}
                            onClick={() => setSortOption('name-desc')}
                          >
                            Name: Z to A
                          </button>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </motion.div>

            {/* Products Count & Current Page */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-penafort-text-secondary">
                Showing {paginatedProducts.length} of {sortedProducts.length} products
              </p>
              <p className="text-penafort-text-secondary">
                Page {currentPage} of {totalPages}
              </p>
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-center my-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-penafort-green"></div>
              </div>
            )}

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {paginatedProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                    onAddToCart={(e) => handleAddToCart(product, e)}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-penafort-text-secondary">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}

            {/* Pagination */}
            <ProductPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </main>

        <Footer />
        
        {/* Product Detail Drawer */}
        <ProductDetailDrawer 
          product={selectedProduct} 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)}
          relatedProducts={relatedProducts}
        />
      </div>
    </PageTransition>
  );
};

export default Products;
