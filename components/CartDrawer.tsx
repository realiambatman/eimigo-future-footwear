import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { isOpen, toggleCart, items, removeFromCart, total } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={toggleCart}
      />
      
      {/* Drawer - Added bg-white explicitly */}
      <div className="fixed inset-y-0 right-0 z-50 w-full md:max-w-md bg-white shadow-2xl transform transition-transform duration-300 flex flex-col border-l border-brand-surfaceHighlight">
        <div className="flex items-center justify-between p-6 border-b border-brand-surfaceHighlight bg-white">
          <h2 className="text-xl font-bold font-mono uppercase tracking-widest text-brand-text">Your Cart</h2>
          <button onClick={toggleCart} className="text-brand-textMuted hover:text-brand-text transition-colors p-2 hover:bg-brand-surface rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-brand-textMuted">
              <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
              <p className="mb-4">Your cart is empty.</p>
              <button onClick={toggleCart} className="text-brand-text font-bold hover:text-brand-accent transition-colors text-sm border-b-2 border-brand-accent">
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                <div className="w-20 h-24 bg-brand-surface rounded-md overflow-hidden shrink-0 border border-brand-surfaceHighlight">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-brand-text leading-tight">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-brand-textMuted hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-brand-textMuted mt-1">Size: {item.selectedSize}</p>
                    <p className="text-sm text-brand-textMuted">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-mono font-bold text-brand-text">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 bg-brand-surface border-t border-brand-surfaceHighlight">
            <div className="flex justify-between items-center mb-6">
              <span className="text-brand-textMuted uppercase text-sm tracking-wider">Total</span>
              <span className="text-2xl font-bold font-mono text-brand-text">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button className="w-full bg-brand-text text-white py-4 font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-black transition-colors flex items-center justify-center gap-2 group rounded-lg">
              Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};