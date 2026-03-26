import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight, ArrowDown, Github, Linkedin, Instagram, Mail, Heart, Menu, MessageCircle } from 'lucide-react';

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
    overlay: { yellow: "Solutions", white1: "to make", white2: "things easier" }
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

const filters = ['All', 'React Native', 'Next.js', 'Node.js', 'MongoDB', 'OpenAI', 'E-Commerce', 'SEO-Optimized', 'Responsive'];

export default function ProjectsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tech.some(t => t.toLowerCase() === activeFilter.toLowerCase()));

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

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
              { label: 'Skills', href: '/skills', active: false },
              { label: 'Projects', href: '/projects', active: true },
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
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex flex-col items-center text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white relative inline-block">
            Featured Work
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mt-8">
            Here are some of my recent projects that showcase my skills and passion for creating exceptional digital experiences.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {filters.map((filter) => (
              <motion.button key={filter} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                  activeFilter === filter ? 'text-white' : 'bg-white/5 text-gray-400 border border-white/10 hover:border-purple-500/50 hover:text-white'
                }`}>
                {activeFilter === filter && (
                  <motion.div layoutId="activeFilter"
                    className="absolute inset-0 bg-purple-600 rounded-full shadow-lg shadow-purple-500/30 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                )}
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-24">
          <AnimatePresence mode="popLayout">
            {featuredProjects.map((project) => (
              <motion.div key={project.id} layout
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`relative rounded-2xl overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(139,92,246,0.2)] border border-transparent hover:border-purple-500/30 ${project.id % 2 === 0 ? 'lg:order-2' : ''}`}>
                  <img src={project.image} alt={project.title}
                    className={`w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110 ${project.comingSoon ? 'brightness-50' : ''}`} />
                  {project.id === 1 && <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-transparent transition-colors duration-500"></div>}
                  {project.comingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm border border-amber-400/30 rounded-full px-5 py-2.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        <span className="text-amber-400 font-semibold tracking-wide">Coming Soon</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className={`space-y-6 ${project.id % 2 === 0 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full">{tech}</span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                    {project.comingSoon ? (
                      <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-6 py-2.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        <span className="text-sm font-medium text-amber-400">Coming Soon</span>
                      </div>
                    ) : (
                      <>
                        <a href={project.demo || '#'} target="_blank" rel="noopener noreferrer"
                          className="btn-primary bg-[#8B5CF6] hover:bg-purple-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors">
                          View Details
                        </a>
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer"
                            className="btn-ghost flex items-center space-x-2 bg-transparent border border-white/20 text-white px-6 py-2.5 rounded-full font-medium">
                            <ExternalLink size={16} /><span>Live Demo</span>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Other Notable Projects */}
        <AnimatePresence mode="popLayout">
          {otherProjects.length > 0 && (
            <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-32">
              <div className="flex flex-col items-center text-center space-y-6 mb-16">
                <h2 className="text-3xl font-bold text-white relative inline-block">
                  Other Notable Projects
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project) => (
                  <motion.div key={project.id} layout
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
                    className="bg-[#1A1F2E] border border-white/5 rounded-2xl overflow-hidden group hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:scale-[1.03] transition-all duration-500">
                    <div className="h-48 overflow-hidden relative">
                      <img src={project.image} alt={project.title}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${project.comingSoon ? 'brightness-50' : ''}`} />
                      {project.overlay && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-yellow-400 font-bold text-xl">{project.overlay.yellow}</div>
                            <div className="text-white font-bold text-xl">{project.overlay.white1}</div>
                            <div className="text-white font-bold text-xl">{project.overlay.white2}</div>
                          </div>
                        </div>
                      )}
                      {project.overlayText && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="text-white font-bold text-2xl tracking-widest">{project.overlayText}</div>
                        </div>
                      )}
                      {project.comingSoon && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                            <span className="text-amber-400 text-sm font-semibold tracking-wide">Coming Soon</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-2 py-1 text-[10px] font-medium text-gray-400 bg-white/5 rounded">{tech}</span>
                        ))}
                      </div>
                      <div className="pt-4">
                        {project.comingSoon ? (
                          <div className="inline-flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                            <span className="text-sm font-medium text-amber-400">Coming Soon</span>
                          </div>
                        ) : (
                          <a href="#" className="inline-flex items-center text-gray-400 text-sm font-medium hover:text-white transition-colors">
                            View Details <ChevronRight size={16} className="ml-1" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div variants={fadeInUp} className="mt-24 flex flex-col items-center text-center space-y-6 pb-8">
          <p className="text-gray-400">Interested in working together?</p>
          <div className="flex items-center space-x-4">
            <a href="/#contact" className="btn-ghost border border-white/20 text-white px-8 py-3 rounded-full font-medium hover:bg-white/5 transition-colors">
              Let's Talk
            </a>
          </div>
        </motion.div>
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
