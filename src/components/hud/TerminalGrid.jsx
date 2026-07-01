import React from "react";

export default function TerminalGrid({ children }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#050505] to-[#0A0A0A] text-[#f3f4f6] overflow-x-hidden font-sans">
      {/* Carbon fiber weave background overlay (subtle carbon texture) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.06] carbon-weave" />
      
      {/* Dynamic tech grid overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Radial neon red glow pools */}
      <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] bg-[#FF2D2D]/[0.025] rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[#FF2D2D]/[0.015] rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Ambient vignetting */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(5,5,5,0.95))] pointer-events-none" />

      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-gradient-to-r from-[#1c69d4] via-[#0b193d] to-[#FF2D2D] shadow-[0_2px_15px_rgba(28,105,212,0.3)]" />


      {/* 1px outer carbon border layout guides */}
      <div className="fixed inset-4 pointer-events-none z-30 border border-[#1b1e24] select-none opacity-50">
        {/* HUD reticles */}
        <div className="absolute top-12 left-0 w-6 h-6 border-t-2 border-l-2 border-[#1c69d4]/40" />
        <div className="absolute top-12 right-0 w-6 h-6 border-t-2 border-r-2 border-[#1c69d4]/40" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#d12630]/40" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#d12630]/40" />
        
        {/* Mid-point telemetry brackets */}
        <div className="absolute top-1/2 left-0 w-3 h-12 -translate-y-1/2 border-t border-b border-r border-[#1b1e24] bg-[#0c0e12]/10" />
        <div className="absolute top-1/2 right-0 w-3 h-12 -translate-y-1/2 border-t border-b border-l border-[#1b1e24] bg-[#0c0e12]/10" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12">
        {children}
      </div>
    </div>
  );
}
