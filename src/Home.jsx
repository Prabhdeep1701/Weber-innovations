import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowRight, ShieldCheck, Zap, Globe, Activity,
  Mail, BarChart3, Phone, MapPin,
  Rocket, Users, Menu, X, Shield, Maximize2, Leaf,
  Linkedin, Instagram
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
        src="/assets/black.mp4"
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
    </div>
  );
};

// --- UI Components ---
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

// --- NEW HERO VISUAL (Floating Cards) ---
const HeroFloatingCards = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-8 lg:mt-0 relative perspective-1000 w-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[300px] h-[250px] sm:h-[300px] bg-black opacity-30 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="relative space-y-4 sm:space-y-5 w-full max-w-[320px] sm:max-w-sm">
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="p-3 sm:p-4 rounded-xl flex items-center gap-4 shadow-lg bg-white/80 backdrop-blur-md border border-white/40"
        >
          <div className="w-10 h-10 rounded-full flex items-center justify-center border shrink-0 bg-blue-50 text-brand-blue border-blue-100">
            <Rocket width="20" strokeWidth="1.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-0.5">
              <p className="text-xs font-semibold text-slate-900">Supply Chain</p>
              <span className="text-[10px] text-slate-400">Secure</span>
            </div>
            <p className="text-xs text-slate-500 truncate">Domestic + Scalable</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded border font-medium bg-slate-100 text-slate-600 border-slate-200">
            Verified
          </span>
        </motion.div>

        <motion.div
          animate={{ y: [5, -5, 5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="p-3 sm:p-4 rounded-xl flex items-center gap-4 shadow-lg lg:ml-8 bg-white/80 backdrop-blur-md border border-white/40"
        >
          <div className="flex shrink-0 bg-brand-blue w-10 h-10 border rounded-full items-center justify-center text-white border-blue-600">
            <Users width="20" strokeWidth="1.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-0.5">
              <p className="text-xs font-semibold text-slate-900">R&D Partners</p>
              <span className="text-[10px] text-slate-400">Active</span>
            </div>
            <p className="text-xs text-slate-500 truncate">Strategic Defence Ties</p>
          </div>
          <span className="bg-blue-100 text-[10px] px-2 py-0.5 rounded border border-blue-200 font-medium text-blue-800">
            3 Active
          </span>
        </motion.div>

        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="p-3 sm:p-4 rounded-xl flex items-center gap-4 shadow-lg lg:-ml-4 bg-white/80 backdrop-blur-md border border-white/40"
        >
          <div className="w-10 h-10 rounded-full text-white flex items-center justify-center border shrink-0 bg-slate-900 border-slate-800">
            <BarChart3 width="20" strokeWidth="1.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-0.5">
              <p className="text-xs font-semibold text-slate-900">Cost Efficiency</p>
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

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Weber Innovations | Industrial Graphene Production";
    window.scrollTo(0, 0);
  }, []);

  const handleOpenModal = (dataId) => {
    setSelectedSector(sectorsData[dataId]);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden font-sans selection:bg-brand-purple selection:text-white text-slate-900 bg-transparent">
      <VideoBackground />
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-brand-blue origin-left z-[100]" style={{ scaleX }} />

      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50 flex items-center justify-between p-3 pl-6 pr-4 bg-white/70 backdrop-blur-xl border border-white/40 rounded-full shadow-lg shadow-slate-200/50">
        <div className="flex items-center gap-2">
          <img src="/icon.png" alt="Weber Innovations" className="h-12 w-auto object-contain" />
        </div>

        <div className="hidden md:flex gap-12 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-black transition-colors">HOME</Link>
          <Link to="/about" className="hover:text-black transition-colors">ABOUT</Link>
          <Link to="/sectors" className="hover:text-black transition-colors">SECTORS</Link>
          <Link to="/insight" className="hover:text-black transition-colors">INSIGHTS</Link>
        </div>

        <div className="flex items-center gap-4">
          <ShinyButton onClick={() => navigate('/contact')} className="hidden sm:flex items-center rounded-full bg-slate-900 text-white text-sm font-bold transition-colors shadow-md">
            Contact <ArrowRight className="w-3 h-3" />
          </ShinyButton>
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden group flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-black hover:text-white transition-all duration-300">
            <Menu className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </nav>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="relative pt-32 pb-20 lg:pt-35 lg:pb-30 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-screen">
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
            <span className="text-xs font-bold text-brand-blue tracking-widest">Indigenous Manufacturing Hub</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[4rem] font-medium leading-[1.1] mb-6 text-slate-900"
          >
            Reinventing Industrial<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple italic">Graphene Production.</span>
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
            <ShinyButton onClick={() => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn More
            </ShinyButton>
            <button 
              onClick={() => navigate('/about')}
              className="px-8 py-4 rounded-full border border-slate-200 hover:bg-white hover:shadow-lg transition-all flex items-center gap-2 text-slate-700 font-medium bg-white/40 backdrop-blur-md"
            >
              Our Vision <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="order-2 relative z-10 w-full flex justify-center lg:justify-end"
        >
          <HeroFloatingCards />
        </motion.div>
      </main>

      <div className="w-full border-y border-slate-200 bg-white/70 backdrop-blur-md overflow-hidden py-10 relative z-10">
        <div className="flex animate-marquee gap-32 min-w-max">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-lg font-bold font-mono text-slate-400 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Defence R&D</span>
              <span className="text-lg font-bold font-mono text-slate-400 flex items-center gap-2"><Zap className="w-5 h-5" /> Energy Storage</span>
              <span className="text-lg font-bold font-mono text-slate-400 flex items-center gap-2"><Globe className="w-5 h-5" />Automobile Aerospace</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <AboutUs />

      <section className="py-32 px-6 relative z-10 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl mb-6 text-slate-900">The Graphene <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple italic">Paradox</span></h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>Graphene is the strongest, most conductive material ever discovered. Yet, 94% of global demand relies on inconsistent, high-cost imports.</p>
              <div className="p-6 rounded-2xl bg-slate-100 border border-white/50">
                <h4 className="text-black font-bold text-sm tracking-wide mb-3">Current Market Failures</h4>
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
                <span className="font-mono text-xs text-slate-400">Market Analysis</span>
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
            </SpotlightCard>
          </div>
        </div>
      </section>

      <SectorsSection onOpenModal={handleOpenModal} />
      <TrustedPartnersAndIntegrations />
      <CTASection />

      <footer className="bg-white border-t border-slate-200 pt-20 pb-10 px-6 z-20 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <img src="/icon.png" alt="Weber Innovations" className="h-20 w-auto object-contain mb-6" />
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Pioneering the synthesis of advanced 2D materials. Proudly engineered and manufactured in India.
            </p>
          </div>
          <div>
            <h4 className="text-slate-900 mb-4 font-bold">Products</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li>Graphene Nanoplatelets</li>
              <li>Reduced Graphene Oxide</li>
              <li>Functionalized GO</li>
              <li>Conductive Inks</li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 mb-4 font-bold">Contacts</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> <a href="mailto:weberinnovations.official@gmail.com">weberinnovations.official@gmail.com</a></li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> <a href="tel:+919557281101">+91 9557281101</a></li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Greater Noida, UP, India</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-200 pt-8 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Weber Innovations. All rights reserved.</p>
        </div>
      </footer>

      <SectorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} sector={selectedSector} />
    </div>
  );
}

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl md:hidden flex flex-col"
    >
      <div className="flex justify-end p-6">
        <button onClick={onClose} className="p-2 border border-white/10 rounded-md text-white"><X /></button>
      </div>
      <div className="flex-1 flex flex-col justify-center px-6">
        <nav className="grid gap-8">
          {[
            { label: 'Home', path: '/' },
            { label: 'About', path: '/about' },
            { label: 'Sectors', path: '/sectors' },
            { label: 'Insights', path: '/insight' },
            { label: 'Contact', path: '/contact' }
          ].map((item, i) => (
            <Link 
              key={item.label} 
              to={item.path} 
              className="text-4xl text-zinc-300 hover:text-white" 
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

function AboutUs() {
  const cards = [
    {
      title: 'Research',
      desc: 'Pioneering graphene research for real-world applications',
      img: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80'
    },
    {
      title: 'Commercialization',
      desc: 'Bridging cutting-edge research with commercial solutions',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
    },
    {
      title: 'Sustainability',
      desc: 'Creating materials that are stronger, lighter, and greener',
      img: '/assets/sustainability.jpeg'
    },
    {
      title: 'Innovation',
      desc: 'Unlocking graphene\'s full potential across industries',
      img: '/assets/innovation.webp'
    }
  ];

  return (
    <section id="about-us" className="pt-24 pb-24 bg-black/90 backdrop-blur-xl border-t border-slate-200 relative z-10">
      <div className="max-w-7xl w-full mx-auto px-6">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-slate-200 mb-4 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple italic">Us</span>
          </h2>
          <p className="text-sm sm:text-base animate-[fadeSlideIn_0.8s_ease-out_0.2s_both] text-neutral-300 font-geist max-w-none">
            Pioneering the synthesis of advanced 2D materials. Proudly engineered and manufactured in India.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[500px]" id="expanding-cards">
          {cards.map((card, i) => (
            <article
              key={i}
              className="card group w-full md:flex-1 relative overflow-hidden rounded-2xl transition-all duration-500 ease-out bg-neutral-900/60 ring-neutral-800 ring-1 hover:md:flex-[1.5] min-h-[300px] md:min-h-0"
            >
              <img
                src={card.img}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-[1.02] opacity-60 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 opacity-100 translate-y-4 md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto transition-all duration-500">
                <div className="rounded-xl bg-neutral-900/80 ring-1 ring-white/10 backdrop-blur p-5">
                  <h3 className="text-white text-2xl mb-2 font-geist">{card.title}</h3>
                  <p className="text-neutral-300 text-sm font-geist">{card.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorsSection({ onOpenModal }) {
  const sectors = [
    {
      id: 'electronics',
      title: 'Electronics & Semiconductors',
      desc: 'Revolutionizing the industry with flexible, ultra-thin, and highly conductive components.',
      img: 'https://newsroom.arm.com/wp-content/uploads/2023/08/GettyImages-1470664961-1400x788.jpg',
      col: 'md:col-span-6 lg:col-span-8'
    },
    {
      id: 'energy',
      title: 'Energy & Storage',
      desc: 'Boosting battery and supercapacitor performance with high-yield graphene additives.',
      color: '#3b82f6',
      col: 'md:col-span-6 lg:col-span-4'
    },
    {
      id: 'auto_aero',
      title: 'Automobiles & Aerospace',
      desc: 'Extreme lightweighting and thermal management solutions for the future of mobility.',
      img: 'https://global.videojet.com/wp-content/uploads/dam/image/industry-solution/aero-and-auto/aero-auto-homepage-high-res.bmp',
      col: 'md:col-span-3 lg:col-span-4'
    },
    {
      id: 'defense',
      title: 'Defence & Security',
      desc: 'Strategic materials for superior protection, stealth, and communication in critical environments.',
      img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
      col: 'md:col-span-3 lg:col-span-4'
    },
    {
      id: 'construction',
      title: 'Construction & Infrastructure',
      desc: 'High-performance Green Concrete admixtures with massive strength and lower CO2 emissions.',
      img: 'https://cicconstruction.com/app/uploads/2023/06/building-for-progress-why-infrastructure-development-is-worth-the-trouble-jpg.webp',
      col: 'md:col-span-6 lg:col-span-4'
    }
  ];

  return (
    <section id="sectors" className="py-32 px-6 bg-black/95 backdrop-blur-xl border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl text-slate-200 mb-4 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple italic">Sectors</span>
            </h2>
            <p className="text-slate-500 max-w-xl font-light">
              Bridging the gap between lab-scale potential and industrial scalability across eight key industries.
            </p>
          </div>
          <Link
            to="/sectors"
            className="text-brand-blue font-medium hover:text-brand-purple transition-all flex items-center gap-2 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md"
          >
            Explore All Sectors <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
          {sectors.map((s) => (
            <div
              key={s.id}
              onClick={() => onOpenModal(s.id)}
              className={`relative overflow-hidden rounded-3xl cursor-pointer group ${s.col} min-h-[350px] border border-white/10 shadow-2xl transition-all duration-500 hover:border-brand-blue/50`}
              style={s.color ? { backgroundColor: s.color } : {}}
            >
              {s.img && (
                <img
                  src={s.img}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              <div className="relative p-10 h-full flex flex-col justify-end">
                <div className="mb-4 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
                  </div>
                </div>

                <h3 className="text-3xl text-white font-medium mb-3 leading-tight transition-transform duration-500 group-hover:-translate-y-2">
                  {s.title}
                </h3>

                <p className="text-zinc-300 text-sm font-light leading-relaxed max-w-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {s.desc}
                </p>

                <div className="mt-6 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-brand-blue to-transparent transition-all duration-700"></div>
              </div>
            </div>
          ))}
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

          <h2 className="relative text-3xl md:text-5xl text-black mb-6 tracking-tight">
            Let's Grow <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple italic">Together.</span>
          </h2>

          <p className="relative text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-8 font-light">
            Whether you have a detailed brief or just an idea, We'd love to hear
            from you. Let's create something extraordinary together.
          </p>

          <div className="relative flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-500 border-t border-black/10 pt-10">
            <a href="https://www.linkedin.com/company/weber-innovations/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black transition-colors font-geist">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="https://www.instagram.com/weberinnovations_official/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black transition-colors font-geist">
              <Instagram className="w-4 h-4" /> Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TrustedPartnersAndIntegrations = () => {
  return (
    <div className="relative z-10">
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
      <section className="overflow-hidden bg-white pt-20 pb-20 md:pt-32 md:pb-32 relative border-t border-slate-200" id="integration">
        <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-100/40 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
        <div className="z-10 max-w-7xl mr-auto ml-auto px-6 relative">
          <div className="text-center mb-16 md:mb-32">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-900 mb-4 md:mb-6">
              What Makes <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple italic">Graphene</span> Special?
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto font-light">
              Unlocking extraordinary material properties for future technologies.
            </p>
          </div>
          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-1/2 left-[-50%] right-[-50%] h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent -translate-y-1/2"></div>
            <div className="hidden md:block absolute left-1/2 top-[-50%] bottom-[-50%] w-[1px] bg-gradient-to-b from-transparent via-slate-300 to-transparent -translate-x-1/2"></div>
            <div className="hidden md:block pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative w-[260px] h-[260px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="center-circle center-circle--3 w-56 h-56 rounded-full bg-blue-500/5"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="center-circle center-circle--2 w-40 h-40 rounded-full bg-blue-500/10"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="center-circle w-24 h-24 rounded-full bg-blue-500/20"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                  <div className="h-full w-px bg-gradient-to-b from-transparent via-blue-400/50 to-transparent absolute"></div>
                </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-32 md:gap-y-32">
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  <Shield className="w-7 h-7 text-black group-hover:text-black transition-colors" strokeWidth={1.75} />
                </div>
                <h3 className="text-black text-xl mb-2 font-geist">Strength</h3>
                <p className="text-sm text-slate-600 max-w-[280px] leading-relaxed font-geist">
                  200x stronger than steel, lightweight, revolutionary designs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  <Zap className="w-7 h-7 text-black group-hover:text-black transition-colors" strokeWidth={1.75} />
                </div>
                <h3 className="text-black text-xl mb-2 font-geist">Conductivity</h3>
                <p className="text-sm text-slate-600 max-w-[280px] leading-relaxed font-geist">
                  Superior electrical properties, thermal transfer, electronics innovation.
                </p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  <Leaf className="w-7 h-7 text-black group-hover:text-black transition-colors" strokeWidth={1.75} />
                </div>
                <h3 className="text-black text-xl mb-2 font-geist">Sustainability</h3>
                <p className="text-sm text-slate-600 max-w-[280px] leading-relaxed font-geist">
                  Abundant and scalable with low-impact manufacturing.
                </p>
              </div>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  <Maximize2 className="w-7 h-7 text-black group-hover:text-black transition-colors" strokeWidth={1.75} />
                </div>
                <h3 className="text-black text-xl mb-2 font-geist">Flexibility</h3>
                <p className="text-sm text-slate-600 max-w-[280px] leading-relaxed font-geist">
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