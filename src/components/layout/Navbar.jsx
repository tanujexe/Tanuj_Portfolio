import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Zap, Compass, Activity, Award, Menu, X } from "lucide-react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hz, setHz] = useState(240);
  const [ping, setPing] = useState(12);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "driver-profile", label: "About" },
    { id: "engineered-builds", label: "Projects" },
    { id: "performance-components", label: "Skill" },
    { id: "racing-history", label: "Experience" },
    { id: "pit-crew", label: "Contact" }
  ];

  // Dynamic telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHz(Math.floor(Math.random() * (243 - 238) + 238));
      setPing(Math.floor(Math.random() * (16 - 11) + 11));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = 0; i < sections.length; i++) {
        const el = sections[i];
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? "bg-[#050505]/95 backdrop-blur-md border-b border-[#1b1e24]/80 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.85)]" 
          : "bg-transparent py-6 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center font-mono">
        {/* Left Side Logo */}
        <button 
          onClick={() => handleScrollTo("hero")}
          className="flex items-center gap-3 cursor-pointer group text-left bg-transparent border-0 font-mono"
        >
          {/* Spin logo emblem on hover */}
          <motion.div 
            whileHover={{ 
              rotate: 360,
              scale: 1.08,
              borderColor: "rgba(28, 105, 212, 0.5)"
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-10 h-10 flex items-center justify-center bg-[#07080a] rounded-full border border-white/10 shadow-lg"
          >
            {/* BMW M style sector segments in background */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
              <circle cx="20" cy="20" r="19" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
              <circle cx="20" cy="20" r="17.5" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
              
              {/* Slanted BMW M stripes background clip */}
              <g transform="translate(20, 20) skewX(-12) translate(-20, -20)">
                <clipPath id="navbar-circle-clip">
                  <circle cx="20" cy="20" r="15" />
                </clipPath>
                <g clipPath="url(#navbar-circle-clip)">
                  <rect x="6" y="0" width="8" height="40" fill="#1c69d4" />
                  <rect x="14" y="0" width="6" height="40" fill="#0b193d" />
                  <rect x="20" y="0" width="8" height="40" fill="#FF2D2D" />
                </g>
              </g>
              
              {/* Stylized letter T */}
              <g>
                <path d="M 12 14 L 28 14 L 26 17 L 14 17 Z" fill="#FFFFFF" />
                <path d="M 18.5 17 L 21.5 17 L 20 27 L 17 27 Z" fill="#FFFFFF" fillOpacity="0.95" />
              </g>
            </svg>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-[16px] font-black tracking-widest text-white leading-none uppercase font-mono flex items-center gap-1.5">
              TANUJ
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            </span>
            <span className="text-[8.5px] font-mono text-blue-500 tracking-wider uppercase mt-0.5">
              Developer
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleScrollTo(item.id)}
                className={`relative px-5 py-2.5 rounded-md text-[12.5px] font-bold tracking-widest transition-all duration-300 cursor-pointer flex items-center gap-1.5 border-0 bg-transparent ${
                  isActive ? "text-white font-black" : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-bg"
                    className="absolute inset-0 bg-[#0c0e12]/60 border border-[#1b1e24] rounded-md -z-10 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  >
                    {/* HUD Corner brackets in BMW M-Stripes color scheme */}
                    <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-[#1c69d4]" />
                    <span className="absolute top-0 right-0 w-1 h-1 border-t border-r border-[#1c69d4]" />
                    <span className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-[#FF2D2D]" />
                    <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-[#FF2D2D]" />
                    
                    {/* Tiny laser line at the bottom */}
                    <span className="absolute bottom-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-[#1c69d4] via-[#0b193d] to-[#FF2D2D]" />
                  </motion.span>
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right side active telemetry rate (Desktop) */}
        <div className="hidden md:flex items-center gap-5 text-[10px] text-gray-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span className="text-emerald-500 font-bold uppercase">LINK_STABLE</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-bold border border-[#1b1e24] px-2.5 py-1 rounded bg-neutral-900/50 text-gray-400">
              Hz: <span className="text-emerald-400 font-black">{hz}</span>
            </span>
            <span className="font-bold border border-[#1b1e24] px-2.5 py-1 rounded bg-neutral-900/50 text-gray-400">
              MS: <span className="text-sky-400 font-black">{ping}</span>
            </span>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center md:hidden gap-3">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
            <span className="font-bold border border-[#1b1e24] px-2 py-1 rounded bg-neutral-900/50 text-emerald-400">
              {hz}Hz
            </span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-9 h-9 rounded border border-[#1b1e24] bg-neutral-900/60 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            {isOpen ? <X size={16} strokeWidth={2.5} /> : <Menu size={16} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Slide-down diagnostic mobile drawer overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 border-b border-[#1b1e24] bg-[#050505]/98 backdrop-blur-lg overflow-hidden z-30"
          >
            <div className="px-6 py-6 flex flex-col gap-5 font-mono border-t border-[#1b1e24]/40">
              {/* Telemetry diagnostics header */}
              <div className="flex items-center justify-between text-[8px] text-gray-500 border-b border-[#1b1e24] pb-2">
                <span>SYSTEM DIAGNOSTIC REPORT</span>
                <span className="text-emerald-500 animate-pulse font-bold">ECU_ACTIVE</span>
              </div>
              
              {/* Checklists */}
              <div className="grid grid-cols-2 gap-2 text-[9px] text-gray-400 bg-black/40 p-2.5 rounded border border-[#1b1e24]/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ENG_TEMP: <b className="text-white">98°C</b></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>BOOST: <b className="text-white">1.8 BAR</b></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>DSC: <b className="text-[#1c69d4]">DYNAMIC</b></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>LINK: <b className="text-emerald-400">STABLE</b></span>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-1.5">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleScrollTo(item.id);
                        setIsOpen(false);
                      }}
                      className={`relative flex items-center justify-between px-3 py-2.5 rounded border text-[10px] font-bold tracking-widest transition-all text-left bg-transparent ${
                        isActive 
                          ? "border-[#1c69d4]/50 bg-white/[0.02] text-white" 
                          : "border-[#1b1e24] text-gray-400 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-gray-600">0{idx + 1} //</span>
                        <span>{item.label}</span>
                      </span>
                      {isActive ? (
                        <span className="text-[8px] bg-[#1c69d4]/10 border border-[#1c69d4]/30 px-1.5 py-0.5 rounded text-[#1c69d4] uppercase font-black tracking-normal animate-pulse">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-[7px] text-gray-600 uppercase">
                          STANDBY
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
              
              {/* Footer specs */}
              <div className="text-[7px] text-gray-600 text-center tracking-wider pt-2 border-t border-[#1b1e24]/40 uppercase">
                TANUJ M-SPEC PORTFOLIO // v1.2.4
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
