import React, { useEffect } from "react";
import { Clock } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "../constants/experience";

export default function RacingHistorySection({ isBooted }) {
  useEffect(() => {
    if (!isBooted) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo("#racing-history .history-header > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#racing-history",
          start: "top 80%"
        }
      }
    );

    gsap.fromTo("#racing-history .lap-record",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#racing-history .racetrack-path",
          start: "top 75%"
        }
      }
    );
  }, [isBooted]);

  return (
    <section id="racing-history" className="py-12 border-t border-[#1b1e24] relative scroll-mt-20">
      <div className="mb-12 history-header">
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          Racing History
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
          Professional history and engineering checkpoints documented as dynamic lap records.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto pl-8 md:pl-0 pt-4 racetrack-path">
        <div className="absolute top-0 bottom-0 left-[18px] md:left-1/2 -translate-x-1/2 w-8 pointer-events-none select-none z-0">
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[16px] bg-[#16181d] border-l border-r border-[#FF2D2D]/20" />
          <div className="absolute top-0 bottom-0 left-[calc(50%-10px)] w-[2px] bg-repeat-y bg-[linear-gradient(to_bottom,#FF2D2D_0px,#FF2D2D_8px,#fff_8px,#fff_16px)] bg-[size:2px_16px]" />
          <div className="absolute top-0 bottom-0 right-[calc(50%-10px)] w-[2px] bg-repeat-y bg-[linear-gradient(to_bottom,#FF2D2D_0px,#FF2D2D_8px,#fff_8px,#fff_16px)] bg-[size:2px_16px]" />
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 border-l border-dashed border-white/20" />
        </div>
        
        <div className="space-y-12">
          {EXPERIENCE.map((item, idx) => (
            <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center lap-record group text-left">
              <div className="absolute left-[-26px] md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full border-2 border-[#FF2D2D] bg-[#0c0e12] flex items-center justify-center z-10 shadow-[0_0_12px_rgba(255,45,45,0.3)] group-hover:scale-110 transition-transform duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D2D] group-hover:bg-white transition-colors" />
              </div>
              
              <div className="md:w-1/2 md:pr-12 md:text-right w-full text-left pl-4 md:pl-0">
                <span className="font-mono text-xs text-[#FF2D2D] font-extrabold tracking-wider">{item.lap}</span>
                <h4 className="text-base font-extrabold text-white mt-0.5 font-display uppercase">{item.title}</h4>
                <div className="flex flex-wrap md:justify-end gap-2 mt-1 text-[8px] font-mono text-gray-500 font-bold uppercase">
                  <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-[#1c69d4]" />{item.sector}</span>
                  <span className="flex items-center gap-1"><Clock size={8} />{item.lapTime}</span>
                  <span className="text-white font-bold">{item.speed}</span>
                </div>
              </div>

              <div className="md:w-1/2 md:pl-12 w-full text-left mt-2 md:mt-0 pl-4 md:pl-0">
                <p className="text-xs text-gray-400 font-sans leading-relaxed max-w-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
