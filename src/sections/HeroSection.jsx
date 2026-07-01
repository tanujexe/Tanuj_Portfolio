import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CustomButton from "../components/ui/CustomButton";

export default function HeroSection({ canvasRef, onScrollToSection }) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const titles = ["Full Stack Developer", "AI Builder", "MERN Stack Developer"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="min-h-[90vh] flex flex-col justify-center relative pt-8 md:pt-14 pb-8 overflow-hidden">
      {/* GRID SCANNER LINE EFFECT */}
      <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF2D2D]/20 to-transparent z-0 pointer-events-none animate-grid-scan" />
      
      {/* FLOATING TELEMETRY WIDGETS */}
      <motion.div 
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[3%] top-[18%] hidden xl:flex flex-col p-3 bg-[#0c0e12]/60 border border-[#1b1e24] rounded-lg font-mono text-[9px] text-gray-500 shadow-2xl z-10 w-44 backdrop-blur-sm pointer-events-none"
      >
        <div className="flex justify-between items-center border-b border-[#1b1e24] pb-1.5 mb-1.5">
          <span className="text-white font-bold uppercase">CORE_TELEMETRY</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="space-y-1">
          <div className="flex justify-between"><span>RPM:</span><span className="text-[#FF2D2D] font-bold">4,800 RPM</span></div>
          <div className="flex justify-between"><span>BOOST:</span><span className="text-white font-bold">1.8 BAR</span></div>
          <div className="flex justify-between"><span>TEMP:</span><span className="text-emerald-400 font-bold">88°C</span></div>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[3%] bottom-[18%] hidden xl:flex flex-col p-3 bg-[#0c0e12]/60 border border-[#1b1e24] rounded-lg font-mono text-[9px] text-gray-500 shadow-2xl z-10 w-40 backdrop-blur-sm pointer-events-none"
      >
        <div className="flex justify-between items-center border-b border-[#1b1e24] pb-1.5 mb-1.5">
          <span className="text-white font-bold uppercase">SYSTEM_LOGS</span>
          <span className="text-[#1c69d4] font-black">ACTIVE</span>
        </div>
        <div className="space-y-1">
          <div className="text-[7.5px] truncate">◆ CONNECTING PORT_844...</div>
          <div className="text-[7.5px] text-emerald-400 truncate">◆ HANDSHAKE SUCCESS 200</div>
          <div className="text-[7.5px] truncate">◆ STREAMING TUNING_DATA</div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-left hero-text-col relative z-10">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-[#FF2D2D]/35 rounded text-[10px] font-mono text-[#FF2D2D] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D2D] animate-ping" />
              SYSTEM_POWERTRAIN_ACTIVE
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-[#00A3C4]/35 rounded text-[10px] font-mono text-[#00A3C4] font-bold tracking-widest uppercase">
              <span className="text-[8px] text-gray-500 font-bold block uppercase mr-1">CURRENT BUILD:</span>
              Nirogyasathi
            </div>
          </div>

          <h1 className="font-display text-4xl sm:text-7xl lg:text-[84px] font-black tracking-tight leading-[0.9] text-[#EAEAEA] uppercase">
            TANUJ AGRAWAL
          </h1>

          <div className="h-8 flex items-center">
            <span className="text-glow-red text-[#FF2D2D] font-mono text-sm sm:text-base tracking-[0.25em] font-extrabold uppercase border-r-2 border-[#FF2D2D] pr-1.5 animate-pulse">
              {titles[currentTitleIndex]}
            </span>
          </div>

          <p className="text-gray-400 text-sm sm:text-base max-w-xl font-sans leading-relaxed">
            Building AI systems, full-stack applications, and startup-focused digital products.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <CustomButton 
              onClick={() => onScrollToSection("engineered-builds")}
              variant="red"
              className="font-bold border-[#FF2D2D]/45 text-[#FF2D2D]"
            >
              View Projects
            </CustomButton>
            <CustomButton 
              onClick={() => onScrollToSection("pit-crew")}
              variant="dark"
              className="font-bold border-neutral-700 hover:border-white text-white"
            >
              Contact Me
            </CustomButton>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-6 max-w-lg">
            <div className="p-3 bg-white/[0.02] border border-[#1b1e24] rounded-lg font-mono text-left stat-card relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[2px] h-full bg-[#FF2D2D]" />
              <span className="text-[18px] sm:text-[22px] font-black text-white block leading-none">3+</span>
              <span className="text-[8px] text-gray-500 uppercase tracking-wider font-bold block mt-1">BUILDS DEPLOYED</span>
            </div>
            <div className="p-3 bg-white/[0.02] border border-[#1b1e24] rounded-lg font-mono text-left stat-card relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[2px] h-full bg-[#FF2D2D]/60" />
              <span className="text-[18px] sm:text-[22px] font-black text-white block leading-none">12+</span>
              <span className="text-[8px] text-gray-500 uppercase tracking-wider font-bold block mt-1">CORE TECHS</span>
            </div>
            <div className="p-3 bg-white/[0.02] border border-[#1b1e24] rounded-lg font-mono text-left stat-card relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[2px] h-full bg-neutral-700" />
              <span className="text-[18px] sm:text-[22px] font-black text-white block leading-none">1+</span>
              <span className="text-[8px] text-gray-500 uppercase tracking-wider font-bold block mt-1">YEARS TUNING</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px] lg:min-h-0">
          <div className="absolute w-[300px] h-[300px] bg-[#FF2D2D]/10 rounded-full blur-[80px] z-0 animate-pulse" />
          
          <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-xl overflow-hidden border border-[#1b1e24] shadow-2xl z-10 hero-portrait-card bg-neutral-900/60 backdrop-blur-sm">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] z-20 pointer-events-none" />
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#FF2D2D] z-20" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#FF2D2D] z-20" />

            <img 
              src="/driver_placeholder.png" 
              alt="Tanuj Agrawal Driver Profile"
              className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
            />

            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-20 font-mono text-[9px] text-[#EAEAEA] flex justify-between items-end border-t border-white/[0.04]">
              <div>
                <span className="text-[8px] text-gray-500 uppercase block font-bold">PILOT_ID:</span>
                <span className="font-extrabold text-white">TANUJ_AGRAWAL_sys</span>
              </div>
              <div className="text-right">
                <span className="text-[8px] text-gray-500 uppercase block font-bold">GEAR_MAP:</span>
                <span className="text-[#FF2D2D] font-bold">M_SPORT_MERN</span>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
