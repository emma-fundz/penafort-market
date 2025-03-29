
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string;
    rating: number;
    discount: number | null;
  };
  onClick: () => void;
  onAddToCart: (e: React.MouseEvent) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart }) => {
  return (
    <motion.div 
      className="product-card group cursor-pointer"
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="mb-4 aspect-square rounded-lg overflow-hidden bg-penafort-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy" // Important for performance with many products
        />
      </div>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-medium text-penafort-text-primary mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-penafort-text-secondary text-sm">{product.category}</p>
        </div>
        <p className="font-bold text-penafort-green">${product.price.toFixed(2)}</p>
      </div>
      <motion.button 
        className="w-full flex items-center justify-center gap-2 btn-primary mt-3"
        whileTap={{ scale: 0.95 }}
        onClick={onAddToCart}
      >
        <ShoppingBag size={18} />
        <span>Add to Cart</span>
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;
