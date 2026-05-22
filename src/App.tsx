import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView, useAnimation } from 'framer-motion';
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

    // ── 1. Send email via EmailJS ──────────────────────────────────
    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_email:   form.email,
          subject:      form.subject || '(No subject)',
          message:      form.message,
          reply_to:     form.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
    } catch (emailErr: any) {
      console.error('[ContactForm] EmailJS error:', emailErr);
      setErrorMsg('Failed to send email. Please try again.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    // ── 2. Also save to Supabase if configured ─────────────────────
    if (supabase) {
      const { error } = await supabase.from('messages').insert([{
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        read: false,
      }]);
      if (error) console.warn('[ContactForm] Supabase insert warning:', error.message);
    }

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

// ── Typing role animation ──────────────────────────────────────────────────
const ROLES = [
  'Web Designer & Developer',
  'SEO Specialist',
  'E-Commerce Expert',
  'Digital Marketer',
  'UI/UX Enthusiast',
];

function TypingRole() {
  const [roleIdx, setRoleIdx] = React.useState(0);
  const [displayed, setDisplayed] = React.useState('');
  const [deleting, setDeleting] = React.useState(false);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const current = ROLES[roleIdx];
    if (paused) {
      const t = setTimeout(() => { setDeleting(true); setPaused(false); }, 1800);
      return () => clearTimeout(t);
    }
    if (!deleting) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
        return () => clearTimeout(t);
      } else {
        setPaused(true);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setRoleIdx(i => (i + 1) % ROLES.length);
      }
    }
  }, [displayed, deleting, paused, roleIdx]);

  return (
    <span>
      <span style={{ color: '#e0f11f', fontWeight: 600 }}>{displayed}</span>
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          background: '#e0f11f',
          marginLeft: '2px',
          verticalAlign: 'text-bottom',
          animation: 'blink 0.75s step-end infinite',
        }}
      />
    </span>
  );
}

// ── Marquee ticker ─────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  'PHOTOSHOP', 'ILLUSTRATOR', 'REACT', 'CAPCUT',
];

