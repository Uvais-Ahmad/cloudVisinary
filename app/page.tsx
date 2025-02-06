"use client";
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { BackgroundBeams } from "../components/ui/background-beams";
import Link from "next/link";
import { Boxes } from "@/components/ui/background-boxes";
// import { Button } from "../components/ui/moving-border";

export default function Page() {
  const words = [
    {
      text: "Social",
      className: "py-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500",
    },
    {
      text: "Content",
      className: "py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      text: "Management",
      className: "py-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500",
    },
    {
      text: "Platform",
      className: "py-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500",
    },
  ];

  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center h-full">
          {/* Title with Typewriter Effect */}
          <TypewriterEffect words={words} />
          
          {/* Description */}
          <p className="text-neutral-300 max-w-lg mx-auto my-8 text-center text-lg relative z-10 bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-400">
            Optimize your social media presence with our intelligent content management platform. 
            Schedule, analyze, and enhance your social media strategy.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <Link href="/home">
              <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] hover:bg-[linear-gradient(110deg,#000103,45%,#2a3f54,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-300 transition-all duration-300 hover:scale-105 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                Get Started →
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background Effect */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
    </div>
  );
}