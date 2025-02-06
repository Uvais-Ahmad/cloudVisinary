"use client";
import { cn } from "@/utils/cn";
import React from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      <div
        className={cn(
          "[--line-color:theme(colors.slate.900/20)] dark:[--line-color:theme(colors.slate.50/10)]",
          "absolute inset-0 flex -translate-y-48 justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        )}
      >
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="relative h-full w-px bg-[--line-color] [animation:beam_10s_ease-in-out_infinite] [animation-delay:var(--delay)]"
            style={{
              "--delay": `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}; 