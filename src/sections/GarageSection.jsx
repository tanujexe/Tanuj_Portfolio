import React from "react";
import { motion } from "framer-motion";

export default function GarageSection() {
  return (
    <section id="current-garage" className="py-12 border-t border-[#1b1e24] relative scroll-mt-20">
      <div className="mb-12 garage-header">
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          Current Garage
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm max-w-xl mt-2 font-sans leading-relaxed">
          Current active local repos, active server configurations, and performance indices under tuning review.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -6 }}
          className="bg-[#0e1013] border border-[#1b1e24] rounded-xl p-5 font-mono text-xs text-left relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[200px]"
        >
          <div className="absolute top-0 left-0 w-1 bg-[#00A3C4] h-full" />
          <div>
            <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-3">
              <span>ACTIVE_WORKSPACE</span>
              <span className="flex items-center gap-1.5 text-[#00A3C4] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A3C4] animate-pulse" />
                BUILDING
              </span>
            </div>
            <h3 className="text-[10px] text-gray-500 uppercase tracking-widest font-black block">CURRENT BUILD</h3>
            <h4 className="text-lg font-black text-white mt-1 uppercase font-display">Nirogyasathi</h4>
            <p className="text-[10px] text-gray-400 font-sans mt-2 leading-relaxed">
              AI symptom analysis pipeline using transformer NLP models to diagnose conditions and suggest specialists.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1b1e24] space-y-2">
            <div className="flex justify-between text-[9px] text-gray-500 font-bold">
              <span>COMPLETION_RATE</span>
              <span className="text-white">92%</span>
            </div>
            <div className="w-full h-1 bg-[#1b1e24] rounded-full overflow-hidden">
              <div className="h-full bg-[#00A3C4] rounded-full" style={{ width: "92%" }} />
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -6 }}
          className="bg-[#0e1013] border border-[#1b1e24] rounded-xl p-5 font-mono text-xs text-left relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[200px]"
        >
          <div className="absolute top-0 left-0 w-1 bg-[#1c69d4] h-full" />
          <div>
            <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-3">
              <span>CORE_UPGRADES</span>
              <span className="text-[#1c69d4] font-bold">INTEGRATING</span>
            </div>
            <h3 className="text-[10px] text-gray-500 uppercase tracking-widest font-black block">CURRENT LEARNING</h3>
            <h4 className="text-lg font-black text-white mt-1 uppercase font-display">React Compiler</h4>
            <p className="text-[10px] text-gray-400 font-sans mt-2 leading-relaxed">
              Deep research into React 19 compilation specs, automatic memoization limits, and concurrent hook trees.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1b1e24] space-y-2">
            <div className="flex justify-between text-[9px] text-gray-500 font-bold">
              <span>CURRICULUM_INTEGRITY</span>
              <span className="text-white">88%</span>
            </div>
            <div className="w-full h-1 bg-[#1b1e24] rounded-full overflow-hidden">
              <div className="h-full bg-[#1c69d4] rounded-full" style={{ width: "88%" }} />
            </div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -6 }}
          className="bg-[#0e1013] border border-[#1b1e24] rounded-xl p-5 font-mono text-xs text-left relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[200px]"
        >
          <div className="absolute top-0 left-0 w-1 bg-[#FF2D2D] h-full" />
          <div>
            <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-3">
              <span>HARDWARE_STATIONS</span>
              <span className="text-[#FF2D2D] font-bold">ACTIVE</span>
            </div>
            <h3 className="text-[10px] text-gray-500 uppercase tracking-widest font-black block">WORKSPACE HEALTH</h3>
            <h4 className="text-lg font-black text-white mt-1 uppercase font-display">Tuning Server v8</h4>
            <p className="text-[10px] text-gray-400 font-sans mt-2 leading-relaxed">
              Node developer servers connected directly to local database clusters. Hot module replacement active.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#1b1e24] space-y-2">
            <div className="flex justify-between text-[9px] text-gray-500 font-bold">
              <span>SYS_STABILITY</span>
              <span className="text-white">99.8%</span>
            </div>
            <div className="w-full h-1 bg-[#1b1e24] rounded-full overflow-hidden">
              <div className="h-full bg-[#FF2D2D] rounded-full" style={{ width: "100%" }} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
