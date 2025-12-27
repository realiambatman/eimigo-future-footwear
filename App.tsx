import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { ProductCard } from "./components/ProductCard";
import { CartDrawer } from "./components/CartDrawer";
import { AIStylist } from "./components/AIStylist";
import { ProductDetailPage } from "./components/ProductDetailPage";
import { AuthPage } from "./components/AuthPage";
import { CartProvider } from "./context/CartContext";
import { Product, PageView, BlogPost } from "./types";
import {
  ArrowDown,
  ArrowRight,
  Truck,
  CheckCircle,
  Package,
  MapPin,
  Clock,
  Zap,
  Shield,
  Globe,
  Quote,
  Users,
  Target,
  Heart,
  ChevronLeft,
  Sparkles,
} from "lucide-react";

// --- DATA ---
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "ne-17",
    name: "The NE-17",
    price: 1999,
    category: "Casual Wears",
    description:
      "A sneaker named after the spirit of the region — NE-17 brings heritage and modern street style together. It is for the youth who wear their culture like a crown.",
    image: "shoes/ne-17.jpeg",
    sizes: [7, 8, 9, 10, 11, 12],
    tags: ["casual", "minimalist", "heritage"],
  },
  {
    id: "hornbill",
    name: "THE HORNBILL",
    price: 2499,
    category: "Sneakers",
    description:
      "The Hornbill represents identity — bold, rare, and unmistakeably Northeast. For those who love being noticed, not because they try, but because they naturally stand out.",
    image: "shoes/hornbill.jpeg",
    sizes: [8, 9, 10, 11],
    tags: ["sneakers", "bold", "culture"],
  },
  {
    id: "eimigo",
    name: "THE EIMIGO",
    price: 1999,
    category: "Casual Wears",
    description:
      'When you choose "The EIMIGO," you choose belonging. Crafted for those who move with quiet confidence and everyday sophistication.',
    image: "shoes/eimigo.jpeg",
    sizes: [9, 10, 11, 12, 13],
    tags: ["casual", "belonging", "comfort"],
  },
  {
    id: "rhino",
    name: "THE RHINO",
    price: 2199,
    category: "Casual Wears",
    description:
      "Inspired by Assam's mighty one-horned rhino. Heavy Power. Silent Presence. Unshakeable Personality. Armor for the bold who protect their dreams.",
    image: "shoes/rhino.jpeg",
    sizes: [7, 8, 9, 10],
    tags: ["power", "resilience", "bold"],
  },
  {
    id: "guardian",
    name: "THE GUARDIAN",
    price: 2199,
    category: "Sneakers",
    description:
      "Designed for the protectors. This shoe fuses tribal craftsmanship with urban edge. Your daily reminder that pride isn't just worn—it's carried.",
    image: "shoes/guardian.jpeg",
    sizes: [7, 8, 9, 10, 11],
    tags: ["protector", "heritage", "responsibility"],
  },
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "THE NE-17: Walk Your Roots",
    excerpt:
      "Authenticity, identity, confident minimalism. A sneaker named after the spirit of the region.",
    content: [
      "Authenticity, identity, confident minimalism.",
      "Classic Roots, Modern Swagger.",
      "THE NE-17: A sneaker named after the spirit of the region — NE-17 brings heritage and modern street style together. This NE-17 isn't made for tracks—it's made for streets, campuses, cafés, and conversations. It's for the youth who wear their culture like a crown, not a costume.",
      "It's the pair you wear when you want to feel connected, grounded, and stylish without trying. Simple. Strong. Unapologetically rooted.",
      "Each step is a reminder: You come from strength, resilience, and originality — walk like it.",
    ],
    date: "Oct 24, 2024",
    category: "Behind the Brand",
    image: "shoes/ne-17.jpeg",
    relatedProductId: "ne-17",
  },
  {
    id: "2",
    title: "THE EIMIGO: Transform Your Attitude",
    excerpt:
      'Your Everyday, Elevated. When you choose "The EIMIGO," you choose belonging.',
    content: [
      "Premium lifestyle, belonging, everyday sophistication.",
      "Your Everyday, Elevated.",
      "THE EIMIGO: When you choose 'The EIMIGO,' you choose more than a sneaker you choose belonging. This pair is crafted for those who move with quiet confidence.",
      "EIMIGO was crafted for those who refuse to blend in. Whether you're stepping into class, a boardroom, or your own future, this shoe whispers: 'You belong here.'",
      "Transform your attitude. Redefine your standard. Because the world doesn't get to decide your worth—your walk does. This is your go-to sneaker for campus, streets, and style. Crafted just for you — and for the identity you're building.",
    ],
    date: "Oct 20, 2024",
    category: "Behind the Brand",
    image: "shoes/eimigo.jpeg",
    relatedProductId: "eimigo",
  },
  {
    id: "3",
    title: "THE HORNBILL: Fly with Pride",
    excerpt:
      "The Pride of Being Different. The Hornbill represents identity — bold, rare, and unmistakeably Northeast.",
    content: [
      "Cultural pride, uniqueness, bold attitude.",
      "The Pride of Being Different.",
      "THE HORNBILL: The Hornbill represents identity bold, rare, and unmistakeably Northeast. This shoe is crafted for trendsetters who carry culture like a crown.",
      "For those who love being noticed, not because they try — but because they naturally stand out. With a strong build and fearless design, the Hornbill sneaker says one thing:",
      "Your confidence is your heritage. Wear it to lead.",
    ],
    date: "Oct 15, 2024",
    category: "Behind the Brand",
    image: "shoes/hornbill.jpeg",
    relatedProductId: "hornbill",
  },
  {
    id: "4",
    title: "THE RHINO: Transform Your Attitude",
    excerpt:
      "Power, toughness, masculinity. Inspired by Assam's mighty one-horned rhino.",
    content: [
      "Power, toughness, masculinity, authority.",
      "Heavy Power. Silent Presence. Unshakeable Personality.",
      "THE RHINO: The Rhino is more than footwear; it's armor for the bold. Inspired by Assam's mighty one-horned fearless, this high-ankle design blends resilience with rebellion. It's for those who protect their dreams like endangered species—fiercely, faithfully, without apology.",
      "When you wear it, you don't just walk — you don't quit and move forward. You dominate every ground you step on. The Rhino is not just a sneaker; it is an oath of unwavering progress.",
      "We crafted this high-ankle design as a tribute to the mighty one-horned rhino of Assam—a creature defined by its heavy, power and dominance. When you lace up The Rhino, you don't merely move forward; you embody an unshakeable momentum.",
    ],
    date: "Oct 10, 2024",
    category: "Behind the Brand",
    image: "shoes/rhino.jpeg",
    relatedProductId: "rhino",
  },
  {
    id: "5",
    title: "THE GUARDIAN: Walk Your Roots",
    excerpt:
      "Responsibility, trust, reliability. Designed for the protectors. This shoe fuses tribal craftsmanship.",
    content: [
      "Responsibility, trust, reliability, pride.",
      "Your Shield, Your Style.",
      "THE GUARDIAN: We designed The Guardian for the protectors. Every culture needs its keepers. Its silent sentinels. The Guardian is your daily reminder that pride isn't just worn—it's carried.",
      "Designed for those who walk with responsibility and style, this shoe fuses tribal craftsmanship with urban edge. You're wearing legacy.",
      "So step forward. Not just for yourself. But for every ancestor who believed in you before you were born. When you walk strong, you inspire others to rise too. It's not just footwear — it's a statement of responsibility and pride.",
    ],
    date: "Oct 05, 2024",
    category: "Behind the Brand",
    image: "shoes/guardian.jpeg",
    relatedProductId: "guardian",
  },
];

