import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowRight,Zap, Globe, 
  Cpu, Plane, Hammer, HeartPulse, Shirt, Droplets, Shield, 
  Target, TrendingUp, Menu, X, Layers, Leaf, Mail, Phone, MapPin, Linkedin, Instagram
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
        src="/assets/black.mp4" 
      />
      {/* Light Overlay to keep text readable */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
    </div>
  );
};

// --- UI Components ---

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(59, 130, 246, 0.2)" }) => {
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
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl border bg-zinc-900/50 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`
        }}
      />
      
      {/* Border Highlight (Optional, mimics the spotlight on the border) */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
        style={{
          opacity,
          border: `1px solid ${spotlightColor.replace('0.2', '0.5')}`, // Make border slightly more opaque
          maskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(300px circle at ${position.x}px ${position.y}px, black, transparent)`
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};


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


// --- Main App ---

export default function Insight() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "Insights | Weber Innovations";
    window.scrollTo(0, 0);
  }, []);

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
          <Link to="/">
          <img 
            src="/icon.png"
            alt="Weber Innovations" 
            className="h-12 w-auto object-contain"
          />
          </Link>
        </div>

        {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                  {/* Contact Button (Hidden on very small screens if needed, or keep) */}
                  <ShinyButton onClick={() => navigate('/contact')} className="hidden sm:flex items-center rounded-full bg-slate-900 text-white text-sm font-bold transition-colors shadow-md">
                    Contact <ArrowRight className="w-3 h-3" />
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

      <SectorsAndStrategy />

      <ResearchTrends />


      {/* Footer (Solid) */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10 px-6 z-20 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              {/* Replace the text/icon with your image */}
              <img 
                src="/icon.png"
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
            <h4 className=" text-slate-900 mb-4">Products</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li className="hover:text-black cursor-pointer">Graphene Nanoplatelets</li>
              <li className="hover:text-black cursor-pointer">Reduced Graphene Oxide</li>
              <li className="hover:text-black cursor-pointer">Functionalized GO</li>
              <li className="hover:text-black cursor-pointer">Conductive Inks</li>
            </ul>
          </div>
          <div>
            <h4 className=" text-slate-900 mb-4 font-bold">Contacts</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li className="flex items-center gap-2 hover:text-black transition-colors">
                <Mail className="w-4 h-4" />
                <a href="mailto:weberinnovations.official@gmail.com">weberinnovations.official@gmail.com</a>
              </li>
              <li className="flex items-center gap-2 hover:text-black transition-colors">
                <Phone className="w-4 h-4" />
                <a href="tel:+919557281101">+91 9557281101</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Greater Noida, UP, India
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a href="https://www.linkedin.com/company/weber-innovations/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-black hover:text-white transition-all shadow-sm">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/weberinnovations_official/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-black hover:text-white transition-all shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
           <p>© {new Date().getFullYear()} Weber Innovations. All rights reserved.</p>
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
              { id: "01", label: "Home", href: "/" },
              { id: "02", label: "About", href: "/about" },
              { id: "03", label: "Sectors", href: "/sectors" },
              { id: "04", label: "Insights", href: "/insight" },
              { id: "05", label: "Contact", href: "/contact" }
            ].map((link) => (
              <Link 
                key={link.id}
                to={link.href} 
                onClick={onClose}
                className="group flex items-baseline gap-4 py-3 border-b border-white/5 hover:border-brand-blue/50 transition-colors"
              >
                <span className="font-mono text-xs text-brand-blue opacity-50 group-hover:opacity-100 transition-opacity">
                  {link.id}
                </span>
                <span className="text-4xl font-light tracking-tighter text-zinc-300 group-hover:text-white transition-colors">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </motion.div>
  );
};

const ResearchTrends = () => {
  const trends = [
    {
      title: "Hybrid Graphene Materials",
      desc: "Combining graphene with other materials for enhanced properties",
      icon: <Layers className="w-6 h-6 text-purple-400" />,
      color: "rgba(168, 85, 247, 0.2)", // Purple glow
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      title: "Sustainability Focus",
      desc: "Environmentally friendly production and circular economy applications",
      icon: <Leaf className="w-6 h-6 text-green-400" />,
      color: "rgba(34, 197, 94, 0.2)", // Green glow
      bg: "bg-green-500/10",
      border: "border-green-500/20"
    },
    {
      title: "Smart Applications",
      desc: "Integration into IoT devices, wearables, and real-time monitoring systems",
      icon: <Cpu className="w-6 h-6 text-blue-400" />,
      color: "rgba(59, 130, 246, 0.2)", // Blue glow
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      title: "Scalability Solutions",
      desc: "Manufacturing advances making graphene accessible for mass-market use",
      icon: <TrendingUp className="w-6 h-6 text-amber-400" />,
      color: "rgba(251, 191, 36, 0.2)", // Amber glow
      bg: "bg-amber-500/10",
      border: "border-amber-500/20"
    }
  ];

  return (
    <section className="py-24 md:py-32 relative z-10 border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl text-white tracking-tighter"
          >
            Key Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-500 italic">Trends</span>
          </motion.h2>
        </div>
        
        {/* Trends Grid using Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {trends.map((trend, i) => (
            <SpotlightCard 
              key={i}
              className="p-6 md:p-10 bg-[#050505] border-white/10"
              spotlightColor={trend.color}
              delay={i * 0.1}
            >
              <div className="flex items-start gap-7">
                <div className={`w-14 h-14 rounded-lg ${trend.bg} border ${trend.border} flex items-center justify-center shrink-0`}>
                  {trend.icon}
                </div>
                <div>
                  <h3 className="text-xl text-white font-medium tracking-tight mb-2">
                    {trend.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-light">
                    {trend.desc}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
};


const SectorsAndStrategy = () => {
  const sectors = [
    {
      id: 1,
      title: "Graphene in Next-Generation Batteries",
      points: ["50% faster charging times", "30% higher energy density", "Accelerates EV and renewable energy adoption"],
      icon: <Zap className="w-6 h-6" />,
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
      color: "from-blue-500/20 to-purple-500/20"
    },
    {
      id: 2,
      title: "Scalable Graphene Production Methods",
      points: ["Cost-effective manufacturing", "Environmentally sustainable processes", "Key to mainstream market adoption"],
      icon: <TrendingUp className="w-6 h-6" />,
      img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop",
      color: "from-yellow-500/20 to-orange-500/20"
    },
    {
      id: 3,
      title: "Graphene in Healthcare Applications",
      points: ["Revolutionary biosensors for disease detection", "1000x more sensitive than traditional methods", "Enables earlier diagnosis and treatment"],
      icon: <HeartPulse className="w-6 h-6" />,
      img: "https://images.unsplash.com/photo-1559586616-361e18714958?q=80&w=1000&auto=format&fit=crop",
      color: "from-sky-500/20 to-indigo-500/20"
    },
    {
      id: 4,
      title: "Graphene Reinforced Composites for Aerospace",
      points: ["20% weight reduction in aircraft", "Increased structural strength", "Reduces fuel consumption industry-wide"],
      icon: <Plane className="w-6 h-6" />,
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
      color: "from-stone-500/20 to-zinc-500/20"
    }
    
  ];

  return (
    <div className="relative w-full overflow-hidden z-10">
      <section className="py-32 relative z-10 border-t bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl w-full mx-auto px-6">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
          </motion.div>
          <h2 className="text-5xl md:text-7xl text-black mb-6">
            Graphene Insights and <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-500 italic">Research Trends</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Stay updated with the latest developments and breakthroughs shaping the future of advanced materials.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7">
          {sectors.map((sector, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-96 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={sector.img} 
                  alt={sector.title} 
                  className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              </div>

              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${sector.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-auto opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 mb-4">
                    {sector.icon}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono text-brand-blue mb-2 block opacity-80">0{sector.id}</span>
                  <h3 className="text-4xl text-white mb-3 leading-tight">{sector.title}</h3>
                  
                  <ul className="space-y-2">
                    {sector.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" style={{ transitionDelay: `${idx * 50}ms` }}>
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-blue"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>


    </div>
  );
};
