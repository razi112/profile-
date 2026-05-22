import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Globe, Download, ArrowLeft, Briefcase, GraduationCap, Code2, Star, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EASE = [0.22, 1, 0.36, 1] as any;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] rounded-full blur-[130px]"
        style={{ background: 'rgba(163,230,53,0.05)' }} />
      <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full blur-[120px]"
        style={{ background: 'rgba(163,230,53,0.03)' }} />
    </div>
  );
}

function GridBg() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.022]"
      style={{
        backgroundImage: 'linear-gradient(rgba(163,230,53,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(163,230,53,0.8) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
  );
}

/* ── Section wrapper ── */
function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <motion.div variants={fadeInUp} className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'rgba(163,230,53,0.1)' }}>
          <Icon size={15} style={{ color: '#a3e635' }} />
        </div>
        <h2 style={{
          fontFamily: '"Big Shoulders Display", sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(18px, 2.5vw, 24px)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#fff',
        }}>{title}</h2>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(163,230,53,0.3), transparent)' }} />
      </div>
      {children}
    </motion.div>
  );
}

/* ── Timeline job entry ── */
function Job({ title, company, period, location, points }: {
  title: string; company: string; period: string; location: string; points: string[];
}) {
  return (
    <div className="relative pl-6 border-l" style={{ borderColor: 'rgba(163,230,53,0.2)' }}>
      {/* Dot */}
      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2"
        style={{ background: '#0a0a0a', borderColor: '#a3e635' }} />
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <p className="font-bold text-white text-base">{title}</p>
          <p className="text-sm font-medium" style={{ color: '#a3e635' }}>{company} · {location}</p>
        </div>
        <span className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full shrink-0">{period}</span>
      </div>
      <ul className="space-y-1.5 mt-3">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-400 leading-relaxed">
            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: '#a3e635' }} />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Resume() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans relative overflow-x-hidden
      print:bg-white print:text-black">
      <FloatingOrbs />
      <GridBg />

      {/* ── Top bar ── */}
      <nav className="relative z-20 sticky top-0 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-4 border-b border-white/5 print:hidden"
        style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(12px)' }}>
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm group">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>
        <span style={{ fontFamily: '"Big Shoulders Display", sans-serif', fontWeight: 900, fontSize: '18px', color: '#fff', letterSpacing: '0.05em' }}>
          RAZI<span style={{ color: '#a3e635' }}>.</span>
        </span>
        <button onClick={() => window.print()}
          className="flex items-center gap-2 text-black font-bold px-5 py-2 rounded-full text-sm transition-colors"
          style={{ background: '#a3e635' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#84cc16')}
          onMouseLeave={e => (e.currentTarget.style.background = '#a3e635')}>
          <Download size={14} /><span>Download PDF</span>
        </button>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-16 print:py-8 print:px-8">

        {/* ── Hero header ── */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-14 print:mb-8">

          {/* Giant name */}
          <motion.div variants={fadeInUp}>
            <h1 style={{
              fontFamily: '"Big Shoulders Display", sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(56px, 12vw, 130px)',
              letterSpacing: '-0.03em',
              lineHeight: 0.88,
              textTransform: 'uppercase',
              color: '#fff',
            }}>
              RAZI<span style={{ color: '#a3e635' }}>.</span>
            </h1>
          </motion.div>

          {/* Role + contact row */}
          <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-lg font-semibold" style={{ color: '#a3e635' }}>Web Designer &amp; Developer</p>
              <p className="text-gray-500 text-sm mt-1">SEO Specialist · E-Commerce Expert · Digital Marketer</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400 print:text-gray-700">
              <a href="mailto:razi61293697@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors print:text-gray-700">
                <Mail size={13} style={{ color: '#a3e635' }} />razi61293697@gmail.com
              </a>
              <a href="tel:+919746711804" className="flex items-center gap-1.5 hover:text-white transition-colors print:text-gray-700">
                <Phone size={13} style={{ color: '#a3e635' }} />+91 9746711804
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} style={{ color: '#a3e635' }} />Malappuram, Kerala
              </span>
              <a href="https://aiislamofficial.vercel.app" className="flex items-center gap-1.5 hover:text-white transition-colors print:text-gray-700">
                <Globe size={13} style={{ color: '#a3e635' }} />Portfolio
              </a>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div variants={fadeInUp} className="mt-8 h-px"
            style={{ background: 'linear-gradient(to right, #a3e635, rgba(163,230,53,0.1), transparent)' }} />
        </motion.div>

        {/* ── Two-column layout ── */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 print:grid-cols-3 print:gap-8">

          {/* ── Left sidebar ── */}
          <div className="lg:col-span-1 space-y-10 print:col-span-1">

            {/* Summary */}
            <Section icon={Star} title="Summary">
              <p className="text-gray-400 text-sm leading-relaxed print:text-gray-700">
                Creative and results-driven Web Designer &amp; Developer with hands-on experience building high-performance websites, e-commerce platforms, and digital marketing strategies. Passionate about crafting digital experiences that convert visitors into customers.
              </p>
            </Section>

            {/* Skills */}
            <Section icon={Code2} title="Skills">
              <div className="space-y-3">
                {[
                  { cat: 'Frontend',       val: 'React, Next.js, TypeScript, Tailwind' },
                  { cat: 'Backend',        val: 'Node.js, Supabase, MongoDB' },
                  { cat: 'Mobile',         val: 'React Native, Cross-Platform' },
                  { cat: 'E-Commerce',     val: 'WooCommerce, Razorpay, Shopify' },
                  { cat: 'SEO',            val: 'On-Page, Technical, Local SEO' },
                  { cat: 'Design',         val: 'Figma, Photoshop, Illustrator' },
                  { cat: 'Tools',          val: 'Git, Vite, Vercel, WordPress' },
                  { cat: 'Other',          val: 'Wikipedia Pages, AI Integration' },
                ].map(({ cat, val }) => (
                  <motion.div key={cat} variants={fadeInUp}
                    className="rounded-xl px-4 py-3 border border-white/5 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(163,230,53,0.25)'; e.currentTarget.style.background = 'rgba(163,230,53,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}>
                    <p className="text-[11px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#a3e635' }}>{cat}</p>
                    <p className="text-xs text-gray-400 leading-relaxed print:text-gray-700">{val}</p>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* Languages */}
            <Section icon={Languages} title="Languages">
              <div className="space-y-2">
                {[
                  { lang: 'Malayalam', level: 'Native', pct: 100 },
                  { lang: 'English',   level: 'Professional', pct: 85 },
                  { lang: 'Arabic',    level: 'Basic', pct: 35 },
                ].map(({ lang, level, pct }) => (
                  <div key={lang} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-white font-medium">{lang}</span>
                      <span className="text-gray-500 text-xs">{level}</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ background: '#a3e635' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: EASE, delay: 0.2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Education */}
            <Section icon={GraduationCap} title="Education">
              <div className="pl-6 border-l" style={{ borderColor: 'rgba(163,230,53,0.2)' }}>
                <div className="absolute -left-[5px]" />
                <p className="font-bold text-white text-sm">Higher Secondary Education</p>
                <p className="text-xs mt-0.5" style={{ color: '#a3e635' }}>Kerala State Board</p>
                <p className="text-xs text-gray-500 mt-0.5">Malappuram, Kerala · 2022</p>
              </div>
            </Section>

          </div>

          {/* ── Right main ── */}
          <div className="lg:col-span-2 space-y-10 print:col-span-2">

            {/* Experience */}
            <Section icon={Briefcase} title="Experience">
              <div className="space-y-8">
                <Job
                  title="Freelance Web Designer & Developer"
                  company="Self-Employed"
                  period="2022 — Present"
                  location="Malappuram, Kerala"
                  points={[
                    'Designed and developed 20+ websites for clients across India and the UAE',
                    'Built full e-commerce platforms with Razorpay payment gateway integration',
                    'Implemented SEO strategies improving organic traffic by 40–60% for clients',
                    'Created AI Islam — an AI-powered Islamic knowledge platform',
                    'Delivered branding, logo design, and digital marketing for 30+ businesses',
                  ]}
                />
                <Job
                  title="Digital Marketing Specialist"
                  company="Freelance"
                  period="2021 — 2022"
                  location="Remote"
                  points={[
                    'Managed Meta Ads and Google Ads campaigns for local businesses',
                    'Grew social media presence for multiple brands from 0 to 10k+ followers',
                    'Produced graphic design assets for marketing collateral and social media',
                  ]}
                />
              </div>
            </Section>

            {/* Projects */}
            <Section icon={Code2} title="Key Projects">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'AI Islam',                  desc: 'AI-powered Islamic knowledge platform — Quran tafsir, Hadith search, prayer guidance.',          tech: 'Next.js · OpenAI · MongoDB',  link: 'aiislamofficial.vercel.app' },
                  { name: 'PlantBox E-Commerce',       desc: 'Full e-commerce platform for buying and selling plants with Razorpay integration.',               tech: 'WordPress · Razorpay' },
                  { name: 'Results Management System', desc: 'Educational institution results portal with grading and reporting.',                               tech: 'Next.js · MongoDB · Supabase' },
                  { name: 'RKD Works Website',         desc: 'Responsive business website with local SEO optimization for a UAE-based company.',                tech: 'React · SEO · Responsive' },
                ].map(({ name, desc, tech, link }) => (
                  <motion.div key={name} variants={fadeInUp}
                    className="rounded-2xl p-5 border border-white/5 space-y-2 transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(163,230,53,0.25)'; e.currentTarget.style.background = 'rgba(163,230,53,0.03)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.transform = 'none'; }}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-white text-sm">{name}</p>
                      {link && (
                        <a href={`https://${link}`} target="_blank" rel="noopener noreferrer"
                          className="text-[10px] shrink-0 px-2 py-0.5 rounded-full border transition-colors"
                          style={{ color: '#a3e635', borderColor: 'rgba(163,230,53,0.3)' }}>
                          ↗ Live
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    <p className="text-[11px] font-semibold" style={{ color: 'rgba(163,230,53,0.6)' }}>{tech}</p>
                  </motion.div>
                ))}
              </div>
            </Section>

          </div>
        </motion.div>

        {/* ── Footer strip ── */}
        <div className="mt-16 pt-6 border-t border-white/5 flex items-center justify-between print:hidden">
          <span className="text-gray-600 text-xs">© 2026 RAZI KV · All rights reserved</span>
          <button onClick={() => window.print()}
            className="flex items-center gap-2 text-black font-bold px-5 py-2 rounded-full text-xs transition-colors"
            style={{ background: '#a3e635' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#84cc16')}
            onMouseLeave={e => (e.currentTarget.style.background = '#a3e635')}>
            <Download size={12} /><span>Download PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
}
