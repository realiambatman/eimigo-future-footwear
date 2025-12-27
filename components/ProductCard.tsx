import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <div 
      className="group relative bg-brand-base border border-brand-surfaceHighlight rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-brand-accent"
      onClick={() => onSelect(product)}
    >
      <div className="aspect-[4/5] overflow-hidden bg-brand-surface relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <button 
          className="absolute bottom-4 right-4 w-10 h-10 bg-brand-text text-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-accent hover:text-black"
        >
          <Plus className="w-5 h-5" />
        </button>
        
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 text-xs font-bold uppercase tracking-wider bg-white/80 backdrop-blur-md text-brand-text border border-brand-surfaceHighlight rounded shadow-sm">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-brand-text mb-1 group-hover:text-brand-accentHover transition-colors">
          {product.name}
        </h3>
        <p className="text-brand-textMuted text-sm line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-brand-text font-mono font-bold">₹{product.price.toLocaleString('en-IN')}</span>
          <div className="flex gap-2">
            {product.sizes.slice(0, 3).map(s => (
              <span key={s} className="text-xs text-brand-textMuted font-mono bg-brand-surface px-1.5 py-0.5 rounded">{s}</span>
            ))}
            <span className="text-xs text-brand-textMuted flex items-center">+</span>
          </div>
        </div>
      </div>
    </div>
  );
};