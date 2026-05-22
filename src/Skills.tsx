import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CodeXml, Server, Phone, Monitor, Zap, TrendingUp, Palette,
  Star, Award, ArrowDown, Menu, ChevronRight, MessageCircle
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as any;

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const skillBlocks = [
  {
    num: '01', icon: CodeXml, title: 'Frontend Development',
    skills: ['React.js & Next.js', 'TypeScript', 'HTML5 & CSS3', 'Tailwind CSS', 'Responsive Design', 'Vite'],
    level: 90, comingSoon: false,
  },
  {
    num: '02', icon: Server, title: 'Backend & APIs',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'GraphQL', 'PHP & Laravel', 'Microservices'],
    level: 70, comingSoon: true,
  },
  {
    num: '03', icon: Phone, title: 'Mobile Development',
    skills: ['React Native', 'Expo', 'iOS & Android', 'Native APIs', 'Mobile UI/UX', 'App Store'],
    level: 65, comingSoon: true,
  },
  {
    num: '04', icon: Monitor, title: 'CMS & Builders',
    skills: ['WordPress', 'Elementor Pro', 'WPBakery', 'Divi', 'Custom Themes', 'Plugin Dev'],
    level: 85, comingSoon: false,
  },
  {
    num: '05', icon: Zap, title: 'Databases & Cloud',
    skills: ['MongoDB', 'Firebase', 'Supabase', 'MySQL', 'PostgreSQL', 'JWT & OAuth'],
    level: 75, comingSoon: true,
  },
  {
    num: '06', icon: TrendingUp, title: 'Digital Marketing',
    skills: ['SEO', 'Social Media', 'Content Strategy', 'Google Analytics', 'Email Marketing', 'WhatsApp Marketing'],
    level: 88, comingSoon: false,
  },
  {
    num: '07', icon: Palette, title: 'Graphic Design',
    skills: ['Photoshop', 'Illustrator', 'InDesign', 'Social Media Design', 'Brochures', 'Brand Identity'],
    level: 82, comingSoon: false,
  },
  {
    num: '08', icon: Star, title: 'Media Production',
    skills: ['Premiere Pro', 'After Effects', 'Drone Photography', 'Color Grading', 'Live Streaming', 'CapCut'],
    level: 72, comingSoon: true,
  },
  {
    num: '09', icon: Server, title: 'Hosting & Servers',
    skills: ['Web Hosting', 'Server Management', 'SSL Certificates', 'Domain Management', 'Performance', 'Dedicated Servers'],
    level: 78, comingSoon: true,
  },
  {
    num: '10', icon: Award, title: 'Library & Digitalization',
    skills: ['Library Digitalization', 'Koha LMS', 'Digital Archives', 'Cataloging', 'Metadata', 'User Access'],
    level: 68, comingSoon: true,
  },
];

