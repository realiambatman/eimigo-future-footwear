import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, ArrowLeft } from 'lucide-react';

export const AuthPage: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex animate-fade-in">
      {/* Left Side - Image (Desktop) */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden bg-brand-text">
        <img 
          src="shoes/guardian.jpeg"
          alt="Auth Background" 
          className="w-full h-full object-cover opacity-100 transition-opacity duration-1000 ease-in-out" 
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute bottom-16 left-16 max-w-lg text-white">
          <h2 className="text-5xl font-bold mb-6 tracking-tighter leading-tight">
            {isLogin ? "WELCOME BACK TO THE FUTURE." : "JOIN THE MOVEMENT."}
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            {isLogin 
              ? "Access your saved styles, track orders, and get exclusive early access to our next drop."
              : "Create an account to unlock AI styling, fast checkout, and member-only releases."
            }
          </p>
          <div className="flex gap-2">
            <div className={`h-1 w-12 rounded-full transition-all duration-500 ${isLogin ? 'bg-brand-accent' : 'bg-white/20'}`} />
            <div className={`h-1 w-12 rounded-full transition-all duration-500 ${!isLogin ? 'bg-brand-accent' : 'bg-white/20'}`} />
          </div>
        </div>
        
        <button 
          onClick={() => onNavigate('home')}
          className="absolute top-8 left-8 text-white flex items-center gap-2 hover:text-brand-accent transition-colors uppercase font-bold text-xs tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Return Home
        </button>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white relative">
        <button 
          onClick={() => onNavigate('home')}
          className="lg:hidden absolute top-8 left-8 text-brand-text flex items-center gap-2 hover:text-brand-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="max-w-md w-full">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-brand-text mb-2 tracking-tight">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h1>
            <p className="text-brand-textMuted">
              {isLogin ? 'Enter your details to continue.' : 'Start your journey with Eimigo.'}
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-2 animate-fade-in-up">
                <label className="text-xs font-bold uppercase tracking-wider text-brand-text">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-textMuted" />
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full pl-12 pr-4 py-4 bg-brand-surface border border-brand-surfaceHighlight rounded-xl focus:outline-none focus:border-brand-text focus:ring-1 focus:ring-brand-text transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-text">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-textMuted" />
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  className="w-full pl-12 pr-4 py-4 bg-brand-surface border border-brand-surfaceHighlight rounded-xl focus:outline-none focus:border-brand-text focus:ring-1 focus:ring-brand-text transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-brand-text">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-textMuted" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-brand-surface border border-brand-surfaceHighlight rounded-xl focus:outline-none focus:border-brand-text focus:ring-1 focus:ring-brand-text transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-textMuted hover:text-brand-text"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button className="text-xs font-bold text-brand-textMuted hover:text-brand-text transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}

            <button className="w-full bg-brand-text text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-black transition-all flex items-center justify-center gap-2 group shadow-lg">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="h-px bg-brand-surfaceHighlight flex-1" />
            <span className="text-xs font-bold text-brand-textMuted uppercase">Or continue with</span>
            <div className="h-px bg-brand-surfaceHighlight flex-1" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-brand-surfaceHighlight rounded-xl hover:bg-brand-surface transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="font-bold text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-brand-surfaceHighlight rounded-xl hover:bg-brand-surface transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
              </svg>
              <span className="font-bold text-sm">Apple</span>
            </button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-brand-textMuted">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 font-bold text-brand-text hover:text-brand-accent transition-colors underline"
              >
                {isLogin ? 'Create one now' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};