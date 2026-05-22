import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Trash2, LogOut, Eye, Clock, User, MessageSquare,
  Search, Shield, Lock, RefreshCw, Menu, X, ChevronRight
} from 'lucide-react';
import { supabase } from './supabase';
import type { Message } from './supabase';

export type { Message };

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'razi2026';
const AUTO_REFRESH_INTERVAL = 10;

/* ── shared bg decorations ─────────────────────────────────────────── */
function BgDecor() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'rgba(163,230,53,0.05)' }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{ background: 'rgba(163,230,53,0.03)' }} />
      </div>
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(163,230,53,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(163,230,53,0.8) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
    </>
  );
}

/* ── login screen ───────────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setError(true); setShake(true); setTimeout(() => setShake(false), 500); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <BgDecor />
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative w-full max-w-sm z-10">
        <motion.div animate={shake ? { x: [-10, 10, -8, 8, 0] } : {}} transition={{ duration: 0.4 }}
          className="bg-[#111111] border border-white/8 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(163,230,53,0.08)', boxShadow: '0 0 20px rgba(163,230,53,0.2)' }}>
              <Shield size={28} style={{ color: '#a3e635' }} />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            <p className="text-gray-500 text-sm text-center">Enter your password to continue</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="password" value={pw} onChange={e => { setPw(e.target.value); setError(false); }}
                placeholder="Password" autoFocus
                className={`w-full bg-[#0a0a0a] border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors`}
                onFocus={e => { if (!error) e.currentTarget.style.borderColor = 'rgba(163,230,53,0.4)'; }}
                onBlur={e => { if (!error) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }} />
            </div>
            {error && <p className="text-red-400 text-xs text-center">Incorrect password</p>}
            <button type="submit" className="w-full font-semibold py-3 rounded-xl text-black transition-colors"
              style={{ background: '#a3e635' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#84cc16')}
              onMouseLeave={e => (e.currentTarget.style.background = '#a3e635')}>
              Sign In
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── sidebar nav item ───────────────────────────────────────────────── */
function NavItem({
  icon: Icon, label, active, badge, collapsed, onClick,
}: {
  icon: React.ElementType; label: string; active?: boolean;
  badge?: number; collapsed: boolean; onClick?: () => void;
}) {
  return (
    <button onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative"
      style={{
        background: active ? 'rgba(163,230,53,0.1)' : 'transparent',
        border: active ? '1px solid rgba(163,230,53,0.2)' : '1px solid transparent',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: active ? 'rgba(163,230,53,0.15)' : 'rgba(255,255,255,0.04)' }}>
        <Icon size={15} style={{ color: active ? '#a3e635' : '#6b7280' }} />
      </div>
      {!collapsed && (
        <span className="text-sm font-medium truncate" style={{ color: active ? '#a3e635' : '#9ca3af' }}>
          {label}
        </span>
      )}
      {!collapsed && badge != null && badge > 0 && (
        <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full text-black"
          style={{ background: '#a3e635' }}>{badge}</span>
      )}
      {collapsed && badge != null && badge > 0 && (
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#a3e635' }} />
      )}
    </button>
  );
}

