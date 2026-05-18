"use client";

import Link from "next/link";
import { ArrowRight, Camera, Globe, Sparkles } from "@/components/icons";
import { FadeLoopVideo } from "@/components/video";
import { VIDEOS } from "@/lib/assets";

export function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full">
        <FadeLoopVideo
          src={VIDEOS.hero}
          placeholderClass="placeholder-video"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60 pointer-events-none" />
      </div>

      {/* Nav */}
      <nav className="relative z-20 px-6 py-6">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 text-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icon.png"
                alt="GoogolPlex"
                className="h-7 w-auto object-contain"
              />
              <span className="font-semibold text-lg tracking-tight">
                GoogolPlex
              </span>
            </Link>
            <div className="hidden md:flex gap-8 ml-8">
              {["Features", "Pricing", "About"].map((l) => (
                <Link
                  key={l}
                  href="#"
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/signup"
              className="text-white text-sm font-medium px-2"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[10%] md:-translate-y-[20%]">
        <h1 className="font-serif text-white tracking-tight whitespace-nowrap text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
          Know it <em className="font-serif-i">all</em>
        </h1>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 max-w-xl w-full"
        >
          <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm py-2"
            />
            <button
              type="submit"
              className="bg-white rounded-full p-3 text-black hover:bg-white/90 transition"
              aria-label="Subscribe"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </form>

        <p className="mt-6 text-white text-sm leading-relaxed px-4 max-w-xl">
          Stay updated with the latest news and insights. Subscribe to our newsletter
          today and never miss out on exciting updates.
        </p>

        <button className="mt-8 liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors">
          Read the manifesto
        </button>
      </div>

      {/* Social icons */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        {[Camera, Sparkles, Globe].map((Ico, i) => (
          <Link
            key={i}
            href="#"
            aria-label="Social link"
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all"
          >
            <Ico size={20} strokeWidth={1.6} />
          </Link>
        ))}
      </div>
    </section>
  );
}
