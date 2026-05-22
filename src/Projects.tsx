import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowUpRight, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as any;

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const projects = [
  {
    id: 1,
    num: '01',
    title: 'AI Islam Official',
    subtitle: 'AI-Powered Islamic Platform',
    description: 'An intelligent AI platform for the Muslim community — Quran tafsir, Hadith search, prayer guidance, and personalized spiritual assistance powered by advanced AI models.',
    image: 'https://i.pinimg.com/736x/3d/7f/16/3d7f16265501f86d37936c99de57ace4.jpg',
    tech: ['React Native', 'Next.js', 'OpenAI', 'MongoDB'],
    year: '2024',
    demo: 'https://aiislamofficial.vercel.app/',
    comingSoon: false,
    featured: true,
  },
  {
    id: 2,
    num: '02',
    title: 'AI Islam ',
    subtitle: 'AI Chat Experience',
    description: 'A clean, fast AI chat — ask anything, get instant answers, keep conversations organized. Intelligent and authentic responses effortlessly.',
    image: 'https://i.pinimg.com/736x/8d/60/cf/8d60cf9770d6693de6ee74cf691628f2.jpg',
    tech: ['React', 'Next.js', 'OpenAI', 'Android App'],
    year: '2024',
    demo: 'https://aiislam.vercel.app/',
    comingSoon: false,
    featured: true,
  },
  {
    id: 3,
    num: '03',
    title: 'ChatSee',
    subtitle: 'Where Conversations Come Alive',
    description: 'Complete e-commerce platform for buying and selling plants online with secure payment integration and a wide range of products.',
    image: 'https://i.pinimg.com/736x/a3/ba/f2/a3baf2b153d73a5aa358836b90397b22.jpg',
    tech: ['Conversation', 'Find', 'WordPress'],
    year: '2025',
    demo: 'https://chatsee.lovable.app/',
    comingSoon: false,
    featured: true,
  },
  {
    id: 4,
    num: '04',
    title: 'AL Zad Restuarent',
    subtitle: 'Smart Hotel & Hospitality Platform',
    description: 'A complete hotel management ecosystem built for modern hospitality businesses — manage room bookings, guest check-ins, reservations, billing, staff operations, restaurant orders, housekeeping, and analytics from one powerful dashboard. Designed to streamline hotel workflows and elevate the guest experience with speed, automation, and elegance.',
    image: 'https://i.pinimg.com/736x/6f/99/1e/6f991edc3192a04f5f93d2af4290b674.jpg',
    tech: ['Next.js', 'MongoDB', 'Supabase'],
    year: '2026',
    demo: 'https://alzad.vercel.app/',
    comingSoon: false,
    featured: false,
  },
  {
    id: 5,
    num: '05',
    title: 'Dubai Business',
    subtitle: 'Corporate Website',
    description: 'Creative website for a Dubai-based business showcasing services and portfolio with modern design and professional presentation.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
    tech: ['Responsive', 'Mobile-Friendly', 'SEO'],
    year: '2024',
    demo: null,
    comingSoon: true,
    featured: false,
  },
  {
    id: 6,
    num: '06',
    title: 'RKD Works',
    subtitle: 'Business Website',
    description: 'Business website for RKD Works with responsive design and local SEO optimization features for maximum visibility.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    tech: ['Business Website', 'SEO', 'Responsive'],
    year: '2024',
    demo: null,
    comingSoon: true,
    featured: false,
  },
];

// ── Poster / Design Work ──────────────────────────────────────────────────
const posters = [
  { id: 1,  src: 'https://i.pinimg.com/736x/9c/0b/fc/9c0bfcdbcecc018e7382b4ebd3ba66f1.jpg', label: 'Dawa Open' },
  { id: 2,  src: 'https://i.pinimg.com/736x/c2/f8/fc/c2f8fcb1b749282f4d2f08c17a20c4d0.jpg', label: 'Ootyk poyalo' },
  { id: 3,  src: 'https://i.pinimg.com/736x/9e/69/b5/9e69b5b6e1c0a84b709e3b741811dd10.jpg', label: 'Wayanad' },
  { id: 4,  src: 'https://i.pinimg.com/736x/fd/4e/af/fd4eaf32f0347c88fb7a76fdaa4b5824.jpg', label: 'Sports Day' },
  { id: 5,  src: 'https://i.pinimg.com/736x/09/40/b7/0940b77347e979b41b29d47b099ca1dd.jpg', label: 'Keralam' },
  { id: 6,  src: 'https://i.pinimg.com/474x/ab/96/98/ab9698ce6a3f360c10b3a529790be0a4.jpg', label: 'AKP MSU' },
  { id: 7,  src: 'https://i.pinimg.com/736x/11/14/15/11141572318ba0624328f286c7c982da.jpg', label: 'VDS SMILE' },
  { id: 8,  src: 'https://i.pinimg.com/736x/09/8d/3f/098d3f4ad11f60a672584ceeadb4f3af.jpg', label: 'Turtle WAX' },
];