export default function SkillsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans relative overflow-x-hidden">

      {/* Grid bg */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{ backgroundImage: `linear-gradient(rgba(163,230,53,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.8) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[160px] pointer-events-none z-0"
        style={{ background: 'rgba(163,230,53,0.04)' }} />

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
                <a href="https://wa.me/918129489071" target="_blank" rel="noopener noreferrer"
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
        className="relative z-10 pt-32 pb-16 px-6 sm:px-10 lg:px-24 max-w-7xl mx-auto">

        <motion.p variants={fadeInUp} className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-6">
          Professional Skills & Expertise
        </motion.p>

        <motion.h1 variants={fadeInUp}
          style={{ fontFamily: '"Big Shoulders Display", sans-serif', fontWeight: 900, fontSize: 'clamp(64px, 14vw, 160px)', letterSpacing: '-0.02em', lineHeight: 0.9, textTransform: 'uppercase' }}
          className="mb-8">
          <span style={{ color: '#d4e635' }}>Skills</span>
          <br />
          <span style={{ color: 'rgba(255,255,255,0.15)', WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>&</span>
          <br />
          <span style={{ color: '#ffffff' }}>Expertise</span>
        </motion.h1>

        <motion.p variants={fadeInUp} className="text-gray-400 text-lg max-w-xl leading-relaxed">
          Versatile digital professional spanning web development, marketing, design, and media production.
        </motion.p>
      </motion.div>

      {/* Divider */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-24 max-w-7xl mx-auto mb-4">
        <div className="h-px w-full" style={{ background: 'linear-gradient(to right, rgba(163,230,53,0.3), transparent)' }} />
      </div>

      {/* Skills list */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
        variants={staggerContainer}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-24 pb-32">

        {skillBlocks.map(({ num, icon: Icon, title, skills, level, comingSoon }, idx) => (
          <motion.div key={num} variants={fadeInUp}
            className="group relative border-b cursor-pointer"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
          >
            {/* Main row */}
            <div className="flex items-center justify-between py-6 md:py-8 gap-6">

              {/* Left — number + title */}
              <div className="flex items-center gap-5 md:gap-8 min-w-0">
                <span className="text-xs font-mono text-gray-600 shrink-0 w-8">{num}</span>

                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: activeIdx === idx ? 'rgba(212,230,53,0.15)' : 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <Icon size={18} style={{ color: activeIdx === idx ? '#d4e635' : '#666' }} />
                </div>

                <h3 style={{
                  fontFamily: '"Big Shoulders Display", sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(22px, 4vw, 52px)',
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  color: activeIdx === idx ? '#d4e635' : 'rgba(255,255,255,0.85)',
                  transition: 'color 0.3s ease',
                }}>
                  {title}
                </h3>
              </div>

              {/* Right — level bar + coming soon + arrow */}
              <div className="flex items-center gap-4 shrink-0">
                {comingSoon && (
                  <span className="hidden sm:flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: 'rgba(212,230,53,0.08)', color: '#d4e635', border: '1px solid rgba(212,230,53,0.2)' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4e635] animate-pulse" />
                    <span>Soon</span>
                  </span>
                )}

                {/* Level pill */}
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-24 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div className="h-full rounded-full"
                      style={{ background: '#d4e635' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: EASE, delay: 0.2 }} />
                  </div>
                  <span className="text-xs text-gray-500 font-mono w-8">{level}%</span>
                </div>

                <motion.div animate={{ rotate: activeIdx === idx ? 45 : 0 }} transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: activeIdx === idx ? '#d4e635' : 'rgba(255,255,255,0.05)' }}>
                  <ChevronRight size={14} style={{ color: activeIdx === idx ? '#000' : '#666' }} />
                </motion.div>
              </div>
            </div>

            {/* Expanded skill tags */}
            <AnimatePresence>
              {activeIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pl-[52px] md:pl-[108px] flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                      <motion.span key={skill}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        className="text-sm px-4 py-2 rounded-full font-medium"
                        style={{ background: 'rgba(212,230,53,0.08)', color: '#d4e635', border: '1px solid rgba(212,230,53,0.15)' }}>
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hover line accent */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center rounded-full"
              style={{ background: 'linear-gradient(to bottom, transparent, #d4e635, transparent)' }} />
          </motion.div>
        ))}
      </motion.div>

      {/* Footer marquee */}
      <footer className="relative z-10 select-none" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="marquee-wrapper w-full overflow-hidden"
          style={{ paddingTop: '20px', paddingBottom: '20px', maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)' }}>
          <div className="marquee-track">
            {['WTSP','IG','MAIL','FCB','WTSP','IG','MAIL','FCB','WTSP','IG','MAIL','FCB','WTSP','IG','MAIL','FCB'].map((item, i) => {
              const links: Record<string,string> = { WTSP: 'https://wa.me/918129489071', IG: 'https://instagram.com', MAIL: 'mailto:razi61293697@gmail.com', FCB: 'https://facebook.com' };
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
