export type PageView = 'home' | 'shop' | 'blog' | 'about' | 'track' | 'auth';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  sizes: number[];
  tags: string[];
}

export interface CartItem extends Product {
  selectedSize: number;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  recommendedProductId?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  image: string;
  category: string;
  relatedProductId?: string;
}