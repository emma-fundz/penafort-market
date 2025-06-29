
import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductsGrid.css';

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

const ProductsGrid = ({ 
  products, 
  handleProductClick, 
  handleAddToCart 
}) => {
  if (products.length === 0) {
    return (
      <div className="products-grid-container">
        <h3 className="no-products-message">No products found</h3>
        <p className="no-products-description">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      className="products-row"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <div className="col" key={product.id}>
          <ProductCard 
            product={product}
            onClick={() => handleProductClick(product)}
            onAddToCart={(e) => handleAddToCart(product, e)}
          />
        </div>
      ))}
    </motion.div>
  );
};

export default ProductsGrid;
