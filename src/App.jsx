import React, { useState, useRef } from "react";
import TerminalGrid from "./components/hud/TerminalGrid";
import Navbar from "./components/layout/Navbar";
import SplitScreenBoot from "./components/layout/SplitScreenBoot";

// Modular Sections
import HeroSection from "./sections/HeroSection";
import GarageSection from "./sections/GarageSection";
import DriverProfileSection from "./sections/DriverProfileSection";
import ComponentsSection from "./sections/ComponentsSection";
import BuildsSection from "./sections/BuildsSection";
import RacingHistorySection from "./sections/RacingHistorySection";
import PitCrewSection from "./sections/PitCrewSection";

// Hooks
import useRadarRenderer from "./hooks/useRadarRenderer";

export default function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const heroCanvasRef = useRef(null);

  // Initialize the hero section 3D telemetry radar
  useRadarRenderer(heroCanvasRef, isBooted);

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {!isBooted && <SplitScreenBoot onComplete={() => setIsBooted(true)} />}
      
      <Navbar />

      <TerminalGrid isBooted={isBooted}>
        <div 
          className={`app-layout-wrapper ${isShaking ? "launch-shake-active" : ""}`}
        >
          {/* Main Dashboard Panel */}
          <main className="relative z-10 space-y-16 pb-24">
            
            {/* HERO SECTION */}
            <HeroSection 
              canvasRef={heroCanvasRef}
              onScrollToSection={handleScrollToSection}
            />
          {/* GARAGE SECTION */}
          <GarageSection />

          {/* DRIVER PROFILE SECTION */}
            <DriverProfileSection 
              isBooted={isBooted}
              onLaunchStateChange={setIsShaking}
            />


            {/* BUILDS CAROUSEL */}
            <BuildsSection isBooted={isBooted} />

            {/* COMPONENTS SECTION */}
            <ComponentsSection />

            {/* RACING HISTORY TIMELINE */}
            <RacingHistorySection isBooted={isBooted} />

            {/* PIT CREW COMMS DOCK */}
            <PitCrewSection isBooted={isBooted} />

          </main>
        </div>
      </TerminalGrid>
    </>
  );
}
