"use client";
import type React from "react";
import * as motion from "motion/react-client";
import { useReducedMotion } from "motion/react";

// Animated underline component.
// Originally from mcp-marketplace (src/components/animated-underline.tsx).
// Additions, all optional, so existing usage behaves exactly as before:
// - trigger: "hover" (default, the original behaviour) or "mount" (draws once on load)
// - underlineStyle: extra inline styles for the line (gradient, glow, offset...)
// - respects the user's "reduce motion" setting (the line just appears)
// - the default color falls back to blue where --hue-5 isn't defined
export function AnimatedUnderlineText({
  children,
  className = "",
  underlineColor,
  underlineStyle,
  trigger = "hover",
}: {
  children: React.ReactNode;
  className?: string;
  underlineColor?: string;
  underlineStyle?: React.CSSProperties;
  trigger?: "hover" | "mount";
}) {
  const reduceMotion = useReducedMotion();

  // hover: rest until hovered. mount: start at rest and animate to "hover" once.
  const motionProps =
    trigger === "mount"
      ? { initial: reduceMotion ? false : ("rest" as const), animate: "hover" }
      : { initial: "rest", whileHover: "hover", animate: "rest" };

  return (
    <motion.span
      className={`relative inline-block ${trigger === "hover" ? "cursor-pointer" : ""} ${className}`}
      {...motionProps}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
        style={{
          transformOrigin: "center",
          backgroundColor: underlineColor || "var(--hue-5, #3b82f6)", // cyan via --hue-5 where defined
          ...underlineStyle,
        }}
        variants={{
          rest: {
            scaleX: 0,
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: "easeIn",
            },
          },
          hover: {
            scaleX: 1,
            opacity: 1,
            transition: {
              duration: trigger === "mount" ? 0.6 : 0.3,
              ease: "easeOut",
            },
          },
        }}
      />
    </motion.span>
  );
}
