import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gauge, Settings, Shield, Zap, CircleDot } from "lucide-react";

const STACK_DATA = [
  {
    id: "frontend",
    title: "STAGE_01 // COCKPIT_HUD",
    icon: Gauge,
    status: "active",
    stats: { temp: "38°C", load: "14%", boost: "0.2 bar" },
    tech: ["React.js", "Vite", "Tailwind CSS", "Framer Motion", "React Router", "shadcn/ui", "Lucide Icons"],
    snippet: "import { Link, Route } from 'react-router-dom';\n\nconst CockpitMap = () => <ViteAppRouter />;"
  },
  {
    id: "backend",
    title: "STAGE_02 // GEARBOX_ECU",
    icon: Settings,
    status: "active",
    stats: { temp: "42°C", load: "28%", boost: "0.6 bar" },
    tech: ["Node.js", "Express.js", "REST APIs", "WebSockets", "Auth0/JWT", "Microservices"],
    snippet: "const express = require('express');\nconst app = express();\n\napp.use('/telemetry', telemetryRouter);"
  },
  {
    id: "database",
    title: "STAGE_03 // FUEL_INJECTION",
    icon: Zap,
    status: "active",
    stats: { temp: "45°C", load: "34%", boost: "1.2 bar" },
    tech: ["MongoDB", "PostgreSQL", "Redis Cache", "Vector DBs", "Prisma ORM", "Aggregation Pipelines"],
    snippet: "const mongoose = require('mongoose');\nawait mongoose.connect(process.env.MONGO_URI);"
  },
  {
    id: "systems",
    title: "STAGE_04 // AERO_EXHAUST",
    icon: Shield,
    status: "active",
    stats: { temp: "39°C", load: "19%", boost: "0.4 bar" },
    tech: ["Docker", "AI API Integrations", "Vercel / AWS", "GitHub Actions CI/CD", "Nginx", "Git / GitHub"],
    snippet: "version: '3.8'\nservices:\n  exhaust_valve:\n    build: .\n    ports:\n      - '5174:5174'"
  }
];

export default function ServerBlade() {
  const [selectedBlade, setSelectedBlade] = useState(STACK_DATA[0]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left side list */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        {STACK_DATA.map((blade) => {
          const Icon = blade.icon;
          const isSelected = selectedBlade?.id === blade.id;

          return (
            <motion.button
              key={blade.id}
              onClick={() => setSelectedBlade(blade)}
              whileHover={{ x: 6 }}
              className={`w-full text-left p-4 bg-[#0e1013] border rounded-lg flex items-center justify-between transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? "border-[#d12630] shadow-[0_0_12px_rgba(209,38,48,0.05)] bg-[#0e1013]"
                  : "border-[#1b1e24] hover:border-neutral-800"
              }`}
            >
              {/* Vertical M-Sport Accent Border */}
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-[#d12630] to-transparent opacity-80" />

              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${isSelected ? "text-[#d12630] bg-[#d12630]/10" : "text-gray-500 bg-[#0c0e12]"}`}>
                  <Icon size={16} />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-white font-bold tracking-wide">
                    {blade.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-1 font-mono text-[9px] text-gray-500">
                    <span>TEMP: {blade.stats.temp}</span>
                    <span>LOAD: {blade.stats.load}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[8px] text-emerald-500 font-bold uppercase">
                  {blade.status}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Right side diagnostics panel */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          {selectedBlade ? (
            <motion.div
              key={selectedBlade.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full bg-[#0e1013] border border-[#1b1e24] rounded-lg overflow-hidden font-mono"
            >
              <div className="border-b border-[#1b1e24] px-4 py-3 bg-[#0c0e12] flex justify-between items-center text-[10px]">
                <div className="flex items-center gap-2 text-[#d12630]">
                  <CircleDot size={12} className="animate-pulse" />
                  <span>DIAGNOSTICS://{selectedBlade.id.toUpperCase()}_ECU_LOG</span>
                </div>
                <span className="text-[#f5a623] font-bold text-glow-amber">BOOST: {selectedBlade.stats.boost}</span>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-bold">
                    Mounted_Frameworks
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedBlade.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs text-white bg-[#0c0e12] border border-[#1b1e24] rounded-md"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-bold">
                    Config_Init_Script
                  </div>
                  <div className="p-3 bg-[#0c0e12] border border-[#1b1e24] rounded-md text-xs text-[#d12630]/90 whitespace-pre-wrap select-all overflow-x-auto">
                    <code>{selectedBlade.snippet}</code>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-[#1b1e24] pt-4">
                  <div>
                    <span className="block text-[8px] text-gray-500 uppercase">Cylinder Load</span>
                    <span className="text-sm font-semibold text-white">{selectedBlade.stats.load}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] text-gray-500 uppercase">ECU Temp</span>
                    <span className="text-sm font-semibold text-white">{selectedBlade.stats.temp}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] text-gray-500 uppercase">Status Code</span>
                    <span className="text-sm font-semibold text-emerald-500">M_OK_0x00</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="w-full h-[320px] bg-[#0e1013] border border-dashed border-[#1b1e24] rounded-lg flex flex-col items-center justify-center text-center p-6 text-gray-500 font-mono shadow-sm">
              <Settings size={32} className="text-gray-600 mb-3 animate-pulse" />
              <p className="text-xs">
                Select an ECU module from the diagnostics rack to mount its configurations.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