// ── Lightbox ──────────────────────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }: {
  images: typeof posters;
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
      >
        <X size={18} className="text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-xs text-gray-400 tracking-widest font-mono">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); prev(); }}
        className="absolute left-4 sm:left-8 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-white/10"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <ChevronLeft size={20} className="text-white" />
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 0.88, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -10 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={images[current].src}
            alt={images[current].label}
            className="rounded-2xl shadow-2xl"
            style={{
              maxHeight: '80vh',
              maxWidth: '90vw',
              objectFit: 'contain',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          />
          <p className="mt-4 text-sm text-gray-400 tracking-wide">{images[current].label}</p>
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); next(); }}
        className="absolute right-4 sm:right-8 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-white/10"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <ChevronRight size={20} className="text-white" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); setCurrent(i); }}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? '20px' : '6px',
              height: '6px',
              background: i === current ? '#d4e635' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans relative overflow-x-hidden" onMouseMove={handleMouseMove}>

      {/* Grid bg */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{ backgroundImage: `linear-gradient(rgba(163,230,53,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.8) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      {/* Floating image preview on hover */}
      <AnimatePresence>
        {hoveredId !== null && (
          <motion.div
            key={hoveredId}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed z-[200] pointer-events-none rounded-2xl overflow-hidden shadow-2xl"
            style={{
              width: '320px',
              height: '200px',
              left: mousePos.x + 24,
              top: mousePos.y - 100,
              border: '1px solid rgba(212,230,53,0.2)',
            }}
          >
            <img
              src={projects.find(p => p.id === hoveredId)?.image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50" style={{ background: 'transparent' }}>
        <div className="flex items-center justify-between px-6 sm:px-10 py-6">
          <button onClick={() => setMobileMenuOpen(o => !o)}
            className="flex flex-col gap-[6px] group" aria-label="Open menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <span className="block h-[2px] rounded-full bg-white transition-all duration-300 group-hover:bg-[#e0f11f]" style={{ width: '28px' }} />
            <span className="block h-[2px] rounded-full bg-white transition-all duration-300 group-hover:bg-[#e0f11f]" style={{ width: '20px' }} />
            <span className="block h-[2px] rounded-full bg-white transition-all duration-300 group-hover:bg-[#e0f11f]" style={{ width: '24px' }} />
          </button>
          <a href="/#contact" className="hidden md:flex items-center hover:opacity-60 transition-opacity">
            <span style={{ fontFamily: '"Ms Madi", cursive', fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 400, color: '#ffffff', lineHeight: 1 }}>Me</span>
          </a>
        </div>
      </nav>

      {/* Mobile side panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90]" style={{ background: 'rgba(0,0,0,0.45)' }}
              onClick={() => setMobileMenuOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 h-full z-[100] flex flex-col"
              style={{ width: 'clamp(200px, 28vw, 300px)', background: '#0a0a0a', paddingTop: '32px', paddingLeft: '28px', paddingRight: '28px' }}>
              <button onClick={() => setMobileMenuOpen(false)} className="mb-10 self-start text-white/50 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6L18 18M18 6L6 18"/></svg>
              </button>
              <nav className="flex flex-col gap-0">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About', href: '/#about' },
                  { label: 'Projects', href: '/projects' },
                  { label: 'Services', href: '/#services' },
                  { label: 'Skills', href: '/skills' },
                  { label: 'Contact', href: '/#contact' },
                ].map(({ label, href }, i) => (
                  <motion.a key={label} href={href} onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.055, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ fontFamily: '"Big Shoulders Display", sans-serif', fontWeight: 700, fontSize: 'clamp(20px, 2.4vw, 28px)', letterSpacing: '0.02em', lineHeight: '1.4', textTransform: 'uppercase', color: 'rgba(255,255,255,0.82)', textDecoration: 'none', display: 'block', padding: '5px 0' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#e0f11f'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.82)'; }}>
                    {label}
                  </motion.a>
                ))}
              </nav>
              <div className="mt-auto pb-10">
                <a href="https://wa.me/919746711804" target="_blank" rel="noopener noreferrer"
                  className="flex items-center space-x-2 font-bold text-sm text-black rounded-full px-4 py-2 w-fit hover:opacity-80 transition-opacity"
                  style={{ background: '#e0f11f' }}>
                  <MessageCircle size={14} /><span>WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero */}
      <motion.div initial="hidden" animate="visible" variants={staggerContainer}
        className="relative z-10 pt-32 pb-12 px-6 sm:px-10 lg:px-24 max-w-7xl mx-auto">

        <motion.p variants={fadeInUp} className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-6">
          Selected Work
        </motion.p>

        <motion.h1 variants={fadeInUp}
          style={{ fontFamily: '"Big Shoulders Display", sans-serif', fontWeight: 900, fontSize: 'clamp(64px, 14vw, 160px)', letterSpacing: '-0.02em', lineHeight: 0.9, textTransform: 'uppercase' }}
          className="mb-10">
          <span style={{ color: '#ffffff' }}>Featured</span>
          <br />
          <span style={{ color: '#d4e635' }}>Projects</span>
        </motion.h1>

        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <p className="text-gray-400 text-base max-w-md leading-relaxed">
            A selection of projects that showcase my skills across development, design, and digital strategy.
          </p>
          <span className="hidden md:block text-xs text-gray-600 tracking-widest uppercase">{projects.length} Projects</span>
        </motion.div>
      </motion.div>

      {/* Divider */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-24 max-w-7xl mx-auto">
        <div className="h-px w-full" style={{ background: 'linear-gradient(to right, rgba(163,230,53,0.3), transparent)' }} />
      </div>

      {/* Featured — accordion list */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
        variants={staggerContainer}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-24">

        {featuredProjects.map((project) => (
          <motion.div key={project.id} variants={fadeInUp}
            className="group relative border-b"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="flex items-center justify-between py-7 md:py-10 gap-4">

              {/* Left */}
              <div className="flex items-center gap-5 md:gap-8 min-w-0">
                <span className="text-xs font-mono text-gray-600 shrink-0 w-8">{project.num}</span>

                <div className="min-w-0">
                  <h3 style={{
                    fontFamily: '"Big Shoulders Display", sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(24px, 5vw, 64px)',
                    letterSpacing: '-0.01em',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                    color: hoveredId === project.id ? '#d4e635' : 'rgba(255,255,255,0.85)',
                    transition: 'color 0.3s ease',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 hidden md:block">{project.subtitle}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3 md:gap-6 shrink-0">
                <div className="hidden md:flex gap-2 flex-wrap justify-end max-w-xs">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                      style={{ background: 'rgba(255,255,255,0.04)', color: '#888', border: '1px solid rgba(255,255,255,0.06)' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <span className="text-xs text-gray-600 font-mono hidden sm:block">{project.year}</span>

                {project.comingSoon ? (
                  <span className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(212,230,53,0.08)', color: '#d4e635', border: '1px solid rgba(212,230,53,0.2)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4e635] animate-pulse" />
                    <span>Soon</span>
                  </span>
                ) : (
                  <a href={project.demo || '#'} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: hoveredId === project.id ? '#d4e635' : 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}>
                    <ArrowUpRight size={16} style={{ color: hoveredId === project.id ? '#000' : '#666' }} />
                  </a>
                )}
              </div>
            </div>

            {/* Hover accent line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center rounded-full"
              style={{ background: 'linear-gradient(to bottom, transparent, #d4e635, transparent)' }} />
          </motion.div>
        ))}
      </motion.div>

      {/* Other projects — grid */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
        variants={staggerContainer}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-24 mt-24 pb-24">

        <motion.div variants={fadeInUp} className="flex items-end justify-between mb-10">
          <h2 style={{ fontFamily: '"Big Shoulders Display", sans-serif', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.01em', textTransform: 'uppercase', color: '#fff' }}>
            More Work
          </h2>
          <span className="text-xs text-gray-600 tracking-widest uppercase hidden sm:block">{otherProjects.length} Projects</span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {otherProjects.map((project) => (
            <motion.div key={project.id} variants={fadeInUp}
              className="group relative overflow-hidden"
              style={{ background: '#0a0a0a' }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img src={project.image} alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: project.comingSoon ? 'brightness(0.4)' : 'brightness(0.7)' }} />
                <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                  style={{ background: 'linear-gradient(to top, #0a0a0a 0%, transparent 60%)' }} />
                {project.comingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.6)', color: '#d4e635', border: '1px solid rgba(212,230,53,0.3)' }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4e635] animate-pulse" />
                      <span>Coming Soon</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-gray-600">{project.num}</span>
                    <h3 style={{ fontFamily: '"Big Shoulders Display", sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 28px)', letterSpacing: '-0.01em', textTransform: 'uppercase', color: '#fff', lineHeight: 1.1 }}>
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1">{project.subtitle}</p>
                  </div>
                  {!project.comingSoon && project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 transition-all duration-300 group-hover:bg-[#d4e635]"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <ArrowUpRight size={13} className="text-gray-500 group-hover:text-black transition-colors" />
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded font-medium"
                      style={{ background: 'rgba(255,255,255,0.04)', color: '#666' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ border: '1px solid rgba(212,230,53,0.15)' }} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div variants={fadeInUp} className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div>
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">Have a project in mind?</p>
            <h3 style={{ fontFamily: '"Big Shoulders Display", sans-serif', fontWeight: 900, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.01em', textTransform: 'uppercase', color: '#fff' }}>
              Let's Build Together
            </h3>
          </div>
          <a href="/#contact"
            className="flex items-center gap-2 font-bold text-sm text-black px-8 py-4 rounded-full transition-all hover:opacity-80"
            style={{ background: '#d4e635', whiteSpace: 'nowrap' }}>
            <span>Start a Project</span>
            <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </motion.div>

      {/* ── Poster / Design Work Section ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={staggerContainer}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-24 mt-24 pb-16"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-3">Graphic Design</p>
            <h2 style={{ fontFamily: '"Big Shoulders Display", sans-serif', fontWeight: 900, fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.01em', textTransform: 'uppercase', color: '#fff', lineHeight: 1 }}>
              Design <span style={{ color: '#d4e635' }}>Work</span>
            </h2>
          </div>
          <span className="text-xs text-gray-600 tracking-widest uppercase hidden sm:block">{posters.length} Posters</span>
        </motion.div>

        {/* Divider */}
        <motion.div variants={fadeInUp} className="h-px w-full mb-10" style={{ background: 'linear-gradient(to right, rgba(163,230,53,0.3), transparent)' }} />

        {/* Poster grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {posters.map((poster, idx) => (
            <motion.div
              key={poster.id}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              style={{ aspectRatio: '3/4', background: '#111' }}
              onClick={() => setLightboxIndex(idx)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={poster.src}
                alt={poster.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay on hover */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: '#d4e635' }}>
                  <ZoomIn size={18} className="text-black" />
                </div>
                <span className="text-white text-xs font-semibold tracking-wide text-center px-3">{poster.label}</span>
              </motion.div>

              {/* Corner badge */}
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'rgba(212,230,53,0.9)' }}>
                <ArrowUpRight size={12} className="text-black" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={posters}
            startIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer marquee */}
      <footer className="relative z-10 select-none" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="marquee-wrapper w-full overflow-hidden"
          style={{ paddingTop: '20px', paddingBottom: '20px', maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)' }}>
          <div className="marquee-track">
            {['WTSP','IG','MAIL','FCB','WTSP','IG','MAIL','FCB','WTSP','IG','MAIL','FCB','WTSP','IG','MAIL','FCB'].map((item, i) => {
              const links: Record<string,string> = { WTSP: 'https://wa.me/919746711804', IG: 'https://instagram.com', MAIL: 'mailto:razi61293697@gmail.com', FCB: 'https://facebook.com' };
              return (
                <a key={i} href={links[item]} target={item !== 'MAIL' ? '_blank' : undefined} rel="noopener noreferrer"
                  className="footer-social-link flex items-center shrink-0"
                  style={{ fontFamily: '"Big Shoulders Display", sans-serif', fontWeight: 900, fontSize: 'clamp(88px, 22vw, 240px)', letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#d4e635', padding: '0 40px', lineHeight: 1, whiteSpace: 'nowrap', textDecoration: 'none', transition: 'color 0.3s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#d4e635')}>
                  {item}
                  <span style={{ color: 'rgba(212,230,53,0.4)', margin: '0 10px', fontSize: '0.2em', verticalAlign: 'middle' }}>✦</span>
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
