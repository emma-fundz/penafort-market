
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageTransition from '../components/layout/PageTransition';
import { useToast } from '@/hooks/use-toast';
import ProductsHeader from '../components/products/ProductsHeader';
import ProductsFilter from '../components/products/ProductsFilter';
import ProductsSort from '../components/products/ProductsSort';
import ProductsGrid from '../components/products/ProductsGrid';
import ProductStats from '../components/products/ProductStats';
import ProductDetailDrawer from '../components/products/ProductDetailDrawer';
import ProductPagination from '../components/products/ProductPagination';
import LoadingIndicator from '../components/common/LoadingIndicator';
import { productCategories, initialProducts, generateProducts } from '../utils/productDataGenerator';

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
          <ProductsHeader selectedCategory={selectedCategory} />

          {/* Product Listing */}
          <div className="container mx-auto px-6 md:px-12 py-12">
            {/* Filters and Sort */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <ProductsFilter 
                selectedCategory={selectedCategory}
                productCategories={productCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                handleCategoryClick={handleCategoryClick}
                setCurrentPage={setCurrentPage}
              />
              <ProductsSort 
                sortOption={sortOption}
                setSortOption={setSortOption}
              />
            </div>

            {/* Products Count & Current Page */}
            <ProductStats 
              currentCount={paginatedProducts.length}
              totalCount={sortedProducts.length}
              currentPage={currentPage}
              totalPages={totalPages}
            />

            {/* Loading Indicator */}
            <LoadingIndicator isLoading={isLoading} />

            {/* Products Grid */}
            <ProductsGrid 
              products={paginatedProducts}
              handleProductClick={handleProductClick}
              handleAddToCart={handleAddToCart}
            />

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
