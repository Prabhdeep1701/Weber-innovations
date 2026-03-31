import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowRight, ShieldCheck, Zap, Globe, Activity,
  Mail, BarChart3, // <--- Add these 3 new icons
  Rocket, Users, Menu, X, Shield, Maximize2, Leaf,
  Calendar, Linkedin, Instagram, Twitter, Dribbble // Add Rocket and Users
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// --- Video Background Component ---
const VideoBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
        // Using a reliable CDN placeholder. 
        // IMPORTANT: Replace this with your local file path if needed (e.g., /assets/video.mp4)
        src="./assets/black.mp4" 
      />
      {/* Light Overlay to keep text readable */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
    </div>
  );
};

// --- UI Components ---

const ShinyButton = ({ children, className = "", ...props}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      {...props}
      whileTap={{ scale: 0.98 }}
      className={`relative px-8 py-4 rounded-full bg-black text-white overflow-hidden group shadow-lg shadow-black/30 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
      <span className="relative z-10 font-medium flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};

const SpotlightCard = ({ children, className = "", delay = 0 }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl shadow-lg overflow-hidden ${className}`}
    >
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(37, 99, 235, 0.1), transparent 40%)`
        }}
      />
      <div 
        className="pointer-events-none absolute inset-0 rounded-2xl border border-brand-blue/30 transition-opacity duration-500"
        style={{
          opacity,
          maskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)`
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};


// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Add this at top of component

  // --- NEW HERO VISUAL (Floating Cards) ---
