import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Award, Users, Coffee, Heart, ArrowLeft, MapPin,
  Code2, Palette, TrendingUp, CheckCircle2, ExternalLink, ShoppingCart, ChevronRight, Download
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as any;

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};
const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        animate={{ x: [0, 60, -40, 0], y: [0, -50, 40, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: 'rgba(163,230,53,0.06)' }}
      />
      <motion.div
        animate={{ x: [0, -60, 80, 0], y: [0, 80, -40, 0], scale: [1, 0.8, 1.3, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-[40%] right-[5%] w-[600px] h-[600px] rounded-full blur-[140px]"
        style={{ background: 'rgba(132,204,22,0.04)' }}
      />
      <motion.div
        animate={{ x: [0, 50, -70, 0], y: [0, -80, 60, 0], scale: [1, 1.1, 0.85, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ background: 'rgba(163,230,53,0.04)' }}
      />
    </div>
  );
}

function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
      style={{
        backgroundImage: 'linear-gradient(rgba(163,230,53,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(163,230,53,0.8) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }}
    />
  );
}

const stats = [
  { icon: Award,  value: '20+',   label: 'Projects Completed' },
  { icon: Users,  value: '30+',   label: 'Happy Clients' },
  { icon: Coffee, value: '1000+', label: 'Cups of Coffee' },
  { icon: Heart,  value: '1',     label: 'Year of Experience' },
];

const skills = [
  'Web Design', 'Web Development', 'E-Commerce Development',
  'SEO Optimization', 'Digital Marketing', 'Mobile App Development',
  'Graphic Design', 'Brand Strategy', 'Wikipedia Page Creation',
];

const highlights = [
  'Usually responds within 24 hours',
  'Available for remote collaboration',
  'Open to freelance and full-time opportunities',
  'Building high-performing websites & SEO strategies',
];

/* ── Accordion service row ─────────────────────────────────────────── */
function WhatIDoRow({ num, Icon, title, desc }: { num: string; Icon: React.ElementType; title: string; desc: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
      className="relative border-b flex items-center justify-between py-6 md:py-8 gap-6 cursor-default overflow-hidden"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
        style={{ background: 'linear-gradient(to bottom, transparent, #a3e635, transparent)', originY: 0.5 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="flex items-center gap-5 md:gap-8 min-w-0">
        <span className="text-xs font-mono text-gray-600 shrink-0 w-8">{num}</span>

        <motion.div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          animate={{
            background: hovered ? 'rgba(163,230,53,0.15)' : 'rgba(255,255,255,0.04)',
            scale: hovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <Icon size={18} style={{ color: hovered ? '#a3e635' : '#555', transition: 'color 0.3s ease' }} />
        </motion.div>

        <div className="min-w-0">
          <h3 style={{
            fontFamily: '"Big Shoulders Display", sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(20px, 4vw, 52px)',
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            lineHeight: 1,
            color: hovered ? '#a3e635' : 'rgba(255,255,255,0.85)',
            transition: 'color 0.3s ease',
          }}>
            {title}
          </h3>
          <motion.p
            className="text-gray-500 text-sm mt-1.5 leading-relaxed max-w-xl hidden md:block"
            animate={{ opacity: hovered ? 1 : 0.4, y: hovered ? 0 : 4 }}
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
          background: hovered ? '#a3e635' : 'rgba(255,255,255,0.04)',
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

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-lime-400/20 relative overflow-x-hidden">
      <FloatingOrbs />
      <GridBackground />

      {/* ── Top bar ── */}
      <nav className="relative z-20 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5 border-b border-white/5"
        style={{ background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0 }}>
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
        <span className="font-bold text-white text-sm">
          RAZI<span style={{ color: '#a3e635' }}>.</span>
        </span>
        <a href="/#contact"
          className="text-xs font-semibold px-4 py-2 rounded-full border transition-all"
          style={{ borderColor: 'rgba(163,230,53,0.3)', color: '#a3e635' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(163,230,53,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
          Hire Me
        </a>
      </nav>

      {/* ── Hero banner ── */}
      <motion.div initial="hidden" animate="visible" variants={stagger}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 pb-12">
        <motion.p variants={fadeInUp}
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: '#a3e635' }}>
          Get to know me
        </motion.p>
        <motion.h1 variants={fadeInUp}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tight text-white mb-6"
          style={{ fontFamily: '"Big Shoulders Display", sans-serif' }}>
          About<br />
          <span style={{ color: '#a3e635' }}>Me.</span>
        </motion.h1>
        <motion.div variants={fadeInUp} className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPin size={14} style={{ color: '#a3e635' }} />
          <span>Malappuram, Kerala, India</span>
        </motion.div>
      </motion.div>

      {/* ── Divider ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="h-px" style={{ background: 'linear-gradient(to right, rgba(163,230,53,0.4), transparent)' }} />
      </div>

      {/* ── Main content grid ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left — text */}
        <motion.div variants={fadeInLeft} className="space-y-10">
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              I'm <span className="text-white font-semibold">RAZI</span>, an expert Web Designer &amp; Developer based in Malappuram, Kerala with over 1 year of experience creating digital experiences that drive real business results.
            </p>
            <p>
              My expertise spans E-Commerce development, SEO optimization, digital marketing, and graphic design. I believe in building websites that not only look stunning but also convert visitors into customers.
            </p>
            <p>
              Every project I undertake is designed with user experience, search engine optimization, and business growth in mind. When I'm not coding, you'll find me exploring the latest web technologies or helping businesses establish their digital presence.
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            {highlights.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: '#a3e635' }} />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="/#contact"
              className="flex items-center gap-2 text-black font-semibold px-6 py-3 rounded-full text-sm transition-colors"
              style={{ background: '#a3e635' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#84cc16')}
              onMouseLeave={e => (e.currentTarget.style.background = '#a3e635')}>
              <span>Get In Touch</span>
              <ExternalLink size={14} />
            </a>
            <a href="/resume"
              className="flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full text-sm border transition-all"
              style={{ borderColor: 'rgba(255,255,255,0.15)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(163,230,53,0.4)'; e.currentTarget.style.color = '#a3e635'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#fff'; }}>
              <Download size={14} />
              View Resume
            </a>
          </div>
        </motion.div>

        {/* Right — image + stats */}
        <motion.div variants={fadeInRight} className="space-y-10">
          {/* Profile image */}
          <div className="relative w-full max-w-[420px] mx-auto aspect-square">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-[80px] rounded-full -z-10"
              style={{ background: 'radial-gradient(circle, rgba(163,230,53,0.08) 0%, transparent 70%)' }} />
            {/* Floating shapes */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border"
              style={{ background: 'rgba(163,230,53,0.05)', borderColor: 'rgba(163,230,53,0.1)' }} />
            <div className="absolute bottom-12 -left-8 w-16 h-16 rounded-full border"
              style={{ background: 'rgba(163,230,53,0.04)', borderColor: 'rgba(163,230,53,0.08)' }} />
            <div className="absolute top-1/3 -right-8 w-12 h-12 bg-white/5 rounded-full border border-white/5" />
            <div className="absolute -bottom-4 right-12 w-8 h-8 rotate-12 rounded-sm border"
              style={{ background: 'rgba(163,230,53,0.05)', borderColor: 'rgba(163,230,53,0.1)' }} />
            {/* Image */}
            <div className="w-full h-full rounded-full border border-white/10 overflow-hidden relative z-10 bg-[#111111] group">
              <img
                src="https://i.pinimg.com/736x/3d/27/42/3d27428c12b3e4febdb977202d79de22.jpg"
                alt="RAZI"
                className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>
            {/* Badge */}
            <div className="absolute bottom-6 right-0 bg-[#111111] border font-bold px-6 py-2.5 rounded-full shadow-lg z-20 text-sm"
              style={{ borderColor: 'rgba(163,230,53,0.3)', color: '#a3e635' }}>
              1 Year
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <motion.div key={label} variants={fadeInUp}
                className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center space-y-3 transition-all duration-300"
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(163,230,53,0.3)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(163,230,53,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(163,230,53,0.1)', boxShadow: '0 0 12px rgba(163,230,53,0.15)' }}>
                  <Icon size={22} style={{ color: '#a3e635' }} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{value}</div>
                  <div className="text-xs text-gray-500 mt-1">{label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── What I Do ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-24 space-y-0">

        {/* Section header */}
        <div className="h-px mb-16" style={{ background: 'linear-gradient(to right, transparent, rgba(163,230,53,0.2), transparent)' }} />

        <motion.div variants={fadeInUp} className="flex items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#a3e635' }}>Expertise</p>
            <h2 style={{
              fontFamily: '"Big Shoulders Display", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(48px, 8vw, 100px)',
              letterSpacing: '-0.02em',
              lineHeight: 0.9,
              textTransform: 'uppercase',
              color: '#fff',
            }}>
              What I<br /><span style={{ color: '#a3e635' }}>Do.</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-xs hidden md:block pb-2">
            A full-stack creative — from pixel-perfect design to search-engine-ready code.
          </p>
        </motion.div>

        {/* Accordion service rows */}
        <motion.div variants={stagger} className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          {[
            { num: '01', icon: Code2,      title: 'Web Development',        desc: 'Custom websites and web apps built with React, Next.js, and modern technologies. Fast, responsive, and built to convert.' },
            { num: '02', icon: ShoppingCart, title: 'E-Commerce',           desc: 'Complete online stores with payment integration, inventory management, and seamless shopping experiences.' },
            { num: '03', icon: TrendingUp,  title: 'SEO & Digital Marketing', desc: 'Proven SEO strategies to improve search rankings, drive organic traffic, and grow your online visibility.' },
            { num: '04', icon: Palette,     title: 'UI / UX & Graphic Design', desc: 'Creative visual solutions — branding, logos, social media design, and print materials that make an impact.' },
            { num: '05', icon: Code2,       title: 'Mobile App Development', desc: 'Cross-platform mobile apps using React Native — smooth, native-feeling experiences on iOS and Android.' },
            { num: '06', icon: TrendingUp,  title: 'Brand Strategy',         desc: 'Building cohesive brand identities that resonate with your audience and stand out in competitive markets.' },
          ].map(({ num, icon: Icon, title, desc }) => (
            <WhatIDoRow key={num} num={num} Icon={Icon} title={title} desc={desc} />
          ))}
        </motion.div>

        {/* Skill tags — scrolling marquee strip */}
        <motion.div variants={fadeInUp} className="mt-16 -mx-6 sm:-mx-10 lg:-mx-16 overflow-hidden"
          style={{
            borderTop: '1px solid rgba(163,230,53,0.08)',
            borderBottom: '1px solid rgba(163,230,53,0.08)',
            background: 'rgba(163,230,53,0.02)',
          }}>
          <motion.div
            className="flex items-center py-4 gap-0"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
            {[...skills, ...skills].map((skill, i) => (
              <span key={i} className="flex items-center shrink-0 gap-3 px-5 text-sm font-semibold uppercase tracking-widest whitespace-nowrap"
                style={{ color: i % 2 === 0 ? '#a3e635' : 'rgba(255,255,255,0.3)', letterSpacing: '0.12em' }}>
                {skill}
                <span style={{ color: 'rgba(163,230,53,0.3)', fontSize: '0.5em' }}>✦</span>
              </span>
            ))}
          </motion.div>
        </motion.div>

      </motion.div>

      {/* ── Footer strip ── */}
      <div className="relative z-10 border-t border-white/5 px-6 sm:px-10 lg:px-16 py-6 flex items-center justify-between"
        style={{ background: 'rgba(10,10,10,0.8)' }}>
        <span className="text-gray-600 text-xs">© 2026 RAZI. All rights reserved.</span>
        <a href="/" className="text-xs text-gray-500 hover:text-white transition-colors">← Back to Home</a>
      </div>
    </div>
  );
}
