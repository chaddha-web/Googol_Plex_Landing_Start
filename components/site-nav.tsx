"use client";

import Link from "next/link";
import { Globe } from "@/components/icons";

/**
 * Liquid-glass top nav used on the landing hero and on the 404 page.
 */
export function SiteNav() {
  return (
    <nav className="relative z-20 w-full px-6 py-6">
      <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Globe size={22} strokeWidth={1.6} />
            <span className="font-semibold text-lg tracking-tight">Googolplex</span>
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
          <Link href="/signup" className="text-white text-sm font-medium px-2">
            Sign Up
          </Link>
          <Link
            href="/signup"
            className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