const HeroFloatingCards = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-8 lg:mt-0 relative perspective-1000 w-full">
      
      {/* Background Glow Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] bg-black opacity-30 blur-[100px] rounded-full pointer-events-none"></div>
      
      {/* Container with max-width to prevent overflow */}
      <div className="relative space-y-4 sm:space-y-5 w-full max-w-[320px] sm:max-w-sm">
        
        {/* Card 1 */}
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="p-3 sm:p-4 rounded-xl flex items-center gap-4 shadow-lg bg-white/80 backdrop-blur-md border border-white/40"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center border shrink-0 bg-blue-50 text-brand-blue border-blue-100">
            <Rocket width="20" strokeWidth="1.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-0.5">
              <p className="text-xs font-semibold text-slate-900">SUPPLY CHAIN</p>
              <span className="text-[10px] text-slate-400">Secure</span>
            </div>
            <p className="text-xs text-slate-500 truncate">Domestic + Scalable</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded border font-medium bg-slate-100 text-slate-600 border-slate-200">
            Verified
          </span>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="p-3 sm:p-4 rounded-xl flex items-center gap-4 shadow-lg lg:ml-8 bg-white/80 backdrop-blur-md border border-white/40"
        >
          <div className="flex shrink-0 bg-brand-blue w-10 h-10 border rounded-full items-center justify-center text-white border-blue-600">
            <Users width="20" strokeWidth="1.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-0.5">
              <p className="text-xs font-semibold text-slate-900">R&D PARTNERS</p>
              <span className="text-[10px] text-slate-400">Active</span>
            </div>
            <p className="text-xs text-slate-500 truncate">Strategic Defence Ties</p>
          </div>
          <span className="bg-blue-100 text-[10px] px-2 py-0.5 rounded border border-blue-200 font-medium text-blue-800">
            3 Active
          </span>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          initial={{ y: 0 }}
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="p-3 sm:p-4 rounded-xl flex items-center gap-4 shadow-lg lg:-ml-4 bg-white/80 backdrop-blur-md border border-white/40"
        >
          <div className="w-10 h-10 rounded-full text-white flex items-center justify-center border shrink-0 bg-slate-900 border-slate-800">
            <BarChart3 width="20" strokeWidth="1.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-0.5">
              <p className="text-xs font-semibold text-slate-900">COST EFFICIENCY</p>
              <span className="text-[10px] text-slate-400">Audit</span>
            </div>
            <p className="text-xs text-slate-500 truncate">&lt; ₹7,000/kg Pricing</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded border font-medium bg-slate-900 text-white border-slate-700">
            Top 1%
          </span>
        </motion.div>

      </div>
    </div>
  );
};

  return (
    // IMPORTANT: bg-transparent allows the fixed video to show through
    <div className="min-h-screen overflow-x-hidden font-sans selection:bg-brand-purple selection:text-white text-slate-900 bg-transparent">
      
      {/* 1. FIXED VIDEO BACKGROUND LAYER */}
      <VideoBackground />

      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-brand-blue origin-left z-[100]" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 flex items-center justify-between p-3 pl-6 pr-4 bg-white/70 backdrop-blur-xl border border-white/40 rounded-full shadow-lg shadow-slate-200/50">
        
        {/* --- LOGO AREA UPDATED --- */}
        <div className="flex items-center gap-2">
          {/* Replace the text/icon with your image */}
          <img 
            src="/logo2.png"
            alt="Weber Innovations" 
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* <div className="hidden md:flex gap-12 text-m font-medium text-slate-600">
          {['HOME', 'ABOUT', 'SECTORS', 'INSIGHTS'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-black transition-colors">{item}</a>
          ))}
        </div> */}
        <div className="hidden md:flex gap-12 text-sm font-medium text-slate-600">
          {/* Link to Home Page */}
          <Link to="/" className="hover:text-black transition-colors">
            HOME
          </Link>

          {/* Scroll to About Section on Home Page */}
          <a href="/about" className="hover:text-black transition-colors">
            ABOUT
          </a>

          {/* Link to New Sectors Page */}
          <Link to="/sectors" className="hover:text-black transition-colors">
            SECTORS
          </Link>

          {/* Scroll to Insights/Integration Section */}
          <a href="/insight" className="hover:text-black transition-colors">
            INSIGHTS
          </a>
        </div>
        
        {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                  {/* Contact Button (Hidden on very small screens if needed, or keep) */}
                  <ShinyButton onClick={() => navigate('/contact')} className="hidden sm:flex items-center rounded-full bg-slate-900 text-white text-sm font-bold transition-colors shadow-md">
                    CONTACT <ArrowRight className="w-3 h-3" />
                  </ShinyButton>
              
                  {/* Mobile Menu Toggle (Visible on Mobile) */}
                  <button 
                    onClick={() => setIsMenuOpen(true)}
                    className="md:hidden group flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <Menu className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  </button>
                </div>
      </nav>
      {/* Render the Mobile Menu Overlay */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* --- SECTION 1: HERO (TRANSPARENT BG) --- */}
      {/* --- SECTION 1: HERO (TRANSPARENT BG) --- */}
      <main className="relative pt-32 pb-20 lg:pt-35 lg:pb-30 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-screen">
        
        {/* TEXT COLUMN: Order 1 on Mobile & Desktop (Top/Left) */}
        <div className="flex flex-col items-start order-1 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-slate-200 mb-8 backdrop-blur-md"
          >
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
            </span>
            <span className="text-xs font-bold text-brand-blue tracking-widest uppercase">Indigenous Manufacturing Hub</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-medium leading-[1.1] mb-6 text-slate-900"
          >
            REINVENTING INDUSTRIAL<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple italic">GRAPHENE PRODUCTION.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 font-light leading-relaxed max-w-lg mb-10"
          >
            We synthesize industrial-grade graphene with atomic precision. 
            Bridging the gap between lab-scale potential and industrial scalability.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <ShinyButton>LEARN MORE</ShinyButton>
            <button className="px-8 py-4 rounded-full border border-slate-200 hover:bg-white hover:shadow-lg transition-all flex items-center gap-2 text-slate-700 font-medium bg-white/40 backdrop-blur-md">
              OUR VISION <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* CARDS COLUMN: Order 2 on Mobile (Bottom), Order 2 on Desktop (Right) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="order-2 relative z-10 w-full flex justify-center lg:justify-end"
        >
          <HeroFloatingCards />
        </motion.div>
      </main>

      {/* Marquee */}
      <div className="w-full border-y border-slate-200 bg-white/70 backdrop-blur-md overflow-hidden py-10 relative z-10">
        <div className="flex animate-marquee gap-32 min-w-max">
          {[...Array(4)].map((_, i) => (
             <React.Fragment key={i}>
                <span className="text-lg font-bold font-mono text-slate-400 flex items-center gap-2"><ShieldCheck className="w-5 h-5"/> DEFENCE R&D</span>
                <span className="text-lg font-bold font-mono text-slate-400 flex items-center gap-2"><Zap className="w-5 h-5"/> ENERGY STORAGE</span>
                <span className="text-lg font-bold font-mono text-slate-400 flex items-center gap-2"><Globe className="w-5 h-5"/>AUTOMOBILE AEROSPACE</span>
             </React.Fragment>
          ))}
        </div>
      </div>

      <AboutUs />

      {/* --- SECTION 2: THE PARADOX (FROSTED GLASS BACKGROUND) --- */}
      <section className="py-32 px-6 relative z-10  bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl mb-6 text-slate-900">THE GRAPHENE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple italic">PARADOX</span></h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                Graphene is the strongest, most conductive material ever discovered. 
                Yet, 94% of global demand relies on inconsistent, high-cost imports.
              </p>
              <div className="p-6 rounded-2xl bg-slate-100 border border-white/50">
                  <h4 className="text-black font-bold text-sm uppercase tracking-wide mb-3">Current Market Failures</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 font-medium text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-black flex items-center justify-center text-xs">✕</div>
                      Prohibitive Cost (&gt; ₹80,000/kg)
                    </li>
                    <li className="flex items-center gap-3 font-medium text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-black flex items-center justify-center text-xs">✕</div>
                      Batch Inconsistency & Low Purity
                    </li>
                  </ul>
              </div>
            </div>
          </div>
          <div className="relative">
            <SpotlightCard className="p-8 h-full bg-white/80">
              <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                <span className="font-mono text-xs uppercase text-slate-400">Market Analysis</span>
                <Activity className="text-brand-purple" />
              </div>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-slate-500">Conventional Cost</span>
                    <span className="text-black font-bold">&gt; ₹80,000/kg</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-black"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-brand-blue flex items-center gap-2"> Weber Innovation</span>
                    <span className="text-brand-blue font-bold">&lt; ₹7,000/kg</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[8%] bg-brand-blue relative">
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-mono">
                  <span>DATA SOURCE: 2024 MARKET REPORT</span>
                  <span>CONFIDENCE: 99.8%</span>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      <SectorsSection />

      <TrustedPartnersAndIntegrations />

      <CTASection />

      {/* Footer (Solid) */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10 px-6 z-20 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              {/* Replace the text/icon with your image */}
              <img 
                src="/logo2.png"
                alt="Weber Innovations" 
                className="h-20 w-30 object-contain" /* Adjust h-10 to h-8 or h-12 to fit your logo size */
              />
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Pioneering the synthesis of advanced 2D materials. 
              Proudly engineered and manufactured in India.
            </p>
          </div>
          <div>
            <h4 className=" text-slate-900 mb-4">PRODUCTS</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li className="hover:text-black cursor-pointer">Graphene Nanoplatelets</li>
              <li className="hover:text-black cursor-pointer">Reduced Graphene Oxide</li>
              <li className="hover:text-black cursor-pointer">Functionalized GO</li>
              <li className="hover:text-black cursor-pointer">Conductive Inks</li>
            </ul>
          </div>
          <div>
            <h4 className=" text-slate-900 mb-4">CONTACTS</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li className="flex items-center gap-2"> weberinnovations.official@gmail.com</li>
              <li>+91 9557281101</li>
              <li>Greater Noida, UP, India</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
           <p>© 2024 Weber Innovations. All rights reserved.</p>
           <div className="flex gap-6 mt-4 md:mt-0">
             <span>ISO 9001:2015</span>
             <span>Privacy Policy</span>
             <span>Terms of Service</span>
           </div>
        </div>
      </footer>
    </div>
  );
}