// --- COMPONENTS ---

const Marquee: React.FC = () => {
  return (
    <div className="relative flex overflow-x-hidden bg-brand-text text-white py-4 border-y border-brand-accent">
      <div className="animate-marquee whitespace-nowrap flex gap-12 text-sm font-bold uppercase tracking-[0.2em] items-center">
        <span>Future Footwear</span>
        <span className="text-brand-accent">●</span>
        <span>Born in North East</span>
        <span className="text-brand-accent">●</span>
        <span>Built for the World</span>
        <span className="text-brand-accent">●</span>
        <span>Authentic Quality</span>
        <span className="text-brand-accent">●</span>
        <span>Global Shipping</span>
        <span className="text-brand-accent">●</span>
        <span>Future Footwear</span>
        <span className="text-brand-accent">●</span>
        <span>Born in North East</span>
        <span className="text-brand-accent">●</span>
        <span>Built for the World</span>
        <span className="text-brand-accent">●</span>
        <span>Authentic Quality</span>
        <span className="text-brand-accent">●</span>
        <span>Global Shipping</span>
        <span className="text-brand-accent">●</span>
      </div>
    </div>
  );
};

// --- PAGES ---

const HomePage: React.FC<{
  onShopClick: () => void;
  onProductSelect: (p: Product) => void;
}> = ({ onShopClick, onProductSelect }) => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => setHeroLoaded(true), []);

  return (
    <>
      {/* Hero Section */}
      <header className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-brand-surface">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=2000"
            alt="Hero"
            className={`w-full h-full object-cover opacity-90 transition-transform duration-10000 ease-linear scale-100 ${
              heroLoaded ? "scale-110" : ""
            }`}
          />
          <div className="absolute inset-0 bg-white/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 px-4 max-w-7xl mx-auto w-full flex flex-col items-center md:items-start text-center md:text-left pt-20">
          <div className="overflow-hidden">
            <h2 className="text-brand-accent font-bold font-mono text-lg tracking-widest mb-4 animate-fade-in-up bg-black inline-block px-3 py-1">
              COLLECTION 01
            </h2>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 text-brand-text animate-fade-in-up delay-100 drop-shadow-sm leading-[0.9]">
            REDEFINE <br />{" "}
            <span className="text-stroke-black text-transparent bg-clip-text bg-gradient-to-r from-brand-text to-brand-textMuted">
              MOVEMENT
            </span>
          </h1>
          <p className="text-brand-text/90 font-medium text-lg md:text-xl max-w-xl mb-10 leading-relaxed animate-fade-in-up delay-200 backdrop-blur-sm rounded-xl">
            Where culture meets creation. Born in the North East, built for the
            world-class.
          </p>
          <button
            onClick={onShopClick}
            className="group bg-brand-text text-white px-10 py-5 rounded-none font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-black transition-all animate-fade-in-up delay-300 flex items-center gap-2 shadow-xl hover:shadow-brand-accent/50"
          >
            Start Journey{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* Marquee */}
      <Marquee />

      {/* --- Lookbook / Lifestyle Split --- */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Man on steps */}
          <div className="relative w-full group overflow-hidden">
            <img
              src="images/boy.jpeg"
              alt="Eimigo Man Style"
              className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
              <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                STREET HERITAGE
              </h3>
              <p className="text-lg font-medium mb-6 max-w-sm opacity-90">
                Crafted with indigenous flair for the bold and fearless.
              </p>
            </div>
          </div>

          {/* Right Column: Woman on steps */}
          <div className="relative w-full group overflow-hidden">
            <img
              src="images/girl.jpeg"
              alt="Eimigo Woman Style"
              className="w-full h-auto object-contain transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 text-white">
              <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                URBAN FLOW
              </h3>
              <p className="text-lg font-medium mb-6 max-w-sm opacity-90">
                Feel the unique aura of Eimigo with every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- The New Drop Section (Commented Out) --- */}
      {/* <section className="py-24 bg-brand-surface">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-brand-text mb-6">
              THE NEW DROP
            </h2>
            <p className="text-brand-textMuted max-w-2xl mx-auto text-lg leading-relaxed">
              A new wave of footwear designed from the North East — Bold,
              Authentic, and made for the Next Wave.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-brand-surfaceHighlight"
              onClick={() => onProductSelect(SAMPLE_PRODUCTS[0])} // NE-17
            >
              <div className="aspect-[4/3] bg-brand-surface rounded-2xl overflow-hidden mb-8 relative">
                <img
                  src={SAMPLE_PRODUCTS[0].image}
                  alt={SAMPLE_PRODUCTS[0].name}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-brand-accent text-black font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  Best Seller
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-brand-text mb-2">
                  {SAMPLE_PRODUCTS[0].name}
                </h3>
                <p className="text-brand-textMuted mb-4 font-mono">
                  {SAMPLE_PRODUCTS[0].category}
                </p>
                <span className="inline-block bg-brand-text text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm group-hover:bg-brand-accent group-hover:text-black transition-colors">
                  Shop Now - ₹{SAMPLE_PRODUCTS[0].price.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-brand-surfaceHighlight"
              onClick={() => onProductSelect(SAMPLE_PRODUCTS[1])} // Hornbill
            >
              <div className="aspect-[4/3] bg-brand-surface rounded-2xl overflow-hidden mb-8 relative">
                <img
                  src={SAMPLE_PRODUCTS[1].image}
                  alt={SAMPLE_PRODUCTS[1].name}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-black text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  New
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-brand-text mb-2">
                  {SAMPLE_PRODUCTS[1].name}
                </h3>
                <p className="text-brand-textMuted mb-4 font-mono">
                  {SAMPLE_PRODUCTS[1].category}
                </p>
                <span className="inline-block bg-brand-text text-white px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-sm group-hover:bg-brand-accent group-hover:text-black transition-colors">
                  Shop Now - ₹{SAMPLE_PRODUCTS[1].price.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Philosophy Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative">
              <div className="relative z-10 bg-brand-surface p-1 rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=1000"
                  alt="Detail"
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-brand-accent"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-brand-text"></div>
            </div>

            <div className="w-full md:w-1/2">
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-textMuted mb-4">
                The Philosophy
              </h3>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-text mb-6 leading-tight">
                NOT JUST A SHOE. <br />A MACHINE FOR WALKING.
              </h2>
              <div className="space-y-6 text-lg text-brand-text/80 leading-relaxed">
                <p>
                  We stripped back the unnecessary. No fake panels, no glued-on
                  aesthetics. Just raw, functional design powered by data.
                </p>
                <div className="pt-6">
                  <button
                    onClick={onShopClick}
                    className="text-brand-text border-b-2 border-brand-text font-bold uppercase tracking-widest hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
                  >
                    Read The Full Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Parallax Banner */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=2000"
            alt="Banner"
            className="w-full h-full object-cover fixed-background"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
            LIMITLESS
          </h2>
          <p className="text-xl max-w-lg mx-auto mb-8 text-gray-200">
            The Series X Drop is here. Limited quantities available worldwide.
          </p>
          <button
            onClick={onShopClick}
            className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors"
          >
            Shop The Drop
          </button>
        </div>
      </section>

      {/* Trending Slider (Partial) */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-bold text-brand-text mb-2">
              TRENDING NOW
            </h2>
            <p className="text-brand-textMuted">Most wanted gear this week.</p>
          </div>
          <button
            onClick={onShopClick}
            className="hidden md:flex items-center gap-2 text-brand-text font-bold hover:text-brand-accent transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onProductSelect}
            />
          ))}
        </div>
        <button
          onClick={onShopClick}
          className="md:hidden mt-8 w-full py-4 border border-brand-surfaceHighlight rounded-xl font-bold"
        >
          View All Products
        </button>
      </section>
    </>
  );
};

