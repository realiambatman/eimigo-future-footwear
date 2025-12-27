import React, { useState } from 'react';
import { ShoppingBag, Star, Truck, Shield, RotateCcw, ChevronLeft, Heart, Share2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack, onSelectProduct }) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const { addToCart, toggleCart } = useCart();
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'shipping'>('details');

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
    }
  };

  const handleBuyNow = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
      toggleCart(); // Open cart immediately
    }
  };

  return (
    <div className="pt-24 pb-24 px-4 max-w-7xl mx-auto min-h-screen animate-fade-in">
      {/* Breadcrumb / Back */}
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-brand-textMuted hover:text-brand-text transition-colors font-bold uppercase text-xs tracking-wider"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/5] w-full bg-brand-surface rounded-2xl overflow-hidden relative group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
               <span className="px-3 py-1 bg-white/90 backdrop-blur text-brand-text text-xs font-bold uppercase tracking-wider rounded-full">
                 {product.category}
               </span>
            </div>
            <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-full text-brand-text hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
          {/* Thumbnails (Mock) */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-brand-surface rounded-xl overflow-hidden cursor-pointer border border-transparent hover:border-brand-text transition-all">
                <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover mix-blend-multiply opacity-80 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-2 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-500">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="text-sm text-brand-textMuted font-medium underline cursor-pointer">128 Reviews</span>
          </div>

          <div className="text-3xl font-mono font-bold text-brand-text mb-8">₹{product.price.toLocaleString('en-IN')}</div>

          <div className="mb-8">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-sm font-bold uppercase tracking-wider text-brand-text">Select Size (US)</span>
              <span className="text-xs text-brand-textMuted underline cursor-pointer">Size Guide</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-lg font-mono text-sm transition-all border ${
                    selectedSize === size
                      ? 'bg-brand-text border-brand-text text-white font-bold'
                      : 'bg-white border-brand-surfaceHighlight text-brand-text hover:border-brand-text'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && <p className="text-red-500 text-xs mt-2 font-medium">Please select a size</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button 
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-widest border-2 transition-all ${
                selectedSize 
                  ? 'border-brand-text text-brand-text hover:bg-brand-surface' 
                  : 'border-brand-surfaceHighlight text-brand-textMuted cursor-not-allowed'
              }`}
            >
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              disabled={!selectedSize}
              className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-widest text-white transition-all shadow-lg ${
                selectedSize
                  ? 'bg-brand-text hover:bg-brand-accent hover:text-black shadow-brand-text/20'
                  : 'bg-brand-surfaceHighlight cursor-not-allowed'
              }`}
            >
              Buy Now
            </button>
          </div>

          {/* Info Tabs */}
          <div className="border-t border-brand-surfaceHighlight">
            <div className="flex gap-8 mb-6 mt-6 overflow-x-auto">
              {['details', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-2 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab ? 'border-brand-text text-brand-text' : 'border-transparent text-brand-textMuted hover:text-brand-text'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="min-h-[200px] animate-fade-in">
              {activeTab === 'details' && (
                <div className="space-y-4 text-brand-text/80 leading-relaxed">
                  <p>{product.description}</p>
                  <ul className="list-disc pl-5 space-y-2 mt-4">
                    <li>Premium breathable materials</li>
                    <li>Ergonomic sole design for maximum comfort</li>
                    <li>Handcrafted detailing</li>
                    <li>Designed in North East India</li>
                  </ul>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="border-b border-brand-surfaceHighlight pb-6 last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex text-yellow-500 text-xs">
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
                        </div>
                        <span className="font-bold text-sm">Amazing Quality!</span>
                      </div>
                      <p className="text-sm text-brand-textMuted mb-2">
                        "Absolutely love the design and the comfort is unmatched. Proud to wear a brand from home."
                      </p>
                      <p className="text-xs text-brand-textMuted uppercase font-bold">Verified Buyer • 2 days ago</p>
                    </div>
                  ))}
                  <button className="text-sm font-bold underline text-brand-text">View all reviews</button>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <Truck className="w-5 h-5 text-brand-text shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Free Shipping</h4>
                      <p className="text-sm text-brand-textMuted">On all orders over ₹2,500. Arrives in 3-5 business days.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <RotateCcw className="w-5 h-5 text-brand-text shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Easy Returns</h4>
                      <p className="text-sm text-brand-textMuted">14-day return policy for unworn items in original packaging.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended / You Might Also Like */}
      {onSelectProduct && (
        <div className="border-t border-brand-surfaceHighlight pt-16">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-text">COMPLETE THE LOOK</h2>
            <button onClick={onBack} className="hidden md:flex items-center gap-2 text-sm font-bold hover:text-brand-accent transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Mock Recommendations using the same product image for now, but usually would be filtered */}
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="group cursor-pointer"
                onClick={() => onSelectProduct({ ...product, id: product.id + i, name: `Style Variation ${i}` })}
              >
                <div className="aspect-square bg-brand-surface rounded-xl overflow-hidden mb-4 border border-brand-surfaceHighlight">
                  <img src={product.image} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" alt="Related" />
                </div>
                <h3 className="font-bold text-sm text-brand-text">Related Style {i}</h3>
                <p className="text-xs text-brand-textMuted">₹{product.price.toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};