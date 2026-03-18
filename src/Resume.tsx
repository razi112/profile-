import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Globe, Download, ArrowLeft } from 'lucide-react';

export default function Resume() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white font-sans py-12 px-4 print:bg-white print:text-black print:py-0 print:px-0">
      {/* Top bar — hidden on print */}
      <div className="max-w-3xl mx-auto mb-8 flex items-center justify-between print:hidden">
        <a href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
          <ArrowLeft size={16} /><span>Back to Portfolio</span>
        </a>
        <button onClick={() => window.print()}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
          <Download size={15} /><span>Download PDF</span>
        </button>
      </div>

      {/* Resume Card */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-[#131826] print:bg-white rounded-2xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/40 print:bg-purple-700 px-10 py-10 print:px-8 print:py-8">
          <h1 className="text-4xl font-bold text-white print:text-white">RAZI KV</h1>
          <p className="text-purple-300 print:text-purple-200 text-lg font-medium mt-1">Web Designer & Developer</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300 print:text-gray-100">
            <span className="flex items-center gap-1.5"><MapPin size={13} />Malappuram, Kerala, India</span>
            <a href="mailto:hello@razi.me" className="flex items-center gap-1.5 hover:text-white"><Mail size={13} />hello@razi.me</a>
            <a href="tel:+918129489071" className="flex items-center gap-1.5 hover:text-white"><Phone size={13} />+91 8129489071</a>
            <a href="https://aiislamofficial.vercel.app" className="flex items-center gap-1.5 hover:text-white"><Globe size={13} />Portfolio</a>
          </div>
        </div>

        <div className="px-10 py-8 print:px-8 space-y-8 print:text-black">

          {/* Summary */}
          <Section title="Professional Summary">
            <p className="text-gray-300 print:text-gray-700 leading-relaxed text-sm">
              Creative and results-driven Web Designer & Developer based in Malappuram, Kerala with hands-on experience building high-performance websites, e-commerce platforms, and digital marketing strategies. Passionate about crafting stunning digital experiences that convert visitors into customers. Skilled in modern frontend technologies, SEO, and brand strategy.
            </p>
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {[
                ['Frontend', 'React, Next.js, TypeScript, Tailwind CSS'],
                ['Backend', 'Node.js, Supabase, MongoDB, REST APIs'],
                ['Mobile', 'React Native, Cross-Platform Development'],
                ['E-Commerce', 'WooCommerce, Razorpay, Shopify'],
                ['SEO & Marketing', 'On-Page SEO, Google Analytics, Meta Ads'],
                ['Design', 'Figma, Adobe Photoshop, Brand Identity'],
                ['Tools', 'Git, Vite, Vercel, cPanel, WordPress'],
                ['Other', 'Wikipedia Page Creation, AI Integration'],
              ].map(([cat, val]) => (
                <div key={cat} className="py-1 border-b border-white/5 print:border-gray-200">
                  <span className="text-purple-400 print:text-purple-700 font-semibold">{cat}: </span>
                  <span className="text-gray-300 print:text-gray-700">{val}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            <div className="space-y-6">
              <Job
                title="Freelance Web Designer & Developer"
                company="Self-Employed"
                period="2022 — Present"
                location="Malappuram, Kerala"
                points={[
                  'Designed and developed 50+ websites for clients across India and the UAE',
                  'Built full e-commerce platforms with payment gateway integration (Razorpay)',
                  'Implemented SEO strategies that improved organic traffic by 40–60% for clients',
                  'Created AI Islam — an AI-powered Islamic knowledge platform (aiislamofficial.vercel.app)',
                  'Delivered branding, logo design, and digital marketing campaigns for 30+ businesses',
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
          <Section title="Key Projects">
            <div className="space-y-3 text-sm">
              {[
                { name: 'AI Islam', desc: 'AI-powered Islamic knowledge platform — Quran tafsir, Hadith search, prayer guidance. Built with Next.js, OpenAI, MongoDB.', link: 'aiislamofficial.vercel.app' },
                { name: 'PlantBox E-Commerce', desc: 'Full e-commerce platform for buying and selling plants with Razorpay integration and inventory management.' },
                { name: 'Results Management System', desc: 'Educational institution results portal built with Next.js, MongoDB, and Supabase.' },
                { name: 'RKD Works Business Website', desc: 'Responsive business website with local SEO optimization for a UAE-based company.' },
              ].map(p => (
                <div key={p.name} className="border-l-2 border-purple-500/40 pl-4 py-1">
                  <div className="font-semibold text-white print:text-black">{p.name}
                    {p.link && <a href={`https://${p.link}`} className="text-purple-400 print:text-purple-700 font-normal ml-2 text-xs">↗ {p.link}</a>}
                  </div>
                  <p className="text-gray-400 print:text-gray-600 mt-0.5">{p.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Education */}
          <Section title="Education">
            <div className="text-sm">
              <div className="font-semibold text-white print:text-black">Higher Secondary Education</div>
              <div className="text-gray-400 print:text-gray-600">Kerala State Board · Malappuram, Kerala</div>
              <div className="text-gray-500 text-xs mt-0.5">Completed 2022</div>
            </div>
          </Section>

          {/* Languages */}
          <Section title="Languages">
            <div className="flex gap-6 text-sm text-gray-300 print:text-gray-700">
              <span>Malayalam <span className="text-purple-400 print:text-purple-700">(Native)</span></span>
              <span>English <span className="text-purple-400 print:text-purple-700">(Professional)</span></span>
              <span>Arabic <span className="text-purple-400 print:text-purple-700">(Basic)</span></span>
            </div>
          </Section>

        </div>
      </motion.div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-widest text-purple-400 print:text-purple-700 mb-3 pb-1 border-b border-white/10 print:border-gray-300">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Job({ title, company, period, location, points }: {
  title: string; company: string; period: string; location: string; points: string[];
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold text-white print:text-black">{title}</div>
          <div className="text-purple-400 print:text-purple-700 text-sm">{company} · {location}</div>
        </div>
        <span className="text-xs text-gray-500 print:text-gray-500 shrink-0 mt-0.5">{period}</span>
      </div>
      <ul className="mt-2 space-y-1">
        {points.map((p, i) => (
          <li key={i} className="text-sm text-gray-400 print:text-gray-700 flex items-start gap-2">
            <span className="text-purple-500 mt-1 shrink-0">▸</span>{p}
          </li>
        ))}
      </ul>
    </div>
  );
}
