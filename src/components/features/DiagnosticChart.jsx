import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function DiagnosticChart({ rpmValue, speedValue, gear = "D1" }) {
  const [rpm, setRpm] = useState(1000);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    if (rpmValue !== undefined && speedValue !== undefined) {
      const targets = { rpm: rpm, speed: speed };
      const tween = gsap.to(targets, {
        rpm: rpmValue,
        speed: speedValue,
        duration: 0.28,
        ease: "power2.out",
        onUpdate: () => {
          setRpm(Math.round(targets.rpm));
          setSpeed(Math.round(targets.speed));
        }
      });
      return () => tween.kill();
    }

    const interval = setInterval(() => {
      const targetRpm = Math.random() > 0.85 ? 3800 : 800 + Math.random() * 400;
      const targetSpeed = Math.random() > 0.85 ? 90 : 0 + Math.random() * 5;
      
      const targets = { rpm: rpm, speed: speed };
      gsap.to(targets, {
        rpm: targetRpm,
        speed: targetSpeed,
        duration: 1.1,
        ease: "power1.inOut",
        onUpdate: () => {
          setRpm(Math.round(targets.rpm));
          setSpeed(Math.round(targets.speed));
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [rpmValue, speedValue]);

  const maxRpm = 8000;
  const rpmPercent = Math.min(rpm / maxRpm, 1);
  const strokeDashoffset = 251.2 - (rpmPercent * 188);
  const isRedline = rpm >= 7000;

  return (
    <div className="w-full bg-[#0e1013] border border-[#1b1e24] rounded-xl p-4 font-mono select-none shadow-[0_4px_24px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col sm:flex-row items-center gap-6">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:10px_10px]" />
      <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-225" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            className="stroke-[#1b1e24]"
            strokeWidth="3.5"
            fill="none"
            strokeDasharray="188 251.2"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            className="stroke-[#1c69d4]/20"
            strokeWidth="3.5"
            fill="none"
            strokeDasharray="70 251.2"
            strokeDashoffset="188"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            className="stroke-[#d12630]"
            strokeWidth="3.5"
            fill="none"
            strokeDasharray="30 251.2"
            strokeDashoffset="93"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            className={`transition-all duration-300 ease-out ${isRedline ? "stroke-[#d12630] drop-shadow-[0_0_4px_#d12630]" : "stroke-[#1c69d4] drop-shadow-[0_0_4px_#1c69d4]"}`}
            strokeWidth="4"
            fill="none"
            strokeDasharray="188 251.2"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-xs font-bold leading-none ${isRedline ? "text-[#d12630] animate-pulse" : "text-gray-400"}`}>
            RPM
          </span>
          <span className={`text-lg font-black tracking-tighter ${isRedline ? "text-[#d12630] text-glow-red" : "text-white"}`}>
            {rpm}
          </span>
          <span className="text-[8px] text-gray-500 font-bold uppercase mt-0.5">
            x1000r/min
          </span>
        </div>
      </div>

      <div className="flex-1 w-full space-y-3">
        <div className="flex justify-between items-end border-b border-[#1b1e24] pb-2">
          <div>
            <span className="text-[8px] text-gray-500 block uppercase tracking-wider font-bold">
              SPEEDOMETER
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black tracking-tight text-white text-glow-blue leading-none">
                {speed}
              </span>
              <span className="text-[10px] text-gray-400 font-bold">KM/H</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[8px] text-gray-500 block uppercase tracking-wider font-bold">
              GEAR SELECT
            </span>
            <span className="text-xl font-black text-[#f5a623] text-glow-amber">
              {gear}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[9px]">
          <div className="bg-[#060709] p-1.5 rounded border border-[#1b1e24] flex justify-between">
            <span className="text-gray-500">ENG TEMP:</span>
            <span className={`font-bold ${isRedline ? "text-[#d12630]" : "text-white"}`}>98°C</span>
          </div>
          <div className="bg-[#060709] p-1.5 rounded border border-[#1b1e24] flex justify-between">
            <span className="text-gray-500">M xDRIVE:</span>
            <span className="text-[#1c69d4] font-bold">SPORT</span>
          </div>
          <div className="bg-[#060709] p-1.5 rounded border border-[#1b1e24] flex justify-between">
            <span className="text-gray-500">TURBO:</span>
            <span className="text-[#f5a623] font-bold">1.2 BAR</span>
          </div>
          <div className="bg-[#060709] p-1.5 rounded border border-[#1b1e24] flex justify-between">
            <span className="text-gray-500">OIL TEMP:</span>
            <span className="text-white font-bold">104°C</span>
          </div>
        </div>
      </div>
    </div>
  );
}
