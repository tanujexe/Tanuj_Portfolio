import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Clock, 
  User, 
  FileText, 
  Zap, 
  Settings, 
  Github, 
  Linkedin,
  Instagram
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PitCrewSection({ isBooted }) {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [projectBrief, setProjectBrief] = useState("");
  const [selectedScope, setSelectedScope] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSlideUnlocked, setIsSlideUnlocked] = useState(false);
  const [formLogs, setFormLogs] = useState(["[READY] Telemetry gateway online. Awaiting system config."]);

  useEffect(() => {
    if (!senderName && !senderEmail && !projectBrief) return;
    
    const latestLogs = [];
    if (senderName) {
      latestLogs.push(`[INPUT] Driver Name mapped: "${senderName}"`);
    }
    if (senderEmail) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail);
      latestLogs.push(isValidEmail ? `[INPUT] Driver Email validation: OK` : `[WARN] Driver Email syntax invalid...`);
    }
    if (projectBrief) {
      latestLogs.push(`[UPGRADE] Telemetry brief compile length: ${projectBrief.length} chars.`);
    }

    setFormLogs((prev) => {
      const filtered = latestLogs.filter(log => !prev.includes(log));
      if (filtered.length === 0) return prev;
      return [...filtered, ...prev].slice(0, 4);
    });
  }, [senderName, senderEmail, projectBrief]);

  useEffect(() => {
    if (!isBooted) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo("#pit-crew .crew-header > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#pit-crew",
          start: "top 80%"
        }
      }
    );

    gsap.fromTo("#pit-crew .configurator-box, #pit-crew .payload-card",
      { opacity: 0, scale: 0.96, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#pit-crew .grid",
          start: "top 85%"
        }
      }
    );
  }, [isBooted]);

  const handleScopeInjection = (scopeSummary) => {
    setSelectedScope(scopeSummary);
    setProjectBrief((prev) => 
      prev ? `${prev}\n\n[Tuning Spec]: ${scopeSummary}` : `[Tuning Spec]: ${scopeSummary}`
    );
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!senderName || !senderEmail) return;
    setIsSubmitting(true);
    setFormLogs((prev) => [
      `[COMMIT] Transmitting telemetry package to gateway...`,
      ...prev.slice(0, 3)
    ]);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setIsSlideUnlocked(false);
      setFormLogs((prev) => [
        `[SUCCESS] Payload dispatched. Response: 200 OK. Confirmation: 0x01`,
        ...prev.slice(0, 3)
      ]);
      
      const subject = encodeURIComponent(`Portfolio Tuning Brief from ${senderName}`);
      const body = encodeURIComponent(`Driver Name: ${senderName}\nDriver Email: ${senderEmail}\n\nSpecs Brief:\n${projectBrief}`);
      window.location.href = `mailto:tanujagrawal1432@gmail.com?subject=${subject}&body=${body}`;

      setTimeout(() => {
        setSubmitSuccess(false);
        setSenderName("");
        setSenderEmail("");
        setProjectBrief("");
        setSelectedScope("");
        setFormLogs(["[READY] Telemetry gateway online. Awaiting system config."]);
      }, 5000);
    }, 2000);
  };

  return (
    <section id="pit-crew" className="pt-12 pb-4 border-t border-[#1b1e24] relative scroll-mt-20">
      <div className="mb-16 crew-header">
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          Wana ride with me 
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm max-w-xl mt-2 font-sans leading-relaxed">
          Initiate connection parameters and transmit your wonder full idea directly to my local gateway using below form or with contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#0e1013] border border-[#1b1e24] rounded-xl p-4 font-mono text-xs relative overflow-hidden flex flex-col justify-between min-h-[120px]">
          <div className="absolute top-0 left-0 w-1 bg-[#FF2D2D] h-full" />
          <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold uppercase tracking-wider">
            <span>COMMS_FREQUENCY</span>
            <span className="flex items-center gap-1 text-[#FF2D2D] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D2D] animate-pulse" />
              LIVE
            </span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white tracking-tight">84.4</span>
            <span className="text-gray-500 font-bold text-[9px]">MHz</span>
          </div>
          <div className="mt-2 text-[8px] text-gray-500 font-bold uppercase">SECURE_SSL_STATION</div>
        </div>

        <div className="bg-[#0e1013] border border-[#1b1e24] rounded-xl p-4 font-mono text-xs relative overflow-hidden flex flex-col justify-between min-h-[120px]">
          <div className="absolute top-0 left-0 w-1 bg-[#1c69d4] h-full" />
          <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold uppercase tracking-wider">
            <span>PING_LATENCY</span>
            <span className="text-[#1c69d4] font-bold">AVERAGE</span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white tracking-tight">14</span>
            <span className="text-gray-500 font-bold text-[9px]">ms</span>
          </div>
          <div className="mt-2 text-[8px] text-emerald-400 font-bold uppercase">OPTIMAL_LINK_SPEED</div>
        </div>

        <div className="bg-[#0e1013] border border-[#1b1e24] rounded-xl p-4 font-mono text-xs relative overflow-hidden flex flex-col justify-between min-h-[120px]">
          <div className="absolute top-0 left-0 w-1 bg-[#00A3C4] h-full" />
          <div className="flex justify-between items-center text-[9px] text-gray-500 font-bold uppercase tracking-wider">
            <span>IGNITION_IGNITER</span>
            <span className="text-emerald-400 font-bold">READY</span>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white tracking-tight">0x01</span>
            <span className="text-gray-500 font-bold text-[9px]">HEX</span>
          </div>
          <div className="mt-2 text-[8px] text-gray-500 font-bold uppercase">AWAITING_LAUNCH_SIGNAL</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch grid">
        <div className="lg:col-span-5 bg-[#0e1013] border border-[#1b1e24] rounded-xl p-6 font-mono shadow-xl flex flex-col justify-between min-h-[350px] relative text-left">
          <div className="absolute top-0 left-0 w-1 bg-[#FF2D2D] h-full" />
          
          <div className="space-y-6 text-left">
            <div>
              <span className="text-[8px] text-gray-500 font-bold uppercase block tracking-wider mb-1">COCKPIT_DIRECT_CHANNELS</span>
              <h3 className="text-base font-bold text-white uppercase">Symmetrical Links</h3>
              <p className="text-[10px] text-gray-400 mt-2 leading-relaxed font-sans">
                Establish a telemetry link through classic channels, or download my spec sheet blueprint directly to review.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  label: "EMAIL_GATEWAY",
                  val: "tanujagrawal1432@gmail.com",
                  freq: "98.4 MHz",
                  href: "mailto:tanujagrawal1432@gmail.com",
                  icon: Mail,
                },
                {
                  label: "GITHUB_CLUSTER",
                  val: "github.com/tanujexe",
                  freq: "102.1 MHz",
                  href: "https://github.com/tanujexe",
                  icon: Github,
                },
                {
                  label: "LINKEDIN_GATEWAY",
                  val: "linkedin.com/in/tanuj-agrawal-19b609378",
                  freq: "105.7 MHz",
                  href: "https://www.linkedin.com/in/tanuj-agrawal-19b609378/",
                  icon: Linkedin,
                },
                {
                  label: "INSTAGRAM_NODE",
                  val: "instagram.com/tanuj_agrawal.1",
                  freq: "106.9 MHz",
                  href: "https://www.instagram.com/tanuj_agrawal.1/",
                  icon: Instagram,
                },
                {
                  label: "SPEC_SHEET_RESUME",
                  val: "DOWNLOAD_RESUME.pdf",
                  freq: "107.5 MHz",
                  href: "/resume.pdf",
                  icon: FileText,
                }
              ].map((chan, idx) => {
                const Icon = chan.icon;
                return (
                  <a 
                    key={idx}
                    href={chan.href}
                    target={chan.href.startsWith("http") || chan.href.endsWith(".pdf") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center justify-between p-3 bg-[#0c0e12] border border-[#1b1e24] rounded-lg hover:border-[#FF2D2D] hover:bg-[#110507] hover:shadow-[0_0_15px_rgba(255,45,45,0.08)] transition-all duration-300 text-gray-400"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-[#0e1013] border border-[#1b1e24] text-[#FF2D2D] group-hover:text-white group-hover:bg-[#FF2D2D]/10 group-hover:border-[#FF2D2D]/30 transition-all duration-300">
                        <Icon size={16} />
                      </div>
                      <div>
                        <span className="text-[8px] text-gray-500 block uppercase font-black tracking-wider">{chan.label}</span>
                        <span className="text-xs font-bold text-white group-hover:text-[#FF2D2D] transition-colors duration-300">{chan.val}</span>
                      </div>
                    </div>
                    <div className="text-right font-mono text-[9px] text-gray-600 group-hover:text-gray-400 transition-colors">
                      <span className="block font-black">{chan.freq}</span>
                      <span className="text-[7px] text-[#FF2D2D] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase font-bold">CONNECT</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-[#0e1013] border border-[#1b1e24] rounded-xl overflow-hidden font-mono shadow-xl relative payload-card flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-1 bg-[#FF2D2D] h-full" />
          
          <div className="bg-[#0c0e12] border-b border-[#1b1e24] px-4 py-3 flex justify-between items-center text-[10px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF2D2D] animate-pulse" />
              <span className="text-white font-bold tracking-wider">ECU_PAYLOAD_WRITER.SYS</span>
            </div>
            <span className="text-gray-500 font-bold uppercase tracking-wider">TYPE: JSON_DIAGNOSTICS</span>
          </div>

          <form onSubmit={handleContactSubmit} className="p-6 space-y-6 flex-1 flex flex-col justify-between">
            <div className="space-y-4 text-xs text-left">
              <div className="text-gray-600 font-mono">{"{"}</div>
              
              <div className="pl-6 flex flex-wrap items-center gap-2">
                <span className="text-[#FF2D2D] font-bold">"Name"</span>
                <span className="text-gray-600">:</span>
                <input 
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="&quot;UserName&quot;"
                  required
                  className="bg-[#0c0e12] border border-[#1b1e24] px-3 py-1.5 rounded text-white focus:outline-none focus:border-[#FF2D2D] focus:ring-1 focus:ring-[#FF2D2D]/30 text-xs font-mono w-full sm:w-80 transition-all"
                />
              </div>

              <div className="pl-6 flex flex-wrap items-center gap-2">
                <span className="text-[#FF2D2D] font-bold">"Email"</span>
                <span className="text-gray-600">:</span>
                <input 
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="&quot;user@email.com&quot;"
                  required
                  className="bg-[#0c0e12] border border-[#1b1e24] px-3 py-1.5 rounded text-white focus:outline-none focus:border-[#FF2D2D] focus:ring-1 focus:ring-[#FF2D2D]/30 text-xs font-mono w-full sm:w-80 transition-all"
                />
              </div>

              <div className="pl-6 flex flex-wrap items-start gap-2">
                <span className="text-[#FF2D2D] font-bold mt-1.5">"ProjectDetails"</span>
                <span className="text-gray-600">:</span>
                <textarea 
                  value={projectBrief}
                  onChange={(e) => setProjectBrief(e.target.value)}
                  placeholder="&quot;Describe project specifications, target timeline, or features you want to build...&quot;"
                  rows={5}
                  className="flex-1 bg-[#0c0e12] border border-[#1b1e24] p-3 rounded text-white focus:outline-none focus:border-[#FF2D2D] focus:ring-1 focus:ring-[#FF2D2D]/30 text-xs font-mono resize-none min-w-[200px] transition-all leading-relaxed"
                />
              </div>

              <div className="text-gray-600 font-mono">{"}"}</div>
            </div>

            {/* <div className="bg-[#07080a] border border-[#1b1e24]/70 rounded-lg p-4 font-mono text-[10px] space-y-2">
              <div className="flex justify-between items-center text-gray-500 border-b border-[#1b1e24]/50 pb-1.5 uppercase font-black tracking-wider">
                <span>LIVE_LOGGER_TERMINAL</span>
                <span className="text-emerald-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  SYS_OK
                </span>
              </div>
              <div className="space-y-1.5 min-h-[72px] flex flex-col justify-end text-left select-none">
                {formLogs.map((log, index) => {
                  const isError = log.includes("[WARN]") || log.includes("[SECURITY]");
                  const isSuccess = log.includes("[SUCCESS]");
                  const color = isError 
                    ? "text-[#FF2D2D]" 
                    : isSuccess 
                    ? "text-emerald-400 font-bold" 
                    : "text-gray-400";
                  return (
                    <div key={index} className={`font-mono leading-normal tracking-wide ${color}`}>
                      {log}
                    </div>
                  );
                })}
              </div>
            </div> */}

            <div className="flex flex-col md:flex-row items-center gap-6 justify-between pt-5 border-t border-[#1b1e24]/60">
              <div className="w-full md:flex-1">
                <div className="relative w-full max-w-[260px] h-12 bg-[#0c0e12] border border-[#1b1e24] rounded-lg overflow-hidden flex items-center p-1.5">
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 200 }}
                    dragElastic={0.05}
                    dragMomentum={false}
                    onDragEnd={(event, info) => {
                      if (info.offset.x >= 160) {
                        setIsSlideUnlocked(true);
                        setFormLogs((prev) => [
                          `[SECURITY] Safety lock disengaged. Ignition ARMED.`,
                          ...prev.slice(0, 3),
                        ]);
                      } else {
                        setIsSlideUnlocked(false);
                      }
                    }}
                    animate={{ x: isSlideUnlocked ? 200 : 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="h-full aspect-square bg-[#FF2D2D] rounded-md cursor-grab active:cursor-grabbing flex items-center justify-center text-white shadow-[0_0_12px_rgba(255,45,45,0.4)] z-10"
                  >
                    <Zap size={14} className={isSlideUnlocked ? "text-white" : "text-white animate-pulse"} />
                  </motion.div>
                  
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-[9px] font-black uppercase tracking-widest text-center pl-10">
                    {isSlideUnlocked ? (
                      <span className="text-[#FF2D2D] font-bold animate-pulse">IGNITION SYSTEM ARMED</span>
                    ) : (
                      <span className="text-gray-500">SLIDE TO IGNITE SAFETY</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative shrink-0">
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !isSlideUnlocked}
                  whileHover={isSlideUnlocked ? { scale: 1.05 } : {}}
                  whileTap={isSlideUnlocked ? { scale: 0.95 } : {}}
                  className={`relative w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center text-center font-mono select-none transition-all duration-300 ${
                    !isSlideUnlocked 
                      ? "bg-[#0a0c0e]/80 border-gray-800 text-gray-600 cursor-not-allowed"
                      : submitSuccess 
                      ? "bg-emerald-950 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
                      : "bg-[#140204] border-[#FF2D2D] text-white hover:bg-[#200307] hover:shadow-[0_0_25px_rgba(255,45,45,0.4)] cursor-pointer"
                  }`}
                >
                  <span className="text-[7px] text-[#f5a623] tracking-wider uppercase font-bold text-glow-amber">START</span>
                  <span className="text-xs font-black tracking-tight my-0.5 uppercase">ENGINE</span>
                  <span className="text-[7px] text-gray-400 tracking-wider uppercase font-bold">STOP</span>
                  <div className="w-5 h-[2px] m-sport-strip mt-1" />
                </motion.button>
              </div>
            </div>

            {submitSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 mt-4 bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs rounded-lg text-left"
              >
                ✓ Telemetry package transmitted successfully. Dispatch confirmation received.
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
