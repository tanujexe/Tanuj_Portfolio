import React, { useState, useEffect } from "react";
import { Check, Cpu, Settings, Shield, Zap, Wind } from "lucide-react";

const PERFORMANCE_PARTS = [
  {
    id: "frontend",
    title: "Frontend Design & Custom Dashboards",
    description: "A beautiful, premium user interface with smooth animations, customized stats panels, and perfect mobile layouts.",
    cost: 3000,
    weeks: 2,
    hp: 80,
    torque: 100,
    icon: Cpu
  },
  {
    id: "backend",
    title: "Secure Database & Server Backend",
    description: "Fast and secure server setup with optimized databases, user login systems, and secure API endpoints.",
    cost: 2500,
    weeks: 2,
    hp: 50,
    torque: 70,
    icon: Settings
  },
  {
    id: "ai",
    title: "AI Integration & Machine Learning",
    description: "Intelligent features like AI symptom matching, automated chatbots, data processing, and custom AI templates.",
    cost: 3500,
    weeks: 2,
    hp: 120,
    torque: 150,
    icon: Zap
  },
  {
    id: "multi-vendor",
    title: "E-commerce Catalog & Payments",
    description: "Full online store capabilities, seller catalogs, product search filters, and secure card payment checkouts.",
    cost: 4000,
    weeks: 3,
    hp: 100,
    torque: 130,
    icon: Wind
  },
  {
    id: "deployment",
    title: "Cloud Deployment & Automation",
    description: "Automatic deployments to cloud servers with automatic safety backups and high speed load optimization.",
    cost: 1500,
    weeks: 1,
    hp: 30,
    torque: 40,
    icon: Shield
  }
];

export default function ScopeCalculator({ onSelectScope }) {
  const [selectedIds, setSelectedIds] = useState(["frontend"]);
  const [totalCost, setTotalCost] = useState(3000);
  const [totalWeeks, setTotalWeeks] = useState(2);
  const [totalHp, setTotalHp] = useState(600);
  const [totalTorque, setTotalTorque] = useState(750);

  const togglePart = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  useEffect(() => {
    const cost = PERFORMANCE_PARTS.filter((s) => selectedIds.includes(s.id)).reduce((acc, curr) => acc + curr.cost, 0);
    const weeks = PERFORMANCE_PARTS.filter((s) => selectedIds.includes(s.id)).reduce((acc, curr) => acc + curr.weeks, 0);
    const hpGains = PERFORMANCE_PARTS.filter((s) => selectedIds.includes(s.id)).reduce((acc, curr) => acc + curr.hp, 0);
    const torqueGains = PERFORMANCE_PARTS.filter((s) => selectedIds.includes(s.id)).reduce((acc, curr) => acc + curr.torque, 0);
    
    setTotalCost(cost);
    setTotalWeeks(weeks);
    setTotalHp(600 + hpGains);
    setTotalTorque(750 + torqueGains);
  }, [selectedIds]);

  const handleApplyScope = () => {
    const selectedScopes = PERFORMANCE_PARTS.filter((s) => selectedIds.includes(s.id)).map((s) => s.title);
    const summary = `Tuned Scope: ${selectedScopes.join(", ")}; Est Price: $${totalCost}; Build: ${totalWeeks} weeks; Output: ${totalHp} BHP / ${totalTorque} Nm.`;
    
    if (onSelectScope) {
      onSelectScope(summary);
      const contactSec = document.getElementById("pit-crew");
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full bg-[#0e1013] border border-[#1b1e24] rounded-xl p-6 md:p-8 font-mono grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      <div className="lg:col-span-7 space-y-4">
        <h3 className="text-[10px] text-[#f5a623] uppercase tracking-wider mb-2 font-bold text-glow-amber">
          SELECT_PERFORMANCE_UPGRADES:
        </h3>
        
        <div className="space-y-3">
          {PERFORMANCE_PARTS.map((part) => {
            const Icon = part.icon;
            const isSelected = selectedIds.includes(part.id);
            
            return (
              <button
                key={part.id}
                onClick={() => togglePart(part.id)}
                className={`w-full text-left p-4 rounded-lg border flex items-start justify-between gap-4 transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#d12630] bg-[#d12630]/5 shadow-[0_0_12px_rgba(209,38,48,0.05)]"
                    : "border-[#1b1e24] bg-[#0c0e12] hover:border-neutral-800"
                }`}
              >
                <div className="flex gap-3 items-start">
                  <div className={`p-2 rounded-md mt-0.5 ${isSelected ? "text-[#d12630] bg-[#d12630]/10" : "text-gray-500 bg-[#0e1013]"}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs text-white font-bold flex items-center gap-2">
                      {part.title}
                      <span className="text-[9px] text-[#f5a623] font-bold tracking-normal">
                        (+{part.hp} HP)
                      </span>
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-1 leading-normal font-sans">
                      {part.description}
                    </p>
                  </div>
                </div>

                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 mt-1 ${
                  isSelected ? "border-[#d12630] bg-[#d12630]" : "border-neutral-700 bg-transparent"
                }`}>
                  {isSelected && <Check size={10} className="text-white stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-[#0c0e12] border border-[#1b1e24] rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.01] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:10px_10px]" />

        <div className="relative z-10 space-y-6">
          <h3 className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            STAGE_SPEC_SHEET
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 pb-4 border-b border-[#1b1e24]">
              <div>
                <span className="text-[8px] text-gray-500 uppercase block">TUNED OUTPUT</span>
                <span className="text-2xl font-black text-white text-glow-blue leading-none">
                  {totalHp}
                </span>
                <span className="text-[10px] text-gray-400 font-bold ml-1">BHP</span>
              </div>
              <div>
                <span className="text-[8px] text-gray-500 uppercase block">MAX TORQUE</span>
                <span className="text-2xl font-black text-[#f5a623] text-glow-amber leading-none">
                  {totalTorque}
                </span>
                <span className="text-[10px] text-gray-400 font-bold ml-1">Nm</span>
              </div>
            </div>

            <div>
              <span className="text-[8px] text-gray-400 uppercase block">ESTIMATED FEE</span>
              <span className="text-3xl font-black text-white tracking-tight">
                ${totalCost.toLocaleString()}
              </span>
              <span className="text-[10px] text-gray-400 ml-2">USD</span>
            </div>

            <div className="border-t border-[#1b1e24] pt-4">
              <span className="text-[8px] text-gray-400 uppercase block">ESTIMATED BUILD TIME</span>
              <span className="text-2xl font-black text-[#d12630] tracking-tight">
                ~{totalWeeks}
              </span>
              <span className="text-xs text-gray-400 ml-1">Weeks</span>
            </div>
            
            <div className="border-t border-[#1b1e24] pt-4 text-[10px] text-gray-400 space-y-1 font-sans">
              <div className="flex justify-between">
                <span>Selected Upgrades:</span>
                <span className="text-white font-mono font-bold">{selectedIds.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Warranty Status:</span>
                <span className="text-emerald-500 font-bold uppercase font-mono text-[9px]">APPROVED</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleApplyScope}
          className="relative mt-8 w-full py-3 bg-[#d12630] text-white font-bold rounded-lg hover:bg-[#b01e26] transition-colors cursor-pointer text-xs text-center flex items-center justify-center gap-2 group z-10 font-mono shadow-[0_4px_15px_rgba(209,38,48,0.2)]"
        >
          Inject Upgrades into Telemetry
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
}
