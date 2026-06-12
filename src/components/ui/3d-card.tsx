"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Your utility for merging class names

/**
 * Props for the InteractiveTravelCard component.
 */
export interface InteractiveTravelCardProps {
  /** The main title for the card, e.g., "Sapa Valley" */
  title: string;
  /** A subtitle or location, e.g., "Vietnam" */
  subtitle: string;
  /** The URL for the background image. */
  imageUrl: string;
  /** The text for the primary action button, e.g., "Book your trip" */
  actionText: string;
  /** The destination URL for the top-right link. */
  href: string;
  /** Callback function when the primary action button is clicked. */
  onActionClick: () => void;
  /** Optional additional class names for custom styling. */
  className?: string;
}

/**
 * A responsive and theme-adaptive travel card with a 3D tilt effect on hover.
 */
export const InteractiveTravelCard = React.forwardRef<
  HTMLDivElement,
  InteractiveTravelCardProps
>(
  (
    { title, subtitle, imageUrl, actionText, href, onActionClick, className },
    ref
  ) => {
    // --- 3D Tilt Animation Logic ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const { width, height, left, top } = rect;
      const mouseXVal = e.clientX - left;
      const mouseYVal = e.clientY - top;
      const xPct = mouseXVal / width - 0.5;
      const yPct = mouseYVal / height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          // Base styles for the card container, using theme variables for border
          "relative h-[26rem] w-80 rounded-2xl bg-transparent shadow-2xl border border-border/30",
          className
        )}
      >
        <div
          style={{
            transform: "translateZ(50px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-xl shadow-lg overflow-hidden"
        >
          {/* Background Image */}
          <img
            src={imageUrl}
            alt={`${title}, ${subtitle}`}
            className="absolute inset-0 h-full w-full rounded-xl object-cover"
          />

          {/* Gradient — only bottom half dark for text legibility */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          {/* Top-right link icon only */}
          {href && href !== "#" && (
            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: "2.5deg" }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Learn more about ${title}`}
              style={{ transform: "translateZ(60px)" }}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm ring-1 ring-inset ring-white/20 transition-colors hover:bg-black/50"
            >
              <ArrowUpRight className="h-4 w-4 text-white" />
            </motion.a>
          )}

          {/* Bottom content — subtitle pill + title + button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2">

            {/* Subtitle pill */}
            <motion.span
              style={{ transform: "translateZ(55px)" }}
              className="self-start text-[10px] font-bold uppercase tracking-widest bg-white/20 backdrop-blur-md border border-white/30 text-white/90 px-3 py-1 rounded-full"
            >
              {subtitle}
            </motion.span>

            {/* Title */}
            <motion.h2
              style={{
                transform: "translateZ(50px)",
                textShadow: "0 2px 8px rgba(0,0,0,0.9)"
              }}
              className="text-xl font-extrabold leading-tight tracking-tight text-white font-outfit"
            >
              {title}
            </motion.h2>

            {/* Action button */}
            <motion.button
              onClick={onActionClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ transform: "translateZ(40px)" }}
              className="w-full mt-1 rounded-lg py-2.5 text-center text-sm font-semibold text-white bg-white/15 backdrop-blur-md ring-1 ring-inset ring-white/25 hover:bg-white/25 transition-colors"
            >
              {actionText}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }
);
InteractiveTravelCard.displayName = "InteractiveTravelCard";
