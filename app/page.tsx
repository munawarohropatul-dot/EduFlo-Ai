"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bot, QrCode, BookOpen, Users, BarChart3, LogIn, ChevronRight, 
  X, Send, LayoutDashboard, UserCircle, Settings, FileText, AlertCircle 
} from "lucide-react";
import QRCode from "react-qr-code";
import { Html5QrcodeScanner } from "html5-qrcode";

// --- GANTI DENGAN URL GOOGLE APPS SCRIPT ANDA NANTI ---
const GAS_URL = "https://script.google.com/macros/s/AKfycbyOmRx1FL1bFDKknIseHgmBsew_pAR3tUBl_pSpQSt6CWjcQfx4rR4gdjBc6DkANiRXhg/exec";

// ==========================================
// 1. REUSABLE COMPONENTS (Empty State & UI)
// ==========================================
const EmptyState = ({ icon: Icon, title, message }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center p-10 text-center glass-panel rounded-3xl border-dashed border-2 border-purple-500/30 my-6"
  >
    <div className="p-4 bg-purple-900/30 rounded-full mb-4 neon-glow">
      <Icon className="w-10 h-10 text-purple-400" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-purple-300 text-sm max-w-xs">{message}</p>
  </motion.div>
);

const GlassCard = ({ children, className = "", onClick = null }: any) => (
  <div onClick={onClick} className={`glass-panel rounded-2xl p-5 neon-glow cursor-pointer transition-all ${className}`}>
    {children}
  </div>
);

