
import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';

interface ProductsFilterProps {
  selectedCategory: string;
  productCategories: string[];
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  handleCategoryClick: (category: string) => void;
  setCurrentPage: (page: number) => void;
}

const ProductsFilter: React.FC<ProductsFilterProps> = ({
  selectedCategory,
  productCategories,
  priceRange,
  setPriceRange,
  handleCategoryClick,
  setCurrentPage
}) => {
  return (
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
      </div>
    </motion.div>
  );
};

export default ProductsFilter;
