import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CodeXml, Server, Phone, Monitor, Zap, TrendingUp, Palette,
  Star, Award, CheckCircle2, ArrowDown, Github, Linkedin, Instagram, Mail, Heart, Menu, ChevronRight, MessageCircle
} from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as any;
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
      <motion.div animate={{ x: [0, -60, 80, 0], y: [0, 80, -40, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-[40%] right-[5%] w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[140px]" />
    </div>
  );
}

const skillBlocks = [
  {
    num: '01', icon: CodeXml, title: 'Frontend Development',
    desc: 'Building responsive, modern and app-friendly web interfaces with cutting-edge technologies.',
    color: 'emerald', comingSoon: false,
    skills: ['React.js & Next.js', 'TypeScript & JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS & Bootstrap', 'Responsive Web Design', 'Vite & Modern Build Tools'],
  },
  {
    num: '02', icon: Server, title: 'Backend & API Development',
    desc: 'Robust server-side solutions and API development to power scalable web applications.',
    color: 'blue', comingSoon: true,
    skills: ['Node.js & Express.js', 'PHP & Laravel Framework', 'RESTful & GraphQL APIs', 'API Testing with Postman', 'TypeScript for Backend', 'Microservices Architecture'],
  },
  {
    num: '03', icon: Phone, title: 'Mobile App Development',
    desc: 'Cross-platform mobile application development using React Native for iOS and Android.',
    color: 'purple', comingSoon: true,
    skills: ['React Native & Expo', 'Cross-Platform Development', 'iOS & Android Deployment', 'Native Device APIs', 'Mobile UI/UX Design', 'App Store & Play Store Publishing'],
  },
  {
    num: '04', icon: Monitor, title: 'CMS & Website Builders',
    desc: 'Expert-level proficiency in content management systems and website builders.',
    color: 'violet', comingSoon: true,
    skills: ['WordPress Development', 'Elementor Pro', 'WPBakery Page Builder', 'Divi Theme Builder', 'Custom Theme Development', 'Plugin Development'],
  },
  {
    num: '05', icon: Zap, title: 'Databases & Cloud Services',
    desc: 'Modern database solutions and cloud services for scalable applications.',
    color: 'cyan', comingSoon: true,
    skills: ['MongoDB & Mongoose', 'Firebase & Firestore', 'Supabase', 'MySQL & PostgreSQL', 'Firebase Auth & Supabase Auth', 'JWT & OAuth Authentication'],
  },
  {
    num: '06', icon: TrendingUp, title: 'Digital Marketing',
    desc: 'Comprehensive digital marketing strategies to grow your online presence.',
    color: 'amber', comingSoon: true,
    skills: ['Search Engine Optimization (SEO)', 'Social Media Marketing', 'Content Marketing Strategy', 'Google Analytics & Data Analytics', 'Email Marketing Campaigns', 'WhatsApp Marketing'],
  },
  {
    num: '07', icon: Palette, title: 'Graphic Design',
    desc: 'Creative visual solutions for branding, marketing materials, and digital media.',
    color: 'rose', comingSoon: false,
    skills: ['Adobe Creative Suite', 'Photoshop & Illustrator', 'InDesign & Layout Design', 'Social Media Design', 'Flyer & Brochure Design', 'Print Design & Brand Identity'],
  },
  {
    num: '08', icon: Star, title: 'Media Production',
    desc: 'Professional video editing, photography, and visual content creation.',
    color: 'orange', comingSoon: true,
    skills: ['Adobe Premiere Pro', 'After Effects & Motion Graphics', 'Drone Photography & Videography', 'Photography & Videography', 'Editing and Color Grading', 'Live Streaming & Broadcasting'],
  },
  {
    num: '09', icon: Server, title: 'Hosting & Server Management',
    desc: 'Reliable hosting solutions and server management for optimal website performance.',
    color: 'teal', comingSoon: true,
    skills: ['Web Hosting Solutions', 'Server Management & Maintenance', 'Dedicated Server Setup', 'SSL Certificate Installation', 'Domain Management', 'Performance Optimization'],
  },
  {
    num: '10', icon: Award, title: 'Library & Digitalization',
    desc: 'Digital transformation of library resources and efficient management systems.',
    color: 'indigo', comingSoon: true,
    skills: ['Library Digitalization', 'Koha Library Management', 'Digital Resource Management', 'Cataloging & Metadata', 'Digital Archive Systems', 'User Access Management'],
  },
];

export default function SkillsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white font-sans relative overflow-x-hidden">
      <FloatingOrbs />
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-[#0A0F1C]/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 md:px-12 lg:px-24">
          <a href="/" className="group text-2xl font-bold tracking-tight cursor-pointer">
            <span className="transition-colors duration-300 group-hover:text-purple-400">RAZI</span>
            <span className="text-purple-500 transition-colors duration-300 group-hover:text-white">kv</span>
          </a>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            {[
              { label: 'Home', href: '/', active: false },
              { label: 'About', href: '/#about', active: false },
              { label: 'Services', href: '/#services', active: false },
              { label: 'Skills', href: '/skills', active: true },
              { label: 'Projects', href: '/projects', active: false },
              { label: 'Contact', href: '/#contact', active: false },
            ].map(({ label, href, active }) => (
              <a key={label} href={href} className={`relative group pb-1 transition-colors ${active ? 'text-emerald-400' : 'hover:text-white'}`}>
                {label}
                <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 origin-left transition-transform duration-300 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <a href="https://wa.me/918129489071" target="_blank" rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full font-medium transition-colors text-sm">
              <MessageCircle size={15} /><span>WhatsApp</span>
            </a>
            <button onClick={() => setMobileMenuOpen(o => !o)} className="md:hidden text-gray-400 hover:text-white p-1" aria-label="Toggle menu">
              {mobileMenuOpen
                ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                : <Menu size={24} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t border-white/5 bg-[#0A0F1C]/95 backdrop-blur-md">
              <div className="px-4 py-6 space-y-1">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'About', href: '/#about' },
                  { label: 'Services', href: '/#services' },
                  { label: 'Skills', href: '/skills' },
                  { label: 'Projects', href: '/projects' },
                  { label: 'Contact', href: '/#contact' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                    {label}<ChevronRight size={16} className="text-gray-600" />
                  </a>
                ))}
                <div className="pt-4">
                  <a href="https://wa.me/918129489071" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-medium text-sm transition-colors w-full">
                    <MessageCircle size={16} /><span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-24 lg:px-24 relative z-10"
      >
        {/* Ambient glow */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[400px] bg-purple-600/5 rounded-full blur-[130px] pointer-events-none -z-10" />

        {/* Header */}
        <motion.div variants={fadeInUp} className="flex flex-col items-center text-center space-y-4 mb-6">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-300">
            <Zap size={14} className="text-purple-400/70" />
            <span>Professional Skills & Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-emerald-400">Skills</span> <span className="text-white">&</span> <span className="text-purple-400">Expertise</span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl leading-relaxed">
            I am a versatile digital professional with expertise spanning web development, digital marketing, graphic design, and media production. Based in Malappuram, Kerala, I specialize in creating comprehensive digital solutions that help businesses thrive in the modern digital landscape.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-2">
            <span className="text-purple-400">Technical</span> Expertise
          </h3>
          <p className="text-gray-500 text-sm">Comprehensive skill set across multiple domains of technology and digital services</p>
        </motion.div>

        {/* Skill blocks */}
        <div className="space-y-5 pb-8">
          {skillBlocks.map(({ num, icon: Icon, title, desc, color, skills, comingSoon }) => (
            <motion.div key={num} variants={fadeInUp}
              whileHover={{ scale: comingSoon ? 1 : 1.01 }}
              className={`card-shine relative bg-[#0E1420] border border-white/5 rounded-2xl p-6 md:p-8 group transition-all duration-500 overflow-hidden ${comingSoon ? 'opacity-60' : 'hover:border-white/15 hover:shadow-[0_0_40px_rgba(139,92,246,0.07)]'}`}>

              {comingSoon && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-[#0A0F1C]/60 backdrop-blur-[2px]">
                  <div className="flex items-center space-x-2 bg-black/60 border border-amber-400/30 rounded-full px-5 py-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-amber-400 text-sm font-semibold tracking-wide">Coming Soon</span>
                  </div>
                </div>
              )}

              <div className={`absolute left-0 top-6 bottom-6 w-0.5 bg-gradient-to-b from-transparent via-${color}-500/60 to-transparent rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center`} />
              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-${color}-500/8 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="flex flex-col md:flex-row gap-6 md:gap-10 relative z-10">
                <div className="md:w-56 shrink-0 space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-bold text-gray-500 bg-white/5 border border-white/8 rounded-lg px-2.5 py-1 font-mono group-hover:border-white/15 transition-colors">{num}</span>
                    <motion.div whileHover={{ rotate: 8, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}
                      className={`w-10 h-10 bg-${color}-500/10 rounded-xl flex items-center justify-center group-hover:bg-${color}-500/25 transition-all duration-300`}>
                      <Icon size={20} className={`text-${color}-400 group-hover:text-${color}-300 transition-colors`} />
                    </motion.div>
                  </div>
                  <h4 className="text-lg font-bold text-white leading-snug">{title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">{desc}</p>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {skills.map((skill, i) => (
                    <motion.div key={skill}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className="flex items-center space-x-2.5 bg-[#0A0F1C] border border-white/5 rounded-xl px-4 py-2.5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 cursor-default">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                      <span className="text-sm text-gray-300 hover:text-white transition-colors">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-[#070B14] mt-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-24 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4 max-w-xs">
            <div className="text-xl font-bold tracking-tight">
              RAZI<span className="text-purple-500">.</span>
              <span className="text-purple-400 ml-1 font-light text-base">KV</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Web Designer &amp; Developer in Malappuram, passionate about creating exceptional digital experiences that drive business growth and user engagement.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/#about' },
                { label: 'Work', href: '/projects' },
                { label: 'Services', href: '/#services' },
                { label: 'Contact', href: '/#contact' },
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
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-gray-500">Available for freelance</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5" />

        <div className="max-w-7xl mx-auto px-6 lg:px-24 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-5">
            <a href="#" aria-label="GitHub" className="text-gray-600 hover:text-white transition-colors"><Github size={18} /></a>
            <a href="#" aria-label="LinkedIn" className="text-gray-600 hover:text-white transition-colors"><Linkedin size={18} /></a>
            <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-white transition-colors"><Instagram size={18} /></a>
            <a href="mailto:hello@razi.me" aria-label="Email" className="text-gray-600 hover:text-white transition-colors"><Mail size={18} /></a>
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center transition-colors shadow-lg shadow-purple-500/20"
            aria-label="Scroll to top"
          >
            <ArrowDown size={16} className="rotate-180" />
          </motion.button>

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