const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl md:hidden flex flex-col"
    >
      {/* Header with Close Button */}
      <div className="flex justify-end p-6 mt-2 mr-2">
        <button 
          onClick={onClose}
          className="group flex items-center justify-center w-10 h-10 rounded-md border border-white/10 bg-white/5 text-white hover:bg-brand-blue hover:border-brand-blue hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
        </button>
      </div>

      {/* Menu Links */}
      <div className="flex-1 flex flex-col justify-center w-full max-w-md mx-auto px-6">
        <nav className="grid gap-8">
          <div className="space-y-2">
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-6 pl-1">Navigation</p>
            
            {[
              { id: "01", label: "HOME", href: "/" },
              { id: "02", label: "ABOUT", href: "/about" },
              { id: "03", label: "SECTORS", href: "/sectors" },
              { id: "04", label: "INSIGHTS", href: "/insight" },
              { id: "05", label: "CONTACTS", href: "/contact" }
            ].map((link) => (
              <a 
                key={link.id}
                href={link.href} 
                onClick={onClose}
                className="group flex items-baseline gap-4 py-3 border-b border-white/5 hover:border-brand-blue/50 transition-colors"
              >
                <span className="font-mono text-xs text-brand-blue opacity-50 group-hover:opacity-100 transition-opacity">
                  {link.id}
                </span>
                <span className="text-4xl font-light tracking-tighter text-zinc-300 group-hover:text-white transition-colors">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </motion.div>
  );
};

function AboutUs() {
  return (
    <section className="pt-24 pb-24 bg-black/90 backdrop-blur-xl border-t border-slate-200 relative z-10">
      <div className="max-w-7xl w-full mx-auto px-6"> {/* Added px-6 for mobile padding */}
        <div className="text-center md:text-left mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-slate-200 mb-4 tracking-tight max-w-none">
            ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple italic">US</span>
          </h2>
          <p className="text-sm sm:text-base animate-[fadeSlideIn_0.8s_ease-out_0.2s_both] text-neutral-300 font-geist max-w-none">
            Explore millions of high-quality photos curated for creators,
            designers, and teams who value speed, impact, and freedom
          </p>
        </div>

        {/* Expanding Cards Container */}
        {/* On Mobile: Stacked with gap. On Desktop: Fixed height row for expansion effect */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-4 h-auto md:h-[500px]" id="expanding-cards">
          
          {/* Card 1: Research */}
          <article
            className="card group w-full md:flex-1 relative overflow-hidden rounded-2xl transition-all duration-500 ease-out bg-neutral-900/60 ring-neutral-800 ring-1 hover:md:flex-[1.5] min-h-[300px] md:min-h-0"
          >
            <img
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80"
              alt="research"
              className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-[1.02] opacity-60 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto transition-all duration-500 opacity-100">
              <div className="rounded-xl bg-neutral-900/80 ring-1 ring-white/10 backdrop-blur p-5">
                <h3 className="text-white text-2xl mb-2 font-geist">RESEARCH</h3>
                <p className="text-neutral-300 text-sm font-geist">Pioneering graphene research for real-world applications</p>
              </div>
            </div>
          </article>

          {/* Card 2: Commercialization */}
          <article
            className="card group w-full md:flex-1 relative overflow-hidden rounded-2xl transition-all duration-500 ease-out bg-neutral-900/60 ring-neutral-800 ring-1 hover:md:flex-[1.5] min-h-[300px] md:min-h-0"
          >
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
              alt="commercial"
              className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-[1.02] opacity-60 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto transition-all duration-500 opacity-100">
              <div className="rounded-xl bg-neutral-900/80 ring-1 ring-white/10 backdrop-blur p-5">
                <h3 className="text-white text-2xl mb-2 font-geist">COMMERCIALIZATION</h3>
                <p className="text-neutral-300 text-sm font-geist">Bridging cutting-edge research with commercial solutions</p>
              </div>
            </div>
          </article>

          {/* Card 3: Sustainability */}
          <article
            className="card group w-full md:flex-1 relative overflow-hidden rounded-2xl transition-all duration-500 ease-out bg-neutral-900/60 ring-neutral-800 ring-1 hover:md:flex-[1.5] min-h-[300px] md:min-h-0"
          >
            <img
              src="./assets/sustainability.jpeg"
              alt="sustainability"
              className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-[1.02] opacity-60 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto transition-all duration-500 opacity-100">
              <div className="rounded-xl bg-neutral-900/80 ring-1 ring-white/10 backdrop-blur p-5">
                <h3 className="text-white text-2xl mb-2 font-geist">SUSTAINABILITY</h3>
                <p className="text-neutral-300 text-sm font-geist">Creating materials that are stronger, lighter, and greener</p>
              </div>
            </div>
          </article>

          {/* Card 4: Innovation */}
          <article
            className="card group w-full md:flex-1 relative overflow-hidden rounded-2xl transition-all duration-500 ease-out bg-neutral-900/60 ring-neutral-800 ring-1 hover:md:flex-[1.5] min-h-[300px] md:min-h-0"
          >
            <img
              src="./assets/innovation.webp"
              alt="innovation"
              className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-[1.02] opacity-60 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto transition-all duration-500 opacity-100">
              <div className="rounded-xl bg-neutral-900/80 ring-1 ring-white/10 backdrop-blur p-5">
                <h3 className="text-white text-2xl mb-2 font-geist">INNOVATION</h3>
                <p className="text-neutral-300 text-sm font-geist">Unlocking graphene's full potential across industries</p>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}

function SectorsSection() {
  return (
    <section id="sectors" className="py-32 px-6 relative z-10 bg-black/90 backdrop-blur-xl border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading (Matches existing style) */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl text-slate-200 mb-4">OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple italic">SECTORS</span></h2>
            <p className="text-slate-500 max-w-xl">Powering the next generation of hardware with advanced analytics.</p>
          </div>
          <button className="text-brand-blue font-medium hover:text-brand-purple transition-colors flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            View All Sectors <ArrowRight size={16} />
          </button>
        </div>

        {/* New Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-full mx-auto">
          
          {/* Hero Card: Analytics Hub */}
          <section className="relative group overflow-hidden rounded-2xl sm:rounded-2xl ring-neutral-800 ring-1 bg-zinc-950 col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-8 min-h-[320px] sm:min-h-[360px] md:min-h-[460px]">
            <img 
              src="https://newsroom.arm.com/wp-content/uploads/2023/08/GettyImages-1470664961-1400x788.jpg" 
              alt="Data visualization dashboard interface" 
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="relative p-6 sm:p-8 flex flex-col h-full">
              <div className="flex items-center justify-between">
                <div className="text-xs sm:text-sm text-zinc-300 font-medium">
                  
                    
                </div>
                <div className="flex items-center justify-between text-white/90 font-medium">
                
                <span className="text-sm">1/8</span>
              </div>
              </div>
              <div className="mt-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mb-3">
                  Electronics and Semiconductors
                </h1>
                <p className="text-sm md:text-base text-zinc-300 max-w-xl font-light leading-relaxed">
                  Real-time data insights with predictive modeling and automated reporting for enterprise-scale operations.
                </p>
                <div className="mt-6">
                  <button className="inline-flex items-center justify-center size-12 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-900/30 hover:bg-blue-500 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Accent Card: Product Lineup */}
          <aside
            className="relative overflow-hidden rounded-2xl sm:rounded-2xl border border-blue-900 col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-4 min-h-[320px] sm:min-h-[360px] md:min-h-[460px]"
            style={{ backgroundColor: '#3b82f6' }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-20"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '20px 20px', backgroundPosition: '10px 10px' }}>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-blue-900/50 mix-blend-overlay"></div>
            <div className="relative h-full p-6 sm:p-8 flex flex-col">
              <div className="flex items-center justify-between text-white/90 font-medium">
                <span className="text-sm">Business Intelligence</span>
                <span className="text-sm">2/8</span>
              </div>
              <h2 className="mt-8 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-[1.1]">
                Energy<br />and<br />Storage
              </h2>
              <p className="mt-4 text-sm md:text-base text-white/90 max-w-xs font-medium">
                Complete suite of analytics tools that transform raw data into actionable business insights.
              </p>
              <div className="mt-auto pt-6">
                <span className="inline-flex items-center gap-2 px-3.5 h-9 rounded-xl bg-white/20 backdrop-blur border border-white/30 text-white text-sm font-medium">
                  <BarChart3 className="w-4 h-4" />
                  Advanced Analytics
                </span>
              </div>
            </div>
          </aside>

          {/* Tile 1: Report Builder */}
          <section className="relative group overflow-hidden rounded-2xl sm:rounded-2xl ring-neutral-800 ring-1 bg-zinc-950 col-span-1 md:col-span-3 lg:col-span-4 min-h-[240px]">
            <img 
              src="https://global.videojet.com/wp-content/uploads/dam/image/industry-solution/aero-and-auto/aero-auto-homepage-high-res.bmp" 
              alt="Business dashboard" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="relative p-6 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-white tracking-tight">Automobiles and Aerospace</h3>
                <div className="flex items-center justify-between text-white/90 font-medium">
                
                <span className="text-sm">3/8</span>
              </div>
              </div>
              <div className="mt-auto">
                <button className="inline-flex items-center justify-center size-10 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          {/* Tile 2: Data Pipeline */}
          <section className="relative group overflow-hidden rounded-2xl sm:rounded-2xl ring-neutral-800 ring-1 bg-zinc-950 col-span-1 md:col-span-3 lg:col-span-4 min-h-[240px]">
            <img 
              src="https://www.ispionline.it/wp-content/uploads/2025/01/52687051605_989db99360_o-scaled.jpg" 
              alt="Data center" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="relative p-6 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-white tracking-tight">Defence and Security</h3>
                <div className="flex items-center justify-between text-white/90 font-medium">
            
                <span className="text-sm">4/8</span>
              </div>
              </div>
              <div className="mt-auto">
                <button className="inline-flex items-center justify-center size-10 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

          {/* Tile 3: ML Insights */}
          <section className="relative group overflow-hidden rounded-2xl sm:rounded-2xl ring-neutral-800 ring-1 bg-zinc-950 col-span-1 sm:col-span-2 md:col-span-6 lg:col-span-4 min-h-[240px]">
            <img 
              src="https://cicconstruction.com/app/uploads/2023/06/building-for-progress-why-infrastructure-development-is-worth-the-trouble-jpg.webp" 
              alt="Machine learning" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="relative p-6 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-white tracking-tight">Construction & Infrastructure</h3>
                <div className="flex items-center justify-between text-white/90 font-medium">
               
                <span className="text-sm">5/8</span>
              </div>
              </div>
              <div className="mt-auto flex items-center justify-between">
                
                <button className="inline-flex items-center justify-center size-10 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </section>
  );
}

const CTASection = () => {
  return (
    <section className="mt-10 max-w-7xl mx-auto px-0 relative z-10 mb-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12 text-center backdrop-blur-xl shadow-2xl overflow-hidden"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-brand-blue/20 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Badge */}
          <div className="relative inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 mb-8 backdrop-blur-md">
            <Mail className="w-3.5 h-3.5 text-black/80" />
            <span className="text-xs text-black/70">Let's Connect</span>
          </div>

          <h2 className="relative text-3xl uppercase md:text-5xl text-black mb-6 tracking-tight">
            LET'S GROW <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple italic">TOGETHER.</span>
          </h2>
          
          <p className="relative text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-8 font-light">
            Whether you have a detailed brief or just an idea, I'd love to hear
            from you. Let's create something extraordinary together.
          </p>

          

          {/* Social Links */}
          <div className="relative flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500 border-t border-black/10 pt-10">
            <a href="#" className="flex items-center gap-2 hover:text-black transition-colors">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="#" className="flex items-center gap-2 hover:text-black transition-colors">
              <Instagram className="w-4 h-4" /> Instagram
            </a>
        
          </div>
        </motion.div>
      </div>
    </section>
  );
};



// --- Trusted Partners & Integrations Component ---

const TrustedPartnersAndIntegrations = () => {
  return (
    <div className="relative z-10">
      {/* Styles for Animations (Scoped) */}
      <style>{`
        @keyframes centerCirclePulse {
          0% { opacity: 0; transform: scale(0.6); }
          15% { opacity: 0.9; }
          100% { opacity: 0; transform: scale(2.2); }
        }
        .center-circle {
          animation: centerCirclePulse 4s linear infinite;
        }
        .center-circle--2 { animation-delay: -1.3s; }
        .center-circle--3 { animation-delay: -2.6s; }
      `}</style>

      {/* --- PART 2: INTEGRATIONS --- */}
      <section className="overflow-hidden bg-white pt-20 pb-20 md:pt-32 md:pb-32 relative border-t border-slate-200" id="integration">
        {/* Ambient Background */}
        <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-100/40 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>

        <div className="z-10 max-w-7xl mr-auto ml-auto px-6 relative">
          {/* Header */}
          <div className="text-center mb-16 md:mb-32">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900 mb-4 md:mb-6">
              WHAT MAKES <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple italic">GRAPHENE</span> SPECIAL
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto font-light">
              Connect with your favorite tools to streamline workflows
            </p>
          </div>

          {/* Integration Grid Hub */}
          <div className="relative max-w-5xl mx-auto">
            
            {/* Axis Lines - Hidden on Mobile */}
            <div className="hidden md:block absolute top-1/2 left-[-50%] right-[-50%] h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent -translate-y-1/2"></div>
            <div className="hidden md:block absolute left-1/2 top-[-50%] bottom-[-50%] w-[1px] bg-gradient-to-b from-transparent via-slate-300 to-transparent -translate-x-1/2"></div>

            {/* Center Hub Mechanism - Hidden on Mobile */}
            <div className="hidden md:block pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative w-[260px] h-[260px]">
                {/* 3 filled concentric circles pulsing */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="center-circle center-circle--3 w-56 h-56 rounded-full bg-blue-500/5"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="center-circle center-circle--2 w-40 h-40 rounded-full bg-blue-500/10"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="center-circle w-24 h-24 rounded-full bg-blue-500/20"></div>
                </div>

                {/* Gradient Rays extending out */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                  <div className="h-full w-px bg-gradient-to-b from-transparent via-blue-400/50 to-transparent absolute"></div>
                </div>

                {/* Core Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex bg-black w-16 h-16 rounded-full ring-white ring-8 relative shadow-[0_0_40px_rgba(37,99,235,0.4)] items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* The Grid of Features */}
            {/* Mobile: 1 col, smaller gap. Desktop: 2 cols, large gap around center hub */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-32 md:gap-y-32">
              
              {/* Item 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  <Shield className="w-7 h-7 text-black group-hover:text-black transition-colors" strokeWidth={1.75} />
                </div>
                <h3 className="text-black text-xl mb-2 font-geist">
                  STRENGTH
                </h3>
                <p className="text-sm text-slate-600 max-w-[280px] leading-relaxed">
                  200x stronger than steel, lightweight, revolutionary designs.
                </p>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  <Zap className="w-7 h-7 text-black group-hover:text-black transition-colors" strokeWidth={1.75} />
                </div>
                <h3 className="text-black text-xl mb-2 font-geist">
                  CONDUCTIVITY
                </h3>
                <p className="text-sm text-slate-600 max-w-[280px] leading-relaxed">
                  Superior electrical properties, thermal transfer, electronics innovation.
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  <Leaf className="w-7 h-7 text-black group-hover:text-black transition-colors" strokeWidth={1.75} />
                </div>
                <h3 className="text-black text-xl mb-2 font-geist ">
                  SUSTAINABILITY
                </h3>
                <p className="text-sm text-slate-600 max-w-[280px] leading-relaxed">
                  Abundant and scalable with low-impact manufacturing.
                </p>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  <Maximize2 className="w-7 h-7 text-black group-hover:text-black transition-colors" strokeWidth={1.75} />
                </div>
                <h3 className="text-black text-xl mb-2 font-geist">
                  FLEXIBILITY
                </h3>
                <p className="text-sm text-slate-600 max-w-[280px] leading-relaxed">
                  Ultra-thin and bendable enabling flexible electronics and next-gen forms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};