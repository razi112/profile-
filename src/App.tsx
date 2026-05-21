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

// Floating orb background component — green theme
function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: 'rgba(163,230,53,0.06)' }}
      />
      <motion.div
        animate={{ x: [0, -60, 80, 0], y: [0, 80, -40, 0], scale: [1, 0.8, 1.3, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[40%] right-[5%] w-[600px] h-[600px] rounded-full blur-[140px]"
        style={{ background: 'rgba(132,204,22,0.04)' }}
      />
      <motion.div
        animate={{ x: [0, 50, -70, 0], y: [0, -80, 60, 0], scale: [1, 1.1, 0.85, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ background: 'rgba(163,230,53,0.04)' }}
      />
    </div>
  );
}

// Animated grid lines background
function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
      style={{
        backgroundImage: `linear-gradient(rgba(163,230,53,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.8) 1px, transparent 1px)`,
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
  },
  {
    id: 6,
    title: "Minnal AI",
    description: "A clean, fast AI chat experience — ask anything, get instant answers, and keep your conversations organized. Minnal AI delivers intelligent and authentic responses effortlessly, with an Android app coming soon.",
    image: "https://i.pinimg.com/736x/c7/74/cb/c774cbb0692dc052ac554d87f9c78e90.jpg",
    tech: ['AI Chat', 'React', 'Next.js', 'OpenAI', 'Android App'],
    featured: true,
    comingSoon: false,
    demo: "https://minnalai.vercel.app/"
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

  const inputCls = "w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-lime-400/50 focus:shadow-[0_0_12px_rgba(163,230,53,0.12)] transition-all";

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
              className="btn-emerald w-full bg-lime-400 hover:bg-lime-500 disabled:opacity-60 text-black font-semibold py-3.5 rounded-lg flex items-center justify-center space-x-2 transition-colors">
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

      <div className="bg-[#111111] border border-white/5 rounded-2xl p-6 space-y-4">
        <h4 className="text-lg font-bold text-white">Let's create something amazing together!</h4>
        <p className="text-gray-400 text-sm leading-relaxed">Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.</p>
        <ul className="space-y-2 pt-2">
          {['Usually responds within 24 hours','Available for remote collaboration','Open to freelance and full-time opportunities','Building high-performing websites & SEO strategies'].map((item, i) => (
            <li key={i} className="flex items-start space-x-2 text-sm text-gray-300">
              <CheckCircle2 size={16} className="text-lime-400 mt-0.5 shrink-0" /><span>{item}</span>
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
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

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
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-lime-400/20 relative overflow-x-hidden">
      <FloatingOrbs />
      <GridBackground />

      {/* Side panel menu — slides from left, hero visible behind */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[90]"
              style={{ background: 'rgba(0,0,0,0.45)' }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Side panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 h-full z-[100] flex flex-col"
              style={{
                width: 'clamp(200px, 28vw, 300px)',
                background: '#0a0a0a',
                paddingTop: '32px',
                paddingLeft: '28px',
                paddingRight: '28px',
              }}
            >
              {/* X close */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="mb-10 self-start text-white/50 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6L18 18M18 6L6 18"/>
                </svg>
              </button>

              {/* Nav links */}
              <nav className="flex flex-col gap-0">
                {[
                  { label: 'Home',     href: '#home',     id: 'home' },
                  { label: 'About',    href: '#about',    id: 'about' },
                  { label: 'Projects', href: '/projects', id: 'projects' },
                  { label: 'Services', href: '#services', id: 'services' },
                  { label: 'Skills',   href: '/skills',   id: 'skills' },
                  { label: 'Contact',  href: '#contact',  id: 'contact' },
                ].map(({ label, href, id }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.055, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily: '"Big Shoulders Display", sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(20px, 2.4vw, 28px)',
                      letterSpacing: '0.02em',
                      lineHeight: '1.4',
                      textTransform: 'uppercase',
                      color: activeSection === id ? '#e0f11f' : 'rgba(255,255,255,0.82)',
                      textDecoration: 'none',
                      display: 'block',
                      padding: '5px 0',
                      transition: 'color 0.18s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#e0f11f'; }}
                    onMouseLeave={e => { if (activeSection !== id) (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.82)'; }}
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>

              {/* WhatsApp at bottom */}
              <div className="mt-auto pb-10">
                <a
                  href="https://wa.me/918129489071"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 font-bold text-sm text-black rounded-full px-4 py-2 w-fit hover:opacity-80 transition-opacity"
                  style={{ background: '#e0f11f' }}
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Navbar — hamburger left, WhatsApp right */}
      <nav className="fixed top-0 left-0 w-full z-50" style={{ background: 'transparent' }}>
        <div className="flex items-center justify-between px-6 sm:px-10 py-6">
          {/* Staggered hamburger */}
          <button
            onClick={() => setMobileMenuOpen(o => !o)}
            className="flex flex-col gap-[6px] group"
            aria-label="Open menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <span className="block h-[2px] rounded-full bg-white transition-all duration-300 group-hover:bg-[#e0f11f]" style={{ width: '28px' }} />
            <span className="block h-[2px] rounded-full bg-white transition-all duration-300 group-hover:bg-[#e0f11f]" style={{ width: '20px' }} />
            <span className="block h-[2px] rounded-full bg-white transition-all duration-300 group-hover:bg-[#e0f11f]" style={{ width: '24px' }} />
          </button>

          {/* WhatsApp — right */}
          <a
            href="https://wa.me/918129489071"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center space-x-2 font-bold text-sm text-black rounded-full px-5 py-2 hover:opacity-80 transition-opacity"
            style={{ background: '#e0f11f' }}
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>
        </div>
      </nav>

      {/* Hero Section — exact Asad style */}
      <motion.main
        id="home"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="scroll-mt-24 relative z-10 flex flex-col items-center justify-center min-h-screen overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >
        {/* Top label — small tracking text like reference */}
        <motion.p
          variants={fadeInUp}
          className="mb-4 text-center"
          style={{
            fontFamily: '"Big Shoulders Display", sans-serif',
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            fontWeight: 400,
          }}
        >
          Crafting Digital Experiences &nbsp;—&nbsp; Since 2023
        </motion.p>

        {/* Giant name block */}
        <motion.div
          variants={fadeInUp}
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative flex flex-col items-center select-none w-full"
        >
          {/* Row 1 — RAZI */}
          <div className="relative z-10 w-full text-center">
            <span
              style={{
                fontFamily: '"Big Shoulders Display", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(88px, 22vw, 240px)',
                letterSpacing: '-0.02em',
                lineHeight: '100%',
                color: '#e0f11f',
                textTransform: 'uppercase',
                display: 'block',
              }}
            >
              RAZI
            </span>
          </div>

          {/* Photo — zero-height row, centered at seam, in front of both rows */}
          <div
            className="relative w-full flex justify-center"
            style={{ height: 0, zIndex: 30 }}
          >
            <div
              className="relative rounded-full overflow-hidden"
              style={{
                width: 'clamp(120px, 14vw, 240px)',
                height: 'clamp(120px, 14vw, 240px)',
                transform: 'translateY(-50%)',
                border: 'none',
                boxShadow: 'none',
              }}
            >
              <img
                src="/image profile.png"
                alt="RAZI"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </div>

          {/* Row 2 — KV */}
          <div className="relative z-10 w-full text-center">
            <span
              style={{
                fontFamily: '"Big Shoulders Display", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(88px, 22vw, 240px)',
                letterSpacing: '-0.02em',
                lineHeight: '100%',
                color: '#e0f11f',
                textTransform: 'uppercase',
                display: 'block',
              }}
            >
              KV
            </span>
          </div>
        </motion.div>

        {/* Diamond divider */}
        <motion.div variants={fadeInUp} className="mt-8 mb-6">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" fill="#e0f11f" />
          </svg>
        </motion.div>

        {/* Tagline — matches reference style exactly */}
        <motion.p
          variants={fadeInUp}
          className="text-center px-6 max-w-md"
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: 'clamp(14px, 1.6vw, 18px)',
            lineHeight: '1.6',
            fontWeight: 400,
          }}
        >
          I'm <strong style={{ color: '#fff', fontWeight: 600 }}>RAZI KV</strong> — a Web Designer &amp; Developer
          passionately crafting digital experiences and
          results-driven websites.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
          <ArrowDown size={12} />
        </motion.div>
      </motion.main>

      {/* Section Divider */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(163,230,53,0.3), transparent)' }} />
          <motion.div
            whileInView={{ rotate: [0, 180, 360] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="w-2 h-2 rounded-full" style={{ background: '#a3e635' }}
          />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(163,230,53,0.3), transparent)' }} />
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
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none -z-10" style={{ background: 'rgba(163,230,53,0.04)' }} />
        <div className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none -z-10" style={{ background: 'rgba(163,230,53,0.03)' }} />

        {/* Left Content */}
        <motion.div variants={fadeInLeft} className="space-y-8">
          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">About Me</h2>
            <div className="absolute -bottom-2 left-0 w-16 h-0.5 rounded-full" style={{ background: '#a3e635' }} />
            <div className="absolute -bottom-2 left-0 w-16 h-0.5 rounded-full blur-sm opacity-70" style={{ background: '#a3e635' }} />
          </div>
          
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed relative">
            {/* Decorative Circle */}
            <div className="absolute -left-8 top-2 w-6 h-6 rounded-full border flex items-center justify-center hidden md:flex" style={{ borderColor: 'rgba(163,230,53,0.3)', boxShadow: '0 0 8px rgba(163,230,53,0.2)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(163,230,53,0.6)' }}></div>
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
                <div key={skill} className="bg-[#111111] border border-white/8 hover:border-lime-400/40 hover:text-lime-400 hover:shadow-[0_0_12px_rgba(163,230,53,0.15)] transition-all duration-300 rounded-full px-5 py-2.5 text-sm font-medium text-gray-400 cursor-default">
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-[80px] rounded-full -z-10" style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.08) 0%, transparent 70%)' }}></div>
            
            {/* Floating Shapes */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border shadow-lg" style={{ background: 'rgba(163,230,53,0.05)', borderColor: 'rgba(163,230,53,0.1)' }}></div>
            <div className="absolute bottom-12 -left-8 w-16 h-16 rounded-full border shadow-lg" style={{ background: 'rgba(163,230,53,0.04)', borderColor: 'rgba(163,230,53,0.08)' }}></div>
            <div className="absolute top-1/3 -left-12 w-6 h-16 bg-white/5 rounded-full border border-white/5 shadow-lg"></div>
            <div className="absolute top-1/3 -right-8 w-12 h-12 bg-white/5 rounded-full border border-white/5 shadow-lg"></div>
            <div className="absolute -bottom-4 right-12 w-8 h-8 opacity-80 rotate-12 rounded-sm border shadow-lg" style={{ background: 'rgba(163,230,53,0.05)', borderColor: 'rgba(163,230,53,0.1)' }}></div>
            <div className="absolute top-0 left-12 w-10 h-10 border-[2px] border-white/10 opacity-60 rotate-12 rounded-sm"></div>
            
            {/* Main Image */}
            <div className="w-full h-full rounded-full border border-white/10 overflow-hidden relative z-10 bg-[#111111] group">
              <img 
                src="https://i.pinimg.com/736x/6f/39/9f/6f399f287cb364bea56701a654b4a193.jpg"
                alt="RAZI" 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
            </div>

            {/* Badge */}
            <div className="absolute bottom-6 right-0 bg-[#111111] border border-lime-400/30 text-lime-400 font-bold px-6 py-2.5 rounded-full shadow-lg z-20 text-sm">
              1 Year
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-10 md:mt-12">
            <div className="bg-[#111111] border border-white/5 hover:border-lime-400/30 hover:shadow-[0_0_20px_rgba(163,230,53,0.08)] rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(163,230,53,0.1)', boxShadow: '0 0 12px rgba(163,230,53,0.15)' }}>
                <Award size={24} style={{ color: '#a3e635' }} />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="text-sm text-gray-400 mt-1">Projects Completed</div>
              </div>
            </div>
            
            <div className="bg-[#111111] border border-white/5 hover:border-lime-400/30 hover:shadow-[0_0_20px_rgba(163,230,53,0.08)] rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(163,230,53,0.1)', boxShadow: '0 0 12px rgba(163,230,53,0.15)' }}>
                <Users size={24} style={{ color: '#a3e635' }} />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">30+</div>
                <div className="text-sm text-gray-400 mt-1">Happy Clients</div>
              </div>
            </div>

            <div className="bg-[#111111] border border-white/5 hover:border-lime-400/30 hover:shadow-[0_0_20px_rgba(163,230,53,0.08)] rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(163,230,53,0.1)', boxShadow: '0 0 12px rgba(163,230,53,0.15)' }}>
                <Coffee size={24} style={{ color: '#a3e635' }} />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-sm text-gray-400 mt-1">Cups of Coffee</div>
              </div>
            </div>

            <div className="bg-[#111111] border border-white/5 hover:border-lime-400/30 hover:shadow-[0_0_20px_rgba(163,230,53,0.08)] rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(163,230,53,0.1)', boxShadow: '0 0 12px rgba(163,230,53,0.15)' }}>
                <Heart size={24} style={{ color: '#a3e635' }} />
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
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(163,230,53,0.3), transparent)' }} />
          <motion.div whileInView={{ scale: [0, 1.5, 1] }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="w-2 h-2 rounded-full" style={{ background: '#a3e635' }} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(163,230,53,0.3), transparent)' }} />
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
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[700px] h-[400px] rounded-full blur-[130px] pointer-events-none -z-10" style={{ background: 'rgba(163,230,53,0.04)' }} />

        {/* Header */}
        <motion.div variants={fadeInUp} className="flex flex-col items-center text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-300">
            <Sparkles size={14} style={{ color: '#a3e635' }} />
            <span>What I Offer</span>
          </div>
          
          <div className="relative pb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Services & Expertise
            </h2>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-40 h-0.5 rounded-full" style={{ background: 'linear-gradient(to right, transparent, #a3e635, transparent)' }} />
          </div>
          
          <p className="text-gray-400 text-lg max-w-2xl">
            Comprehensive digital solutions to help your business thrive online. From concept to launch, I deliver exceptional results that exceed expectations.
          </p>
          
          <button className="flex items-center space-x-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-lime-400/30 text-gray-300 hover:text-lime-400 px-6 py-2.5 rounded-full font-medium transition-all mt-4">
            <CodeXml size={18} />
            <span>View Technical Skills</span>
          </button>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Web Development Card */}
          <motion.div variants={fadeInUp} className="card-shine bg-[#111111] border rounded-2xl p-8 space-y-6 relative overflow-hidden group transition-all hover:-translate-y-1" style={{ borderColor: 'rgba(163,230,53,0.25)', boxShadow: '0 0 20px rgba(163,230,53,0.06)' }}>
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(163,230,53,0.05) 0%, transparent 60%)' }}></div>
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300" style={{ background: 'rgba(163,230,53,0.1)' }}>
                <CodeXml size={28} style={{ color: '#a3e635' }} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Web Development</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">Custom websites and web applications built with modern technologies and best practices.</p>
              <a href="#" className="inline-flex items-center text-gray-400 text-sm font-medium hover:text-lime-400 transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* E-Commerce Solutions Card */}
          <motion.div variants={fadeInUp} className="card-shine bg-[#111111] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#161616] transition-all hover:-translate-y-1 hover:border-lime-400/20">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-lime-400/10 transition-all duration-300">
                <ShoppingCart size={28} className="text-gray-400 group-hover:text-lime-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">E-Commerce Solutions</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">Complete online stores with payment integration and inventory management systems.</p>
              <a href="#" className="inline-flex items-center text-gray-500 text-sm font-medium hover:text-lime-400 transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* SEO Optimization Card */}
          <motion.div variants={fadeInUp} className="bg-[#111111] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#161616] transition-all hover:-translate-y-1 hover:border-lime-400/20">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-lime-400/10 transition-all duration-300">
                <Search size={28} className="text-gray-400 group-hover:text-lime-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">SEO Optimization</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">Improve your search rankings and drive organic traffic to your website effectively with proven SEO strategies.</p>
              <a href="#" className="inline-flex items-center text-gray-500 text-sm font-medium hover:text-lime-400 transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* Digital Marketing Card */}
          <motion.div variants={fadeInUp} className="bg-[#111111] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#161616] transition-all hover:-translate-y-1 hover:border-lime-400/20">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-lime-400/10 transition-all duration-300">
                <TrendingUp size={28} className="text-gray-400 group-hover:text-lime-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Digital Marketing</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">Strategic marketing campaigns to grow your online presence and business reach through targeted digital channels.</p>
              <a href="#" className="inline-flex items-center text-gray-500 text-sm font-medium hover:text-lime-400 transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* Graphic Design Card */}
          <motion.div variants={fadeInUp} className="bg-[#111111] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#161616] transition-all hover:-translate-y-1 hover:border-lime-400/20">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-lime-400/10 transition-all duration-300">
                <Palette size={28} className="text-gray-400 group-hover:text-lime-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Graphic Design</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">Creative visual solutions including branding, logos, and marketing materials for businesses.</p>
              <a href="#" className="inline-flex items-center text-gray-500 text-sm font-medium hover:text-lime-400 transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* Server Management Card */}
          <motion.div variants={fadeInUp} className="bg-[#111111] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#161616] transition-all hover:-translate-y-1 hover:border-lime-400/20">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-lime-400/10 transition-all duration-300">
                <Server size={28} className="text-gray-400 group-hover:text-lime-400 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Server Management</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">Hosting and server management with dedicated hosting solutions for optimal performance.</p>
              <a href="#" className="inline-flex items-center text-gray-500 text-sm font-medium hover:text-lime-400 transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Achievements & Milestones */}
        <motion.div variants={scaleIn} className="mt-24 bg-[#111111] border border-white/5 rounded-[2rem] p-12 relative overflow-hidden">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-2 h-2 bg-white/20 rounded-full"></div>
          </div>
          <h3 className="text-2xl font-bold text-center text-white mb-12">Achievements & Milestones</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: Trophy, label: 'Projects Completed', value: '20+' },
              { icon: Users, label: 'Happy Clients', value: '30+' },
              { icon: Zap, label: 'Years Experience', value: '1+' },
              { icon: Monitor, label: 'Client Satisfaction', value: '100%' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center border" style={{ background: 'rgba(163,230,53,0.08)', borderColor: 'rgba(163,230,53,0.15)' }}>
                  <Icon size={28} style={{ color: '#a3e635' }} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{value}</div>
                  <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Section Divider */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(163,230,53,0.3), transparent)' }} />
          <motion.div whileInView={{ scale: [0, 1.5, 1] }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="w-2 h-2 rounded-full" style={{ background: '#a3e635' }} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(163,230,53,0.3), transparent)' }} />
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
              <div className="bg-[#161616] border border-white/5 rounded-xl p-4 flex items-center space-x-4 hover:bg-[#1a1a1a] hover:border-lime-400/20 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(163,230,53,0.1)' }}>
                  <Mail size={20} style={{ color: '#a3e635' }} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Email</div>
                  <div className="text-sm font-medium text-white">hello@razi.me</div>
                </div>
              </div>

              <div className="bg-[#161616] border border-white/5 rounded-xl p-4 flex items-center space-x-4 hover:bg-[#1a1a1a] hover:border-lime-400/20 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(163,230,53,0.1)' }}>
                  <Phone size={20} style={{ color: '#a3e635' }} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Phone</div>
                  <div className="text-sm font-medium text-white">+91 8129489071</div>
                </div>
              </div>

              <div className="bg-[#161616] border border-white/5 rounded-xl p-4 flex items-center space-x-4 hover:bg-[#1a1a1a] hover:border-lime-400/20 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(163,230,53,0.1)' }}>
                  <MapPin size={20} style={{ color: '#a3e635' }} />
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-0.5">Location</div>
                  <div className="text-sm font-medium text-white">Kerala, India</div>
                </div>
              </div>
            </div>

            {/* WhatsApp Widget */}
            <div className="bg-[#0d1a0d] border rounded-2xl p-6 relative overflow-hidden" style={{ borderColor: 'rgba(163,230,53,0.2)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 blur-[40px] rounded-full" style={{ background: 'rgba(163,230,53,0.08)' }}></div>
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: '#a3e635', boxShadow: '0 4px 20px rgba(163,230,53,0.3)' }}>
                      <MessageCircle size={24} className="text-black" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">WhatsApp Chat</h4>
                      <div className="flex items-center space-x-1.5 text-xs font-medium" style={{ color: '#a3e635' }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#a3e635' }}></span>
                        <span>Online now</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 text-gray-300 text-[10px] font-bold px-2 py-1 rounded flex items-center space-x-1 border border-white/10">
                    <Star size={10} className="fill-white" />
                    <span>Premium</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 border-y border-white/5 py-3">
                  <div className="flex items-center space-x-1.5">
                    <Zap size={12} style={{ color: '#a3e635' }} />
                    <span>Instant Response</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 size={12} style={{ color: '#a3e635' }} />
                    <span>Secure Chat</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock size={12} style={{ color: '#a3e635' }} />
                    <span>24/7 Available</span>
                  </div>
                </div>

                <div className="bg-[#111111] rounded-xl p-4 border border-white/5">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: '#a3e635' }}>
                      <span className="text-[10px] font-bold text-black">R</span>
                    </div>
                    <div>
                      <div className="text-xs text-gray-300 leading-relaxed">
                        <span className="font-bold" style={{ color: '#a3e635' }}>RAZI:</span> Hi! 👋 Thanks for reaching out. I'm excited to hear about your project and how I can help bring your ideas to life!
                      </div>
                      <div className="text-[10px] text-gray-500 mt-1">Usually replies instantly</div>
                    </div>
                  </div>
                </div>

                <button className="btn-emerald w-full text-black font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg" style={{ background: '#a3e635', boxShadow: '0 4px 20px rgba(163,230,53,0.25)' }}>
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
              <div className="bg-[#111111] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <div className="flex items-center space-x-1 font-bold mb-1" style={{ color: '#a3e635' }}>
                  <span className="text-lg">5</span>
                  <Star size={14} style={{ fill: '#a3e635', color: '#a3e635' }} />
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Rating</div>
              </div>
              <div className="bg-[#111111] border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <div className="text-lg font-bold mb-1" style={{ color: '#a3e635' }}>24h</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Response</div>
              </div>
            </div>

            <div className="bg-[#111111] border border-white/5 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#a3e635' }}></div>
                <span className="text-xs text-gray-400">Available for new projects</span>
              </div>
              <span className="text-xs font-bold" style={{ color: '#a3e635' }}>2026</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Card */}
        <motion.div variants={scaleIn} className="mt-16 rounded-3xl p-8 md:p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a2a0a 0%, #0d1a0d 50%, #111111 100%)', border: '1px solid rgba(163,230,53,0.2)' }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" style={{ background: 'rgba(163,230,53,0.08)' }}></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full blur-2xl translate-y-1/2" style={{ background: 'rgba(163,230,53,0.05)' }}></div>
          
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Say hi!</h3>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Want to promote your service or product? Or, you have any query? Drop an email.
            </p>
            
            <a href="mailto:hello@razi.me" className="inline-flex items-center space-x-2 font-medium mb-8 transition-colors hover:opacity-80" style={{ color: '#a3e635' }}>
              <Mail size={18} />
              <span>hello@razi.me</span>
            </a>

            <div className="space-y-4">
              <p className="text-gray-400 text-sm">Prefer a quick chat?</p>
              <button className="btn-ghost bg-white/5 text-white border border-white/20 px-6 py-2.5 rounded-lg font-medium flex items-center space-x-2">
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
                  <div className="px-4 py-4 flex items-center justify-between" style={{ background: '#a3e635' }}>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.2)' }}>
                          <MessageCircle size={20} className="text-black" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-white rounded-full border-2" style={{ borderColor: '#a3e635' }}></span>
                      </div>
                      <div>
                        <div className="text-black font-bold text-sm">RAZI KV</div>
                        <div className="flex items-center space-x-1 text-black/70 text-xs">
                          <span className="w-1.5 h-1.5 bg-black/50 rounded-full"></span>
                          <span>Online now</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setChatOpen(false)} className="text-black/70 hover:text-black transition-colors">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                  </div>

                  {/* Body */}
                  <div className="bg-[#0a0a0a] px-4 py-5 space-y-4">
                    {/* Incoming message */}
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: '#a3e635' }}>
                        <MessageCircle size={14} className="text-black" />
                      </div>
                      <div className="bg-[#161616] rounded-2xl rounded-tl-none px-4 py-3 max-w-[220px]">
                        <p className="text-white text-sm leading-relaxed">Hi there! 👋 Thanks for your interest. How can I help you today?</p>
                        <div className="flex items-center space-x-1 mt-1.5 text-gray-500 text-[10px]">
                          <Clock size={10} />
                          <span>Just now</span>
                        </div>
                      </div>
                    </div>

                    {/* Outgoing message */}
                    <div className="bg-[#161616] rounded-2xl px-4 py-3">
                      <p className="text-gray-300 text-sm leading-relaxed">Hi! I'm interested in discussing a project. Can we chat?</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-[#0a0a0a] px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-emerald w-full font-semibold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors text-black"
                      style={{ background: '#a3e635' }}
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
                  className="hidden md:flex bg-[#111111] text-gray-300 px-4 py-2.5 rounded-full text-sm border border-white/10 shadow-lg items-center"
                >
                  <MessageCircle size={16} className="mr-2 text-gray-400" />
                  Need help? Let's Discuss!
                </motion.div>
              )}
              <button
                onClick={() => setChatOpen(o => !o)}
                className="relative text-black p-4 rounded-full shadow-lg transition-transform hover:scale-105"
                style={{ background: '#a3e635', boxShadow: '0 4px 20px rgba(163,230,53,0.4)' }}
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
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0a0a0a]">1</span>
                )}
              </button>
            </div>
          </div>
        );
      })()}

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="space-y-4 max-w-xs">
            <div className="text-xl font-bold tracking-tight">
              RAZI<span style={{ color: '#a3e635' }}>.</span>
              <span className="ml-1 font-light text-base" style={{ color: '#a3e635' }}>KV</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Web Designer &amp; Developer in Malappuram, passionate about creating exceptional digital experiences that drive business growth and user engagement.
            </p>
          </div>

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
                  <a href={href} className="text-gray-500 text-sm hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wide">Say Hello</h4>
            <ul className="space-y-3">
              <li><a href="mailto:hello@razi.me" className="text-gray-500 text-sm hover:text-white transition-colors">hello@razi.me</a></li>
              <li className="text-gray-500 text-sm">Kerala, India</li>
              <li>
                <span className="inline-flex items-center space-x-1.5 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#a3e635' }}></span>
                  <span className="text-gray-500">Available for freelance</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-5">
            <a href="#" aria-label="GitHub" className="btn-social text-gray-600 hover:text-lime-400 transition-colors"><Github size={18} /></a>
            <a href="#" aria-label="LinkedIn" className="btn-social text-gray-600 hover:text-lime-400 transition-colors"><Linkedin size={18} /></a>
            <a href="#" aria-label="Instagram" className="btn-social text-gray-600 hover:text-lime-400 transition-colors"><Instagram size={18} /></a>
            <a href="mailto:hello@razi.me" aria-label="Email" className="btn-social text-gray-600 hover:text-lime-400 transition-colors"><Mail size={18} /></a>
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-lg text-black"
            style={{ background: '#a3e635', boxShadow: '0 4px 16px rgba(163,230,53,0.3)' }}
            aria-label="Scroll to top"
          >
            <ArrowDown size={16} className="rotate-180" />
          </motion.button>

          <p className="text-gray-600 text-xs flex items-center space-x-1">
            <span>© 2026 RAZI KV. Made with</span>
            <Heart size={11} className="text-lime-400 fill-lime-400 mx-0.5" />
            <span>and lots of coffee.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
