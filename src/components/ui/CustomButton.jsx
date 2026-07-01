import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export default function CustomButton({
  children,
  onClick,
  variant = "red",
  icon: Icon,
  className = "",
  type = "button",
  disabled = false
}) {
  const colorStyles = 
    variant === "red"
      ? "border-[#d12630]/30 text-[#d12630] bg-[#d12630]/10 hover:bg-[#d12630] hover:text-white hover:shadow-[0_0_15px_rgba(209,38,48,0.4)] hover:border-[#d12630]"
      : variant === "blue"
      ? "border-[#1c69d4]/30 text-[#1c69d4] bg-[#1c69d4]/10 hover:bg-[#1c69d4] hover:text-white hover:shadow-[0_0_15px_rgba(28,105,212,0.4)] hover:border-[#1c69d4]"
      : variant === "amber"
      ? "border-[#f5a623]/30 text-[#f5a623] bg-[#f5a623]/10 hover:bg-[#f5a623] hover:text-white hover:shadow-[0_0_15px_rgba(245,166,35,0.4)] hover:border-[#f5a623]"
      : variant === "dark"
      ? "border-[#1b1e24] text-white bg-[#0e1013] hover:bg-[#1b1e24]"
      : "border-[#1b1e24] text-gray-400 bg-transparent hover:text-white hover:bg-[#0e1013]";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { y: -1 }}
      whileTap={disabled ? {} : { y: 0 }}
      className={cn(
        "px-4 py-2.5 border font-mono text-[10px] sm:text-[11px] tracking-wider rounded-md uppercase cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-200 select-none",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        colorStyles,
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", 
          variant === "red" ? "bg-[#d12630]" : variant === "blue" ? "bg-[#1c69d4]" : variant === "amber" ? "bg-[#f5a623]" : "bg-white"
        )}></span>
        <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", 
          variant === "red" ? "bg-[#d12630]" : variant === "blue" ? "bg-[#1c69d4]" : variant === "amber" ? "bg-[#f5a623]" : "bg-white"
        )}></span>
      </span>
      {children}
      {Icon && <Icon size={12} className="stroke-[2.5]" />}
    </motion.button>
  );
}
