import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { supabase } from './supabase';
import {
  Menu,
  MapPin,
  Code2,
  Palette,
  TrendingUp,
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Award,
  Users,
  Coffee,
  Heart,
  Sparkles,
  CodeXml,
  ShoppingCart,
  Search,
  Server,
  ChevronRight,
  Trophy,
  Zap,
  Monitor,
  ExternalLink,
  Mail,
  Phone,
  Send,
  Star,
  Clock,
  Calendar,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as any;

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } }
};

const rotateIn = {
  hidden: { opacity: 0, rotate: -8, scale: 0.9 },
  visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.7, ease: EASE } }
};

// Floating orb background component
function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -60, 80, 0], y: [0, 80, -40, 0], scale: [1, 0.8, 1.3, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[40%] right-[5%] w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[140px]"
      />
      <motion.div
        animate={{ x: [0, 50, -70, 0], y: [0, -80, 60, 0], scale: [1, 1.1, 0.85, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-emerald-600/8 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, -40, 60, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 9 }}
        className="absolute top-[60%] left-[10%] w-[300px] h-[300px] bg-rose-600/6 rounded-full blur-[90px]"
      />
    </div>
  );
}

// Animated grid lines background
function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}
    />
  );
}

const projects = [
  {
    id: 1,
    title: "AI Islam - Your Best AI Tool",
    description: "An intelligent AI-powered platform built for the Muslim community, offering Islamic knowledge, Quran tafsir, Hadith search, prayer guidance, and personalized spiritual assistance — all powered by advanced AI models.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1000&auto=format&fit=crop",
    tech: ['React Native', 'Next.js', 'Node.js', 'OpenAI', 'MongoDB', 'Cross-Platform'],
    featured: true,
    demo: "https://aiislamofficial.vercel.app/"
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "PlantBox is a complete e-commerce platform that allows users to buy and sell plants online. It features a user-friendly interface, secure payment integration, and a wide range of plant products.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    tech: ['E-Commerce', 'Razorpay', 'Online Shopping', 'Wordpress'],
    featured: true,
    comingSoon: true
  },
  {
    id: 3,
    title: "Results Management System",
    description: "A comprehensive results management system for educational institutions, allowing for efficient handling of student results, grading, and reporting.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    tech: ['Next.js', 'MongoDB', 'Supabase'],
    featured: false,
    comingSoon: true
  },
  {
    id: 4,
    title: "Business Website",
    description: "A creative Website for a dubai-based business, showcasing their services and portfolio with modern design and professional presentation.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    tech: ['Responsive', 'Mobile-Friendly', 'SEO-Optimized'],
    featured: false,
    comingSoon: true,
    overlay: {
      yellow: "Solutions",
      white1: "to make",
      white2: "things easier"
    }
  },
  {
    id: 5,
    title: "Business Website for RKD Works",
    description: "Business website for RKD Works, showcasing their services and portfolio with responsive design and local SEO optimization features.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    tech: ['Business Website', 'SEO-Optimized', 'Responsive'],
    featured: false,
    comingSoon: true,
    overlayText: "RKD"
  }
];

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    setErrorMsg('');

    console.log('[ContactForm] Submitting:', form);

    if (!supabase) {
      setErrorMsg('Supabase is not configured. Check your .env file.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    const { error } = await supabase.from('messages').insert([{
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      read: false,
    }]);

    if (error) {
      console.error('[ContactForm] Insert error:', error.message);
      setErrorMsg(error.message);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    console.log('[ContactForm] Message saved successfully');
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  const inputCls = "w-full bg-[#131826] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:shadow-[0_0_12px_rgba(139,92,246,0.15)] transition-all";

  return (
    <motion.div variants={fadeInUp} className="space-y-8">
      <h3 className="text-2xl font-bold text-white">Send me a message</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-300">Full Name</label>
            <input type="text" value={form.name} onChange={set('name')} placeholder="John Doe" required className={inputCls} />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Email Address</label>
          <input type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" required className={inputCls} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Subject</label>
          <input type="text" value={form.subject} onChange={set('subject')} placeholder="Project Collaboration" className={inputCls} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Message</label>
          <textarea rows={4} value={form.message} onChange={set('message')} placeholder="Tell me about your project..." required className={`${inputCls} resize-none`}></textarea>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium py-3.5 rounded-lg flex items-center justify-center space-x-2">
              <CheckCircle2 size={18} /><span>Message sent successfully!</span>
            </motion.div>
          ) : status === 'error' ? (
            <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="w-full bg-red-500/10 border border-red-500/30 text-red-400 font-medium py-3.5 rounded-lg flex items-center justify-center space-x-2 text-sm px-4">
              <span>Failed: {errorMsg || 'Something went wrong. Try again.'}</span>
            </motion.div>
          ) : (
            <motion.button key="btn" type="submit" disabled={status === 'sending'}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="btn-emerald w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-medium py-3.5 rounded-lg flex items-center justify-center space-x-2 transition-colors">
              {status === 'sending' ? (
                <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /><span>Sending...</span></>
              ) : (
                <><Send size={18} /><span>Send Message</span></>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </form>

      <div className="bg-[#131826] border border-white/5 rounded-2xl p-6 space-y-4">
        <h4 className="text-lg font-bold text-white">Let's create something amazing together!</h4>
        <p className="text-gray-400 text-sm leading-relaxed">Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.</p>
        <ul className="space-y-2 pt-2">
          {['Usually responds within 24 hours','Available for remote collaboration','Open to freelance and full-time opportunities','Building high-performing websites & SEO strategies'].map((item, i) => (
            <li key={i} className="flex items-start space-x-2 text-sm text-gray-300">
              <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" /><span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const imageY = useTransform(scrollY, [0, 600], [0, 60]);
  const imageRotate = useTransform(scrollY, [0, 600], [0, 4]);

  useEffect(() => {
    const sections = ['home', 'about', 'services', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    // Magnetic mouse tracking for btn-primary
    const handleMouseMove = (e: MouseEvent) => {
      const btn = (e.currentTarget as HTMLElement);
      const rect = btn.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty('--mx', `${x}%`);
      btn.style.setProperty('--my', `${y}%`);
    };
    const btns = document.querySelectorAll<HTMLElement>('.btn-primary');
    btns.forEach(b => b.addEventListener('mousemove', handleMouseMove));

    return () => {
      observers.forEach((o) => o.disconnect());
      btns.forEach(b => b.removeEventListener('mousemove', handleMouseMove));
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white font-sans selection:bg-purple-500/30 relative overflow-x-hidden">
      <FloatingOrbs />
      <GridBackground />
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#0A0F1C]/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 md:px-12 lg:px-24">
          <a href="#home" className="group text-2xl font-bold tracking-tight cursor-pointer">
            <span className="transition-colors duration-300 group-hover:text-purple-400">RAZI</span><span className="text-purple-500 transition-colors duration-300 group-hover:text-white">kv</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            <a href="#home" className={`relative group pb-1 transition-colors ${activeSection === 'home' ? 'text-emerald-400' : 'hover:text-white'}`}>
              Home
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 origin-left transition-transform duration-300 ${activeSection === 'home' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </a>

            {/* About dropdown */}
            <div className="relative group">
              <a href="#about" className={`relative pb-1 transition-colors inline-block ${activeSection === 'about' ? 'text-emerald-400' : 'hover:text-white'}`}>
                About
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 origin-left transition-transform duration-300 ${activeSection === 'about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </a>
              <div className="absolute top-full left-0 mt-4 w-[480px] opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out z-50 pointer-events-none group-hover:pointer-events-auto">
                <div className="absolute -top-2 left-6 w-4 h-4 bg-[#131826] border-l border-t border-white/10 rotate-45" />
                <div className="bg-[#131826] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                  <div className="flex gap-0">
                    <div className="w-52 shrink-0 relative overflow-hidden min-h-[240px]">
                      <img src="https://i.pinimg.com/736x/be/62/bd/be62bda2f0917f849b036b86c00da298.jpg" alt="RAZI" className="w-full h-full object-cover object-top absolute inset-0" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#131826]/50" />
                    </div>
                    <div className="flex-1 p-5 space-y-3">
                      <div>
                        <h3 className="text-white font-bold text-base">Hi, I'm RAZI ✦</h3>
                        <div className="w-10 h-0.5 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full mt-1.5" />
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">Web Designer & Developer with 7+ years of experience building stunning digital experiences, e-commerce platforms, and SEO strategies.</p>
                      <div>
                        <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-wider mb-1.5">Core Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                          {['Web Design', 'React', 'Next.js', 'SEO', 'E-Commerce'].map(s => (
                            <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-purple-500/30 text-purple-300 bg-purple-500/10">{s}</span>
                          ))}
                        </div>
                      </div>
                      <a href="#about" className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-full transition-all hover:opacity-90">Learn more about me →</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {[
              { id: 'services', label: 'Services', href: '#services' },
              { id: 'skills', label: 'Skills', href: '/skills' },
              { id: 'projects', label: 'Projects', href: '/projects' },
              { id: 'contact', label: 'Contact', href: '#contact' },
            ].map(({ id, label, href }) => (
              <a key={id} href={href} className={`relative group pb-1 transition-colors ${activeSection === id ? 'text-emerald-400' : 'hover:text-white'}`}>
                {label}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 origin-left transition-transform duration-300 ${activeSection === id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <a href="https://wa.me/918129489071" target="_blank" rel="noopener noreferrer"
              className="btn-emerald hidden md:flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full font-medium text-sm transition-colors">
              <MessageCircle size={15} />
              <span>WhatsApp</span>
            </a>
            {/* Mobile hamburger */}
            <button onClick={() => setMobileMenuOpen(o => !o)} className="md:hidden text-gray-400 hover:text-white p-1" aria-label="Toggle menu">
              {mobileMenuOpen
                ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t border-white/5 bg-[#0A0F1C]/95 backdrop-blur-md"
            >
              <div className="px-4 py-6 space-y-1">
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'About', href: '#about' },
                  { label: 'Services', href: '#services' },
                  { label: 'Skills', href: '/skills' },
                  { label: 'Projects', href: '/projects' },
                  { label: 'Contact', href: '#contact' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    {label}
                    <ChevronRight size={16} className="text-gray-600" />
                  </a>
                ))}
                <div className="pt-4">
                  <a href="https://wa.me/918129489071" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-medium text-sm transition-colors w-full">
                    <MessageCircle size={16} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <motion.main 
        id="home"
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer}
        className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-12 md:pt-40 md:pb-24 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10"
      >
        {/* Hero spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-purple-600/15 via-transparent to-transparent pointer-events-none blur-3xl" />

        {/* Left Content */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} variants={fadeInLeft} className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-300">
            <MapPin size={14} className="text-emerald-500" />
            <span>Available for freelance work</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-2"></span>
          </div>

          {/* Headings */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent pb-2 glow-text">
              RAZI
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-100">
              Web Designer & Developer
            </h2>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300">
              <Code2 size={16} className="text-blue-400" />
              <span>Web Development</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300">
              <Palette size={16} className="text-purple-400" />
              <span>Graphic Design</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300">
              <TrendingUp size={16} className="text-emerald-400" />
              <span>Digital Marketing</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl">
            Expert in creating stunning digital experiences through <span className="text-blue-400 font-medium">E-Commerce solutions</span>, <span className="text-purple-400 font-medium">SEO optimization</span>, and <span className="text-emerald-400 font-medium">digital marketing strategies</span>. Transforming ideas into powerful, results-driven websites.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="/projects" className="btn-primary flex items-center space-x-2 bg-[#8B5CF6] hover:bg-purple-600 text-white px-8 py-3.5 rounded-full font-medium transition-colors">
              <span>View My Work</span>
              <ArrowDown size={18} />
            </a>
            <a href="/resume" className="btn-ghost flex items-center space-x-2 bg-transparent border border-white/20 text-white px-8 py-3.5 rounded-full font-medium">
              <Download size={18} />
              <span>View Resume</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4 pt-4">
            <a href="#" className="btn-social p-3.5 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white">
              <Github size={20} />
            </a>
            <a href="#" className="btn-social p-3.5 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white">
              <Linkedin size={20} />
            </a>
            <a href="#" className="btn-social p-3.5 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-3.5 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.545 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281.082.098.094.189.069.286-.078.32-.252 1.024-.287 1.168-.046.19-.152.232-.35.14-1.305-.608-2.122-2.52-2.122-4.057 0-3.305 2.402-6.34 6.924-6.34 3.636 0 6.458 2.59 6.458 6.05 0 3.616-2.278 6.526-5.442 6.526-1.063 0-2.063-.553-2.405-1.205l-.653 2.49c-.236.905-.875 2.035-1.305 2.723A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Right Content - Image */}
        <motion.div 
          variants={fadeInRight}
          style={{ y: imageY }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Spinning ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-20px] rounded-[2.5rem] border border-dashed border-purple-500/20 pointer-events-none"
          />
          {/* Spinning ring 2 */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-40px] rounded-[3rem] border border-dashed border-emerald-500/10 pointer-events-none"
          />

          {/* Glow blob behind image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-blue-600/20 to-emerald-600/20 blur-[60px] rounded-[2rem] scale-110" />

          {/* Image Container */}
          <motion.div
            style={{ rotate: imageRotate }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[480px] aspect-square lg:aspect-[4/4.5] rounded-[2rem] bg-[#1A1F2E] border border-white/10 overflow-hidden shadow-2xl hover:shadow-purple-500/30 transition-shadow duration-500 group"
          >
            {/* Corner glows */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/40 blur-[60px] rounded-full mix-blend-screen transition-all duration-700 group-hover:w-64 group-hover:h-64 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/30 blur-[60px] rounded-full mix-blend-screen transition-all duration-700 group-hover:w-64 group-hover:h-64 pointer-events-none" />

            <img 
              src="https://i.pinimg.com/736x/be/62/bd/be62bda2f0917f849b036b86c00da298.jpg"
              alt="RAZI" 
              className="w-full h-full object-cover object-top"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/70 via-transparent to-transparent" />

            {/* Floating badge on image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-white font-medium">Available for work</span>
              </div>
              <span className="text-xs text-emerald-400 font-bold">2026</span>
            </motion.div>
          </motion.div>

          {/* Floating skill chips */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-1/4 bg-[#1A1F2E] border border-blue-500/30 rounded-xl px-3 py-2 shadow-lg shadow-blue-500/10 hidden lg:flex items-center space-x-2"
          >
            <Code2 size={14} className="text-blue-400" />
            <span className="text-xs text-white font-medium">React Dev</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-4 top-1/3 bg-[#1A1F2E] border border-emerald-500/30 rounded-xl px-3 py-2 shadow-lg shadow-emerald-500/10 hidden lg:flex items-center space-x-2"
          >
            <TrendingUp size={14} className="text-emerald-400" />
            <span className="text-xs text-white font-medium">SEO Expert</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -left-2 bottom-1/4 bg-[#1A1F2E] border border-purple-500/30 rounded-xl px-3 py-2 shadow-lg shadow-purple-500/10 hidden lg:flex items-center space-x-2"
          >
            <Palette size={14} className="text-purple-400" />
            <span className="text-xs text-white font-medium">UI Designer</span>
          </motion.div>
        </motion.div>
      </motion.main>

      {/* Section Divider */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          <motion.div
            whileInView={{ rotate: [0, 180, 360] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="w-2 h-2 bg-purple-500 rounded-full"
          />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </div>
      </div>

      {/* About Section */}
      <motion.section 
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10"
      >
        {/* Section ambient glow */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute right-0 top-1/3 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Left Content */}
        <motion.div variants={fadeInLeft} className="space-y-8">
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">About Me</h2>
            <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-gradient-to-r from-purple-500 to-transparent rounded-full" />
            <div className="absolute -bottom-2 left-0 w-16 h-0.5 bg-purple-500 rounded-full blur-sm opacity-70" />
          </div>
          
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed relative">
            {/* Decorative Circle */}
            <div className="absolute -left-8 top-2 w-6 h-6 rounded-full border border-purple-500/30 flex items-center justify-center hidden md:flex shadow-[0_0_8px_rgba(139,92,246,0.3)]">
              <div className="w-1.5 h-1.5 bg-purple-500/60 rounded-full"></div>
            </div>
            
            <p>
              I'm RAZI, expert Web Designer & Developer in Malappuram, Kerala with over 1 years of experience in creating digital experiences that drive business results. My expertise spans across E-Commerce development, SEO optimization, digital marketing, and graphic design.
            </p>
            <p>
              I believe in creating websites that not only look stunning but also convert visitors into customers. Every project I undertake is designed with user experience, search engine optimization, and business growth in mind.
            </p>
            <p>
              When I'm not coding or designing, you can find me exploring the latest web technologies, studying market trends, or helping businesses establish their digital presence through strategic marketing initiatives.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <h3 className="text-2xl font-bold text-white">What I Do</h3>
            <div className="flex flex-wrap gap-3">
              {[
                'Web Design', 'Web Development', 'E-Commerce Development',
                'SEO Optimization', 'Digital Marketing', 'Mobile App Development',
                'Graphic Design', 'Brand Strategy', 'Wikipedia Page Creation'
              ].map((skill) => (
                <div key={skill} className="bg-[#13182B] border border-white/8 hover:border-purple-500/40 hover:text-white hover:shadow-[0_0_12px_rgba(139,92,246,0.2)] transition-all duration-300 rounded-full px-5 py-2.5 text-sm font-medium text-gray-400 cursor-default">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div variants={fadeInRight} className="relative">
          {/* Circular Image with Glow */}
          <div className="relative w-full max-w-[480px] mx-auto aspect-square">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple-900/20 via-slate-800/10 to-indigo-900/20 blur-[80px] rounded-full -z-10"></div>
            
            {/* Floating Shapes */}
            {/* Top Right Circle */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-900/40 rounded-full border border-purple-500/10 shadow-lg"></div>
            {/* Bottom Left Circle */}
            <div className="absolute bottom-12 -left-8 w-16 h-16 bg-indigo-900/40 rounded-full border border-indigo-500/10 shadow-lg"></div>
            {/* Middle Left Pill */}
            <div className="absolute top-1/3 -left-12 w-6 h-16 bg-slate-700/50 rounded-full border border-white/5 shadow-lg"></div>
            {/* Middle Right Circle */}
            <div className="absolute top-1/3 -right-8 w-12 h-12 bg-slate-700/50 rounded-full border border-white/5 shadow-lg"></div>
            {/* Bottom Right Square */}
            <div className="absolute -bottom-4 right-12 w-8 h-8 bg-purple-900/40 opacity-80 rotate-12 rounded-sm border border-purple-500/10 shadow-lg"></div>
            {/* Top Left Hollow Square */}
            <div className="absolute top-0 left-12 w-10 h-10 border-[2px] border-white/10 opacity-60 rotate-12 rounded-sm"></div>
            
            {/* Main Image */}
            <div className="w-full h-full rounded-full border border-white/10 overflow-hidden relative z-10 bg-[#1A1F2E] group">
              <img 
                src="https://i.pinimg.com/736x/6f/39/9f/6f399f287cb364bea56701a654b4a193.jpg"
                alt="RAZI" 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Badge */}
            <div className="absolute bottom-6 right-0 bg-[#1A1F2E] border border-white/10 text-white font-bold px-6 py-2.5 rounded-full shadow-lg z-20 text-sm">
              1 Year
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-10 md:mt-12">
            <div className="bg-[#131826] border border-white/5 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.12)] rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500/10 text-white rounded-xl flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.2)]">
                <Award size={24} className="text-purple-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="text-sm text-gray-400 mt-1">Projects Completed</div>
              </div>
            </div>
            
            <div className="bg-[#131826] border border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(99,102,241,0.12)] rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/10 text-white rounded-xl flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.2)]">
                <Users size={24} className="text-blue-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">30+</div>
                <div className="text-sm text-gray-400 mt-1">Happy Clients</div>
              </div>
            </div>

            <div className="bg-[#131826] border border-white/5 hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/10 text-white rounded-xl flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.15)]">
                <Coffee size={24} className="text-amber-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-sm text-gray-400 mt-1">Cups of Coffee</div>
              </div>
            </div>

            <div className="bg-[#131826] border border-white/5 hover:border-rose-500/30 hover:shadow-[0_0_20px_rgba(244,63,94,0.1)] rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 transition-all duration-300">
              <div className="w-12 h-12 bg-rose-500/10 text-white rounded-xl flex items-center justify-center shadow-[0_0_12px_rgba(244,63,94,0.15)]">
                <Heart size={24} className="text-rose-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">1</div>
                <div className="text-sm text-gray-400 mt-1">Year of Experience</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Section Divider */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          <motion.div whileInView={{ scale: [0, 1.5, 1] }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="w-2 h-2 bg-emerald-500 rounded-full" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        </div>
      </div>

      {/* Services Section */}
      <motion.section 
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32 lg:px-24 relative z-10"
      >
        {/* Section ambient glow */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[700px] h-[400px] bg-purple-600/5 rounded-full blur-[130px] pointer-events-none -z-10" />
        <div className="absolute right-0 bottom-1/3 w-[350px] h-[350px] bg-emerald-600/4 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Header */}
        <motion.div variants={fadeInUp} className="flex flex-col items-center text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-300">
            <Sparkles size={14} className="text-purple-400/70" />
            <span>What I Offer</span>
          </div>
          
          <div className="relative pb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Services & Expertise
            </h2>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-40 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-40 h-0.5 bg-purple-500 rounded-full blur-sm opacity-50" />
          </div>
          
          <p className="text-gray-400 text-lg max-w-2xl">
            Comprehensive digital solutions to help your business thrive online. From concept to launch, I deliver exceptional results that exceed expectations.
          </p>
          
          <button className="flex items-center space-x-2 bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 px-6 py-2.5 rounded-full font-medium transition-colors mt-4">
            <CodeXml size={18} />
            <span>View Technical Skills</span>
          </button>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Web Development Card (Active) */}
          <motion.div variants={fadeInUp} className="card-shine bg-[#131826] border border-purple-500/20 rounded-2xl p-8 space-y-6 shadow-[0_0_20px_rgba(139,92,246,0.08)] relative overflow-hidden group transition-all hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_0_35px_rgba(139,92,246,0.18)]">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/20 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300">
                <CodeXml size={28} className="text-purple-400/80 group-hover:text-purple-300 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Web Development</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Custom websites and web applications built with modern technologies and best practices.
              </p>
              <a href="#" className="inline-flex items-center text-gray-400 text-sm font-medium hover:text-white transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* E-Commerce Solutions Card */}
          <motion.div variants={fadeInUp} className="card-shine bg-[#131826] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#1A1F35] transition-all hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 group-hover:shadow-[0_0_16px_rgba(16,185,129,0.2)] transition-all duration-300">
                <ShoppingCart size={28} className="text-gray-400 group-hover:text-emerald-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">E-Commerce Solutions</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                Complete online stores with payment integration and inventory management systems.
              </p>
              <a href="#" className="inline-flex items-center text-gray-500 text-sm font-medium hover:text-white transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* SEO Optimization Card */}
          <motion.div variants={fadeInUp} className="bg-[#131826] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#1A1F35] transition-all hover:-translate-y-1 hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)]">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500/10 group-hover:shadow-[0_0_16px_rgba(249,115,22,0.2)] transition-all duration-300">
                <Search size={28} className="text-gray-400 group-hover:text-orange-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">SEO Optimization</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                Improve your search rankings and drive organic traffic to your website effectively with proven SEO strategies.
              </p>
              <a href="#" className="inline-flex items-center text-gray-500 text-sm font-medium hover:text-white transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* Digital Marketing Card */}
          <motion.div variants={fadeInUp} className="bg-[#131826] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#1A1F35] transition-all hover:-translate-y-1 hover:border-rose-500/30 hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-500/10 group-hover:shadow-[0_0_16px_rgba(244,63,94,0.2)] transition-all duration-300">
                <TrendingUp size={28} className="text-gray-400 group-hover:text-rose-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Digital Marketing</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                Strategic marketing campaigns to grow your online presence and business reach through targeted digital channels.
              </p>
              <a href="#" className="inline-flex items-center text-gray-500 text-sm font-medium hover:text-white transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* Graphic Design Card */}
          <motion.div variants={fadeInUp} className="bg-[#131826] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#1A1F35] transition-all hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_16px_rgba(139,92,246,0.2)] transition-all duration-300">
                <Palette size={28} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Graphic Design</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                Creative visual solutions including branding, logos, and marketing materials for businesses.
              </p>
              <a href="#" className="inline-flex items-center text-gray-500 text-sm font-medium hover:text-white transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* Server Management Card */}
          <motion.div variants={fadeInUp} className="bg-[#131826] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#1A1F35] transition-all hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500/10 group-hover:shadow-[0_0_16px_rgba(20,184,166,0.2)] transition-all duration-300">
                <Server size={28} className="text-gray-400 group-hover:text-teal-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Server Management</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                Hosting and server management with dedicated hosting solutions for optimal performance.
              </p>
              <a href="#" className="inline-flex items-center text-gray-500 text-sm font-medium hover:text-white transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Achievements & Milestones */}
        <motion.div variants={scaleIn} className="mt-24 bg-[#1A1F2E] rounded-[2rem] p-12 relative overflow-hidden">
          {/* Decorative left circle */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-2 h-2 bg-white/20 rounded-full"></div>
          </div>

          <h3 className="text-2xl font-bold text-center text-white mb-12">Achievements & Milestones</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {/* Projects Completed */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-[#1E2438] rounded-full flex items-center justify-center border border-white/5">
                <Trophy size={28} className="text-gray-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Projects Completed</div>
              </div>
            </div>

            {/* Happy Clients */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-[#1E2438] rounded-full flex items-center justify-center border border-white/5">
                <Users size={28} className="text-gray-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">30+</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Happy Clients</div>
              </div>
            </div>

            {/* Years Experience */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-[#1E2438] rounded-full flex items-center justify-center border border-white/5">
                <Zap size={28} className="text-gray-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">7+</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Years Experience</div>
              </div>
            </div>

            {/* Client Satisfaction */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-[#1E2438] rounded-full flex items-center justify-center border border-white/5">
                <Monitor size={28} className="text-gray-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Section Divider */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
          <motion.div whileInView={{ scale: [0, 1.5, 1] }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="w-2 h-2 bg-rose-500 rounded-full" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
        </div>
      </div>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32 lg:px-24 relative z-10"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Let's Work Together
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Have a project in mind or just want to chat? I'd love to hear from you. Drop me a message and let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <ContactForm />

          {/* Right Column - Contact Info */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Get in touch</h3>

            {/* Contact Cards */}
            <div className="space-y-4">
              <div className="bg-[#1A1F2E] border border-white/5 rounded-xl p-4 flex items-center space-x-4 hover:bg-[#2A3454] transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Email</div>
                  <div className="text-sm font-medium text-white">hello@razi.me</div>
                </div>
              </div>

              <div className="bg-[#1A1F2E] border border-white/5 rounded-xl p-4 flex items-center space-x-4 hover:bg-[#2A3454] transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Phone</div>
                  <div className="text-sm font-medium text-white">+91 8129489071</div>
                </div>
              </div>

              <div className="bg-[#1A1F2E] border border-white/5 rounded-xl p-4 flex items-center space-x-4 hover:bg-[#2A3454] transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Location</div>
                  <div className="text-sm font-medium text-white">Kerala, India</div>
                </div>
              </div>
            </div>

            {/* WhatsApp Widget */}
            <div className="bg-[#0D1B1E] border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
              {/* Background pattern/glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <MessageCircle size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">WhatsApp Chat</h4>
                      <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-medium">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                        <span>Online now</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-1 rounded flex items-center space-x-1">
                    <Star size={10} className="fill-amber-400" />
                    <span>Premium</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 border-y border-white/5 py-3">
                  <div className="flex items-center space-x-1.5">
                    <Zap size={12} className="text-emerald-400" />
                    <span>Instant Response</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 size={12} className="text-emerald-400" />
                    <span>Secure Chat</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock size={12} className="text-emerald-400" />
                    <span>24/7 Available</span>
                  </div>
                </div>

                <div className="bg-[#132529] rounded-xl p-4 border border-emerald-500/10">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-white">S</span>
                    </div>
                    <div>
                      <div className="text-xs text-gray-300 leading-relaxed">
                        <span className="font-bold text-emerald-400">RAZI:</span> Hi! 👋 Thanks for reaching out. I'm excited to hear about your project and how I can help bring your ideas to life!
                      </div>
                      <div className="text-[10px] text-gray-500 mt-1">Usually replies instantly</div>
                    </div>
                  </div>
                </div>

                <button className="btn-emerald w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-emerald-500/20">
                  <MessageCircle size={18} />
                  <span>Start WhatsApp Chat</span>
                  <ChevronRight size={16} />
                </button>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MessageSquare size={10} />
                    <span>Get instant replies</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Zap size={10} />
                    <span>Quick project quotes</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Star size={10} />
                    <span>Free consultation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#131826] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center space-x-1 text-emerald-400 font-bold mb-1">
                  <span className="text-lg">5</span>
                  <Star size={14} className="fill-emerald-400" />
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Rating</div>
              </div>
              <div className="bg-[#131826] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <div className="text-lg font-bold text-orange-400 mb-1">24h</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Response</div>
              </div>
            </div>

            <div className="bg-[#131826] border border-white/5 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Available for new projects</span>
              </div>
              <span className="text-xs font-bold text-emerald-400">2026</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Gradient Card */}
        <motion.div variants={scaleIn} className="mt-16 bg-gradient-to-br from-purple-600 via-rose-500 to-orange-500 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Say hi!</h3>
            <p className="text-white/90 text-lg mb-6 leading-relaxed">
              Want to promote your service or product? Or, you have any query? Drop an email.
            </p>
            
            <a href="mailto:hello@razi.me" className="inline-flex items-center space-x-2 text-white font-medium hover:text-white/80 transition-colors mb-8">
              <Mail size={18} />
              <span>hello@razi.me</span>
            </a>

            <div className="space-y-4">
              <p className="text-white/80 text-sm">Prefer a quick chat?</p>
              <button className="btn-ghost bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-2.5 rounded-lg font-medium flex items-center space-x-2 backdrop-blur-sm">
                <Mail size={18} />
                <span>Send Email</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Floating Elements */}

      {/* Scroll Indicator — only visible on home section */}
      <motion.div
        animate={{ opacity: activeSection === 'home' ? 1 : 0, y: activeSection === 'home' ? 0 : 10 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-500 animate-bounce z-20 pointer-events-none"
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-600 rounded-full"></div>
        </div>
      </motion.div>

      {/* Chat Button + WhatsApp Popup */}
      {(() => {
        const [chatOpen, setChatOpen] = React.useState(false);
        const waMessage = encodeURIComponent("Hi! I'm interested in discussing a project. Can we chat?");
        const waLink = `https://wa.me/918129489071?text=${waMessage}`;
        return (
          <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 flex flex-col items-end space-y-3 z-50">
            {/* Popup */}
            <AnimatePresence>
              {chatOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="w-[calc(100vw-2rem)] max-w-sm sm:w-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                >
                  {/* Header */}
                  <div className="bg-emerald-500 px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center">
                          <MessageCircle size={20} className="text-white" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-white rounded-full border-2 border-emerald-500"></span>
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">RAZI KV</div>
                        <div className="flex items-center space-x-1 text-emerald-100 text-xs">
                          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                          <span>Online now</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setChatOpen(false)} className="text-white/80 hover:text-white transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  </div>

                  {/* Body */}
                  <div className="bg-[#0F1623] px-4 py-5 space-y-4">
                    {/* Incoming message */}
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <MessageCircle size={14} className="text-white" />
                      </div>
                      <div className="bg-[#1A2235] rounded-2xl rounded-tl-none px-4 py-3 max-w-[220px]">
                        <p className="text-white text-sm leading-relaxed">Hi there! 👋 Thanks for your interest. How can I help you today?</p>
                        <div className="flex items-center space-x-1 mt-1.5 text-gray-500 text-[10px]">
                          <Clock size={10} />
                          <span>Just now</span>
                        </div>
                      </div>
                    </div>

                    {/* Outgoing message */}
                    <div className="bg-[#1A2235] rounded-2xl px-4 py-3">
                      <p className="text-gray-300 text-sm leading-relaxed">Hi! I'm interested in discussing a project. Can we chat?</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-[#0F1623] px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-emerald w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Send size={16} />
                      <span>Send via WhatsApp</span>
                    </a>
                    <p className="text-center text-gray-600 text-xs">We'll reply as soon as possible</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trigger button row */}
            <div className="flex items-center space-x-3">
              {!chatOpen && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hidden md:flex bg-[#1A1F2E] text-gray-300 px-4 py-2.5 rounded-full text-sm border border-white/10 shadow-lg items-center"
                >
                  <MessageCircle size={16} className="mr-2 text-gray-400" />
                  Need help? Let's Discuss!
                </motion.div>
              )}
              <button
                onClick={() => setChatOpen(o => !o)}
                className="relative bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105"
              >
                <AnimatePresence mode="wait">
                  {chatOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </motion.div>
                  ) : (
                    <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <MessageCircle size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
                {!chatOpen && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0A0F1C]">1</span>
                )}
              </button>
            </div>
          </div>
        );
      })()}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#070B14]">
        {/* Top section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand col */}
          <div className="space-y-4 max-w-xs">
            <div className="text-xl font-bold tracking-tight">
              RAZI<span className="text-purple-500">.</span>
              <span className="text-purple-400 ml-1 font-light text-base">KV</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Web Designer &amp; Developer in Malappuram, passionate about creating exceptional digital experiences that drive business growth and user engagement.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Work', href: '/projects' },
                { label: 'Services', href: '#services' },
                { label: 'Contact', href: '#contact' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-gray-500 text-sm hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Say Hello */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wide">Say Hello</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@razi.me" className="text-gray-500 text-sm hover:text-white transition-colors">
                  hello@razi.me
                </a>
              </li>
              <li className="text-gray-500 text-sm">Kerala, India</li>
              <li>
                <span className="inline-flex items-center space-x-1.5 text-sm">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-gray-500">Available for freelance</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5" />

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social icons */}
          <div className="flex items-center space-x-5">
            <a href="#" aria-label="GitHub" className="btn-social text-gray-600 hover:text-white transition-colors">
              <Github size={18} />
            </a>
            <a href="#" aria-label="LinkedIn" className="btn-social text-gray-600 hover:text-white transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" aria-label="Instagram" className="btn-social text-gray-600 hover:text-white transition-colors">
              <Instagram size={18} />
            </a>
            <a href="mailto:hello@razi.me" aria-label="Email" className="btn-social text-gray-600 hover:text-white transition-colors">
              <Mail size={18} />
            </a>
          </div>

          {/* Scroll to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-purple-500/20"
            aria-label="Scroll to top"
          >
            <ArrowDown size={16} className="rotate-180" />
          </motion.button>

          {/* Copyright */}
          <p className="text-gray-600 text-xs flex items-center space-x-1">
            <span>© 2025 RAZI KV. Made with</span>
            <Heart size={11} className="text-rose-500 fill-rose-500 mx-0.5" />
            <span>and lots of coffee.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
