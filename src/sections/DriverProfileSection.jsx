import React, { useState, useEffect, useRef } from "react";
import DiagnosticChart from "../components/features/DiagnosticChart";
import useRadarRenderer from "../hooks/useRadarRenderer";

export default function DriverProfileSection({ isBooted, onLaunchStateChange }) {
  const [launchStage, setLaunchStage] = useState("idle");
  const [launchCountdown, setLaunchCountdown] = useState(3);
  const [speedVal, setSpeedVal] = useState(0);
  const [rpmVal, setRpmVal] = useState(1000);
  const [activeGear, setActiveGear] = useState("P");
  
  const canvasRef = useRef(null);

  useRadarRenderer(canvasRef, isBooted);

  useEffect(() => {
    const isShaking = launchStage === "counting" || (launchStage === "launched" && speedVal < 180);
    if (onLaunchStateChange) {
      onLaunchStateChange(isShaking);
    }
  }, [launchStage, speedVal, onLaunchStateChange]);

  useEffect(() => {
    let timer;
    if (launchStage === "arming") {
      setActiveGear("S1");
      
      const targetRpm = 4500;
      let curRpm = rpmVal;
      timer = setInterval(() => {
        curRpm += 300;
        if (curRpm >= targetRpm) {
          curRpm = targetRpm + Math.floor(Math.random() * 100 - 50);
          setLaunchStage("ready");
          clearInterval(timer);
        }
        setRpmVal(curRpm);
      }, 50);
    } else if (launchStage === "counting") {
      timer = setInterval(() => {
        setRpmVal(4500 + Math.floor(Math.random() * 150 - 75));
        setLaunchCountdown((prev) => {
          if (prev <= 1) {
            setLaunchStage("launched");
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (launchStage === "launched") {
      let curRpm = 4500;
      let curSpeed = 0;
      let gearIndex = 1;
      const gears = ["S1", "S2", "S3", "S4"];
      
      timer = setInterval(() => {
        curSpeed += 8;
        curRpm += 250;
        
        if (curRpm >= 7200) {
          curRpm = 4800;
          if (gearIndex < gears.length - 1) {
            gearIndex++;
            setActiveGear(gears[gearIndex]);
          }
        }

        if (curSpeed >= 280) {
          curSpeed = 280;
          curRpm = 6500;
          setLaunchStage("idle");
          setLaunchCountdown(3);

          const pitCrew = document.getElementById("pit-crew");
          if (pitCrew) {
            pitCrew.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          clearInterval(timer);
        }

        setRpmVal(Math.min(curRpm, 7500));
        setSpeedVal(curSpeed);
      }, 30);
    } else if (launchStage === "idle") {
      if (rpmVal > 1000 || speedVal > 0) {
        let curRpm = rpmVal;
        let curSpeed = speedVal;
        timer = setInterval(() => {
          if (curRpm > 1000) curRpm -= 200;
          if (curSpeed > 0) curSpeed -= 10;
          
          if (curRpm <= 1000 && curSpeed <= 0) {
            curRpm = 1000;
            curSpeed = 0;
            setActiveGear("P");
            clearInterval(timer);
          }
          setRpmVal(Math.max(curRpm, 1000));
          setSpeedVal(Math.max(curSpeed, 0));
        }, 50);
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [launchStage]);

  const startLaunchSequence = () => {
    if (launchStage !== "idle") return;
    setLaunchStage("arming");
  };

  const triggerLaunch = () => {
    if (launchStage !== "ready") return;
    setLaunchStage("counting");
  };

  return (
    <section id="driver-profile" className="py-12 border-t border-[#1b1e24] relative scroll-mt-20">
      <div className="mb-12 profile-header">
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          Driver Profile
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm max-w-xl mt-2 font-sans leading-relaxed">
          Drivetrain mapping, background engineering checks, and real-world system targets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-4 profile-card-col">
          <div className="bg-[#0e1013] border border-[#1b1e24] rounded-xl p-4 font-mono relative overflow-hidden select-none">
            <div className="absolute top-0 left-0 w-1 bg-[#FF2D2D] h-full" />
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#1b1e24] bg-neutral-900 relative">
              <img 
                src="/driver_placeholder.png" 
                alt="Tanuj Agrawal Profile Telemetry"
                className="w-full h-full object-cover grayscale opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1013] via-transparent to-transparent" />
            </div>
            
            <div className="mt-4 space-y-2 text-[10px]">
              <div className="flex justify-between border-b border-[#1b1e24] pb-1.5">
                <span className="text-gray-500">STAGE 1 ECU:</span>
                <span className="text-emerald-500 font-bold">OPTIMIZED</span>
              </div>
              <div className="flex justify-between border-b border-[#1b1e24] pb-1.5">
                <span className="text-gray-500">COMPILER_STAMP:</span>
                <span className="text-white font-bold">2026.06.18</span>
              </div>
              <div className="flex justify-between border-b border-[#1b1e24] pb-1.5">
                <span className="text-gray-500">LAUNCH_CONTROL:</span>
                <span className="text-[#FF2D2D] font-bold">M_SPORT_ENGAGED</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ACTIVE_SYSTEMS:</span>
                <span className="text-white font-bold">REST_API, NOS_DB</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#0e1013] border border-[#1b1e24] rounded-xl font-mono text-xs space-y-3 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF2D2D]" />
            <div className="flex justify-between items-center text-[9px]">
              <span className="text-[#FF2D2D] font-bold text-glow-red">M_LAUNCH_CONTROL_V8</span>
              <span className="text-gray-500 uppercase">STATUS: {launchStage.toUpperCase()}</span>
            </div>
            
            <div className="flex items-center gap-3">
              {launchStage === "idle" && (
                <button
                  onClick={startLaunchSequence}
                  className="flex-1 py-2 bg-[#1b1e24] border border-[#FF2D2D]/35 hover:border-[#FF2D2D] text-white font-bold rounded text-[10px] uppercase transition-all cursor-pointer"
                >
                  Arm Launch Control
                </button>
              )}
              {launchStage === "arming" && (
                <div className="flex-1 text-center py-2 text-glow-red text-[#FF2D2D] font-bold animate-pulse uppercase">
                  Arming Boost...
                </div>
              )}
              {launchStage === "ready" && (
                <button
                  onClick={triggerLaunch}
                  className="flex-1 py-2 bg-[#FF2D2D] hover:bg-[#d12630] text-white font-bold rounded text-[10px] uppercase transition-all shadow-[0_0_10px_rgba(255,45,45,0.4)] animate-pulse cursor-pointer"
                >
                  LAUNCH (Press Brake)
                </button>
              )}
              {launchStage === "counting" && (
                <div className="flex-1 text-center py-2 text-[#FF2D2D] text-glow-red font-black text-lg animate-ping">
                  {launchCountdown}
                </div>
              )}
              {launchStage === "launched" && (
                <div className="flex-1 text-center py-2 text-glow-red text-[#FF2D2D] font-black uppercase">
                  🚀 ACCELERATING: {speedVal} KM/H
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6 profile-bio-col">
          <div className="bg-white/[0.02] border border-[#1b1e24] rounded-xl p-6 md:p-8 space-y-4 font-sans text-left">
            <h3 className="text-xl font-bold font-display text-white uppercase tracking-tight">
              DEVELOPER DOSSIER // TANUJ AGRAWAL
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
              Hello, I'm Tanuj Agrawal. I am currently a first-year AI student and a dedicated MERN Stack Developer. My primary interest lies in translating complex logic into high-velocity, real-world digital products, blending software engineering and startup execution.
            </p>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              I view software development through the lens of performance engineering—every component must be micro-optimized, latency-proof, and designed to scale under heavy loads. My core technical focus centers on node execution architectures, optimized database lookups, and embedding intelligent AI structures to solve actual user problems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#0e1013] border border-[#1b1e24] rounded-xl p-4 font-mono text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D2D]" />
                <span className="text-[10px] text-gray-500 uppercase font-bold">CURRENT_MISSION:</span>
              </div>
              <p className="text-xs text-white font-bold leading-normal">
                Building real-world web applications & training semantic AI data structures.
              </p>
            </div>
            
            <div className="bg-[#0e1013] border border-[#1b1e24] rounded-xl p-4 font-mono text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D2D]" />
                <span className="text-[10px] text-gray-500 uppercase font-bold">LEARNING_STATUS:</span>
              </div>
              <p className="text-xs text-white font-bold leading-normal">
                 AI student, actively researching neural model layers and weights.
              </p>
            </div>

            <div className="bg-[#0e1013] border border-[#1b1e24] rounded-xl p-4 font-mono text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D2D]" />
                <span className="text-[10px] text-gray-500 uppercase font-bold">DEVELOPMENT_FOCUS:</span>
              </div>
              <p className="text-xs text-white font-bold leading-normal">
                MERN Stack development, Node runtime configurations.
              </p>
            </div>

            <div className="bg-[#0e1013] border border-[#1b1e24] rounded-xl p-4 font-mono text-left">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D2D]" />
                <span className="text-[10px] text-gray-500 uppercase font-bold">PROJECT_COMPILE_STATUS:</span>
              </div>
              <p className="text-xs text-white font-bold leading-normal">
                3+ functional codebase builds successfully archived and live in production.
              </p>
            </div>
          </div>

          <div className="w-full">
            <DiagnosticChart rpmValue={rpmVal} speedValue={speedVal} gear={activeGear} />
          </div>
        </div>
      </div>
    </section>
  );
}
