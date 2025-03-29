
import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';

interface ProductsSortProps {
  sortOption: string;
  setSortOption: (option: string) => void;
}

const ProductsSort: React.FC<ProductsSortProps> = ({ sortOption, setSortOption }) => {
  return (
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
  );
};

export default ProductsSort;