// ==========================================
// 2. MAIN APPLICATION COMPONENT
// ==========================================
export default function EduFlowApp() {
  const [view, setView] = useState("splash"); // splash, landing, login, register, teacher, student, ai_chat, qr_scan
  const [user, setUser] = useState<any>(null);
  
  // Fake delay for splash screen
  useEffect(() => {
    setTimeout(() => setView("landing"), 2500);
  }, []);

  // API Call Wrapper (Agar tidak CORS saat fetch ke GAS)
  const apiCall = async (action: string, data: any) => {
    try {
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ action, ...data }),
      });
      return await res.json();
    } catch (err) {
      console.error(err);
      return { success: false, message: "Network Error" };
    }
  };

  const handleLogout = () => {
    setUser(null);
    setView("login");
  };

  return (
    <div className="relative min-h-screen w-full bg-radial-glow">
      <AnimatePresence mode="wait">
        
        {/* SPLASH SCREEN */}
        {view === "splash" && (
          <motion.div key="splash" exit={{ opacity: 0 }} className="flex h-screen flex-col items-center justify-center">
            <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Bot className="w-24 h-24 text-purple-500 text-glow" />
            </motion.div>
            <h1 className="mt-6 text-3xl font-bold text-white tracking-widest text-glow">EduFlow AI</h1>
            <p className="text-purple-400 mt-2">MTs Al-Bashriyah</p>
          </motion.div>
        )}

        {/* LANDING PAGE */}
        {view === "landing" && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col min-h-screen px-6 py-12 items-center justify-center text-center">
            <div className="glass-panel px-6 py-2 rounded-full mb-8 border-purple-500/50">
              <span className="text-purple-300 text-sm font-medium">✨ Smart Classroom Assistant</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              Masa Depan Pendidikan <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500 text-glow">MTs Al-Bashriyah</span>
            </h1>
            <p className="text-slate-400 mb-10 max-w-md">Sistem pembelajaran digital modern berbasis AI. Kelola kelas, absensi QR, dan AI Tutor dalam satu genggaman.</p>
            <div className="flex gap-4 w-full max-w-sm">
              <button onClick={() => setView("login")} className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 py-4 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/30 hover:scale-105 transition">
                Masuk
              </button>
              <button onClick={() => setView("register")} className="flex-1 glass-panel py-4 rounded-xl font-semibold text-white hover:bg-purple-900/50 transition">
                Daftar Siswa
              </button>
            </div>
          </motion.div>
        )}

        {/* LOGIN PAGE */}
        {view === "login" && (
          <motion.div key="login" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex min-h-screen items-center justify-center p-6">
            <div className="glass-panel p-8 rounded-3xl w-full max-w-md neon-border relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
              <h2 className="text-3xl font-bold text-white mb-2">Selamat Datang</h2>
              <p className="text-purple-300 mb-8">Masuk ke EduFlow AI MTs Al-Bashriyah</p>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-400">Email</label>
                  <input type="email" placeholder="email@contoh.com" className="w-full mt-1 bg-[#0F172A]/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition" />
                </div>
                <div>
                  <label className="text-sm text-slate-400">Password</label>
                  <input type="password" placeholder="••••••••" className="w-full mt-1 bg-[#0F172A]/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition" />
                </div>
                <button 
                  onClick={() => {
                    // MOCKUP LOGIN - Di produksi gunakan apiCall("login", {email, password})
                    setUser({ role: "teacher", name: "Guru MTs" }); // Ubah ke "student" untuk tes siswa
                    setView("teacher"); 
                  }} 
                  className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 py-3.5 rounded-xl font-bold text-white shadow-lg shadow-purple-500/40 mt-4"
                >
                  Masuk ke Dashboard
                </button>
              </div>
              <p className="text-center mt-6 text-slate-400 text-sm">
                Belum punya akun? <span onClick={() => setView("register")} className="text-purple-400 cursor-pointer font-medium hover:text-purple-300">Daftar Siswa</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* DASHBOARD GURU */}
        {view === "teacher" && (
          <motion.div key="teacher" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pb-24">
            <div className="p-6 pt-12 bg-gradient-to-b from-[#1E1B4B] to-transparent">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white">Dashboard Guru</h1>
                  <p className="text-purple-300 text-sm">MTs Al-Bashriyah • EduFlow AI</p>
                </div>
                <button onClick={handleLogout} className="p-2 bg-red-500/10 text-red-400 rounded-full hover:bg-red-500/20"><LogIn className="w-5 h-5 rotate-180"/></button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <GlassCard className="flex flex-col justify-center items-center py-6">
                  <span className="text-4xl font-bold text-white mb-1 text-glow">9</span>
                  <span className="text-xs text-purple-300">Total Kelas</span>
                </GlassCard>
                <GlassCard className="flex flex-col justify-center items-center py-6">
                  <span className="text-4xl font-bold text-white mb-1 text-glow">0</span>
                  <span className="text-xs text-purple-300">Hadir Hari Ini</span>
                </GlassCard>
              </div>

              <h2 className="text-lg font-semibold text-white mb-4">Menu Pintar</h2>
              <div className="grid grid-cols-4 gap-3 mb-8 text-center">
                {[
                  { icon: QrCode, label: "Scan QR", action: () => setView("qr_scan"), color: "text-blue-400" },
                  { icon: FileText, label: "Materi", color: "text-green-400" },
                  { icon: BarChart3, label: "Nilai", color: "text-orange-400" },
                  { icon: Bot, label: "AI Chat", action: () => setView("ai_chat"), color: "text-purple-400" },
                ].map((item, i) => (
                  <div key={i} onClick={item.action} className="flex flex-col items-center gap-2 cursor-pointer">
                    <div className="p-4 glass-panel rounded-2xl neon-glow"><item.icon className={`w-6 h-6 ${item.color}`} /></div>
                    <span className="text-xs text-slate-300">{item.label}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-lg font-semibold text-white mb-4">Kelola Kelas</h2>
              {/* Contoh Data Kosong (Modern Empty State) */}
              <EmptyState 
                icon={Users} 
                title="Belum ada kelas" 
                message="Tambahkan kelas (Misal: 7A, 8B) untuk memulai pembelajaran." 
              />
            </div>

            {/* Bottom Nav */}
            <div className="fixed bottom-0 w-full glass-panel border-t border-purple-500/30 p-4 flex justify-around items-center">
              <LayoutDashboard className="w-6 h-6 text-purple-400" />
              <Users className="w-6 h-6 text-slate-500" />
              <Settings className="w-6 h-6 text-slate-500" />
            </div>
          </motion.div>
        )}

        {/* AI CHAT INTERFACE (Gemini Realtime) */}
        {view === "ai_chat" && (
          <motion.div key="ai" initial={{ x: "100%" }} animate={{ x: 0 }} className="flex flex-col h-screen bg-[#0F172A]">
            <div className="glass-panel p-4 flex items-center gap-4 sticky top-0 z-10 border-b border-purple-500/30">
              <button onClick={() => setView(user?.role === "teacher" ? "teacher" : "student")} className="p-2 glass-panel rounded-full"><X className="w-5 h-5 text-white"/></button>
              <div>
                <h2 className="font-bold text-white flex items-center gap-2"><Bot className="w-5 h-5 text-purple-400"/> EduFlow AI Assistant</h2>
                <p className="text-xs text-green-400">Online • Powered by Gemini</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-start">
                <div className="glass-panel bg-purple-900/40 p-4 rounded-2xl rounded-tl-none max-w-[85%] border border-purple-500/20">
                  <p className="text-sm text-white">Halo! Saya AI Assistant dari MTs Al-Bashriyah. Ada yang bisa saya bantu hari ini terkait materi atau tugas?</p>
                </div>
              </div>
              {/* Chat Empty State / History goes here */}
            </div>

            <div className="p-4 glass-panel border-t border-purple-500/30 flex gap-2">
              <input type="text" placeholder="Tanya sesuatu ke AI..." className="flex-1 bg-[#0F172A] border border-purple-500/40 rounded-full px-5 text-sm text-white focus:outline-none focus:border-purple-400" />
              <button className="p-3 bg-purple-600 rounded-full text-white shadow-lg shadow-purple-500/50"><Send className="w-5 h-5"/></button>
            </div>
          </motion.div>
        )}

        {/* QR SCANNER PAGE (Menggunakan html5-qrcode) */}
        {view === "qr_scan" && (
          <motion.div key="qr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-screen bg-black">
             <div className="p-6 absolute top-0 w-full z-10 flex justify-between">
              <h2 className="text-white font-bold text-lg">Scan Absensi Siswa</h2>
              <button onClick={() => setView("teacher")} className="text-white bg-white/20 p-2 rounded-full"><X className="w-6 h-6"/></button>
             </div>
             <div className="flex-1 flex items-center justify-center relative">
                {/* Scanner Target Box UI */}
                <div className="absolute w-64 h-64 border-2 border-purple-500 rounded-3xl neon-glow z-10 pointer-events-none"></div>
                <div className="text-white text-center z-10 mt-80 bg-black/50 px-4 py-2 rounded-full">Arahkan kamera ke QR Siswa</div>
                
                {/* Di produksi sungguhan, render Html5QrcodeScanner di div id="reader" ini */}
                <div id="reader" className="w-full h-full object-cover absolute opacity-50"></div> 
             </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