/* ── main dashboard ─────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const [authed, setAuthed] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [countdown, setCountdown] = useState(AUTO_REFRESH_INTERVAL);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<'inbox' | 'unread'>('inbox');

  const fetchMessages = async () => {
    if (!supabase) { setFetchError('Supabase not configured.'); return; }
    setLoading(true); setFetchError(null);
    const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (error) { setFetchError(error.message); } else { setMessages(data || []); }
    setLoading(false);
  };

  useEffect(() => {
    if (!authed || !supabase) return;
    fetchMessages();
    const channel = supabase.channel('messages-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, p => {
        setMessages(prev => [p.new as Message, ...prev]);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, p => {
        setMessages(prev => prev.map(m => m.id === (p.new as Message).id ? p.new as Message : m));
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, p => {
        setMessages(prev => prev.filter(m => m.id !== (p.old as Message).id));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [authed]);

  useEffect(() => {
    if (!authed) return;
    setCountdown(AUTO_REFRESH_INTERVAL);
    const tick = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) { if (autoRefresh) fetchMessages(); return AUTO_REFRESH_INTERVAL; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [authed, autoRefresh]);

  const handleLogin = () => { localStorage.setItem('isAdmin', 'true'); setAuthed(true); };
  const handleLogout = () => { localStorage.removeItem('isAdmin'); setAuthed(false); setMessages([]); };

  const deleteMsg = async (id: string) => {
    if (!supabase) return;
    await supabase.from('messages').delete().eq('id', id);
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const markRead = async (id: string) => {
    if (!supabase) return;
    await supabase.from('messages').update({ read: true }).eq('id', id);
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const openMsg = (msg: Message) => { setSelected(msg); if (!msg.read) markRead(msg.id); };

  const unreadCount = messages.filter(m => !m.read).length;
  const todayCount = messages.filter(m => new Date(m.created_at).toDateString() === new Date().toDateString()).length;

  const filtered = messages
    .filter(m => activeNav === 'unread' ? !m.read : true)
    .filter(m => filter === 'unread' ? !m.read : true)
    .filter(m => !search || `${m.name} ${m.email} ${m.subject} ${m.message}`.toLowerCase().includes(search.toLowerCase()));

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  /* ── sidebar content (shared between desktop + mobile) ── */
  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/5 ${sidebarCollapsed && !mobile ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'rgba(163,230,53,0.1)', boxShadow: '0 0 12px rgba(163,230,53,0.15)' }}>
          <Shield size={16} style={{ color: '#a3e635' }} />
        </div>
        {(!sidebarCollapsed || mobile) && (
          <span className="font-bold text-white text-sm">
            RAZI<span style={{ color: '#a3e635' }}>.</span> Admin
          </span>
        )}
        {!mobile && (
          <button onClick={() => setSidebarCollapsed(v => !v)}
            className="ml-auto text-gray-600 hover:text-gray-300 transition-colors shrink-0">
            <ChevronRight size={14} style={{ transform: sidebarCollapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.3s' }} />
          </button>
        )}
        {mobile && (
          <button onClick={() => setMobileSidebarOpen(false)} className="ml-auto text-gray-500 hover:text-white transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {(!sidebarCollapsed || mobile) && (
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-3 pb-2 pt-1">Messages</p>
        )}
        <NavItem icon={MessageSquare} label="All Messages" active={activeNav === 'inbox'}
          badge={messages.length} collapsed={sidebarCollapsed && !mobile}
          onClick={() => { setActiveNav('inbox'); setMobileSidebarOpen(false); }} />
        <NavItem icon={Mail} label="Unread" active={activeNav === 'unread'}
          badge={unreadCount} collapsed={sidebarCollapsed && !mobile}
          onClick={() => { setActiveNav('unread'); setMobileSidebarOpen(false); }} />

        {(!sidebarCollapsed || mobile) && (
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-3 pb-2 pt-4">Overview</p>
        )}
        {(!sidebarCollapsed || mobile) && (
          <div className="space-y-2 px-1 pt-1">
            {[
              { label: 'Total', value: messages.length, icon: MessageSquare },
              { label: 'Unread', value: unreadCount, icon: Mail },
              { label: 'Read', value: messages.length - unreadCount, icon: Eye },
              { label: 'Today', value: todayCount, icon: Clock },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between px-3 py-2 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex items-center gap-2">
                  <Icon size={12} style={{ color: '#a3e635' }} />
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
                <span className="text-xs font-bold text-white">{value}</span>
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Bottom: auto-refresh + logout */}
      <div className="p-3 border-t border-white/5 space-y-2">
        {(!sidebarCollapsed || mobile) ? (
          <>
            <button onClick={() => { setAutoRefresh(v => !v); setCountdown(AUTO_REFRESH_INTERVAL); }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all"
              style={{
                background: autoRefresh ? 'rgba(163,230,53,0.08)' : 'rgba(255,255,255,0.03)',
                border: autoRefresh ? '1px solid rgba(163,230,53,0.2)' : '1px solid rgba(255,255,255,0.06)',
                color: autoRefresh ? '#a3e635' : '#6b7280',
              }}>
              <motion.div animate={autoRefresh ? { rotate: 360 } : {}}
                transition={autoRefresh ? { duration: countdown, ease: 'linear', repeat: Infinity } : {}}>
                <RefreshCw size={12} />
              </motion.div>
              <span>{autoRefresh ? `Auto · ${countdown}s` : 'Auto-refresh off'}</span>
            </button>
            <button onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-500 hover:text-red-400 hover:bg-red-500/8 transition-all">
              <LogOut size={13} /><span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <button onClick={() => { setAutoRefresh(v => !v); setCountdown(AUTO_REFRESH_INTERVAL); }}
              className="w-full flex justify-center py-2 rounded-xl transition-all"
              style={{ color: autoRefresh ? '#a3e635' : '#6b7280' }}
              title={autoRefresh ? `Auto-refresh: ${countdown}s` : 'Auto-refresh off'}>
              <motion.div animate={autoRefresh ? { rotate: 360 } : {}}
                transition={autoRefresh ? { duration: countdown, ease: 'linear', repeat: Infinity } : {}}>
                <RefreshCw size={14} />
              </motion.div>
            </button>
            <button onClick={handleLogout}
              className="w-full flex justify-center py-2 rounded-xl text-gray-500 hover:text-red-400 transition-all">
              <LogOut size={14} />
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      <BgDecor />

      {/* ── Desktop Sidebar ── */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 64 : 220 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 hidden lg:flex flex-col shrink-0 border-r border-white/5"
        style={{ background: '#0d0d0d' }}>
        <SidebarContent />
      </motion.aside>

      {/* ── Mobile Sidebar overlay ── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 lg:hidden" style={{ background: 'rgba(0,0,0,0.6)' }}
              onClick={() => setMobileSidebarOpen(false)} />
            <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 h-full z-40 w-64 border-r border-white/5 lg:hidden"
              style={{ background: '#0d0d0d' }}>
              <SidebarContent mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">

        {/* Top bar */}
        <header className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 shrink-0"
          style={{ background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-white transition-colors">
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-sm font-bold text-white">
                {activeNav === 'inbox' ? 'All Messages' : 'Unread Messages'}
              </h1>
              <p className="text-[11px] text-gray-600">
                {filtered.length} {filtered.length === 1 ? 'message' : 'messages'}
                {unreadCount > 0 && activeNav === 'inbox' && ` · ${unreadCount} unread`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <span className="text-black text-[10px] font-bold px-2 py-0.5 rounded-full hidden sm:inline"
                style={{ background: '#a3e635' }}>{unreadCount} new</span>
            )}
            <button onClick={fetchMessages} disabled={loading}
              className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs px-2.5 py-1.5 rounded-lg border border-white/8 hover:border-white/15">
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </header>

        {/* Error banner */}
        {fetchError && (
          <div className="mx-5 mt-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-2.5 rounded-xl shrink-0">
            {fetchError} — check your Supabase URL/key and RLS policies.
          </div>
        )}

        {/* ── Split pane: message list + detail ── */}
        <div className="flex flex-1 min-h-0">

          {/* Message list pane */}
          <div className="w-full sm:w-80 lg:w-96 shrink-0 flex flex-col border-r border-white/5 min-h-0"
            style={{ display: selected ? undefined : 'flex' }}>

            {/* Search + filter */}
            <div className="p-3 border-b border-white/5 space-y-2 shrink-0">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
                  className="w-full bg-[#111111] border border-white/8 rounded-lg pl-8 pr-3 py-2 text-white placeholder-gray-600 focus:outline-none text-xs transition-colors"
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(163,230,53,0.35)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')} />
              </div>
              <div className="flex rounded-lg overflow-hidden border border-white/8">
                {(['all', 'unread'] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className="flex-1 py-1.5 text-xs font-medium transition-colors capitalize"
                    style={{ background: filter === f ? '#a3e635' : '#111111', color: filter === f ? '#000' : '#6b7280' }}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {loading && messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 space-y-2">
                  <RefreshCw size={20} className="text-gray-600 animate-spin" />
                  <p className="text-gray-600 text-xs">Loading…</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 space-y-2">
                  <Mail size={24} className="text-gray-700" />
                  <p className="text-gray-600 text-xs">No messages</p>
                </div>
              ) : filtered.map(msg => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  onClick={() => openMsg(msg)}
                  className="rounded-xl p-3 cursor-pointer transition-all duration-150"
                  style={{
                    background: selected?.id === msg.id ? 'rgba(163,230,53,0.07)' : 'rgba(255,255,255,0.02)',
                    border: selected?.id === msg.id ? '1px solid rgba(163,230,53,0.25)' : '1px solid rgba(255,255,255,0.04)',
                  }}
                  onMouseEnter={e => { if (selected?.id !== msg.id) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                  onMouseLeave={e => { if (selected?.id !== msg.id) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}>
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(163,230,53,0.08)' }}>
                      <User size={12} style={{ color: '#a3e635' }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-xs font-semibold text-white truncate">{msg.name}</span>
                          {!msg.read && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#a3e635' }} />}
                        </div>
                        <span className="text-[10px] text-gray-600 shrink-0">{new Date(msg.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">{msg.subject || msg.email}</p>
                      <p className="text-[11px] text-gray-600 mt-1 line-clamp-2 leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detail pane */}
          <div className="flex-1 min-w-0 overflow-y-auto hidden sm:block">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div key={selected.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="h-full flex flex-col">

                  {/* Detail header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(163,230,53,0.08)', boxShadow: '0 0 12px rgba(163,230,53,0.12)' }}>
                        <User size={18} style={{ color: '#a3e635' }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">{selected.name}</h3>
                        <a href={`mailto:${selected.email}`} className="text-xs transition-colors" style={{ color: '#a3e635' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#84cc16')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#a3e635')}>{selected.email}</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your message'}`}
                        className="flex items-center gap-1.5 text-black text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        style={{ background: '#a3e635' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#84cc16')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#a3e635')}>
                        <Mail size={12} /><span>Reply</span>
                      </a>
                      <button onClick={() => deleteMsg(selected.id)}
                        className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Detail body */}
                  <div className="flex-1 p-6 space-y-5">
                    {selected.subject && (
                      <div>
                        <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-1">Subject</p>
                        <p className="text-white font-semibold">{selected.subject}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-2">Message</p>
                      <div className="bg-[#111111] border border-white/5 rounded-xl p-5">
                        <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">{selected.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 pt-2 border-t border-white/5">
                      <Clock size={11} />
                      <span>{new Date(selected.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center space-y-3 text-center p-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <MessageSquare size={26} className="text-gray-700" />
                  </div>
                  <p className="text-gray-600 text-sm">Select a message to read</p>
                  <p className="text-gray-700 text-xs">Choose from the list on the left</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