function MarqueeTicker() {
  // Repeat enough times to fill any screen width seamlessly
  const repeated = [
    ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS,
    ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS,
  ];

  const itemStyle: React.CSSProperties = {
    fontFamily: '"Big Shoulders Display", Impact, sans-serif',
    fontWeight: 900,
    fontSize: 'clamp(28px, 4.5vw, 56px)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: '#d4e635',
    padding: '0 24px',
    whiteSpace: 'nowrap',
    lineHeight: 1,
  };

  const diamondStyle: React.CSSProperties = {
    color: 'rgba(212,230,53,0.55)',
    margin: '0 4px',
    fontSize: '0.45em',
    verticalAlign: 'middle',
  };

  return (
    <div
      className="relative z-10 overflow-hidden select-none"
      style={{
        background: '#111208',
        borderTop: '1px solid rgba(212,230,53,0.08)',
        borderBottom: '1px solid rgba(212,230,53,0.08)',
        paddingTop: '14px',
        paddingBottom: '14px',
      }}
    >
      {/* Row 1 — scrolls left */}
      <div
        className="flex overflow-hidden mb-1"
        style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)' }}
      >
        <motion.div
          className="flex shrink-0"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          {repeated.map((item, i) => (
            <span key={i} className="flex items-center shrink-0" style={itemStyle}>
              {item}
              <span style={diamondStyle}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row 2 — scrolls right (opposite direction), slightly dimmer */}
      <div
        className="flex overflow-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)' }}
      >
        <motion.div
          className="flex shrink-0"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          {repeated.map((item, i) => (
            <span key={i} className="flex items-center shrink-0" style={{ ...itemStyle, opacity: 0.72 }}>
              {item}
              <span style={{ ...diamondStyle, color: 'rgba(212,230,53,0.4)' }}>✦</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function FooterMarquee() {
  const footerRef = React.useRef<HTMLElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const headingRef = React.useRef<HTMLDivElement>(null);
  const linksRef = React.useRef<(HTMLAnchorElement | null)[]>([]);

  const SOCIAL_ITEMS = [
    'WTSP', 'IG', 'MAIL', 'FCB',
    'WTSP', 'IG', 'MAIL', 'FCB',
    'WTSP', 'IG', 'MAIL', 'FCB',
    'WTSP', 'IG', 'MAIL', 'FCB',
  ];
  const socialLinks: Record<string, string> = {
    WTSP: 'https://wa.me/919746711804',
    IG: 'https://instagram.com/nte_vibes',
    MAIL: 'mailto:razi61293697@gmail.com',
    FCB: 'https://facebook.com',
  };

  React.useEffect(() => {
    let ctx: any;
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {

          // 1. Footer section slides up from below on scroll
          gsap.fromTo(
            footerRef.current,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
            }
          );

          // 2. Each social link letter-by-letter clip reveal
          const links = linksRef.current.filter(Boolean);
          gsap.fromTo(
            links,
            { clipPath: 'inset(0 100% 0 0)', opacity: 0, x: -40 },
            {
              clipPath: 'inset(0 0% 0 0)',
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: 'power4.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );

          // 3. Parallax skew on scroll
          gsap.to(trackRef.current, {
            skewX: -3,
            ease: 'none',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });

        }, footerRef);
      });
    });

    return () => ctx?.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-10 select-none"
      style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.04)', opacity: 0 }}
    >
      <div
        className="marquee-wrapper w-full overflow-hidden"
        style={{
          paddingTop: '24px',
          paddingBottom: '24px',
          maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
        }}
      >
        <div ref={trackRef} className="marquee-track">
          {SOCIAL_ITEMS.map((item, i) => (
            <a
              key={i}
              ref={el => { linksRef.current[i] = el; }}
              href={socialLinks[item]}
              target={item !== 'MAIL' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="footer-social-link flex items-center shrink-0"
              style={{
                fontFamily: '"Big Shoulders Display", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(88px, 22vw, 240px)',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: '#d4e635',
                padding: '0 40px',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#d4e635')}
            >
              {item}
              <span style={{ color: 'rgba(212,230,53,0.4)', margin: '0 10px', fontSize: '0.2em', verticalAlign: 'middle' }}>✦</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function ProfilePhoto() {
  const x = useSpring(0, { stiffness: 80, damping: 20 });
  const y = useSpring(0, { stiffness: 80, damping: 20 });
  const rotateX = useSpring(0, { stiffness: 80, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 80, damping: 20 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx; // -1 to 1
      const dy = (e.clientY - cy) / cy;

      x.set(dx * 14);
      y.set(dy * 10);
      rotateX.set(-dy * 8);
      rotateY.set(dx * 8);
    };

    const handleMouseLeave = () => {
      x.set(0); y.set(0); rotateX.set(0); rotateY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y, rotateX, rotateY]);

  return (
    <div className="relative w-full flex justify-center" style={{ height: 0, zIndex: 30 }}>
      <motion.div
        style={{
          x, y,
          rotateX, rotateY,
          width: 'clamp(120px, 14vw, 240px)',
          height: 'clamp(120px, 14vw, 240px)',
          translateY: '-50%',
          transformStyle: 'preserve-3d',
          perspective: 800,
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'none',
        }}
        whileHover={{ scale: 1 }}
        transition={{ scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      >
        {/* Glow ring that follows */}
        <motion.div
          style={{
            position: 'absolute', inset: '-4px', borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #d4e635, transparent, #d4e635)',
            opacity: 0.35,
            rotateX, rotateY,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        <div style={{ position: 'absolute', inset: '2px', borderRadius: '50%', overflow: 'hidden', background: '#0a0a0a' }}>
          <img
            src="/image profile.png"
            alt="MOHD"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
      </motion.div>
    </div>
  );
}

function ServiceRow({ num, Icon, title, desc }: { num: string; Icon: React.ElementType; title: string; desc: string }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="relative border-b flex items-center justify-between py-6 md:py-8 gap-6 cursor-default overflow-hidden"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
        style={{ background: 'linear-gradient(to bottom, transparent, #d4e635, transparent)', originY: 0.5 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Left content */}
      <div className="flex items-center gap-5 md:gap-8 min-w-0">
        <span className="text-xs font-mono text-gray-600 shrink-0 w-8">{num}</span>

        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          animate={{
            background: hovered ? 'rgba(212,230,53,0.15)' : 'rgba(255,255,255,0.04)',
            scale: hovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <Icon size={18} style={{ color: hovered ? '#d4e635' : '#555', transition: 'color 0.3s ease' }} />
        </motion.div>

        <div className="min-w-0">
          <h3 style={{
            fontFamily: '"Big Shoulders Display", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(20px, 4vw, 52px)',
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            lineHeight: 1,
            color: hovered ? '#d4e635' : 'rgba(255,255,255,0.85)',
            transition: 'color 0.3s ease',
          }}>
            {title}
          </h3>
          <motion.p
            className="text-gray-500 text-sm mt-1.5 leading-relaxed max-w-xl hidden md:block"
            animate={{ opacity: hovered ? 1 : 0.5, y: hovered ? 0 : 4 }}
            transition={{ duration: 0.3 }}
          >
            {desc}
          </motion.p>
        </div>
      </div>

      {/* Right arrow */}
      <motion.div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        animate={{
          background: hovered ? '#d4e635' : 'rgba(255,255,255,0.04)',
          rotate: hovered ? 45 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ border: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}
      >
        <ChevronRight size={15} style={{ color: hovered ? '#000' : '#555', transition: 'color 0.3s ease' }} />
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const sections = ['home', 'services', 'contact'];
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

      {/* ── Scroll progress bar ── */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(to right, #a3e635, #d4e635)',
          transformOrigin: '0%',
          zIndex: 9999,
          boxShadow: '0 0 8px rgba(163,230,53,0.6), 0 0 20px rgba(163,230,53,0.3)',
        }}
      />

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
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
                  { label: 'About',    href: '/about',    id: 'about' },
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
                  href="https://wa.me/919746711804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 font-bold text-sm text-black rounded-full px-4 py-2 w-fit hover:opacity-80 transition-opacity"
                  style={{ background: '#25D366' }}
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

          {/* Signature — right */}
          <a
            href="https://wa.me/919746711804"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center hover:opacity-60 transition-opacity"
            aria-label="Contact"
          >
            <span
              style={{
                fontFamily: '"Ms Madi", cursive',
                fontSize: 'clamp(32px, 3.5vw, 48px)',
                fontWeight: 400,
                color: '#e0f11f',
                letterSpacing: '0.02em',
                lineHeight: 1,
                textShadow: '0 0 20px rgba(255,255,255,0.15)',
              }}
            >
              Me
            </span>
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
          Crafting Digital Experiences &nbsp;—&nbsp; Since 2026
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
              MOHD
            </span>
          </div>

          {/* Photo — zero-height row, centered at seam, in front of both rows */}
          <ProfilePhoto />

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
              RAZI
            </span>
          </div>
        </motion.div>

        {/* Diamond divider */}
        <motion.div variants={fadeInUp} className="mt-8 mb-6">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" fill="#e0f11f" />
          </svg>
        </motion.div>

        {/* Tagline with typing animation */}
        <motion.div variants={fadeInUp} className="text-center px-6 max-w-md">
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'clamp(14px, 1.6vw, 18px)', lineHeight: '1.6', fontWeight: 400 }}>
            I'm <strong style={{ color: '#fff', fontWeight: 600 }}>MUHAMMED RAZI KV</strong> —{' '}
            <TypingRole />
          </p>
        </motion.div>

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

      {/* ── About Preview Section ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="relative z-10 py-24 md:py-36 overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full blur-[140px] -translate-y-1/2"
            style={{ background: 'rgba(163,230,53,0.04)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24">

          {/* ── Header row: ABOUT ————— → ── */}
          <motion.a href="/about" variants={fadeInUp}
            className="group flex items-center gap-5 mb-16 md:mb-20"
            style={{ textDecoration: 'none' }}>
            <motion.span
              style={{
                fontFamily: '"Big Shoulders Display", sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(13px, 1.4vw, 18px)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#a3e635',
                whiteSpace: 'nowrap',
                display: 'inline-block',
              }}
              whileHover={{
                letterSpacing: '0.38em',
                textShadow: '0 0 20px rgba(163,230,53,0.7)',
                scale: 1.05,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              About
            </motion.span>
            {/* Animated line */}
            <div className="relative flex-1 h-px overflow-hidden" style={{ background: 'rgba(163,230,53,0.12)' }}>
              <motion.div className="absolute inset-y-0 left-0 w-full"
                style={{ background: 'linear-gradient(to right, #a3e635, transparent)', originX: 0 }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              />
              {/* Shimmer on group hover */}
              <motion.div
                className="absolute inset-y-0 w-24 pointer-events-none"
                style={{ background: 'linear-gradient(to right, transparent, rgba(163,230,53,0.6), transparent)' }}
                initial={{ x: '-100%' }}
                whileHover={{ x: '600%' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </div>
            {/* Arrow group */}
            <motion.div
              className="flex items-center gap-2 shrink-0"
              whileHover={{ x: 10, scale: 1.1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="h-px bg-[#a3e635]"
                style={{ width: 24 }}
                whileHover={{ width: 48, boxShadow: '0 0 8px rgba(163,230,53,0.8)' }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(163,230,53,0.1)', border: '1px solid rgba(163,230,53,0.3)' }}
                whileHover={{ background: '#a3e635', scale: 1.2, boxShadow: '0 0 20px rgba(163,230,53,0.5)' }}
                transition={{ duration: 0.3 }}
              >
                <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{ color: '#a3e635' }}
                  whileHover={{ color: '#000', rotate: -45 }}
                  transition={{ duration: 0.25 }}>
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </motion.svg>
              </motion.div>
            </motion.div>
          </motion.a>

          {/* ── Giant heading ── */}
          <motion.div variants={fadeInUp} className="mb-16 md:mb-20">
            <h2 style={{
              fontFamily: '"Big Shoulders Display", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(64px, 14vw, 180px)',
              letterSpacing: '-0.03em',
              lineHeight: 0.88,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.06)',
              userSelect: 'none',
              position: 'relative',
            }}>
              {/* Outlined stroke text behind */}
              <span style={{
                WebkitTextStroke: '1px rgba(163,230,53,0.15)',
                color: 'transparent',
                display: 'block',
              }}>WHO</span>
              <span style={{
                color: '#fff',
                display: 'block',
                marginTop: '-0.05em',
              }}>AM I<span style={{ color: '#a3e635' }}>.</span></span>
            </h2>
          </motion.div>

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start">

            {/* Left col — bio text */}
            <motion.div variants={fadeInLeft} className="lg:col-span-5 space-y-8">
              <p className="text-gray-400 text-lg leading-relaxed">
                My passion lies in the intersection of design and technology — creating fast, visually compelling websites that elevate brands and drive real business results.
              </p>
              <p className="text-white font-medium text-base leading-relaxed">
                I'm a Web Designer &amp; Developer based in Malappuram, Kerala with 1+ year of experience. Proficient in React, Next.js, and modern web tools — delivering on time, every time.
              </p>

              {/* Stat row */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { value: '20+', label: 'Projects' },
                  { value: '30+', label: 'Clients' },
                  { value: '1+',  label: 'Yrs Exp' },
                ].map(({ value, label }) => (
                  <motion.div key={label}
                    className="flex flex-col gap-1 border-l pl-4"
                    style={{ borderColor: 'rgba(163,230,53,0.2)' }}
                    whileHover={{ borderColor: 'rgba(163,230,53,0.8)', x: 4 }}
                    transition={{ duration: 0.25 }}>
                    <span style={{
                      fontFamily: '"Big Shoulders Display", sans-serif',
                      fontWeight: 900,
                      fontSize: 'clamp(28px, 4vw, 42px)',
                      color: '#a3e635',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}>{value}</span>
                    <span className="text-[11px] uppercase tracking-widest text-gray-600">{label}</span>
                  </motion.div>
                ))}
              </div>

            </motion.div>

            {/* Middle — spacer on desktop */}
            <div className="hidden lg:block lg:col-span-1" />

            {/* Right col — skill cards */}
            <motion.div variants={fadeInRight} className="lg:col-span-6 space-y-3">
              {[
                { name: 'Photoshop',   desc: 'Professional Graphic Designing tool',             pct: '95%', num: 95 },
                { name: 'Illustrator', desc: 'Professional Vector Designing tool',               pct: '90%', num: 90 },
                { name: 'CapCut',      desc: 'Professional video editing & smooth transitions',  pct: '93%', num: 93 },
              ].map(({ name, desc, pct, num }, i) => (
                <motion.div key={name}
                  className="relative flex items-center justify-between rounded-2xl px-7 py-6 cursor-default overflow-hidden group"
                  style={{ background: '#d4e635' }}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as any }}
                  whileHover={{ scale: 1.03, y: -6, boxShadow: '0 28px 70px rgba(212,230,53,0.45), 0 0 0 2px rgba(0,0,0,0.15)' }}
                >
                  {/* Dark overlay that slides up on hover */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 60%)', originY: 1 }}
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Shine sweep */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)' }}
                    initial={{ x: '-120%' }}
                    whileHover={{ x: '220%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />

                  {/* Progress bar at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/10 rounded-b-2xl overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'rgba(0,0,0,0.35)', width: '0%' }}
                      whileHover={{ width: `${num}%` }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                    />
                  </div>

                  {/* Left text */}
                  <div className="relative z-10">
                    <motion.p
                      className="font-black text-black leading-tight"
                      style={{ fontFamily: '"Big Shoulders Display", sans-serif', letterSpacing: '-0.01em', fontSize: 'clamp(18px, 2.5vw, 22px)' }}
                      whileHover={{ letterSpacing: '0.04em' }}
                      transition={{ duration: 0.35 }}
                    >
                      {name}
                    </motion.p>
                    <p className="text-sm mt-0.5 font-medium" style={{ color: 'rgba(0,0,0,0.5)' }}>{desc}</p>
                  </div>

                  {/* Right percentage */}
                  <motion.span
                    className="relative z-10 shrink-0"
                    style={{
                      fontFamily: '"Big Shoulders Display", sans-serif',
                      fontWeight: 900,
                      fontSize: 'clamp(32px, 5vw, 56px)',
                      color: 'rgba(0,0,0,0.18)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                    }}
                    whileHover={{ color: 'rgba(0,0,0,0.7)', scale: 1.18, textShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
                    transition={{ duration: 0.25 }}
                  >
                    {pct}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="scroll-mt-24 relative z-10"
      >
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 pt-16 md:pt-24 pb-12">
          <motion.p variants={fadeInUp} className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-6">What I Offer</motion.p>
          <motion.h2 variants={fadeInUp}
            style={{ fontFamily: '"Big Shoulders Display", sans-serif', fontWeight: 900, fontSize: 'clamp(56px, 12vw, 140px)', letterSpacing: '-0.02em', lineHeight: 0.9, textTransform: 'uppercase' }}>
            <span style={{ color: '#fff' }}>Services</span>
            <br />
            <span style={{ color: '#d4e635' }}>&amp; Expertise</span>
          </motion.h2>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24">
          <div className="h-px w-full" style={{ background: 'linear-gradient(to right, rgba(163,230,53,0.3), transparent)' }} />
        </div>

        {/* Services accordion rows */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24">
          {[
            { num: '01', icon: CodeXml,      title: 'Web Development',   desc: 'Custom websites and web apps built with React, Next.js, and modern technologies. Fast, responsive, and built to convert.' },
            { num: '02', icon: ShoppingCart, title: 'E-Commerce',         desc: 'Complete online stores with payment integration, inventory management, and seamless shopping experiences.' },
            { num: '03', icon: Search,       title: 'SEO Optimization',   desc: 'Proven SEO strategies to improve search rankings, drive organic traffic, and grow your online visibility.' },
            { num: '04', icon: TrendingUp,   title: 'Digital Marketing',  desc: 'Strategic campaigns across social media, email, and content to grow your brand and reach your audience.' },
            { num: '05', icon: Palette,      title: 'Graphic Design',     desc: 'Creative visual solutions — branding, logos, social media design, and print materials that make an impact.' },
            { num: '06', icon: Server,       title: 'Server Management',  desc: 'Reliable hosting, SSL setup, domain management, and server optimization for peak performance.' },
          ].map(({ num, icon: Icon, title, desc }) => (
            <ServiceRow key={num} num={num} Icon={Icon} title={title} desc={desc} />
          ))}
        </div>

        {/* Stats strip */}
        <motion.div variants={fadeInUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 mt-16 mb-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
            {[
              { value: '20+', label: 'Projects' },
              { value: '30+', label: 'Clients' },
              { value: '1+',  label: 'Years Exp' },
              { value: '100%', label: 'Satisfaction' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-10 gap-2" style={{ background: '#0a0a0a' }}>
                <span style={{ fontFamily: '"Big Shoulders Display", sans-serif', fontWeight: 900, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.02em', color: '#d4e635', lineHeight: 1 }}>{value}</span>
                <span className="text-xs uppercase tracking-widest text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.section>

      {/* Tools marquee — full width, two rows */}
      {(() => {
        const tools = ['PHOTOSHOP', 'ILLUSTRATOR', 'INDESIGN', 'CAPCUT', 'PHOTOSHOP', 'ILLUSTRATOR', 'INDESIGN', 'CAPCUT', 'PHOTOSHOP', 'ILLUSTRATOR', 'INDESIGN', 'CAPCUT', 'PHOTOSHOP', 'ILLUSTRATOR', 'INDESIGN', 'CAPCUT'];
        const toolStyle: React.CSSProperties = {
          fontFamily: '"Big Shoulders Display", sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(40px, 7vw, 90px)',
          letterSpacing: '-0.01em',
          textTransform: 'uppercase',
          color: '#d4e635',
          padding: '0 28px',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        };
        return (
          <div
            className="relative z-10 w-full overflow-hidden"
            style={{
              background: '#111208',
              borderTop: '1px solid rgba(212,230,53,0.08)',
              borderBottom: '1px solid rgba(212,230,53,0.08)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
            }}
          >
            {/* Row 1 — scrolls left */}
            <div className="overflow-hidden py-4 border-b" style={{ borderColor: 'rgba(212,230,53,0.06)' }}>
              <motion.div
                className="flex shrink-0 items-center"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                {tools.map((item, i) => (
                  <span key={i} className="flex items-center shrink-0" style={toolStyle}>
                    {item}
                    <span style={{ color: 'rgba(212,230,53,0.4)', margin: '0 6px', fontSize: '0.3em', verticalAlign: 'middle' }}>✦</span>
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Row 2 — scrolls right, same style */}
            <div className="overflow-hidden py-4">
              <motion.div
                className="flex shrink-0 items-center"
                animate={{ x: ['-50%', '0%'] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              >
                {tools.map((item, i) => (
                  <span key={i} className="flex items-center shrink-0" style={toolStyle}>
                    {item}
                    <span style={{ color: 'rgba(212,230,53,0.4)', margin: '0 6px', fontSize: '0.3em', verticalAlign: 'middle' }}>✦</span>
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        );
      })()}

      {/* Section Divider */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(163,230,53,0.3), transparent)' }} />
          <motion.div whileInView={{ scale: [0, 1.5, 1] }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="w-2 h-2 rounded-full" style={{ background: '#a3e635' }} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(163,230,53,0.3), transparent)' }} />
        </div>
      </div>

      {/* Contact Section — Split Hero */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={staggerContainer}
        className="scroll-mt-24 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[680px] gap-0 rounded-3xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.06)', background: '#0d0d0d' }}>

            {/* ── LEFT — Bold CTA ── */}
            <motion.div
              variants={fadeInLeft}
              className="relative flex flex-col justify-between p-8 md:p-12 lg:p-14 overflow-hidden"
              style={{ borderRight: '1px solid rgba(255,255,255,0.05)' }}
            >
              {/* Background glow */}
              <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
                style={{ background: 'rgba(212,230,53,0.08)' }} />
              <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
                style={{ background: 'rgba(212,230,53,0.04)' }} />

              {/* Top — label + headline */}
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#d4e635' }} />
                  <span className="text-xs tracking-[0.25em] uppercase text-gray-500">Available for work — 2026</span>
                </div>

                <h2 style={{
                  fontFamily: '"Big Shoulders Display", sans-serif',
                  fontWeight: 900,
                  fontSize: 'clamp(52px, 7vw, 100px)',
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  lineHeight: 0.9,
                  color: '#fff',
                }}>
                  Let's<br />
                  <span style={{ color: '#d4e635' }}>Work</span><br />
                  Together
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                  Have a project in mind? Want to grow your business online? Drop a message — I'll get back to you within 24 hours.
                </p>
              </div>

              {/* Middle — stats row */}
              <div className="relative z-10 grid grid-cols-3 gap-4 my-10">
                {[
                  { value: '20+', label: 'Projects' },
                  { value: '5★', label: 'Rating' },
                  { value: '24h', label: 'Response' },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-2xl font-black" style={{ color: '#d4e635', fontFamily: '"Big Shoulders Display", sans-serif' }}>{value}</span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-0.5">{label}</span>
                  </div>
                ))}
              </div>

              {/* Bottom — contact links */}
              <div className="relative z-10 space-y-3">
                <a href="mailto:razi61293697@gmail.com"
                  className="flex items-center gap-4 group transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(212,230,53,0.1)', border: '1px solid rgba(212,230,53,0.15)' }}>
                    <Mail size={16} style={{ color: '#d4e635' }} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Email</div>
                    <div className="text-sm font-medium text-white group-hover:text-lime-400 transition-colors">razi61293697@gmail.com</div>
                  </div>
                </a>

                <a href="https://wa.me/919746711804" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 group transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(212,230,53,0.1)', border: '1px solid rgba(212,230,53,0.15)' }}>
                    <MessageCircle size={16} style={{ color: '#d4e635' }} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">WhatsApp</div>
                    <div className="text-sm font-medium text-white group-hover:text-lime-400 transition-colors">+91 9746711804</div>
                  </div>
                </a>

                <a href="https://instagram.com/nte_vibes" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 group transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(212,230,53,0.1)', border: '1px solid rgba(212,230,53,0.15)' }}>
                    <Instagram size={16} style={{ color: '#d4e635' }} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Instagram</div>
                    <div className="text-sm font-medium text-white group-hover:text-lime-400 transition-colors">@nte_vibes</div>
                  </div>
                </a>

                <a href="https://instagram.com/ra_zzz_ii" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 group transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(212,230,53,0.1)', border: '1px solid rgba(212,230,53,0.15)' }}>
                    <Instagram size={16} style={{ color: '#d4e635' }} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Instagram</div>
                    <div className="text-sm font-medium text-white group-hover:text-lime-400 transition-colors">@ra_zzz_ii</div>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(212,230,53,0.1)', border: '1px solid rgba(212,230,53,0.15)' }}>
                    <MapPin size={16} style={{ color: '#d4e635' }} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Location</div>
                    <div className="text-sm font-medium text-white">Kerala, India</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT — Form ── */}
            <motion.div
              variants={fadeInRight}
              className="flex flex-col justify-center p-8 md:p-12 lg:p-14"
              style={{ background: '#0a0a0a' }}
            >
              <ContactForm />
            </motion.div>

          </div>
        </div>
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


      {/* Footer — social marquee */}
      <FooterMarquee />
    </div>
  );
}