const ShopPage: React.FC<{ onProductSelect: (p: Product) => void }> = ({
  onProductSelect,
}) => {
  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-brand-text mb-6">
          THE COLLECTION
        </h1>
        <p className="text-brand-textMuted max-w-2xl mx-auto text-lg">
          Designed for the forward-thinking. Our latest drop features adaptive
          materials and responsive cushioning.
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 mb-8 justify-center no-scrollbar">
        {["All", "Running", "Lifestyle", "Outdoor", "Skate"].map(
          (filter, i) => (
            <button
              key={filter}
              className={`px-6 py-2 rounded-full border text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                i === 0
                  ? "bg-brand-text text-white border-brand-text"
                  : "hover:bg-brand-surface border-brand-surfaceHighlight"
              }`}
            >
              {filter}
            </button>
          )
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {SAMPLE_PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onProductSelect}
          />
        ))}
      </div>
    </div>
  );
};

const BlogDetailPage: React.FC<{
  post: BlogPost;
  onBack: () => void;
  onProductSelect: (p: Product) => void;
}> = ({ post, onBack, onProductSelect }) => {
  const linkedProduct = SAMPLE_PRODUCTS.find(
    (p) => p.id === post.relatedProductId
  );

  return (
    <div className="pt-24 pb-24 px-4 max-w-4xl mx-auto min-h-screen animate-fade-in-up">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-brand-textMuted hover:text-brand-text transition-colors font-bold uppercase text-xs tracking-wider"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Journal
      </button>

      <div className="mb-8">
        <span className="text-brand-accent bg-black px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-brand-text leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-brand-textMuted font-mono text-sm">{post.date}</p>
      </div>

      <div className="aspect-video w-full bg-brand-surface rounded-xl overflow-hidden mb-12">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose prose-lg prose-headings:font-bold prose-headings:font-sans prose-p:text-brand-text/80 max-w-none mb-16">
        {post.content.map((paragraph, index) => (
          <p key={index} className="mb-6 leading-relaxed text-lg">
            {paragraph}
          </p>
        ))}
      </div>

      {linkedProduct && (
        <div className="border-t border-brand-surfaceHighlight pt-12">
          <h3 className="text-2xl font-bold text-brand-text mb-6">
            SHOP THE STORY
          </h3>
          <div className="flex flex-col md:flex-row gap-8 items-center bg-brand-surface p-6 rounded-2xl">
            <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden bg-white">
              <img
                src={linkedProduct.image}
                alt={linkedProduct.name}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h4 className="text-2xl font-bold text-brand-text mb-2">
                {linkedProduct.name}
              </h4>
              <p className="text-brand-textMuted mb-6">
                {linkedProduct.description}
              </p>
              <div className="flex items-center gap-4">
                <span className="text-xl font-mono font-bold">
                  ₹{linkedProduct.price.toLocaleString("en-IN")}
                </span>
                <button
                  onClick={() => onProductSelect(linkedProduct)}
                  className="flex-1 bg-brand-text text-white px-6 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-black transition-colors"
                >
                  View Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BlogPage: React.FC<{ onReadPost: (post: BlogPost) => void }> = ({
  onReadPost,
}) => {
  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-brand-text mb-4">
          BEHIND THE BRAND
        </h1>
        <p className="text-brand-textMuted">
          Stories of heritage, identity, and the future of footwear.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            onClick={() => onReadPost(post)}
            className="group cursor-pointer flex flex-col h-full"
          >
            <div className="aspect-[4/3] rounded-sm overflow-hidden mb-6 bg-brand-surface relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-accent bg-black px-2 py-1">
                {post.category}
              </span>
              <span className="text-xs text-brand-textMuted font-mono">
                {post.date}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-brand-text mb-3 group-hover:text-brand-accentHover transition-colors">
              {post.title}
            </h2>
            <p className="text-brand-textMuted leading-relaxed line-clamp-3 flex-grow">
              {post.excerpt}
            </p>
            <div className="mt-6 pt-4 border-t border-brand-surfaceHighlight">
              <span className="text-sm font-bold uppercase tracking-wider text-brand-text group-hover:text-brand-accentHover transition-colors">
                Read Story &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
      {/* Introduction */}
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-brand-text mb-8 leading-tight">
          BORN IN THE <br />{" "}
          <span className="text-stroke-black text-transparent bg-clip-text bg-gradient-to-r from-brand-text to-brand-textMuted">
            NORTH EAST
          </span>
        </h1>
        <p className="text-xl text-brand-textMuted leading-relaxed">
          EIMIGO was born out of a simple idea — to create footwear that
          captures the bold and dynamic spirit of the North East and brings it
          to the global stage. Where culture meets creation.
        </p>
      </div>

      {/* Founder's Message */}
      <div className="mb-24 relative">
        <div className="absolute -inset-4 bg-brand-surface skew-y-1 rounded-3xl -z-10"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8">
          <div className="order-2 lg:order-1">
            <Quote className="w-12 h-12 text-brand-accent mb-6" />
            <p className="text-2xl md:text-3xl font-bold text-brand-text leading-relaxed mb-8">
              "We will not rest until EIMIGO becomes a symbol of excellence and
              innovation — born in the North East, built for the world-class. A
              shoe is not just about comfort — it’s about confidence, identity,
              and pride."
            </p>
            <div>
              <h3 className="text-lg font-bold text-brand-text uppercase tracking-widest">
                Kapthianmuan Ngaihte
              </h3>
              <p className="text-brand-textMuted font-mono text-sm">
                FOUNDER & CEO
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative group">
            <img
              src="images/founder.jpeg"
              alt="Founder"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-brand-accent/10 mix-blend-multiply"></div>
          </div>
        </div>
      </div>

      {/* The Journey Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div className="bg-brand-surface p-8 rounded-2xl border border-brand-surfaceHighlight hover:border-brand-accent transition-colors group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6 text-brand-text" />
          </div>
          <h3 className="text-xl font-bold text-brand-text mb-4">THE IDEA</h3>
          <p className="text-brand-textMuted">
            To build a brand that resonates with the bold spirit of our land.
            Every stitch and detail is a tribute to the passion and resilience
            that define our people.
          </p>
        </div>

        <div className="bg-brand-surface p-8 rounded-2xl border border-brand-surfaceHighlight hover:border-brand-accent transition-colors group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
            <Target className="w-6 h-6 text-brand-text" />
          </div>
          <h3 className="text-xl font-bold text-brand-text mb-4">
            THE MISSION
          </h3>
          <p className="text-brand-textMuted">
            To become the leading footwear brand from the North East. By
            prioritizing quality and style, we will expand across India and
            reach global markets.
          </p>
        </div>

        <div className="bg-brand-surface p-8 rounded-2xl border border-brand-surfaceHighlight hover:border-brand-accent transition-colors group">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
            <Heart className="w-6 h-6 text-brand-text" />
          </div>
          <h3 className="text-xl font-bold text-brand-text mb-4">
            THE PROMISE
          </h3>
          <p className="text-brand-textMuted">
            Authenticity and quality in every pair — crafted for the bold, the
            movers, and the dreamers. Welcome to the EIMIGO family.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-brand-text mb-12 text-center uppercase tracking-wider">
          Meet The Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Kapthianmuan Ngaihte */}
          <div className="group relative overflow-hidden rounded-xl">
            <div className="aspect-[3/4] overflow-hidden bg-brand-surface">
              <img
                src="images/ktm.png"
                alt="Kapthianmuan Ngaihte"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-white translate-y-2 group-hover:translate-y-0 transition-transform">
              <h3 className="text-xl font-bold mb-1">Kapthianmuan Ngaihte</h3>
              <p className="text-brand-accent text-xs font-mono mb-2">
                FOUNDER & CEO
              </p>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                Visionary leader passionate about bringing North East culture to
                the global stage.
              </p>
            </div>
          </div>

          {/* Sonmuan */}
          <div className="group relative overflow-hidden rounded-xl">
            <div className="aspect-[3/4] overflow-hidden bg-brand-surface">
              <img
                src="images/zeal.png"
                alt="Sonmuan"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-white translate-y-2 group-hover:translate-y-0 transition-transform">
              <h3 className="text-xl font-bold mb-1">Sonmuan</h3>
              <p className="text-brand-accent text-xs font-mono mb-2">
                HEAD OF DESIGN
              </p>
              <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                Specializes in cultural themes and modern aesthetics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrackOrderPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 max-w-3xl mx-auto min-h-screen flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-brand-surface rounded-full flex items-center justify-center mb-6">
        <Truck className="w-10 h-10 text-brand-text" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-4">
        TRACK YOUR ORDER
      </h1>
      <p className="text-brand-textMuted mb-10 max-w-md">
        Enter your Order ID and Email to see the real-time status of your gear.
      </p>

      <div className="w-full bg-white p-8 rounded-2xl border border-brand-surfaceHighlight text-left shadow-lg">
        <div className="grid gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-textMuted mb-2">
              Order ID
            </label>
            <input
              type="text"
              placeholder="E.g., EMG-88392"
              className="w-full bg-brand-surface border border-brand-surfaceHighlight rounded-lg p-4 focus:outline-none focus:border-brand-text focus:ring-1 focus:ring-brand-text transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-textMuted mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-brand-surface border border-brand-surfaceHighlight rounded-lg p-4 focus:outline-none focus:border-brand-text focus:ring-1 focus:ring-brand-text transition-colors"
            />
          </div>
          <button className="w-full bg-brand-text text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-brand-accent hover:text-black transition-all mt-2">
            Track Shipment
          </button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left">
        <div className="flex gap-4 items-start p-6 rounded-xl border border-brand-surfaceHighlight bg-white">
          <Package className="w-6 h-6 text-brand-text shrink-0" />
          <div>
            <h4 className="font-bold">Packaged</h4>
            <p className="text-xs text-brand-textMuted mt-1">
              Securely boxed in eco-materials.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-start p-6 rounded-xl border border-brand-surfaceHighlight bg-white">
          <Truck className="w-6 h-6 text-brand-text shrink-0" />
          <div>
            <h4 className="font-bold">In Transit</h4>
            <p className="text-xs text-brand-textMuted mt-1">
              On the way to your coordinates.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-start p-6 rounded-xl border border-brand-surfaceHighlight bg-white">
          <CheckCircle className="w-6 h-6 text-brand-text shrink-0" />
          <div>
            <h4 className="font-bold">Delivered</h4>
            <p className="text-xs text-brand-textMuted mt-1">
              Ready for action.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>(() => {
    const path = window.location.pathname.substring(1);
    const validPages = ["home", "shop", "blog", "about", "track", "auth"];
    return validPages.includes(path) ? (path as PageView) : "home";
  });
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(
    null
  );
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, selectedBlogPost, selectedProduct]);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleReadPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setCurrentPage("blog"); // Ensure we are on blog view
    window.history.pushState({ page: "blog" }, "", "/blog");
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    if (page !== "blog") {
      setSelectedBlogPost(null);
    }
    // Clear product selection when navigating via menu
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update browser history with clean URLs
    const url = page === "home" ? "/" : `/${page}`;
    window.history.pushState({ page }, "", url);
  };

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        const path = window.location.pathname.substring(1);
        const validPages = ["home", "shop", "blog", "about", "track", "auth"];
        setCurrentPage(validPages.includes(path) ? (path as PageView) : "home");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const renderPage = () => {
    // If a product is selected, show ProductDetailPage regardless of "currentPage"
    if (selectedProduct) {
      return (
        <ProductDetailPage
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onSelectProduct={handleProductSelect}
        />
      );
    }

    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onShopClick={() => setCurrentPage("shop")}
            onProductSelect={handleProductSelect}
          />
        );
      case "shop":
        return <ShopPage onProductSelect={handleProductSelect} />;
      case "blog":
        if (selectedBlogPost) {
          return (
            <BlogDetailPage
              post={selectedBlogPost}
              onBack={() => setSelectedBlogPost(null)}
              onProductSelect={handleProductSelect}
            />
          );
        }
        return <BlogPage onReadPost={handleReadPost} />;
      case "about":
        return <AboutPage />;
      case "track":
        return <TrackOrderPage />;
      case "auth":
        return <AuthPage onNavigate={handleNavigate} />;
      default:
        return (
          <HomePage
            onShopClick={() => setCurrentPage("shop")}
            onProductSelect={handleProductSelect}
          />
        );
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-white text-brand-text font-sans selection:bg-brand-accent selection:text-black flex flex-col">
        {/* Navbar - hidden on auth page for cleaner look */}
        {currentPage !== "auth" && (
          <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
        )}

        <CartDrawer />

        {/* Assistant Floating Button */}
        {!isStylistOpen && currentPage !== "auth" && (
          <button
            onClick={() => setIsStylistOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-brand-text text-white p-4 rounded-full shadow-2xl hover:bg-brand-accent hover:text-black transition-all duration-300 hover:scale-110 flex items-center gap-2 group border border-brand-surfaceHighlight"
            aria-label="Open Assistant"
          >
            <Sparkles className="w-6 h-6 animate-pulse" />
            <span className="hidden group-hover:block font-bold text-sm tracking-wider whitespace-nowrap animate-fade-in-up">
              ASSISTANT
            </span>
          </button>
        )}

        <AIStylist
          isOpen={isStylistOpen}
          onClose={() => setIsStylistOpen(false)}
          inventory={SAMPLE_PRODUCTS}
          onViewProduct={(id) => {
            const prod = SAMPLE_PRODUCTS.find((p) => p.id === id);
            if (prod) handleProductSelect(prod);
          }}
        />

        {/* Removed Modal - ProductDetailPage replaces it */}

        {/* Main Content Area */}
        <main className="flex-grow">{renderPage()}</main>

        {/* Footer - hidden on auth page */}
        {currentPage !== "auth" && (
          <footer className="bg-brand-text text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-2">
                  <span className="text-3xl font-bold tracking-tighter text-white block mb-6">
                    EIMIGO<span className="text-brand-accent text-4xl">.</span>
                  </span>
                  <p className="text-gray-400 max-w-sm mb-6">
                    Redefining human movement through technology and design.
                    Join the revolution of comfort and style.
                  </p>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-accent hover:text-black flex items-center justify-center transition-colors cursor-pointer text-white">
                      IG
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-accent hover:text-black flex items-center justify-center transition-colors cursor-pointer text-white">
                      TW
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-accent hover:text-black flex items-center justify-center transition-colors cursor-pointer text-white">
                      YT
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-6 uppercase tracking-wider">
                    Help
                  </h4>
                  <ul className="space-y-4 text-gray-400 text-sm">
                    <li
                      onClick={() => setCurrentPage("track")}
                      className="hover:text-brand-accent cursor-pointer transition-colors"
                    >
                      Track Order
                    </li>
                    <li className="hover:text-brand-accent cursor-pointer transition-colors">
                      Shipping & Returns
                    </li>
                    <li className="hover:text-brand-accent cursor-pointer transition-colors">
                      Size Guide
                    </li>
                    <li className="hover:text-brand-accent cursor-pointer transition-colors">
                      FAQ
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-6 uppercase tracking-wider">
                    Company
                  </h4>
                  <ul className="space-y-4 text-gray-400 text-sm">
                    <li
                      onClick={() => setCurrentPage("about")}
                      className="hover:text-brand-accent cursor-pointer transition-colors"
                    >
                      About Eimigo
                    </li>
                    <li className="hover:text-brand-accent cursor-pointer transition-colors">
                      Careers
                    </li>
                    <li className="hover:text-brand-accent cursor-pointer transition-colors">
                      Sustainability
                    </li>
                    <li className="hover:text-brand-accent cursor-pointer transition-colors">
                      Press
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>&copy; 2024 Eimigo Inc. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                  <span className="hover:text-white cursor-pointer">
                    Privacy Policy
                  </span>
                  <span className="hover:text-white cursor-pointer">
                    Terms of Service
                  </span>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </CartProvider>
  );
};

export default App;
