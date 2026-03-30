import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowRight,MessageSquare, Mail, Clock, Route, MessageCircle, Menu, X
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

export default function Contact() {
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
            src="./assets/logo.png"
            alt="Weber Innovations" 
            className="h-12 w-auto object-contain" /* Adjust h-10 to h-8 or h-12 to fit your logo size */
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

      <ContactSupportSection />

      {/* Footer (Solid) */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10 px-6 z-20 relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              {/* Replace the text/icon with your image */}
              <img 
                src="./assets/logo.png"
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

function ContactSupportSection() {
  return (
    <section className="py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mb-10">
      {/* Header */}
      <div className="mb-12 md:mb-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
        >
        </motion.div>
        <h2 className="text-4xl sm:text-5xl md:text-7xl text-black mb-6 leading-tight">
          CONTACT <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-500 italic">US</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg font-light leading-relaxed px-2">
          Weber Innovations is transforming eight key industries with graphene-based solutions that enhance performance, efficiency, and sustainability.
        </p>
      </div>

      <div className="relative overflow-hidden ring-1 ring-white/10 bg-neutral-900 rounded-2xl shadow-2xl">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/60668e31-2150-424e-b292-05bfdda254e0_1600w.jpg" 
            alt="Abstract minimal background" 
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* Copy + Highlights (Order 1 on Mobile, Order 2 on Desktop) */}
            <div className="lg:col-span-7 flex flex-col justify-center h-full order-1 lg:order-2 mb-8 lg:mb-0">
              <h2 className="text-white tracking-tight text-4xl sm:text-5xl md:text-6xl">LET'S <span className="text-white italic">TALK.</span></h2>
              <p className="text-base sm:text-lg max-w-2xl text-neutral-300 mt-4 font-light leading-relaxed">
                Tell us about your setup—support, bulk orders, or partnerships. We reply within one business day.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur ring-1 ring-white/15 flex items-center justify-center text-red-400 shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Quick response</p>
                    <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">Most messages receive a reply in under 24h.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur ring-1 ring-white/15 flex items-center justify-center text-red-400 shrink-0">
                    <Route className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">Clear next steps</p>
                    <p className="text-neutral-400 text-xs mt-0.5 leading-relaxed">We’ll follow up with a concise plan and timeline.</p>
                  </div>
                </div>
              </div>

              {/* Direct contact card */}
              <div className="mt-10">
                <div className="inline-flex flex-wrap sm:flex-nowrap items-center gap-3 rounded-2xl bg-white/95 backdrop-blur ring-1 ring-black/10 shadow-lg p-3 pr-4 max-w-full">
                  <img 
                    src="https://hoirqrkdgbmvpwutwuwj-all.supabase.co/storage/v1/object/public/assets/assets/09f960eb-611f-430b-86b4-1d5a280d6eb8_800w.jpg" 
                    alt="Ask CEO" 
                    className="h-12 w-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 mr-2 flex-1">
                    <p className="text-[11px] text-neutral-500 leading-none uppercase tracking-wider font-semibold">Ask CEO</p>
                    <p className="text-neutral-900 font-medium tracking-tight truncate">Ava Kim</p>
                  </div>
                  <a 
                    href="mailto:weberinnovations.official@gmail.com"
                    className="ml-auto sm:ml-2 inline-flex items-center gap-2 rounded-xl bg-neutral-900 text-white px-4 py-2.5 text-xs font-medium hover:bg-neutral-800 transition-colors shrink-0"
                  >
                    Ask directly
                    <MessageCircle className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form card (Order 2 on Mobile, Order 1 on Desktop) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="rounded-2xl bg-white/95 backdrop-blur ring-1 ring-black/10 shadow-xl p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-neutral-500 uppercase tracking-wider font-semibold">Weber Support</p>
                    <h3 className="mt-1 text-2xl sm:text-3xl text-neutral-900">
                      HAVE A <span className="text-black italic">QUESTION?</span>
                    </h3>
                  </div>
                  <div className="h-9 w-9 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shrink-0 ml-4">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                </div>

                <form action="#" method="POST" className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="ct-name" className="block text-xs font-medium text-neutral-600">
                      Your name<span className="text-red-500"> *</span>
                    </label>
                    <input 
                      id="ct-name" 
                      name="name" 
                      type="text" 
                      required 
                      placeholder="Jane Doe" 
                      className="mt-1 w-full pl-3 pr-3 py-3 text-sm rounded-xl ring-1 ring-black/10 focus:ring-2 focus:ring-neutral-900 outline-none bg-white placeholder:text-neutral-400 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="ct-email" className="block text-xs font-medium text-neutral-600">
                      E‑mail<span className="text-red-500"> *</span>
                    </label>
                    <div className="relative mt-1">
                      <Mail className="h-4 w-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input 
                        id="ct-email" 
                        name="email" 
                        type="email" 
                        required 
                        placeholder="you@solace.com" 
                        className="w-full pl-9 pr-3 py-3 text-sm rounded-xl ring-1 ring-black/10 focus:ring-2 focus:ring-neutral-900 outline-none bg-white placeholder:text-neutral-400 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ct-msg" className="block text-xs font-medium text-neutral-600">Message</label>
                    <textarea 
                      id="ct-msg" 
                      name="message" 
                      rows="4" 
                      placeholder="How can we help?" 
                      className="mt-1 w-full resize-y pl-3 pr-3 py-3 text-sm rounded-xl ring-1 ring-black/10 focus:ring-2 focus:ring-neutral-900 outline-none bg-white placeholder:text-neutral-400 transition-all"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white px-4 py-3 text-sm font-medium hover:bg-neutral-800 transition-colors"
                  >
                    Send message
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </button>
                  <p className="text-[11px] text-neutral-500 text-center mt-2">By submitting, you agree to our Terms and Privacy Policy.</p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}