import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Github, 
  Check, 
  Settings, 
  Zap, 
  Shield, 
  Gauge 
} from "lucide-react";
import { BUILDS, VENDORHUB_ITEMS, symptomsData } from "../../constants/builds";

export default function BuildInspectorModal({ isOpen, selectedBuild, onClose }) {
  // VendorHub Cart Tuning state
  const [selectedVHCategory, setSelectedVHCategory] = useState("All");
  const [vhCartCount, setVhCartCount] = useState(0);
  const [vhTotalHpBoost, setVhTotalHpBoost] = useState(0);
  const [vhLogs, setVhLogs] = useState(["[TELEMETRY] ECU diagnostics ready. select * from catalog;"]);
  const [vhQueryTime, setVhQueryTime] = useState(3.5);

  // TornadoGym / Lap Scheduler state
  const [activeTrackTime, setActiveTrackTime] = useState("10:00 AM");
  const [trackBookings, setTrackBookings] = useState({
    "08:00 AM": 5,
    "10:00 AM": 8,
    "05:00 PM": 3
  });
  const [trackUserBooked, setTrackUserBooked] = useState(false);

  // Nirogyasathi (AI Health App) state
  const [nsSymptom, setNsSymptom] = useState("headache");
  const [nsStatus, setNsStatus] = useState("idle"); // idle, analyzing, done
  const [nsLogs, setNsLogs] = useState(["[INTEGRITY] AI Diagnostic Engine standby. Ready for input."]);
  const [nsConsultBooked, setNsConsultBooked] = useState(false);
  const [nsConfidence, setNsConfidence] = useState(0);

  // Reset local states when changing target build
  useEffect(() => {
    if (isOpen) {
      setSelectedVHCategory("All");
      setVhCartCount(0);
      setVhTotalHpBoost(0);
      setVhLogs(["[TELEMETRY] ECU diagnostics ready. select * from catalog;"]);
      setVhQueryTime(3.5);

      setActiveTrackTime("10:00 AM");
      setTrackBookings({
        "08:00 AM": 5,
        "10:00 AM": 8,
        "05:00 PM": 3
      });
      setTrackUserBooked(false);

      setNsSymptom("headache");
      setNsStatus("idle");
      setNsLogs(["[INTEGRITY] AI Diagnostic Engine standby. Ready for input."]);
      setNsConsultBooked(false);
      setNsConfidence(0);
    }
  }, [isOpen, selectedBuild]);

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || selectedBuild === null || selectedBuild === undefined || !BUILDS[selectedBuild]) return null;

  const currentBuildData = BUILDS[selectedBuild];

  // VendorHub Action Handlers
  const handleVHCategoryFilter = (category) => {
    const startTime = performance.now();
    setSelectedVHCategory(category);
    setTimeout(() => {
      const duration = (performance.now() - startTime).toFixed(1);
      setVhQueryTime(Number(duration) + 1.2);
      setVhLogs((prev) => [
        `[QUERY] select * from products where category = '${category}';`,
        ...prev.slice(0, 3)
      ]);
    }, 80);
  };

  const handleVHAddToCart = (item) => {
    setVhCartCount((prev) => prev + 1);
    setVhTotalHpBoost((prev) => prev + item.hpBoost);
    setVhLogs((prev) => [
      `[COMMIT] insert into upgrades_cart (part_id, hp_boost) values (${item.id}, ${item.hpBoost});`,
      ...prev.slice(0, 3)
    ]);
  };

  // TornadoGym Action Handlers
  const handleTrackBookingCommit = () => {
    if (trackUserBooked) return;
    setTrackUserBooked(true);
    setTrackBookings((prev) => ({
      ...prev,
      [activeTrackTime]: prev[activeTrackTime] + 1
    }));
  };

  // Nirogyasathi Action Handlers
  const handleRunAIDiagnosis = (symptomKey) => {
    setNsStatus("analyzing");
    setNsConsultBooked(false);
    setNsSymptom(symptomKey);
    setNsLogs([
      `[INPUT] User reported: ${symptomKey === 'headache' ? 'Throbbing temporal headache' : symptomKey === 'breath' ? 'Shortness of breath' : 'Joint stiffness'}`,
      `[PIPELINE] Initializing PyTorch clinical model. Loading weights...`
    ]);
    
    let logIndex = 0;
    const details = symptomsData[symptomKey];
    
    const interval = setInterval(() => {
      if (logIndex < details.logs.length) {
        setNsLogs((prev) => [details.logs[logIndex], ...prev]);
        logIndex++;
      } else {
        clearInterval(interval);
        setNsStatus("done");
        setNsConfidence(details.confidence);
        setNsLogs((prev) => [`[SUCCESS] Diagnostic match found. Specialty: ${details.specialty}. Recommendation generated.`, ...prev]);
      }
    }, 450);
  };

  const filteredVHProducts = selectedVHCategory === "All"
    ? VENDORHUB_ITEMS
    : VENDORHUB_ITEMS.filter((item) => item.category === selectedVHCategory);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#060709]/95 backdrop-blur-lg overflow-y-auto"
        onClick={onClose}
      >
        <div 
          className="relative w-full max-w-5xl bg-[#0c0e12] border border-white/[0.08] rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto font-mono text-xs flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex justify-between items-center p-5 border-b border-white/[0.08] bg-[#0c0e12]/85 sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-4 rounded-sm animate-pulse" style={{ backgroundColor: currentBuildData.color }} />
              <span className="text-white font-extrabold uppercase tracking-widest text-sm">
                SPECIFICATION_BROCHURE // {currentBuildData.name}
              </span>
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1.5 border border-neutral-700 text-gray-400 hover:text-white hover:border-white rounded font-mono text-[10px] font-bold uppercase transition-all cursor-pointer"
            >
              CLOSE_INSPECTOR [ESC]
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT SIDE: PREVIEW & INTERACTIVE EMULATOR */}
              <div className="lg:col-span-7 space-y-6">
                {/* Image Viewport styled as CAD Blueprint */}
                <div className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-neutral-950 aspect-[16/10] group shadow-inner">
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] z-10" />
                  <div className="absolute top-2 left-2 text-[8px] text-white/30 z-10 select-none">GRID // CAD_VIEWPORT_2D</div>
                  <div className="absolute bottom-2 right-2 text-[8px] text-white/30 z-10 select-none">SCALE // 1:1.12</div>
                  
                  <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/20 z-10" />
                  <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/20 z-10" />
                  <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/20 z-10" />
                  <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/20 z-10" />

                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-20" />
                  <img
                    src={currentBuildData.image}
                    alt={currentBuildData.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 filter brightness-95 group-hover:brightness-100"
                  />
                </div>

                {/* Direct action links */}
                <div className="flex gap-4">
                  <a
                    href={currentBuildData.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-3 border text-white font-bold rounded transition-all text-center flex-1 flex items-center justify-center gap-1.5 uppercase font-mono text-[10px] shadow-sm relative overflow-hidden group/btn"
                    style={{
                      borderColor: `${currentBuildData.color}60`,
                      backgroundColor: `${currentBuildData.color}12`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = currentBuildData.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${currentBuildData.color}12`;
                    }}
                  >
                    <span>ENGAGE_LIVE_DEMO</span>
                    <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                  <a
                    href={currentBuildData.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-3 border border-neutral-800 hover:border-neutral-500 text-gray-300 hover:text-white font-bold rounded transition-all text-center flex-1 flex items-center justify-center gap-1.5 uppercase font-mono text-[10px] bg-[#0c0e12]"
                  >
                    <span>PULL_GITHUB_REPO</span>
                    <Github size={12} />
                  </a>
                </div>

                {/* Embedded Interactive System Emulator */}
                <div className="bg-[#0c0d10] border border-white/[0.06] rounded-xl p-5 shadow-2xl text-left relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: currentBuildData.color }} />
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest block mb-4">
                    SYSTEM_INTEGRITY_EMULATOR.cfg // ACTIVE_MODULE
                  </span>
                  
                  {selectedBuild === 0 ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 border-b border-white/[0.06] pb-2 justify-start">
                        {["All", "Powertrain", "Exhaust", "Chassis"].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleVHCategoryFilter(cat)}
                            className={`px-2 py-1 rounded text-[8px] uppercase border cursor-pointer transition-colors ${
                              selectedVHCategory === cat
                                ? "border-[#FF2D2D] text-[#FF2D2D] bg-[#FF2D2D]/5"
                                : "border-transparent text-gray-500 hover:text-white"
                            }`}
                            style={selectedVHCategory === cat ? { borderColor: currentBuildData.color, color: currentBuildData.color, backgroundColor: `${currentBuildData.color}12` } : {}}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[9px]">
                        {filteredVHProducts.slice(0, 2).map((item) => (
                          <div key={item.id} className="p-2 bg-[#08090b] border border-white/[0.06] rounded flex flex-col justify-between">
                            <div>
                              <h5 className="font-extrabold text-white truncate">{item.title}</h5>
                              <span className="text-[8px] text-gray-500 font-mono">Price: ${item.price}</span>
                            </div>
                            <button
                              onClick={() => handleVHAddToCart(item)}
                              className="mt-2 py-1 bg-white/[0.04] hover:bg-[#FF2D2D] text-white rounded font-mono text-[8px] border-0 cursor-pointer transition-colors"
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = currentBuildData.color}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)'}
                            >
                              + INSTALL PART (+{item.hpBoost} HP)
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="text-[8px] text-emerald-500 flex justify-between items-center border-t border-white/[0.06] pt-2 font-mono">
                        <span>ECU UPGRADE CART STATUS: {vhCartCount} parts mounted</span>
                        <span className="font-extrabold text-[#FF2D2D]" style={{ color: currentBuildData.color }}>BHP GAIN: +{vhTotalHpBoost} HP</span>
                      </div>
                    </div>
                  ) : selectedBuild === 1 ? (
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        {[{ time: "08:00 AM", track: "Nürburgring Nordschleife" }, { time: "10:00 AM", track: "Spa-Francorchamps" }].map((item) => (
                          <button
                            key={item.time}
                            onClick={() => {
                              setActiveTrackTime(item.time);
                              setTrackUserBooked(false);
                            }}
                            className={`w-full text-left p-2 rounded border flex items-center justify-between font-mono text-[9px] cursor-pointer ${
                              activeTrackTime === item.time
                                ? "border-[#FF2D2D] bg-[#FF2D2D]/5"
                                : "border-white/[0.06] hover:border-neutral-800"
                            }`}
                            style={activeTrackTime === item.time ? { borderColor: currentBuildData.color, backgroundColor: `${currentBuildData.color}12` } : {}}
                          >
                            <span className="text-white font-bold">{item.track}</span>
                            <span className="text-gray-400">{trackBookings[item.time]}/10 Laps Booked</span>
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-2 items-center justify-between border-t border-white/[0.06] pt-2">
                        <span className="text-[8px] text-gray-500 font-mono">CAPACITY: {(trackBookings[activeTrackTime] / 10) * 100}%</span>
                        <button
                          onClick={handleTrackBookingCommit}
                          disabled={trackUserBooked || trackBookings[activeTrackTime] >= 10}
                          className={`px-3 py-1.5 rounded text-[8px] font-bold border-0 cursor-pointer transition-colors ${
                            trackUserBooked
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "text-white hover:opacity-90"
                          }`}
                          style={!trackUserBooked ? { backgroundColor: currentBuildData.color } : {}}
                        >
                          {trackUserBooked ? "✓ BOOKING_CONFIRMED" : "BOOK LAP SLOT"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 border-b border-white/[0.06] pb-2 justify-start items-center">
                        <span className="text-[8px] text-gray-500 uppercase font-bold mr-1">Report Symptom:</span>
                        {[
                          { key: "headache", label: "Migraine" },
                          { key: "breath", label: "Asthma" },
                          { key: "joint", label: "Arthritis" }
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => {
                              if (nsStatus !== "analyzing") {
                                setNsSymptom(item.key);
                                setNsConsultBooked(false);
                                setNsStatus("idle");
                                setNsLogs([`[INTEGRITY] Ready to analyze symptom: ${item.label}`]);
                              }
                            }}
                            disabled={nsStatus === "analyzing"}
                            className={`px-2 py-1 rounded text-[8px] uppercase border cursor-pointer transition-all duration-200 ${
                              nsSymptom === item.key
                                ? "border-[#00A3C4] text-[#00A3C4] bg-[#00A3C4]/5 font-bold"
                                : "border-transparent text-gray-500 hover:text-white disabled:opacity-50"
                            }`}
                            style={nsSymptom === item.key ? { borderColor: currentBuildData.color, color: currentBuildData.color, backgroundColor: `${currentBuildData.color}12` } : {}}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      <div className="bg-[#07090b] border border-white/[0.04] p-3 rounded-lg font-mono text-[9px] h-[95px] overflow-y-auto flex flex-col-reverse text-left scrollbar-thin scrollbar-thumb-white/10">
                        <div className="text-gray-400 space-y-1">
                          {nsLogs.map((log, idx) => (
                            <div key={idx} className={log.startsWith("[SUCCESS]") ? "text-emerald-400" : log.startsWith("[INPUT]") ? "text-white font-bold" : "text-gray-500"}>
                              {log}
                            </div>
                          ))}
                          {nsStatus === "analyzing" && (
                            <div className="text-[#00A3C4] animate-pulse" style={{ color: currentBuildData.color }}>Running transformer attention inference...</div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 items-center justify-between border-t border-white/[0.06] pt-2">
                        {nsStatus === "done" ? (
                          <div className="text-left space-y-0.5">
                            <div className="text-[#00A3C4] font-extrabold text-[9px] uppercase" style={{ color: currentBuildData.color }}>
                              MATCH: {symptomsData[nsSymptom].name} ({nsConfidence}% Confidence)
                            </div>
                            <div className="text-white text-[8px] font-mono">
                              {symptomsData[nsSymptom].doctor} | ETA: {symptomsData[nsSymptom].eta}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[8px] text-gray-500 uppercase font-semibold">
                            {nsStatus === "analyzing" ? "CLASSIFIER INFERENCE ACTIVE..." : "AWAITING INFERENCE RUN"}
                          </span>
                        )}

                        {nsStatus === "done" ? (
                          <button
                            onClick={() => setNsConsultBooked(true)}
                            disabled={nsConsultBooked}
                            className={`px-3 py-1.5 rounded text-[8px] font-bold border-0 cursor-pointer transition-colors ${
                              nsConsultBooked
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "text-white hover:opacity-90"
                            }`}
                            style={!nsConsultBooked ? { backgroundColor: currentBuildData.color } : {}}
                          >
                            {nsConsultBooked ? "✓ CONSULT_SCHEDULED" : "BOOK TELECONSULTATION"}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRunAIDiagnosis(nsSymptom)}
                            disabled={nsStatus === "analyzing"}
                            className="px-3 py-1.5 rounded text-[8px] font-bold border-0 text-white cursor-pointer hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: currentBuildData.color }}
                          >
                            {nsStatus === "analyzing" ? "ANALYZING..." : "RUN AI INFERENCE"}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="lg:col-span-5 text-left space-y-5 font-mono">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold tracking-widest block uppercase" style={{ color: currentBuildData.color }}>TUNING_STATUS: {currentBuildData.status}</span>
                  <h4 className="text-2xl font-black text-white font-display uppercase tracking-tight">{currentBuildData.name}</h4>
                  <span className="text-[9px] text-gray-500 font-bold tracking-widest block">DIFFICULTY: {currentBuildData.difficulty}</span>
                </div>

                <div className="p-4 bg-[#0c0d10] border border-white/[0.06] rounded-xl space-y-1">
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">MISSION STATEMENT:</span>
                  <p className="text-xs text-gray-300 font-sans leading-relaxed">{currentBuildData.mission}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">CORE TECHNOLOGY:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentBuildData.techList.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-[#08090b] border border-white/[0.06] rounded text-[8px] text-white font-extrabold uppercase font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">TECHNICAL DATA MATRIX:</span>
                  <table className="w-full text-left border-collapse border border-white/[0.04] text-[10px] font-mono">
                    <tbody>
                      <tr className="border-b border-white/[0.04]">
                        <td className="p-2 text-gray-500 font-bold uppercase">ECU Class</td>
                        <td className="p-2 text-white">{currentBuildData.difficulty}</td>
                      </tr>
                      <tr className="border-b border-white/[0.04]">
                        <td className="p-2 text-gray-500 font-bold uppercase">Drivetrain Specs</td>
                        <td className="p-2 text-white">{currentBuildData.techStack}</td>
                      </tr>
                      <tr className="border-b border-white/[0.04]">
                        <td className="p-2 text-gray-500 font-bold uppercase">Lap Record</td>
                        <td className="p-2 text-white">{currentBuildData.lapStatus}</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-gray-500 font-bold uppercase">Tuning Index</td>
                        <td className="p-2 text-emerald-400 font-bold">NOMINAL (100% stable)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">ARCHITECTURE:</span>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">{currentBuildData.architecture}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">KEY FEATURES:</span>
                  <ul className="space-y-1.5 text-xs text-gray-300 font-sans">
                    {currentBuildData.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentBuildData.color }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/[0.06]">
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold uppercase tracking-wider block" style={{ color: currentBuildData.color }}>ENGINEERING CHALLENGE:</span>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed">{currentBuildData.challenge}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] text-emerald-500 font-bold uppercase tracking-wider block">DEVELOPER SOLUTION:</span>
                    <p className="text-xs text-gray-400 font-sans leading-relaxed">{currentBuildData.devSolution}</p>
                  </div>
                </div>

                <div className="space-y-2 mt-4 pt-3 border-t border-white/[0.06]">
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">DRIVETRAIN VERIFICATION GATES:</span>
                  <div className="grid grid-cols-2 gap-2 text-[9px]">
                    <div className="p-2 bg-[#0c0e12] border border-white/[0.04] rounded flex justify-between items-center">
                      <span className="text-gray-500">CODE_LINT</span>
                      <span className="text-emerald-400 font-bold">NOMINAL</span>
                    </div>
                    <div className="p-2 bg-[#0c0e12] border border-white/[0.04] rounded flex justify-between items-center">
                      <span className="text-gray-500">TESTS_PASSED</span>
                      <span className="text-emerald-400 font-bold">100%</span>
                    </div>
                    <div className="p-2 bg-[#0c0e12] border border-white/[0.04] rounded flex justify-between items-center">
                      <span className="text-gray-500">BUILD_COMPILE</span>
                      <span className="text-emerald-400 font-bold">SUCCESS</span>
                    </div>
                    <div className="p-2 bg-[#0c0e12] border border-white/[0.04] rounded flex justify-between items-center">
                      <span className="text-gray-500">CDN_EDGE_CACHE</span>
                      <span className="text-emerald-400 font-bold">ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
