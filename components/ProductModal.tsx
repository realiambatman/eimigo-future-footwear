import React, { useState } from 'react';
import { X, ShoppingBag, Star, Share2 } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (selectedSize) {
      setIsAdding(true);
      addToCart(product, selectedSize);
      setTimeout(() => {
        setIsAdding(false);
        onClose();
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-brand-base w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-fade-in max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 backdrop-blur rounded-full text-black hover:bg-brand-text hover:text-white transition-all shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-brand-surface relative group h-64 md:h-auto shrink-0">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover mix-blend-multiply"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col bg-brand-base">
          <div>
            <div className="flex items-center justify-between mb-4">
               <h1 className="text-2xl md:text-3xl font-bold text-brand-text leading-none">{product.name}</h1>
               <p className="text-brand-text font-mono text-xl font-bold">₹{product.price.toLocaleString('en-IN')}</p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-brand-surface rounded-full text-xs font-bold uppercase tracking-wider text-brand-textMuted border border-brand-surfaceHighlight">
                {product.category}
              </span>
              <div className="flex items-center text-yellow-500 gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium text-brand-textMuted">4.9 (128 reviews)</span>
              </div>
            </div>

            <h3 className="text-xs font-bold uppercase text-brand-textMuted tracking-widest mb-2">Description</h3>
            <p className="text-brand-text leading-relaxed mb-8 text-sm md:text-base">
              {product.description}
            </p>

            <h3 className="text-xs font-bold uppercase text-brand-textMuted tracking-widest mb-3">Select Size (US)</h3>
            <div className="grid grid-cols-4 gap-2 mb-8">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-lg font-mono text-sm transition-all border ${
                    selectedSize === size
                      ? 'bg-brand-text border-brand-text text-white font-bold scale-105'
                      : 'bg-transparent border-brand-surfaceHighlight text-brand-textMuted hover:border-brand-text hover:text-brand-text'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <button 
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                selectedSize 
                  ? 'bg-brand-accent text-black hover:bg-brand-accentHover shadow-lg shadow-brand-accent/20' 
                  : 'bg-brand-surface text-brand-textMuted cursor-not-allowed'
              }`}
            >
              {isAdding ? 'Adding...' : 'Add to Cart'} <ShoppingBag className="w-5 h-5" />
            </button>
            <button className="p-4 rounded-xl border border-brand-surfaceHighlight text-brand-textMuted hover:text-brand-text hover:border-brand-text transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};