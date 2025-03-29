
import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  products: any[];
  handleProductClick: (product: any) => void;
  handleAddToCart: (product: any, e: React.MouseEvent) => void;
}

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

const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  products, 
  handleProductClick, 
  handleAddToCart 
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No products found</h3>
        <p className="text-penafort-text-secondary">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          product={product}
          onClick={() => handleProductClick(product)}
          onAddToCart={(e) => handleAddToCart(product, e)}
        />
      ))}
    </motion.div>
  );
};

export default ProductsGrid;
