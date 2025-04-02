
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProductDetailDrawerProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  relatedProducts: any[];
}

const ProductDetailDrawer: React.FC<ProductDetailDrawerProps> = ({ 
  product, 
  isOpen, 
  onClose,
  relatedProducts
}) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${product.name} (${quantity}) has been added to your cart`,
      duration: 3000,
    });
    onClose();
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  if (!isOpen || !product) return null;
  
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
              <div className="text-right">
                {product.discount ? (
                  <>
                    <span className="text-2xl font-bold text-penafort-green">
                      ₦{(product.price * (1 - product.discount/100)).toFixed(2)}
                    </span>
                    <p className="text-sm text-penafort-text-secondary line-through">
                      ₦{product.price.toFixed(2)}
                    </p>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-penafort-green">₦{product.price.toFixed(2)}</span>
                )}
              </div>
            </div>
            
            <p className="text-penafort-text-secondary mb-6">{product.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center">
                <button 
                  className="w-10 h-10 rounded-l-lg border border-penafort-gray-200 flex items-center justify-center hover:bg-penafort-gray-100"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="w-12 h-10 flex items-center justify-center border-t border-b border-penafort-gray-200">
                  {quantity}
                </span>
                <button 
                  className="w-10 h-10 rounded-r-lg border border-penafort-gray-200 flex items-center justify-center hover:bg-penafort-gray-100"
                  onClick={increaseQuantity}
                >
                  +
                </button>
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
                {relatedProducts.slice(0, 3).map(relatedProduct => (
                  <div key={relatedProduct.id} className="text-center">
                    <div className="aspect-square rounded-lg overflow-hidden mb-2">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs truncate">{relatedProduct.name}</p>
                    <p className="text-xs font-medium text-penafort-green">₦{relatedProduct.price.toFixed(2)}</p>
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

export default ProductDetailDrawer;
