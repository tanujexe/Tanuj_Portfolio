import React, { useState } from "react";
import { SKILLS } from "../constants/skills";

const SkillCard = ({ title, icon: Icon, color, serialCode, specs, efficiencyLabel, efficiencyValue }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      style={{
        borderColor: isHovered ? color : "#1e222b",
        transform: `perspective(1000px) rotateX(${-coords.y * 12}deg) rotateY(${coords.x * 12}deg) translateY(${isHovered ? -4 : 0}px)`,
        boxShadow: isHovered ? `0 10px 30px -10px ${color}22, 0 1px 1px 0 ${color}33` : "none",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden border rounded-xl p-5 font-mono text-left bg-[#0c0d10] transition-all duration-200 group cursor-pointer component-card"
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-300"
        style={{
          backgroundImage: `
            radial-gradient(${color} 1px, transparent 1px),
            linear-gradient(to right, ${color}11 1px, transparent 1px),
            linear-gradient(to bottom, ${color}11 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px, 10px 10px, 10px 10px",
        }}
      />
      
      <div 
        className="absolute left-0 right-0 h-[1px] pointer-events-none opacity-0 group-hover:opacity-40"
        style={{
          backgroundColor: color,
          top: isHovered ? "100%" : "0%",
          transition: isHovered ? "top 1.2s cubic-bezier(0.1, 0.8, 0.3, 1)" : "none",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300" style={{ backgroundColor: isHovered ? color : `${color}55` }} />

      <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold mb-3">
        <span>PART_NO: {serialCode}</span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
          SYS: NOMINAL
        </span>
      </div>

      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#1b1e24]">
        <div 
          className="p-2 rounded-lg transition-colors duration-300" 
          style={{ 
            backgroundColor: `${color}11`,
            color: color,
            border: `1px solid ${color}22`
          }}
        >
          <Icon size={16} className="group-hover:rotate-12 transition-transform duration-300" />
        </div>
        <div>
          <h4 className="text-[13px] text-white font-extrabold uppercase tracking-wide group-hover:text-white transition-colors duration-300">
            {title.replace(/_/g, " ")}
          </h4>
          <span className="text-[8px] text-gray-500 block uppercase font-mono">Telemetry Active</span>
        </div>
      </div>

      <div className="space-y-3 mb-5">
        {specs.map((spec) => (
          <div key={spec.name} className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-400 font-semibold">{spec.name}</span>
              <span className="text-gray-500 font-bold">{spec.value}%</span>
            </div>
            <div className="h-2.5 w-full bg-[#08090b] rounded overflow-hidden flex p-[1.5px] border border-[#1e222b] relative">
              <div 
                className="h-full rounded transition-all duration-700 ease-out" 
                style={{ 
                  width: `${spec.value}%`,
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}88`
                }} 
              />
              {/* Segmented layout ticks */}
              <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
                {[...Array(10)].map((_, i) => (
                  <span key={i} className="w-[1px] h-full bg-[#1b1e24]" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#1b1e24] text-[8px] text-gray-500 font-bold">
        <div>
          <span className="text-gray-600 block">TOLERANCE</span>
          <span className="text-gray-400">±0.002mm</span>
        </div>
        <div className="text-right">
          <span className="text-gray-600 block">{efficiencyLabel}</span>
          <span className="text-white" style={{ color: color }}>{efficiencyValue}</span>
        </div>
      </div>
    </div>
  );
};

export default function ComponentsSection() {
  return (
    <section id="performance-components" className="py-12 border-t border-[#1b1e24] relative scroll-mt-20">
      <div className="mb-12 skills-header">
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          Performance Components
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm max-w-xl mt-2 font-sans leading-relaxed">
          Mount specific drivetrain configuration units to inspect software layers, database indices, and developer scripts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 skills-grid">
        {SKILLS.map((skill, idx) => (
          <SkillCard
            key={idx}
            title={skill.title}
            icon={skill.icon}
            color={skill.color}
            serialCode={skill.serialCode}
            specs={skill.specs}
            efficiencyLabel={skill.efficiencyLabel}
            efficiencyValue={skill.efficiencyValue}
          />
        ))}
      </div>
    </section>
  );
}
