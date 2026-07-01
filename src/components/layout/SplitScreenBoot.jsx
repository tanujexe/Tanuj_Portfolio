import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SplitScreenBoot({ onComplete }) {
  const [stage, setStage] = useState("ignition"); // ignition, diagnostics, acceleration
  const [logs, setLogs] = useState([]);
  const [gaugeValue, setGaugeValue] = useState(0);

  // Animation Refs
  const containerRef = useRef(null);
  const ignitionRef = useRef(null);
  const startButtonRef = useRef(null);
  const diagnosticRef = useRef(null);
  const progressBarRef = useRef(null);
  const logsContainerRef = useRef(null);
  const accelerationRef = useRef(null);
  const carRef = useRef(null);
  const speedLinesRef = useRef(null);

  const BOOT_LOGS = [
    "IGNITION DETECTED - TG_PERF_LAB.sys",
    "BOOTING TANUJ AGRAWAL PORTFOLIO CORE...",
    "MOUNTING FULL-STACK POWERTRAIN (MERN)...",
    "ARMING AI COGNITIVE NODES (NEURAL_NET)...",
    "TUNING CONFIG STABILIZERS...",
    "TWIN-TURBO V8 MOTORS ONLINE...",
    "DIAGNOSTICS: 100% HEALTHY... READY FOR LAUNCH"
  ];

  const handleIgnition = () => {
    if (!startButtonRef.current) return;

    // GSAP Button Press Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setStage("diagnostics");
      }
    });

    tl.to(startButtonRef.current, {
      scale: 0.9,
      duration: 0.08,
      ease: "power2.out"
    })
    .to(startButtonRef.current, {
      scale: 1.15,
      boxShadow: "0 0 60px rgba(209,38,48,0.8)",
      borderColor: "#f5a623",
      duration: 0.15,
      ease: "elastic.out(1, 0.3)"
    })
    .to(ignitionRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.inOut",
      delay: 0.1
    });
  };

  // Run diagnostics stage (gauge sweep and staggered logs)
  useEffect(() => {
    if (stage !== "diagnostics") return;

    // Ensure diagnostic view fades in smoothly
    gsap.fromTo(diagnosticRef.current, 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    );

    const sweepObj = { val: 0 };
    const timeline = gsap.timeline({
      onComplete: () => {
        // Smooth transition out of diagnostics to acceleration
        gsap.to(diagnosticRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => setStage("acceleration")
        });
      }
    });

    // 1. Non-linear RPM Gauge Sweep
    timeline.to(sweepObj, {
      val: 100,
      duration: 2.0,
      ease: "power3.inOut",
      onUpdate: () => {
        setGaugeValue(sweepObj.val);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${sweepObj.val}%`;
        }
      }
    });

    // 2. Stagger log entry appends to match the sweep timeline
    BOOT_LOGS.forEach((log, index) => {
      timeline.to({}, {
        duration: index === 0 ? 0.15 : 0.22 + Math.random() * 0.1,
        onComplete: () => {
          setLogs((prev) => [...prev, log]);
        }
      }, index * 0.25); // staggered insertion times
    });

  }, [stage]);

  useEffect(() => {
    if (stage !== "acceleration") return;

    // Fade in acceleration view
    gsap.fromTo(accelerationRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.3 }
    );

    // Speed lines rapid drift
    const speedLines = speedLinesRef.current ? speedLinesRef.current.children : [];
    if (speedLines.length > 0) {
      gsap.to(speedLines, {
        x: "-150%",
        duration: 0.25,
        stagger: {
          each: 0.05,
          repeat: -1
        },
        ease: "none"
      });
    }

    // Exhaust particles emission timeline
    const particles = document.querySelectorAll(".exhaust-particle");
    particles.forEach((p, idx) => {
      gsap.fromTo(p,
        { scale: 0.4, opacity: 0.8, x: 0, y: 0 },
        {
          scale: 4.0,
          opacity: 0,
          x: -120 - Math.random() * 80,
          y: Math.random() * 24 - 12,
          duration: 0.6,
          repeat: -1,
          delay: idx * 0.08,
          ease: "power1.out"
        }
      );
    });

    // Realistic drag strip car launch physics simulation
    // Stage A: Launch pre-stage vibration/tyre spin squat (0.4s)
    // Stage B: Massive acceleration shooting off the screen (ease-in-out curve)
    if (carRef.current) {
      const carTimeline = gsap.timeline({
        onComplete: () => {
          // Fade out whole boot screen and transition to main app
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: onComplete
          });
        }
      });

      carTimeline
        // 1. Pre-stage tire squat (vibrate and move slightly backward)
        .fromTo(carRef.current,
          { x: -550, scale: 0.82 },
          { x: -555, scale: 0.80, duration: 0.45, ease: "power1.inOut" }
        )
        // Subtle vertical tire-shredding vibration
        .to(carRef.current, { 
          y: "-=4", 
          duration: 0.04, 
          repeat: 9, 
          yoyo: true, 
          ease: "none" 
        }, "<")
        // 2. Launch! Rockets off the screen
        .to(carRef.current, {
          x: 950,
          scale: 1.25,
          filter: "blur(10px)",
          duration: 1.8,
          ease: "power4.in"
        });
    }

  }, [stage]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060709] font-mono text-xs text-white select-none overflow-hidden"
    >
      {/* Carbon fiber grid lines background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#1c69d4_1px,transparent_1px),linear-gradient(to_bottom,#1c69d4_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      {/* STAGE 1: IGNITION */}
      {stage === "ignition" && (
        <div 
          ref={ignitionRef}
          className="flex flex-col items-center justify-center space-y-6 z-10"
        >
          <div className="flex gap-1 mb-2">
            <span className="w-2 h-4 bg-[#1c69d4] rounded-l-sm" />
            <span className="w-2 h-4 bg-[#002878]" />
            <span className="w-2 h-4 bg-[#d12630] rounded-r-sm animate-pulse" />
          </div>
          
          <h2 className="text-[10px] text-gray-500 tracking-[0.25em] uppercase font-bold text-center">
            M5 COMPETITION COCKPIT
          </h2>

          <button
            ref={startButtonRef}
            onClick={handleIgnition}
            className="w-36 h-36 rounded-full border-4 border-[#d12630] bg-[#0f0204] hover:bg-[#200307] text-white flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 shadow-[0_0_30px_rgba(209,38,48,0.3)] hover:shadow-[0_0_55px_rgba(209,38,48,0.6)]"
          >
            <span className="text-[8px] text-[#f5a623] tracking-wider uppercase font-bold text-glow-amber">START</span>
            <span className="text-sm font-black tracking-tight my-0.5 uppercase">ENGINE</span>
            <span className="text-[8px] text-gray-400 tracking-wider uppercase font-bold">STOP</span>
            
            <div className="w-6 h-[2.5px] m-sport-strip mt-1" />
          </button>

          <span className="text-[9px] text-gray-500 uppercase tracking-widest animate-pulse font-bold">
            Press Engine Ignition to Load System
          </span>
        </div>
      )}

      {/* STAGE 2: DIAGNOSTICS */}
      {stage === "diagnostics" && (
        <div 
          ref={diagnosticRef}
          className="w-full max-w-xl px-6 py-8 relative z-10"
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#1c69d4]/60" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#1c69d4]/60" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#d12630]/60" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#d12630]/60" />

          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#1b1e24] pb-3 mb-6 text-[10px] text-gray-500 tracking-wider">
            <span className="text-white font-bold">ECU COCKPIT TELEMETRY TEST</span>
            <span className="text-[#f5a623] font-bold text-glow-amber">STAGE: ACTIVE_REV_TEST</span>
          </div>

          {/* Telemetry Gauge Sweep Bar */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>RPM SYSTEM SELF-TEST</span>
              <span className={gaugeValue >= 90 ? "text-[#d12630] font-bold text-glow-red animate-pulse" : "text-white"}>
                {Math.round(gaugeValue * 80)} RPM
              </span>
            </div>
            <div className="w-full bg-[#1b1e24] h-2.5 rounded-sm overflow-hidden border border-[#1b1e24]">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-[#1c69d4] via-[#f5a623] to-[#d12630]"
                style={{ width: "0%" }}
              />
            </div>
          </div>

          {/* Logs */}
          <div 
            ref={logsContainerRef}
            className="space-y-2.5 min-h-[160px] text-gray-300"
          >
            {logs.map((log, index) => (
              <div
                key={index}
                className="flex items-start diag-log-line"
              >
                <span className="text-[#d12630] mr-2">&gt;</span>
                <span>{log}</span>
                {index === logs.length - 1 && (
                  <span className="ml-1 w-1.5 h-3.5 bg-[#d12630] inline-block align-middle animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STAGE 3: ACCELERATION */}
      {stage === "acceleration" && (
        <div 
          ref={accelerationRef}
          className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4"
        >
          {/* Rapid Speed Lines Moving Left */}
          <div ref={speedLinesRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-r from-transparent via-gray-700 to-transparent h-[1px] w-48"
                style={{
                  top: `${15 + i * 7.5}%`,
                  left: "100%"
                }}
              />
            ))}
          </div>

          {/* Animated SVG Car speeding to the right */}
          <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
            <div
              ref={carRef}
              className="relative w-72 h-36 flex items-center justify-center"
              style={{ transform: "translateX(-550px) scale(0.8)" }}
            >
              {/* Car Graphic Outline */}
              <svg className="w-full h-full text-white" viewBox="0 0 120 50" fill="currentColor">
                {/* stylized sport coupe body outline */}
                <path d="M10 35 L12 30 Q15 22 28 20 Q35 15 50 12 L75 12 Q92 12 100 20 L115 28 L118 35 Q115 39 105 39 L96 39 Q93 33 86 33 Q79 33 76 39 L40 39 Q37 33 30 33 Q23 33 20 39 L12 39 Z" fill="#0f1013" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="30" cy="39" r="6" fill="#060709" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="86" cy="39" r="6" fill="#060709" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="30" cy="39" r="2.5" fill="currentColor" />
                <circle cx="86" cy="39" r="2.5" fill="currentColor" />
                {/* Windshield */}
                <path d="M50 14 L68 14 L62 21 L48 21 Z" fill="#1c69d4" opacity="0.6" />
                {/* Taillight red glow */}
                <path d="M9 31 L12 31 L12 34 L9 34 Z" fill="#d12630" />
                {/* Headlight blue laser */}
                <path d="M114 30 L118 30 L117 33 L113 33 Z" fill="#1c69d4" />
              </svg>

              {/* Exhaust Smoke/Flames Particle Emitter */}
              <div className="absolute -left-6 bottom-8 flex flex-col items-center">
                {/* Exhaust nozzle point */}
                <span className="w-2 h-1 bg-gray-600 rounded-sm" />
                
                {/* Expanding fire/smoke rings */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border bg-gradient-to-r from-[#d12630]/30 to-[#f5a623]/20 exhaust-particle"
                    style={{
                      width: 8,
                      height: 8,
                      left: -12
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Speeds Telemetry log */}
            <div className="mt-6 font-mono text-[10px] text-gray-400 space-y-1">
              <div className="text-white font-bold tracking-widest text-glow-red uppercase animate-pulse">
                EXHAUST VALVES: FULL SPORT
              </div>
              <div>ACCELERATING OVERDRIVE... 0 - 100 KM/H in 3.2s</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

