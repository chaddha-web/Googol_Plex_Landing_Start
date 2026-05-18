"use client";

import Link from "next/link";

/**
 * Liquid-glass top nav used on the landing hero and on the 404 page.
 */
export function SiteNav() {
  return (
    <nav className="relative z-20 w-full px-6 py-6">
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
            {[
              { label: "About", href: "/#about" },
              { label: "Partners", href: "/#partners" },
              { label: "Vision", href: "/#vision" },
              { label: "Benefit", href: "/#benefit" },
              { label: "Contact", href: "/#contact" }
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <Link
            href="/signup"
            className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
