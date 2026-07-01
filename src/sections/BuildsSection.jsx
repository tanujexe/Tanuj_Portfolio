import React, { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BUILDS } from "../constants/builds";
import BuildInspectorModal from "../components/features/BuildInspectorModal";
import CustomButton from "../components/ui/CustomButton";

export default function BuildsSection({ isBooted }) {
  const [selectedBuild, setSelectedBuild] = useState(0);
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [displayedHp, setDisplayedHp] = useState(80);
  const [displayedSpeed, setDisplayedSpeed] = useState(1.2);

  const isAnimatingRef = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (!isBooted) return;
    const currentBuild = BUILDS[selectedBuild];
    
    const targets = { hp: displayedHp, speed: displayedSpeed };
    const tween = gsap.to(targets, {
      hp: currentBuild.hp,
      speed: currentBuild.speed,
      duration: 0.8,
      onUpdate: () => {
        setDisplayedHp(Math.round(targets.hp));
        setDisplayedSpeed(Number(targets.speed.toFixed(2)));
      }
    });

    gsap.fromTo(
      "#engineered-builds .showroom-float",
      { scale: 0.98 },
      { scale: 1.03, duration: 0.6, ease: "back.out(1.5)" }
    );

    return () => tween.kill();
  }, [selectedBuild, isBooted]);

  const smoothScrollTo = (targetY, callback) => {
    isAnimatingRef.current = true;
    const scrollObj = { y: window.scrollY };
    gsap.to(scrollObj, {
      y: targetY,
      duration: 0.65,
      ease: "power2.inOut",
      onUpdate: () => {
        window.scrollTo(0, scrollObj.y);
      },
      onComplete: () => {
        setTimeout(() => {
          isAnimatingRef.current = false;
          if (callback) callback();
        }, 100);
      }
    });
  };

  const getTargetProgress = (idx) => {
    if (idx === 0) return 0;
    if (idx === BUILDS.length - 1) return 1;
    return idx / (BUILDS.length - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isInspectionOpen) {
        setIsInspectionOpen(false);
      }

      const el = document.getElementById("engineered-builds");
      if (!el || isInspectionOpen) return;
      
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!isVisible) return;

      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        if (isAnimatingRef.current) {
          e.preventDefault();
          return;
        }

        if (window.innerWidth >= 1024 && window.innerHeight >= 780) {
          const triggers = ScrollTrigger.getAll();
          const pinTrigger = triggers.find(
            (t) => t.trigger && t.trigger.id === "engineered-builds" && t.pin
          );
          if (pinTrigger) {
            let nextIndex = selectedBuild;
            if (e.key === "ArrowLeft") {
              nextIndex = selectedBuild > 0 ? selectedBuild - 1 : BUILDS.length - 1;
            } else {
              nextIndex = selectedBuild < BUILDS.length - 1 ? selectedBuild + 1 : 0;
            }
            
            setSelectedBuild(nextIndex);

            const targetProgress = getTargetProgress(nextIndex);
            const targetScroll =
              pinTrigger.start + targetProgress * (pinTrigger.end - pinTrigger.start);
            
            smoothScrollTo(targetScroll);
            return;
          }
        }
        
        if (e.key === "ArrowLeft") {
          setSelectedBuild((prev) => (prev > 0 ? prev - 1 : BUILDS.length - 1));
        } else if (e.key === "ArrowRight") {
          setSelectedBuild((prev) => (prev < BUILDS.length - 1 ? prev + 1 : 0));
        }
      }
    };
 
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInspectionOpen, selectedBuild]);

  useEffect(() => {
    const handleGlobalWheel = (e) => {
      if (window.innerWidth < 1024 || window.innerHeight < 780) return;

      const el = document.getElementById("engineered-builds");
      if (!el || isInspectionOpen) return;

      const rect = el.getBoundingClientRect();
      const isPinned = Math.abs(rect.top) <= 5;

      if (isPinned) {
        const triggers = ScrollTrigger.getAll();
        const pinTrigger = triggers.find(
          (t) => t.trigger && t.trigger.id === "engineered-builds" && t.pin
        );

        if (!pinTrigger) return;

        const isScrollingDown = e.deltaY > 0;

        if (isScrollingDown) {
          if (selectedBuild < BUILDS.length - 1) {
            e.preventDefault();
            if (isAnimatingRef.current) return;

            const nextIdx = selectedBuild + 1;
            setSelectedBuild(nextIdx);

            const targetProgress = getTargetProgress(nextIdx);
            const targetScroll =
              pinTrigger.start + targetProgress * (pinTrigger.end - pinTrigger.start);

            smoothScrollTo(targetScroll);
          }
        } else {
          if (selectedBuild > 0) {
            e.preventDefault();
            if (isAnimatingRef.current) return;

            const prevIdx = selectedBuild - 1;
            setSelectedBuild(prevIdx);

            const targetProgress = getTargetProgress(prevIdx);
            const targetScroll =
              pinTrigger.start + targetProgress * (pinTrigger.end - pinTrigger.start);

            smoothScrollTo(targetScroll);
          }
        }
      }
    };

    window.addEventListener("wheel", handleGlobalWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleGlobalWheel);
  }, [isInspectionOpen, selectedBuild]);

  useEffect(() => {
    if (!isBooted) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo("#engineered-builds .builds-header > *",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#engineered-builds",
          start: "top 80%"
        }
      }
    );

    gsap.fromTo("#engineered-builds .showroom-viewport-col, #engineered-builds .showroom-specs-col",
      { opacity: 0, scale: 0.97, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#engineered-builds .showroom-container",
          start: "top 75%"
        }
      }
    );

    let showroomPin;
    if (window.innerWidth >= 1024 && window.innerHeight >= 780) {
      showroomPin = ScrollTrigger.create({
        trigger: "#engineered-builds",
        pin: true,
        start: "top top",
        end: () => `+=${BUILDS.length * window.innerHeight}`,
        scrub: true,
        onUpdate: (self) => {
          if (isAnimatingRef.current) return;
          const progress = self.progress;
          const segment = 1 / BUILDS.length;
          const newIndex = Math.min(
            Math.floor(progress / segment),
            BUILDS.length - 1
          );
          setSelectedBuild(newIndex);
        }
      });
    }

    return () => {
      if (showroomPin) showroomPin.kill();
    };
  }, [isBooted]);

  const handleSelectBuild = (idx) => {
    if (isAnimatingRef.current) return;
    setSelectedBuild(idx);
    
    if (window.innerWidth >= 1024 && window.innerHeight >= 780) {
      const triggers = ScrollTrigger.getAll();
      const pinTrigger = triggers.find(
        (t) => t.trigger && t.trigger.id === "engineered-builds" && t.pin
      );
      if (pinTrigger) {
        const targetProgress = getTargetProgress(idx);
        const targetScroll =
          pinTrigger.start + targetProgress * (pinTrigger.end - pinTrigger.start);
        
        smoothScrollTo(targetScroll);
      }
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    gsap.to(".showroom-float .showroom-card-inner", {
      rotateY: x * 15,
      rotateX: -y * 15,
      transformPerspective: 1200,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(".showroom-float .showroom-card-inner", {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleWheelNav = (e) => {
    if (window.innerWidth >= 1024 && window.innerHeight >= 780) {
      return;
    }
    if (e.deltaY > 0) {
      setSelectedBuild((prev) => (prev < BUILDS.length - 1 ? prev + 1 : 0));
    } else {
      setSelectedBuild((prev) => (prev > 0 ? prev - 1 : BUILDS.length - 1));
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        setSelectedBuild((prev) => (prev < BUILDS.length - 1 ? prev + 1 : 0));
      } else {
        setSelectedBuild((prev) => (prev > 0 ? prev - 1 : BUILDS.length - 1));
      }
    }
  };

  const currentBuild = BUILDS[selectedBuild];

  return (
    <section id="engineered-builds" className="py-12 border-t border-[#1b1e24] relative scroll-mt-20 overflow-hidden">
      <div 
        className="absolute w-[800px] h-[800px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ease-out z-0 top-[20%] left-[10%]"
        style={{
          backgroundColor: `${currentBuild.color}07`
        }}
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-all duration-1000 ease-out z-0 bottom-[10%] right-[10%]"
        style={{
          backgroundColor: `${currentBuild.color}04`
        }}
      />

      <div className="mb-16 builds-header relative z-10">
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
          Engineered Builds
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm max-w-xl mt-2 font-sans leading-relaxed">
          Explore complete production codebases structured as performance vehicles. Inspect mechanical specs or run local telemetry simulators.
        </p>
      </div>

      <div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 showroom-container"
        onWheel={handleWheelNav}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative showroom-viewport-col">
          <div className="relative w-full h-[260px] sm:h-[360px] md:h-[400px] flex items-center justify-center overflow-visible">
            
            <div className="absolute top-[-35px] left-1/2 -translate-x-1/2 flex gap-3 z-30 select-none">
              {BUILDS.map((build, idx) => {
                const isSelected = selectedBuild === idx;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => handleSelectBuild(idx)}
                  >
                    <span 
                      className="text-[8px] font-mono font-bold transition-all duration-300 mr-0.5"
                      style={{
                        color: isSelected ? build.color : "#4b5563",
                        opacity: isSelected ? 1 : 0.4
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className="w-8 h-[2px] rounded transition-all duration-500"
                      style={{
                        backgroundColor: isSelected ? build.color : "rgba(255,255,255,0.06)",
                        boxShadow: isSelected ? `0 0 10px ${build.color}aa` : "none"
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {BUILDS.map((build, idx) => {
              const isSelected = selectedBuild === idx;
              
              let diff = idx - selectedBuild;
              const len = BUILDS.length;
              const half = Math.floor(len / 2);
              if (diff < -half) diff += len;
              if (diff > half) diff -= len;

              let transform = "";
              let zIndex = 10;
              let opacity = 0.3;
              let filter = "blur(3px) brightness(0.5)";

              if (diff === 0) {
                transform = "perspective(1200px) translateZ(80px) scale(1.1)";
                zIndex = 30;
                opacity = 1;
                filter = "blur(0px) brightness(1.1)";
              } else if (diff === -1) {
                transform = "perspective(1200px) translateX(-42%) translateY(4%) translateZ(-80px) rotateY(-20deg) scale(0.82)";
                zIndex = 20;
                opacity = 0.55;
                filter = "blur(2px) brightness(0.65)";
              } else if (diff === 1) {
                transform = "perspective(1200px) translateX(42%) translateY(4%) translateZ(-80px) rotateY(20deg) scale(0.82)";
                zIndex = 20;
                opacity = 0.55;
                filter = "blur(2px) brightness(0.65)";
              }

              const transformStyle = {
                transform,
                zIndex,
                opacity,
                filter,
                pointerEvents: "auto",
                boxShadow: isSelected 
                  ? `0 35px 70px -15px rgba(0,0,0,0.9), 0 0 50px ${build.color}35` 
                  : "none"
              };

              return (
                <div
                  key={build.id}
                  onClick={() => {
                    if (!isSelected) {
                      handleSelectBuild(idx);
                    }
                  }}
                  style={transformStyle}
                  className={`absolute w-[82%] sm:w-[72%] max-w-[500px] aspect-[16/10] transition-all duration-700 ease-out ${
                    isSelected ? "showroom-float" : ""
                  }`}
                >
                  <div 
                    onMouseMove={isSelected ? handleMouseMove : undefined}
                    onMouseLeave={isSelected ? handleMouseLeave : undefined}
                    className="showroom-card-inner w-full h-full bg-[#0c0e12] rounded-xl border border-white/[0.06] flex flex-col shadow-[0_25px_50px_rgba(0,0,0,0.85)] group cursor-pointer"
                  >
                    <div className="h-6 bg-[#0c0e12] border-b border-white/[0.06] px-3 flex items-center justify-between font-mono text-[8px] text-gray-500 rounded-t-xl">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d12630]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="ml-2 font-bold tracking-tight text-[#EAEAEA] uppercase">SHOWROOM_STAGE // {build.name}</span>
                      </div>
                      <span className="text-gray-500 font-bold hidden sm:inline">{build.lapStatus}</span>
                    </div>

                    <div className="w-full flex-1 bg-neutral-900 relative overflow-hidden rounded-b-xl">
                      <div className="absolute inset-0 z-10 pointer-events-none opacity-30 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,transparent_50%)]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent z-10" />
                      
                      <img 
                        src={build.image} 
                        alt={build.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {isSelected && (
                        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-2.5 py-1 bg-black/60 border border-white/10 rounded font-mono text-[8px] text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          ONLINE
                        </div>
                      )}
                      
                      <div className="absolute bottom-4 left-4 z-20 font-mono text-[8px] text-left text-gray-400 space-y-0.5">
                        <div className="text-[10px] text-white font-extrabold tracking-wide uppercase">{build.name}</div>
                        <div>BUILD_SYS: {build.status}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 text-left font-mono relative z-10 showroom-specs-col space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3 rounded-sm" style={{ backgroundColor: currentBuild.color }} />
              <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest">
                DRIVETRAIN SPECIFICATIONS
              </span>
            </div>
            <h3 className="text-3xl font-black text-white font-display uppercase tracking-tight">
              {currentBuild.name}
            </h3>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            {currentBuild.mission}
          </p>

          <div className="grid grid-cols-2 gap-4 border-t border-b border-[#1b1e24] py-4">
            <div>
              <span className="text-[8px] text-gray-500 uppercase block font-bold">PERFORMANCE RATIO</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black tracking-tight text-white leading-none">
                  {displayedHp}
                </span>
                <span className="text-[10px] text-gray-400 font-bold">HP</span>
              </div>
            </div>
            <div>
              <span className="text-[8px] text-gray-500 uppercase block font-bold">SWIFTNESS INDEX</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black tracking-tight text-white leading-none">
                  {displayedSpeed}
                </span>
                <span className="text-[10px] text-gray-400 font-bold">s</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">TECH LISTING</span>
              <div className="flex flex-wrap gap-1">
                {currentBuild.techList.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-white/[0.03] border border-white/[0.06] rounded text-[8px] text-white font-bold uppercase font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">MISFIRE SYMPTOM</span>
              <p className="text-gray-400 text-[11px] leading-relaxed font-sans">{currentBuild.misfire}</p>
            </div>

            <div className="space-y-1 text-xs">
              <span className="text-[8px] text-emerald-500 font-bold uppercase tracking-wider block">DEVELOPER TUNING REPAIR</span>
              <p className="text-gray-300 text-[11px] leading-relaxed font-sans">{currentBuild.solution}</p>
            </div>
          </div>

          <div className="pt-2">
            <CustomButton
              onClick={() => setIsInspectionOpen(true)}
              variant="red"
              icon={ChevronRight}
              className="w-full sm:w-auto font-bold"
              style={{
                borderColor: `${currentBuild.color}50`,
                color: currentBuild.color,
                backgroundColor: `${currentBuild.color}0a`
              }}
            >
              Inspect Telemetry & Specs
            </CustomButton>
          </div>
        </div>
      </div>

      <BuildInspectorModal
        isOpen={isInspectionOpen}
        selectedBuild={selectedBuild}
        onClose={() => setIsInspectionOpen(false)}
      />
    </section>
  );
}
