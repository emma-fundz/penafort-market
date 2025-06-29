
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductCard.css';

const ProductCard = ({ product, onClick, onAddToCart }) => {
  return (
    <Link to={`/products/detail/${product.id}`} className="text-decoration-none">
      <motion.div 
        className="card product-card"
        whileHover={{ y: -5 }}
        onClick={onClick}
      >
        <div className="position-relative">
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top product-card-image"
            loading="lazy"
          />
          {product.discount && (
            <span className="position-absolute badge bg-danger product-card-discount-badge">
              {product.discount}% OFF
            </span>
          )}
        </div>
        <div className="card-body product-card-body">
          <div className="product-card-header">
            <div>
              <h5 className="card-title product-card-title">{product.name}</h5>
              <p className="product-card-category">{product.category}</p>
            </div>
            <p className="product-card-price">₦{product.price.toLocaleString()}</p>
          </div>
          <motion.button 
            className="btn btn-primary product-card-btn"
            whileTap={{ scale: 0.95 }}
            onClick={onAddToCart}
          >
            <ShoppingBag size={18} />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
