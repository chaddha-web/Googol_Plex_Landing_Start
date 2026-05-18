"use client";

import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Music2,
  Twitter,
  Youtube
} from "@/components/icons";

const discover = [
  "Labs & Workshops",
  "Deep Dive Series",
  "Global Circle",
  "Resource Vault",
  "Future Roadmap"
];
const mission = [
  "Origin Story",
  "The Collective",
  "Newsroom Hub",
  "Join the Team"
];
const concierge = [
  "Get in Touch",
  "Legal Privacy",
  "User Agreement",
  "Report Concern"
];

function Column({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-sm uppercase tracking-wider text-white font-medium mb-4">
        {title}
      </h4>
      <ul className="text-xs space-y-2">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-white transition-colors">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The liquid-glass footer card used by both the landing footer section
 * (over its video CTA) and the 404 page (over its drifting starfield).
 */
export function SiteFooterCard({ className = "" }: { className?: string }) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      className={`liquid-glass w-full rounded-3xl p-6 md:p-10 text-white/70 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-4 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 256 256"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M 4.688 136 C 68.373 136 120 187.627 120 251.312 C 120 252.883 119.967 254.445 119.905 256 L 0 256 L 0 136.096 C 1.555 136.034 3.117 136 4.688 136 Z M 251.312 136 C 252.883 136 254.445 136.034 256 136.096 L 256 256 L 136.095 256 C 136.032 254.438 136.001 252.875 136 251.312 C 136 187.627 187.627 136 251.312 136 Z M 119.905 0 C 119.967 1.555 120 3.117 120 4.688 C 120 68.373 68.373 120 4.687 120 C 3.117 120 1.555 119.967 0 119.905 L 0 0 Z M 256 119.905 C 254.445 119.967 252.883 120 251.312 120 C 187.627 120 136 68.373 136 4.687 C 136 3.117 136.033 1.555 136.095 0 L 256 0 Z" />
            </svg>
            <span className="text-xl font-medium tracking-tight">GOOGOLPLEX</span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm">
            Googolplex provides premium clarity on Web3, social, and AI — built in
            the open, governed by the community, shared with all.
          </p>
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Column title="Discover" items={discover} />
          <Column title="The Mission" items={mission} />
          <Column title="Concierge" items={concierge} />
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <p className="text-[10px] uppercase tracking-widest opacity-50">
          Built by the Googolplex collective
        </p>
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-widest opacity-50">
            Join the journey:
          </span>
          <div className="flex items-center gap-3">
            {[Music2, Facebook, Twitter, Youtube, Instagram].map((Ico, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="opacity-70 hover:opacity-100 transition-colors hover:text-white"
              >
                <Ico size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
