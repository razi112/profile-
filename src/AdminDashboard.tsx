import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Trash2, LogOut, Eye, Clock, User, MessageSquare, Search, Shield, Lock, RefreshCw } from 'lucide-react';
import { supabase } from './supabase';
import type { Message } from './supabase';

export type { Message };

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'razi2026';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
};

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else {
      setError(true); setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-[120px]" />
      </div>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative w-full max-w-sm">
        <motion.div animate={shake ? { x: [-10, 10, -8, 8, 0] } : {}} transition={{ duration: 0.4 }}
          className="bg-[#131826] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <Shield size={28} className="text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            <p className="text-gray-500 text-sm text-center">Enter your password to access the dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input type="password" value={pw} onChange={e => { setPw(e.target.value); setError(false); }}
                placeholder="Password" autoFocus
                className={`w-full bg-[#0A0F1C] border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors`} />
            </div>
            {error && <p className="text-red-400 text-xs text-center">Incorrect password</p>}
            <button type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-xl transition-colors shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              Sign In
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchMessages = async () => {
    if (!supabase) { setFetchError('Supabase not configured. Check your .env file.'); return; }
    setLoading(true);
    setFetchError(null);
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Admin] Fetch error:', error.message);
      setFetchError(error.message);
    } else {
      console.log('[Admin] Fetched', data?.length, 'messages');
      setMessages(data || []);
    }
    setLoading(false);
  };

  // Fetch on mount + realtime subscription
  useEffect(() => {
    if (!authed || !supabase) return;
    fetchMessages();

    const channel = supabase
      .channel('messages-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        console.log('[Admin] Realtime INSERT:', payload.new);
        setMessages(prev => [payload.new as Message, ...prev]);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, payload => {
        setMessages(prev => prev.map(m => m.id === (payload.new as Message).id ? payload.new as Message : m));
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, payload => {
        setMessages(prev => prev.filter(m => m.id !== (payload.old as Message).id));
      })
      .subscribe(status => console.log('[Admin] Realtime status:', status));

    return () => { supabase.removeChannel(channel); };
  }, [authed]);

 const handleLogin = () => {
  localStorage.setItem('isAdmin', 'true')
  setAuthed(true)
}
  const handleLogout = () => {
  localStorage.removeItem('isAdmin')
  setAuthed(false)
  setMessages([])
}

  const deleteMsg = async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) { console.error('[Admin] Delete error:', error.message); return; }
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const markRead = async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('messages').update({ read: true }).eq('id', id);
    if (error) { console.error('[Admin] Mark read error:', error.message); return; }
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const openMsg = (msg: Message) => {
    setSelected(msg);
    if (!msg.read) markRead(msg.id);
  };

  const filtered = messages
    .filter(m => filter === 'all' || !m.read)
    .filter(m => !search || `${m.name} ${m.email} ${m.subject} ${m.message}`.toLowerCase().includes(search.toLowerCase()));

  const unreadCount = messages.filter(m => !m.read).length;

  if (!authed) return <LoginScreen onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white font-sans">
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-purple-600/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-white/5 bg-[#0A0F1C]/80 backdrop-blur-md px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.2)]">
            <Shield size={16} className="text-purple-400" />
          </div>
          <span className="font-bold text-white">RAZI<span className="text-purple-500">.</span> Admin</span>
        </div>
        <div className="flex items-center space-x-4">
          {unreadCount > 0 && (
            <span className="bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">{unreadCount} new</span>
          )}
          <button onClick={fetchMessages} disabled={loading}
            className="flex items-center space-x-1.5 text-gray-400 hover:text-white transition-colors text-sm">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /><span>Refresh</span>
          </button>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm">
            <LogOut size={16} /><span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-10 space-y-8">
        {/* Error banner */}
        {fetchError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
            Database error: {fetchError} — check your Supabase URL/key and RLS policies.
          </div>
        )}

        {/* Stats */}
        <motion.div initial="hidden" animate="visible" variants={container}
          className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Messages', value: messages.length, icon: MessageSquare, color: 'purple' },
            { label: 'Unread', value: unreadCount, icon: Mail, color: 'blue' },
            { label: 'Read', value: messages.length - unreadCount, icon: Eye, color: 'emerald' },
            { label: 'Today', value: messages.filter(m => new Date(m.created_at).toDateString() === new Date().toDateString()).length, icon: Clock, color: 'amber' },
          ].map(({ label, value, icon: Icon, color }) => (
            <motion.div key={label} variants={fadeInUp}
              className="bg-[#131826] border border-white/5 hover:border-purple-500/20 rounded-2xl p-5 flex items-center space-x-4 transition-all duration-300">
              <div className={`w-10 h-10 bg-${color}-500/10 rounded-xl flex items-center justify-center`}>
                <Icon size={20} className={`text-${color}-400`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search + Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search messages..."
              className="w-full bg-[#131826] border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/40 transition-colors text-sm" />
          </div>
          <div className="flex rounded-xl overflow-hidden border border-white/8">
            {(['all', 'unread'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2.5 text-sm font-medium transition-colors capitalize ${filter === f ? 'bg-purple-600 text-white' : 'bg-[#131826] text-gray-400 hover:text-white'}`}>
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Messages + Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* List */}
          <motion.div initial="hidden" animate="visible" variants={container} className="lg:col-span-2 space-y-3">
            {loading && messages.length === 0 ? (
              <div className="bg-[#131826] border border-white/5 rounded-2xl p-12 flex flex-col items-center space-y-3">
                <RefreshCw size={24} className="text-gray-600 animate-spin" />
                <p className="text-gray-500 text-sm">Loading messages...</p>
              </div>
            ) : filtered.length === 0 ? (
              <motion.div variants={fadeInUp} className="bg-[#131826] border border-white/5 rounded-2xl p-12 flex flex-col items-center text-center space-y-3">
                <Mail size={32} className="text-gray-600" />
                <p className="text-gray-500 text-sm">No messages yet</p>
              </motion.div>
            ) : filtered.map(msg => (
              <motion.div key={msg.id} variants={fadeInUp} onClick={() => openMsg(msg)}
                className={`bg-[#131826] border rounded-xl p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] ${selected?.id === msg.id ? 'border-purple-500/40 shadow-[0_0_20px_rgba(139,92,246,0.12)]' : 'border-white/5 hover:border-white/10'}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center shrink-0">
                      <User size={14} className="text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-white truncate">{msg.name}</span>
                        {!msg.read && <span className="w-2 h-2 bg-purple-500 rounded-full shrink-0 shadow-[0_0_6px_rgba(139,92,246,0.6)]"></span>}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{msg.subject || msg.email}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-600 shrink-0">{new Date(msg.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 pl-10">{msg.message}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Detail */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div key={selected.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#131826] border border-white/5 rounded-2xl p-6 space-y-6 shadow-[0_0_30px_rgba(139,92,246,0.06)]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(139,92,246,0.2)]">
                        <User size={20} className="text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{selected.name}</h3>
                        <a href={`mailto:${selected.email}`} className="text-sm text-purple-400 hover:text-purple-300 transition-colors">{selected.email}</a>
                      </div>
                    </div>
                    <button onClick={() => deleteMsg(selected.id)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  {selected.subject && (
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Subject</p>
                      <p className="text-white font-medium">{selected.subject}</p>
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Message</p>
                    <div className="bg-[#0A0F1C] border border-white/5 rounded-xl p-4">
                      <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap">{selected.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                      <Clock size={12} />
                      <span>{new Date(selected.created_at).toLocaleString()}</span>
                    </div>
                    <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your message'}`}
                      className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-[0_0_12px_rgba(139,92,246,0.2)]">
                      <Mail size={14} /><span>Reply via Email</span>
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-[#131826] border border-white/5 rounded-2xl p-16 flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 bg-white/3 rounded-2xl flex items-center justify-center">
                    <MessageSquare size={28} className="text-gray-600" />
                  </div>
                  <p className="text-gray-500">Select a message to read</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
