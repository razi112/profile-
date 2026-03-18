import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

const projects = [
  {
    id: 1,
    title: "AIC Amal - Donation Platform",
    description: "A comprehensive donation platform for different kinds of financial support and fundraising. Cross-platform solution with web app, Android & iOS mobile apps for collecting general donations, subscriptions, sponsorships, campaigns, and more.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
    tech: ['React Native', 'Next.js', 'Node.js', 'Razorpay', 'MongoDB', 'Cross-Platform'],
    featured: true,
    demo: "#"
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "PlantBox is a complete e-commerce platform that allows users to buy and sell plants online. It features a user-friendly interface, secure payment integration, and a wide range of plant products.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    tech: ['E-Commerce', 'Razorpay', 'Online Shopping', 'Wordpress'],
    featured: true
  },
  {
    id: 3,
    title: "Results Management System",
    description: "A comprehensive results management system for educational institutions, allowing for efficient handling of student results, grading, and reporting.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    tech: ['Next.js', 'MongoDB', 'Supabase'],
    featured: false
  },
  {
    id: 4,
    title: "Business Website",
    description: "A creative Website for a dubai-based business, showcasing their services and portfolio with modern design and professional presentation.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    tech: ['Responsive', 'Mobile-Friendly', 'SEO-Optimized'],
    featured: false,
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
    overlayText: "RKD"
  }
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'React Native', 'Next.js', 'Node.js', 'MongoDB', 'E-Commerce', 'SEO-Optimized', 'Responsive'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.tech.some(t => t.toLowerCase() === activeFilter.toLowerCase()));

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const otherProjects = filteredProjects.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white font-sans selection:bg-purple-500/30 relative overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 md:px-12 lg:px-24 border-b border-white/5 bg-[#0A0F1C]/80 backdrop-blur-md z-50">
        <div className="text-2xl font-bold tracking-tight">
          RAZI<span className="text-purple-500">.</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
          <a href="#home" className="relative group text-emerald-400 pb-1">
            Home
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400 transition-all duration-300"></span>
          </a>
          <a href="#about" className="relative group hover:text-white transition-colors pb-1">
            About
            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </a>
          <a href="#services" className="relative group hover:text-white transition-colors pb-1">
            Services
            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </a>
          <a href="#projects" className="relative group hover:text-white transition-colors pb-1">
            Projects
            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </a>
          <a href="#contact" className="relative group hover:text-white transition-colors pb-1">
            Contact
            <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </a>
        </div>

        <div className="flex items-center space-x-6">
          <button className="hidden md:block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-full font-medium transition-colors">
            WhatsApp
          </button>
          <button className="text-gray-400 hover:text-white">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.main 
        id="home"
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer}
        className="scroll-mt-24 max-w-7xl mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-24 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10"
      >
        
        {/* Left Content */}
        <motion.div variants={fadeInUp} className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-300">
            <MapPin size={14} className="text-emerald-500" />
            <span>Available for freelance work</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-2"></span>
          </div>

          {/* Headings */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent pb-2">
              RAZI
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-100">
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
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            Expert in creating stunning digital experiences through <span className="text-blue-400 font-medium">E-Commerce solutions</span>, <span className="text-purple-400 font-medium">SEO optimization</span>, and <span className="text-emerald-400 font-medium">digital marketing strategies</span>. Transforming ideas into powerful, results-driven websites.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#projects" className="flex items-center space-x-2 bg-[#8B5CF6] hover:bg-purple-600 text-white px-8 py-3.5 rounded-full font-medium transition-colors">
              <span>View My Work</span>
              <ArrowDown size={18} />
            </a>
            <button className="flex items-center space-x-2 bg-transparent border border-white/20 hover:bg-white/5 text-white px-8 py-3.5 rounded-full font-medium transition-colors">
              <Download size={18} />
              <span>View Resume</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4 pt-4">
            <a href="#" className="p-3.5 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <Github size={20} />
            </a>
            <a href="#" className="p-3.5 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
              <Linkedin size={20} />
            </a>
            <a href="#" className="p-3.5 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
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
          variants={scaleIn}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Image Container */}
          <div className="relative w-full max-w-[480px] aspect-square lg:aspect-[4/4.5] rounded-[2rem] bg-[#1A1F2E] border border-white/5 overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-shadow duration-500">
            {/* Inner glow corners */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/40 blur-[60px] rounded-full mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/30 blur-[60px] rounded-full mix-blend-screen"></div>
            
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
              alt="RAZI" 
              className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-90"
            />
            
            {/* Overlay gradient to match the dark theme at the bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2E]/80 via-transparent to-transparent"></div>
          </div>
        </motion.div>
      </motion.main>

      {/* About Section */}
      <motion.section 
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="scroll-mt-24 max-w-7xl mx-auto px-6 py-24 md:py-32 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10"
      >
        {/* Left Content */}
        <motion.div variants={fadeInUp} className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">About Me</h2>
          
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed relative">
            {/* Decorative Circle */}
            <div className="absolute -left-8 top-2 w-6 h-6 rounded-full border border-blue-500 flex items-center justify-center hidden md:flex">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            </div>
            
            <p>
              I'm RAZI, expert Web Designer & Developer in Malappuram, Kerala with over 7 years of experience in creating digital experiences that drive business results. My expertise spans across E-Commerce development, SEO optimization, digital marketing, and graphic design.
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
                <div key={skill} className="bg-[#13182B] border border-blue-500/20 hover:border-blue-500/50 transition-colors rounded-full px-5 py-2.5 text-sm font-medium text-gray-300 cursor-default">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div variants={scaleIn} className="relative">
          {/* Circular Image with Glow */}
          <div className="relative w-full max-w-[480px] mx-auto aspect-square">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-[80px] rounded-full -z-10"></div>
            
            {/* Floating Shapes */}
            {/* Top Right Circle */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full opacity-90 shadow-lg"></div>
            {/* Bottom Left Circle */}
            <div className="absolute bottom-12 -left-8 w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full opacity-90 shadow-lg"></div>
            {/* Middle Left Pill */}
            <div className="absolute top-1/3 -left-12 w-6 h-16 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full opacity-90 shadow-lg"></div>
            {/* Middle Right Orange Circle */}
            <div className="absolute top-1/3 -right-8 w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full opacity-90 shadow-lg"></div>
            {/* Bottom Right Square */}
            <div className="absolute -bottom-4 right-12 w-8 h-8 bg-purple-500 opacity-90 rotate-12 rounded-sm shadow-lg"></div>
            {/* Top Left Hollow Square */}
            <div className="absolute top-0 left-12 w-10 h-10 border-[3px] border-blue-400 opacity-80 rotate-12 rounded-sm"></div>
            
            {/* Main Image */}
            <div className="w-full h-full rounded-full border border-white/10 overflow-hidden relative z-10 bg-[#1A1F2E]">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                alt="RAZI Coffee" 
                className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-90"
              />
            </div>

            {/* Badge */}
            <div className="absolute bottom-6 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-6 py-2.5 rounded-full shadow-lg z-20 border border-white/10 text-sm">
              7+ Years
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="bg-[#131826] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 hover:bg-[#1A1F35] transition-colors">
              <div className="w-12 h-12 bg-[#8B5CF6] text-white rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Award size={24} />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400 mt-1">Projects Completed</div>
              </div>
            </div>
            
            <div className="bg-[#131826] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 hover:bg-[#1A1F35] transition-colors">
              <div className="w-12 h-12 bg-[#6366F1] text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Users size={24} />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">30+</div>
                <div className="text-sm text-gray-400 mt-1">Happy Clients</div>
              </div>
            </div>

            <div className="bg-[#131826] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 hover:bg-[#1A1F35] transition-colors">
              <div className="w-12 h-12 bg-[#8B5CF6] text-white rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Coffee size={24} />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">1000+</div>
                <div className="text-sm text-gray-400 mt-1">Cups of Coffee</div>
              </div>
            </div>

            <div className="bg-[#131826] border border-white/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 hover:bg-[#1A1F35] transition-colors">
              <div className="w-12 h-12 bg-[#8B5CF6] text-white rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Heart size={24} />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">7+</div>
                <div className="text-sm text-gray-400 mt-1">Years of Experience</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        id="services"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="scroll-mt-24 max-w-7xl mx-auto px-6 py-24 md:py-32 lg:px-24 relative z-10"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex flex-col items-center text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-gray-300">
            <Sparkles size={14} className="text-orange-400" />
            <span>What I Offer</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-emerald-400">Ser</span>
            <span className="text-rose-400">vices & </span>
            <span className="text-amber-400">Expertise</span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl">
            Comprehensive digital solutions to help your business thrive online. From concept to launch, I deliver exceptional results that exceed expectations.
          </p>
          
          <button className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-rose-500 hover:opacity-90 text-white px-6 py-2.5 rounded-full font-medium transition-opacity mt-4">
            <CodeXml size={18} />
            <span>View Technical Skills</span>
          </button>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Web Development Card (Active) */}
          <motion.div variants={fadeInUp} className="bg-[#2A3454] border border-blue-500 rounded-2xl p-8 space-y-6 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative overflow-hidden group transition-all hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <CodeXml size={28} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Web Development</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Custom websites and web applications built with modern technologies and best practices.
              </p>
              <a href="#" className="inline-flex items-center text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* E-Commerce Solutions Card */}
          <motion.div variants={fadeInUp} className="bg-[#131826] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#1A1F35] transition-all hover:-translate-y-1">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 transition-colors">
                <ShoppingCart size={28} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">E-Commerce Solutions</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                Complete online stores with payment integration and inventory management systems.
              </p>
              <a href="#" className="inline-flex items-center text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* SEO Optimization Card */}
          <motion.div variants={fadeInUp} className="bg-[#131826] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#1A1F35] transition-all hover:-translate-y-1">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500/10 transition-colors">
                <Search size={28} className="text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">SEO Optimization</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                Improve your search rankings and drive organic traffic to your website effectively with proven SEO strategies.
              </p>
              <a href="#" className="inline-flex items-center text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* Digital Marketing Card */}
          <motion.div variants={fadeInUp} className="bg-[#131826] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#1A1F35] transition-all hover:-translate-y-1">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-500/10 transition-colors">
                <TrendingUp size={28} className="text-rose-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Digital Marketing</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                Strategic marketing campaigns to grow your online presence and business reach through targeted digital channels.
              </p>
              <a href="#" className="inline-flex items-center text-rose-400 text-sm font-medium hover:text-rose-300 transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* Graphic Design Card */}
          <motion.div variants={fadeInUp} className="bg-[#131826] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#1A1F35] transition-all hover:-translate-y-1">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500/10 transition-colors">
                <Palette size={28} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Graphic Design</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                Creative visual solutions including branding, logos, and marketing materials for businesses.
              </p>
              <a href="#" className="inline-flex items-center text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>

          {/* Server Management Card */}
          <motion.div variants={fadeInUp} className="bg-[#131826] border border-white/5 rounded-2xl p-8 space-y-6 relative overflow-hidden group hover:bg-[#1A1F35] transition-all hover:-translate-y-1">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500/10 transition-colors">
                <Server size={28} className="text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Server Management</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                Hosting and server management with dedicated hosting solutions for optimal performance.
              </p>
              <a href="#" className="inline-flex items-center text-teal-400 text-sm font-medium hover:text-teal-300 transition-colors">
                Learn more <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Achievements & Milestones */}
        <motion.div variants={scaleIn} className="mt-24 bg-[#1A1F2E] rounded-[2rem] p-12 relative overflow-hidden">
          {/* Decorative left circle */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-blue-500/50 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>

          <h3 className="text-2xl font-bold text-center text-white mb-12">Achievements & Milestones</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Projects Completed */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-[#2A3454] rounded-full flex items-center justify-center">
                <Trophy size={28} className="text-yellow-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Projects Completed</div>
              </div>
            </div>

            {/* Happy Clients */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-[#2A3454] rounded-full flex items-center justify-center">
                <Users size={28} className="text-blue-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">30+</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Happy Clients</div>
              </div>
            </div>

            {/* Years Experience */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-[#2A3454] rounded-full flex items-center justify-center">
                <Zap size={28} className="text-purple-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">7+</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Years Experience</div>
              </div>
            </div>

            {/* Client Satisfaction */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-[#2A3454] rounded-full flex items-center justify-center">
                <Monitor size={28} className="text-emerald-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Featured Work Section */}
      <motion.section 
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="scroll-mt-24 max-w-7xl mx-auto px-6 py-24 md:py-32 lg:px-24 relative z-10"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex flex-col items-center text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white relative inline-block">
            Featured Work
            {/* Underline gradient */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mt-8">
            Here are some of my recent projects that showcase my skills and passion for creating exceptional digital experiences.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                  activeFilter === filter
                    ? 'text-white'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:border-purple-500/50 hover:text-white'
                }`}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-purple-600 rounded-full shadow-lg shadow-purple-500/30 -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-24">
          <AnimatePresence mode="popLayout">
            {featuredProjects.map((project) => (
              <motion.div 
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Project Image */}
                <div className={`relative rounded-2xl overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(139,92,246,0.2)] border border-transparent hover:border-purple-500/30 ${project.id % 2 === 0 ? 'lg:order-2' : ''}`}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                  />
                  {project.id === 1 && <div className="absolute inset-0 bg-purple-900/20 group-hover:bg-transparent transition-colors duration-500"></div>}
                </div>

                {/* Project Info */}
                <div className={`space-y-6 ${project.id % 2 === 0 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                  <p className="text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4 pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors">
                      View Details
                    </button>
                    {project.demo && (
                      <button className="flex items-center space-x-2 bg-transparent border border-white/20 hover:bg-white/5 text-white px-6 py-2.5 rounded-full font-medium transition-colors">
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </button>
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
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-32"
            >
              <div className="flex flex-col items-center text-center space-y-6 mb-16">
                <h2 className="text-3xl font-bold text-white relative inline-block">
                  Other Notable Projects
                  {/* Underline gradient */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project) => (
                  <motion.div 
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#1A1F2E] border border-white/5 rounded-2xl overflow-hidden group hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:scale-[1.03] transition-all duration-500"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
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
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-2 py-1 text-[10px] font-medium text-gray-400 bg-white/5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="pt-4">
                        <a href="#" className="inline-flex items-center text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                          View Details <ChevronRight size={16} className="ml-1" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div variants={fadeInUp} className="mt-24 flex flex-col items-center text-center space-y-6">
          <p className="text-gray-400">Interested in working together or want to see more of my work?</p>
          <div className="flex items-center space-x-4">
            <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
              View More Projects
            </a>
            <a href="#contact" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
              Let's Talk
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="scroll-mt-24 max-w-7xl mx-auto px-6 py-24 md:py-32 lg:px-24 relative z-10"
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Let's Work Together
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Have a project in mind or just want to chat? I'd love to hear from you. Drop me a message and let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <h3 className="text-2xl font-bold text-white">Send me a message</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">First Name</label>
                  <input 
                    type="text" 
                    placeholder="John"
                    className="w-full bg-[#131826] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Doe"
                    className="w-full bg-[#131826] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-[#131826] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Subject</label>
                <input 
                  type="text" 
                  placeholder="Project Collaboration"
                  className="w-full bg-[#131826] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell me about your project..."
                  className="w-full bg-[#131826] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button type="button" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3.5 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                <Send size={18} />
                <span>Send Message</span>
              </button>
            </form>

            {/* Info Box */}
            <div className="bg-[#131826] border border-white/5 rounded-2xl p-6 space-y-4">
              <h4 className="text-lg font-bold text-white">Let's create something amazing together!</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                I'm always excited to take on new challenges and collaborate with passionate individuals and teams. Whether you have a specific project in mind or just want to explore possibilities, I'd love to hear from you.
              </p>
              <ul className="space-y-2 pt-2">
                {[
                  'Usually responds within 24 hours',
                  'Available for remote collaboration',
                  'Open to freelance and full-time opportunities',
                  'Building high-performing websites & SEO strategies'
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-2 text-sm text-gray-300">
                    <CheckCircle2 size={16} className="text-blue-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

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

                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-emerald-500/20">
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
              <span className="text-xs font-bold text-emerald-400">2025</span>
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
              <button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center space-x-2 backdrop-blur-sm">
                <Mail size={18} />
                <span>Send Email</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Floating Elements */}
      
      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-500 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-600 rounded-full"></div>
        </div>
      </div>

      {/* Chat Button */}
      <div className="fixed bottom-8 right-8 flex items-center space-x-4 z-20">
        <div className="hidden md:flex bg-[#1A1F2E] text-gray-300 px-4 py-2.5 rounded-full text-sm border border-white/10 shadow-lg items-center">
          <MessageCircle size={16} className="mr-2 text-gray-400" />
          Need help? Let's Discuss!
        </div>
        <button className="relative bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105">
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0A0F1C]">
            1
          </span>
        </button>
      </div>
    </div>
  );
}
