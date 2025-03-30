
import React from 'react';
import { ArrowRight, ShoppingCart, ShoppingBag } from 'lucide-react';
import RatingStars from '../common/RatingStars';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  rating: number;
  discount?: number;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Convert price string (like "₦3,500") to number
    const numericPrice = parseFloat(product.price.replace(/[^\d.]/g, ''));
    
    // Create a modified product with numeric price for the cart
    const cartProduct = {
      ...product,
      price: numericPrice,
    };
    
    addToCart(cartProduct);
    
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart`,
      duration: 3000,
    });
  };

  return (
    <div className="mb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-penafort-text-primary mb-3">
            Featured Products
          </h2>
          <p className="text-penafort-text-secondary max-w-lg">
            Discover our handpicked selection of premium quality products.
          </p>
        </div>
        <a href="/products" className="mt-4 md:mt-0 flex items-center text-penafort-green font-medium hover:underline">
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
              {product.discount && (
                <span className="absolute top-2 right-2 z-10 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                  {product.discount}% OFF
                </span>
              )}
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button 
                  className="btn-primary"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
            <h3 className="font-medium text-lg text-penafort-text-primary">{product.name}</h3>
            <RatingStars rating={product.rating} />
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold text-penafort-green">{product.price}</span>
              <button 
                className="p-2 bg-penafort-green/10 text-penafort-green rounded-full transition-all duration-300 hover:bg-penafort-green hover:text-white"
                onClick={(e) => handleAddToCart(product, e)}
              >
                <ShoppingBag size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
