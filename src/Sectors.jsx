import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowRight, Zap, Globe,
  Cpu, Plane, Hammer, HeartPulse, Shirt, Droplets, Shield,
  Target, TrendingUp, Menu, X, Mail, Phone, MapPin, Linkedin, Instagram
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SectorModal from './components/SectorModal';
import { sectorsData } from './data/sectorsData';

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
      className={`relative rounded-2xl border  bg-zinc-900/50 backdrop-blur-md shadow-lg overflow-hidden ${className}`}
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


const ShinyButton = ({ children, className = "", ...props }) => {
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

export default function SectorsPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Sectors | Weber Innovations";
    window.scrollTo(0, 0);
  }, []);

  const handleOpenModal = (dataId) => {
    setSelectedSector(sectorsData[dataId]);
    setIsModalOpen(true);
  };

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
            src="/icon.png"
            alt="Weber Innovations"
            className="h-12 w-auto object-contain"
          />
        </div>

        <div className="hidden md:flex gap-12 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-black transition-colors">HOME</Link>
          <Link to="/about" className="hover:text-black transition-colors">ABOUT</Link>
          <Link to="/sectors" className="hover:text-black transition-colors">SECTORS</Link>
          <Link to="/insight" className="hover:text-black transition-colors">INSIGHTS</Link>
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

      <SectorsAndStrategy onOpenModal={handleOpenModal} />

      <SectorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        sector={selectedSector} 
      />


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


const SectorsAndStrategy = ({ onOpenModal }) => {
  const sectors = [
    {
      id: 1,
      title: "Electronics & Semiconductors",
      points: ["Flexible, ultra-thin components", "Next-gen transistors & screens"],
      icon: <Cpu className="w-6 h-6" />,
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
      color: "from-blue-500/20 to-purple-500/20",
      dataId: "electronics"
    },
    {
      id: 2,
      title: "Energy & Storage",
      points: ["Graphene supercapacitors", "Higher density & faster charging"],
      icon: <Zap className="w-6 h-6" />,
      img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop",
      color: "from-yellow-500/20 to-orange-500/20",
      dataId: "energy"
    },
    {
      id: 3,
      title: "Automotive & Aerospace",
      points: ["20% lighter composites", "Heat-dissipating coatings"],
      icon: <Plane className="w-6 h-6" />,
      img: "https://images.unsplash.com/photo-1559586616-361e18714958?q=80&w=1000&auto=format&fit=crop",
      color: "from-sky-500/20 to-indigo-500/20",
      dataId: "auto_aero"
    },
    {
      id: 4,
      title: "Construction",
      points: ["Enhanced cement", "Greater tensile strength"],
      icon: <Hammer className="w-6 h-6" />,
      img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
      color: "from-stone-500/20 to-zinc-500/20",
      dataId: "construction"
    },
    {
      id: 5,
      title: "Healthcare",
      points: ["Advanced biosensors", "Drug delivery systems"],
      icon: <HeartPulse className="w-6 h-6" />,
      img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1000&auto=format&fit=crop",
      color: "from-red-500/20 to-pink-500/20",
      dataId: "healthcare"
    },
    {
      id: 6,
      title: "Textiles",
      points: ["Smart temperature fabrics", "Conductive wearables"],
      icon: <Shirt className="w-6 h-6" />,
      img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop",
      color: "from-violet-500/20 to-fuchsia-500/20",
      dataId: "textiles"
    },
    {
      id: 7,
      title: "Water Filtration",
      points: ["Graphene oxide membranes", "Efficient desalination"],
      icon: <Droplets className="w-6 h-6" />,
      img: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=1000&auto=format&fit=crop",
      color: "from-cyan-500/20 to-teal-500/20",
      dataId: "water"
    },
    {
      id: 8,
      title: "Defense",
      points: ["High-strength armor", "EMI shielding"],
      icon: <Shield className="w-6 h-6" />,
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
      color: "from-emerald-500/20 to-green-500/20",
      dataId: "defense"
    }
  ];

  const handleOpenModal = (dataId) => {
    onOpenModal(dataId);
  };

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
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-500 italic">Sectors</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Weber Innovations is transforming eight key industries with graphene-based solutions that enhance performance, efficiency, and sustainability.
            </p>
          </div>

          {/* Sectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {sectors.map((sector, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleOpenModal(sector.dataId)}
                className="group relative h-96 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 cursor-pointer"
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
                    <h3 className="text-2xl text-white mb-3 leading-tight">{sector.title}</h3>

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

      {/* --- SECTION: WHY THESE SECTORS (Black Background with Spotlight Cards) --- */}
      <section className="py-32 bg-black text-white relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/10 blur-[120px] rounded-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl text-white mb-4">Why These <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple italic">Sectors?</span></h2>
              <p className="text-zinc-400 text-lg font-light">
                Our strategy focuses on high-impact industries where graphene solves critical performance bottlenecks.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1: Strategic Impact (Blue) */}
            <SpotlightCard
              className="p-8 bg-zinc-900/50 border-white/10 backdrop-blur-md hover:bg-zinc-900"
              spotlightColor="rgba(59, 130, 246, 0.2)"
            >
              <div className="w-14 h-14 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-brand-blue" />
              </div>
              <h3 className="text-2xl text-white mb-3">Strategic Impact</h3>
              <p className="text-zinc-400 leading-relaxed">
                Targeting industries with the highest graphene impact potential. We focus on markets where material performance dictates market leadership.
              </p>
            </SpotlightCard>

            {/* Card 2: Critical Challenges (Purple) */}
            <SpotlightCard
              className="p-8 bg-zinc-900/50 border-white/10 backdrop-blur-md hover:bg-zinc-900"
              spotlightColor="rgba(168, 85, 247, 0.2)"
            >
              <div className="w-14 h-14 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-purple-500" />
              </div>
              <h3 className="text-2xl text-white mb-3 ">Critical Challenges</h3>
              <p className="text-zinc-400 leading-relaxed">
                Addressing urgent bottlenecks from energy storage efficiency to aerospace weight reduction. Solving problems standard materials cannot touch.
              </p>
            </SpotlightCard>

            {/* Card 3: Global Sustainability (Green) */}
            <SpotlightCard
              className="p-8 bg-zinc-900/50 border-white/10 backdrop-blur-md hover:bg-zinc-900"
              spotlightColor="rgba(34, 197, 94, 0.2)"
            >
              <div className="w-14 h-14 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-green-500" />
              </div>
              <h3 className="text-2xl text-white mb-3">Global Sustainability</h3>
              <p className="text-zinc-400 leading-relaxed">
                Driving innovation that isn't just faster or stronger, but greener. Reducing carbon footprints in construction and extending product lifecycles.
              </p>
            </SpotlightCard>

          </div>
        </div>
      </section>

    </div>
  );
};
