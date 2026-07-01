import React from "react";
import { motion } from "framer-motion";

export default function ConsoleDock({ activeSection, onSectionChange }) {
  const navItems = [
    { id: "hero", label: "IGNITION", gear: "P" },
    { id: "stack", label: "ECU_TUNING", gear: "R" },
    { id: "projects", label: "TELEMETRY", gear: "N" },
    { id: "experience", label: "LAPS_LOG", gear: "D" },
    { id: "contact", label: "LAUNCH", gear: "S" }
  ];

  const handleScroll = (id) => {
    onSectionChange(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-2xl px-4 py-3 bg-[#0c0e12]/90 backdrop-blur-md border border-[#1b1e24] rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center justify-between">
      {/* Left M-Performance Gear Indicator Badge */}
      <div className="flex items-center gap-2 select-none md:flex">
        <div className="flex gap-0.5">
          <span className="w-1.5 h-3 bg-[#1c69d4] rounded-l-sm" />
          <span className="w-1.5 h-3 bg-[#002878]" />
          <span className="w-1.5 h-3 bg-[#d12630] rounded-r-sm animate-pulse" />
        </div>
        <span className="font-mono text-[9px] text-[#f3f4f6]/80 uppercase tracking-widest hidden sm:inline ml-1 font-bold">
          M_MODE
        </span>
      </div>

      <nav className="flex items-center gap-1 sm:gap-2 mx-auto sm:mx-0">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`relative px-3 py-1.5 rounded-full font-mono text-[10px] sm:text-xs transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                isActive ? "text-[#d12630] font-black text-glow-red" : "text-gray-400 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-dock-bg"
                  className="absolute inset-0 bg-[#1b1e24]/80 rounded-full -z-10 border border-[#d12630]/30 shadow-[0_0_10px_rgba(209,38,48,0.1)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {/* Simulated gear indicator */}
              <span className={`text-[9px] font-bold px-1 rounded-sm ${isActive ? "bg-[#d12630] text-white" : "bg-neutral-800 text-gray-500"}`}>
                {item.gear}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right Telemetry model details */}
      <div className="hidden md:flex items-center font-mono text-[9px] text-[#f5a623] font-bold tracking-widest select-none text-glow-amber">
        M5_COMP
      </div>
    </div>
  );
}
