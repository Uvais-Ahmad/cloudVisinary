"use client";
import { TypewriterEffect } from "../components/ui/typewriter-effect";
import { BackgroundBeams } from "../components/ui/background-beams";
import Link from "next/link";
// import { Button } from "../components/ui/moving-border";

export default function Page() {
  const words = [
    {
      text: "Social",
      className: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500",
    },
    {
      text: "Content",
      className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500",
    },
    {
      text: "Management",
      className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500",
    },
    {
      text: "Platform",
      className: "text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500",
    },
  ];

  return (
    <div className="h-screen relative w-full bg-gradient-to-b from-black via-gray-900 to-black antialiased bg-grid-white/[0.02] flex items-center justify-center">
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
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-cyan-900/20 to-blue-900/20 opacity-50" />
      <BackgroundBeams />
    </div>
  );
}