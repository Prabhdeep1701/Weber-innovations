import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowRight, Check, Microscope, Users, // Existing
  Factory, Leaf, Lightbulb, TrendingUp,
  Shield, Zap, Eye,
  Rocket, Menu, X
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

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(59, 130, 246, 0.2)" }) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update CSS variables directly on the DOM element
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-opacity', '1');
  };

  const handleMouseLeave = () => {
    if (!divRef.current) return;
    divRef.current.style.setProperty('--spotlight-opacity', '0');
  };

  return (
    <motion.div
      ref={divRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl shadow-lg overflow-hidden ${className}`}
      style={{
        // Initialize CSS variables
        '--mouse-x': '0px',
        '--mouse-y': '0px',
        '--spotlight-opacity': '0',
        '--spotlight-color': spotlightColor
      }}
    >
      {/* Spotlight Effect using CSS Variables */}
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: 'var(--spotlight-opacity)',
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 40%)`
        }}
      />
      
      {/* Border Highlight Effect */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity: 'var(--spotlight-opacity)',
          border: `1px solid var(--spotlight-color)`, 
          maskImage: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), black, transparent)`,
          WebkitMaskImage: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), black, transparent)`
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};


// --- Main App ---

export default function About() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Add this at top of component

  return (
    // IMPORTANT: bg-transparent allows the fixed video to show through
    <div className="min-h-screen font-sans selection:bg-brand-purple selection:text-white text-slate-900 bg-transparent">
      
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
        {/*<ShinyButton onClick={() => navigate('/contact')} className="flex items-center rounded-full bg-slate-900 text-white text-sm font-bold transition-colors shadow-md">
          CONTACT <ArrowRight className="w-3 h-3" />
        </ShinyButton>*/}

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

      <VisionSection />

      <GrapheneDefinition />

      <RoadmapSection />

      <MissionSection />

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

// --- Vision / Hero Section (The "Why & Vision" Content) ---
const VisionSection = () => {
  return (
    <section id="vision" className="overflow-hidden pt-32 pb-20 md:pt-32 md:pb-30 relative z-10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-6 space-y-6 md:space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl text-black leading-tight"
            >
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-500 italic">WEBER INNOVATIONS</span>
            </motion.h1>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-zinc-400 font-light"
            >
              Shaping the future through <span className="text-brand-blue">graphene</span>.
            </motion.h3>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm md:text-base leading-relaxed text-zinc-400 max-w-2xl mx-auto lg:mx-0"
            >
              Weber Innovations pioneers graphene-based advanced materials research, combining cutting-edge science with practical applications across industries. We don't just study materials; we engineer them for the real world.
            </motion.p>
            
            {/* "What is Weber" Glass Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-left p-6 rounded-2xl border-l-2 border-l-black bg-white/5 backdrop-blur-md border-y border-r border-white/10 mt-8"
            >
              <h4 className="font-mono text-sm text-black mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-black" />
                What is Weber
              </h4>
              <ul className="space-y-3">
                {[
                  "Pioneering research in graphene-based advanced materials",
                  "Bridging laboratory science with real-world industrial applications",
                  "World-class team of researchers, engineers, and innovators",
                  "Creating stronger, lighter, more efficient, sustainable materials"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs md:text-sm text-zinc-500 leading-relaxed">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-black shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Flywheel */}
          {/* FIX: Added scale-[0.65] on mobile to prevent overflow of orbiting nodes */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 flex py-8 lg:py-0 justify-center perspective-[1000px] w-full"
          >
            <div className="relative scale-[0.75] sm:scale-90 md:scale-100 transition-transform duration-500">
              <div className="md:w-[450px] md:h-[450px] flex w-[320px] h-[320px] relative items-center justify-center">
                
                {/* Background Rings */}
                <div className="border-white/5 border rounded-full absolute inset-0"></div>
                <div className="absolute inset-12 border border-dashed border-brand-blue/20 rounded-full"></div>
                
                {/* Rotating Arrows Ring (Clockwise) */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[10%] rounded-full z-0 opacity-40 pointer-events-none"
                >
                   <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                      <defs>
                          <path id="arrow-cw" d="M -2 -2 L 2 0 L -2 2" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </defs>
                      <g transform="translate(50, 50)">
                          {[...Array(12)].map((_, i) => (
                              <use key={i} href="#arrow-cw" transform={`rotate(${i * 30}) translate(0, -48)`} />
                          ))}
                      </g>
                   </svg>
                </motion.div>

                {/* Center Piece with Rotating Text */}
                <div className="absolute w-40 h-40 flex items-center justify-center z-10">
                    {/* Text Ring (Counter-Clockwise) */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      className="absolute w-full h-full"
                    >
                        <svg viewBox="0 0 100 100" width="100%" height="100%">
                            <defs>
                                <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"></path>
                            </defs>
                            <text fontSize="8.5" fill="#fff" fontFamily="monospace" letterSpacing="3" fontWeight="bold">
                                <textPath xlinkHref="#circle">
                                    WEBER INNOVATIONS • FUTURE MATERIALS •
                                </textPath>
                            </text>
                        </svg>
                    </motion.div>
                    
                    {/* Center Logo */}
                    <div className="w-20 h-20 rounded-full bg-brand-blue relative flex items-center justify-center shadow-[0_0_40px_#3b82f6] overflow-hidden">
                        <div className="absolute w-full h-full border border-white/40 rounded-full animate-ping opacity-20"></div>
                        <span className="relative z-10 font-serif font-bold text-white text-3xl italic">W</span>
                    </div>
                </div>

                {/* Orbiting Nodes - Positioned Absolutely */}
                {/* Node 1: North (Research) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-32 p-3 rounded-xl text-center border border-white/10 bg-black/80 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] backdrop-blur-md">
                        <div className="text-brand-blue mb-2 flex justify-center"><Microscope className="w-5 h-5" /></div>
                        <div className="text-[10px] uppercase tracking-wider text-white font-mono">Pioneering Research</div>
                    </div>
                </div>

                {/* Node 2: East (Application) */}
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-32 p-3 rounded-xl text-center border border-white/10 bg-black/80 shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] backdrop-blur-md">
                        <div className="text-purple-400 mb-2 flex justify-center"><Factory className="w-5 h-5" /></div>
                        <div className="text-[10px] uppercase tracking-wider text-white font-mono">Industrial Scale</div>
                    </div>
                </div>

                {/* Node 3: South (Team) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
                    <div className="w-32 p-3 rounded-xl text-center border border-white/10 bg-black/80 shadow-[0_0_20px_-5px_rgba(234,179,8,0.3)] backdrop-blur-md">
                        <div className="text-yellow-400 mb-2 flex justify-center"><Users className="w-5 h-5" /></div>
                        <div className="text-[10px] uppercase tracking-wider text-white font-mono">World Class Team</div>
                    </div>
                </div>

                {/* Node 4: West (Sustainability) */}
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-32 p-3 rounded-xl text-center border border-white/10 bg-black/80 shadow-[0_0_20px_-5px_rgba(34,197,94,0.3)] backdrop-blur-md">
                        <div className="text-green-400 mb-2 flex justify-center"><Leaf className="w-5 h-5" /></div>
                        <div className="text-[10px] uppercase tracking-wider text-white font-mono">Sustainable Future</div>
                    </div>
                </div>
                
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const GrapheneDefinition = () => {
  const properties = [
    {
      title: "Strength",
      desc: "200x stronger than steel, yet incredibly flexible.",
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
      borderColor: "border-blue-100",
      spotlight: "rgba(37, 99, 235, 0.15)" // Blue
    },
    {
      title: "Conductivity",
      desc: "Superior electrical and thermal conductivity.",
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      bg: "bg-yellow-50",
      borderColor: "border-yellow-100",
      spotlight: "rgba(234, 179, 8, 0.15)" // Yellow
    },
    {
      title: "Transparency",
      desc: "Transparent yet electrically conductive.",
      icon: <Eye className="w-6 h-6 text-cyan-500" />,
      bg: "bg-cyan-50",
      borderColor: "border-cyan-100",
      spotlight: "rgba(6, 182, 212, 0.15)" // Cyan
    },
    {
      title: "Scalability",
      desc: "Highly scalable for industrial applications.",
      icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
      bg: "bg-emerald-50",
      borderColor: "border-emerald-100",
      spotlight: "rgba(16, 185, 129, 0.15)" // Emerald
    },
  ];

  return (
    <section className="py-32 bg-white text-slate-900 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-block"
           >
           </motion.div>
           
           <motion.h2 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl uppercase mt-6 mb-6 text-slate-900"
           >
             What is <span className="italic text-brand-blue">Graphene?</span>
           </motion.h2>
           
           <motion.p 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-slate-600 text-lg leading-relaxed font-light"
           >
             A revolutionary single-layer carbon material discovered in 2004—one of the 21st century's most significant breakthroughs in materials science.
           </motion.p>
        </div>

        {/* 4 Cards Grid with Color-Matching Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {properties.map((item, i) => (
             <SpotlightCard 
               key={i}
               className={`p-8 ${item.borderColor}`}
               spotlightColor={item.spotlight}
             >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h3 className="text-xl mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
             </SpotlightCard>
           ))}
        </div>

      </div>
    </section>
  );
};

const RoadmapSection = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  // Using state to trigger re-renders for active classes is expensive on scroll.
  // We will use direct DOM manipulation for maximum performance here, similar to the original script.

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const line = lineRef.current;
      if (!container || !line) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerTop = rect.top;
      const containerHeight = rect.height;

      // Calculate progress of the line
      let progress = 0;
      const startOffset = windowHeight * 0.5; 
      const endOffset = 100;

      if (containerTop < startOffset) {
        const scrolled = Math.abs(containerTop - startOffset);
        progress = (scrolled / (containerHeight - endOffset)) * 100;
      }

      progress = Math.max(0, Math.min(100, progress));
      line.style.height = `${progress}%`;

      // Trigger Items
      const items = container.querySelectorAll('.roadmap-item');
      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const triggerPoint = windowHeight * 0.75;

        // Elements to animate
        const dot = item.querySelector('.roadmap-dot');
        const content = item.querySelectorAll('.roadmap-content');

        if (itemRect.top < triggerPoint) {
          // Active State
          if (dot) {
            dot.classList.remove('border-zinc-700', 'bg-black');
            dot.classList.add('bg-brand-blue', 'border-brand-blue', 'shadow-[0_0_20px_rgba(59,130,246,0.6)]', 'scale-125');
          }
          content.forEach(c => {
            c.classList.remove('opacity-30', 'grayscale');
            c.classList.add('opacity-100', 'grayscale-0');
          });
        } else {
          // Inactive State
          if (dot) {
            dot.classList.add('border-zinc-700', 'bg-black');
            dot.classList.remove('bg-brand-blue', 'border-brand-blue', 'shadow-[0_0_20px_rgba(59,130,246,0.6)]', 'scale-125');
          }
          content.forEach(c => {
            c.classList.add('opacity-30', 'grayscale');
            c.classList.remove('opacity-100', 'grayscale-0');
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    { 
      id: "PHASE 01", 
      title: "Raw Material", 
      desc: "High-purity graphite sourced and verified for optimal quality standards." 
    },
    { 
      id: "PHASE 02", 
      title: "Exfoliation/CVD", 
      desc: "Mechanical or chemical vapor deposition to separate layers into single-atom graphene." 
    },
    { 
      id: "PHASE 03", 
      title: "Purification", 
      desc: "Multi-stage filtration and washing to remove impurities and achieve purity >99.5%." 
    },
    { 
      id: "PHASE 04", 
      title: "Characterization", 
      desc: "Rigorous testing and analysis via electron microscopy and spectroscopy." 
    },
    { 
      id: "PHASE 05", 
      title: "Packaging", 
      desc: "Careful preparation in inert atmosphere for safe transport and storage." 
    }
  ];

  return (
    <section className="overflow-hidden min-h-[800px] flex border-t border-white/5 pt-32 pb-32 relative bg-black items-center">
      
      {/* 3D Grid Floor Effect */}
      <div className="absolute inset-0 pointer-events-none perspective-[500px]">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: 'rotateX(60deg) scale(2) translateY(-20%)',
            maskImage: 'linear-gradient(to bottom, transparent, black 40%, black 80%, transparent)'
          }}
        ></div>
      </div>

      <div className="z-10 w-full max-w-5xl mx-auto px-6 relative">
        <div className="text-center mb-20">
    
          <h2 className="text-4xl md:text-5xl text-white mt-4 uppercase">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-500 italic">Graphene</span> is Made
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto font-light">
            Our proven 5-step process transforms raw carbon into high-quality graphene through carefully controlled procedures—optimized for purity and performance.
          </p>
        </div>

        <div ref={containerRef} className="relative roadmap-container">
          
          {/* Center Line */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800 md:-translate-x-1/2 h-full rounded-full overflow-hidden">
            <div ref={lineRef} className="w-full bg-brand-blue h-0 transition-all duration-75 ease-linear shadow-[0_0_20px_#3b82f6]"></div>
          </div>

          {/* Steps */}
          {steps.map((step, index) => (
            <div key={index} className="roadmap-item relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 mb-24 last:mb-0">
              
              {/* Center Dot */}
              <div className="roadmap-dot absolute left-[15px] md:left-1/2 top-0 w-3 h-3 rounded-full border-2 border-zinc-700 bg-black z-20 md:-translate-x-1/2 transition-all duration-500"></div>

              {/* Layout Logic: Alternating Sides on Desktop */}
              
              {/* Left Side Content (Visible on Desktop for Even Indices) */}
              <div className={`hidden md:block ${index % 2 === 0 ? 'text-right pr-12' : 'order-last pl-12'} pt-0 roadmap-content transition-all duration-700 opacity-30 grayscale`}>
                <span className="font-mono text-xs text-brand-blue tracking-widest mb-2 block">{step.id}</span>
                <h3 className="text-3xl text-white mb-4">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xs ml-auto">{step.desc}</p>
              </div>

              {/* Right Side / Mobile Content */}
              <div className={`pl-16 md:pl-0 pt-0 ${index % 2 === 0 ? 'md:order-last md:pl-12' : 'md:text-right md:pr-12'} roadmap-content transition-all duration-700 opacity-30 grayscale`}>
                
                {/* Mobile-Only Header */}
                <div className="md:hidden mb-2">
                  <span className="font-mono text-xs text-brand-blue tracking-widest mb-1 block">{step.id}</span>
                  <h3 className="text-2xl text-white">{step.title}</h3>
                </div>

                {/* Mobile Description / Desktop Details */}
                <div className={`${index % 2 !== 0 ? 'md:ml-auto' : ''}`}>
                   <p className="text-zinc-400 text-sm leading-relaxed md:hidden">{step.desc}</p>
                   
                   {/* Verification Checkmark (Visual candy) */}
                   <div className={`mt-4 flex items-center gap-2 text-xs text-zinc-500 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                      <div className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-brand-blue">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>Quality Verified</span>
                   </div>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

const MissionSection = () => {
  const objectives = [
    {
      text: "Pioneer breakthrough graphene applications across sectors",
      icon: <Rocket className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-50",
      borderColor: "border-blue-100",
      spotlight: "rgba(59, 130, 246, 0.25)" // Blue Glow
    },
    {
      text: "Accelerate transition to sustainable, high-performance materials",
      icon: <Leaf className="w-6 h-6 text-green-500" />,
      bg: "bg-emerald-50",
      borderColor: "border-emerald-100",
      spotlight: "rgba(34, 197, 94, 0.25)" // Green Glow
    },
    {
      text: "Collaborate with industry leaders to scale solutions",
      icon: <Users className="w-6 h-6 text-purple-500" />,
      bg: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      spotlight: "rgba(168, 85, 247, 0.25)" // Purple Glow
    },
    {
      text: "Push boundaries of materials science research",
      icon: <Microscope className="w-6 h-6 text-cyan-500" />,
      bg: "bg-cyan-50",
      borderColor: "border-cyan-100",
      spotlight: "rgba(6, 182, 212, 0.25)" // Cyan Glow
    }
  ];

  return (
    <section className="py-32 relative z-10 border-t border-white/10 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Mission Statement */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
            >
         
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl uppercase text-black mb-6 leading-tight"
            >
              OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-500 italic">MISSION</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-xl"
            >
              Democratizing graphene technology to solve humanity's most pressing challenges through advanced materials and innovative engineering.
            </motion.p>
          </div>

          {/* Right: Objectives Grid with Spotlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {objectives.map((item, i) => (
              <SpotlightCard
                key={i}
                className={`p-8 h-full flex flex-col justify-center bg-slate-200 ${item.borderColor}`}
                spotlightColor={item.spotlight}
                delay={0.3 + (i * 0.1)}
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} border ${item.borderColor} shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed font-light relative z-10">
                  {item.text}
                </p>
              </SpotlightCard>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};