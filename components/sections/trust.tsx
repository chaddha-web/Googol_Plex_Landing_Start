"use client";

import { motion } from "framer-motion";

const Dot = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" />
  </svg>
);
const Ring = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);
const Square = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="3" />
  </svg>
);
const Diamond = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2 22 12 12 22 2 12z" />
  </svg>
);

type Brand = {
  mark: React.ReactNode;
  name: string;
  sub?: string | null;
  weight?: number;
};

const brands: Brand[] = [
  { mark: <Ring />, name: "NORTHWIND", sub: "CORE" },
  { mark: <Dot />, name: "Lumacore" },
  { mark: <Square />, name: "Stratus" },
  { mark: <Dot />, name: "helio", weight: 500 },
  { mark: <Diamond />, name: "Quantix" }
];

const enter = (i: number = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: 0.05 + i * 0.06, ease: "easeOut" as const }
});

export function TrustSection() {
  return (
    <section className="bg-[#f6f5f1] text-neutral-900 py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start mb-16 md:mb-20">
          <motion.h2
            {...enter(0)}
            className="md:col-span-8 text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] font-sans font-normal"
          >
            Focusing on quality,
            <br />
            <span className="text-neutral-400">we maintain customer trust</span>
          </motion.h2>
          <motion.p
            {...enter(1)}
            className="md:col-span-4 text-neutral-500 text-sm leading-relaxed md:pt-3"
          >
            We ensure that every installation we build has strict quality checks.
            Sustainable solutions for an environmentally friendly and renewable
            future.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 justify-items-center">
          {brands.map((b, i) => (
            <motion.div
              key={b.name}
              {...enter(2 + i)}
              className="aspect-square w-full max-w-[170px] rounded-full bg-[#ececea] flex items-center justify-center text-neutral-900"
            >
              <div className="flex items-center gap-2">
                {b.mark}
                <span
                  className="text-sm md:text-base tracking-tight"
                  style={{ fontWeight: b.weight ?? 600 }}
                >
                  {b.name}
                  {b.sub ? (
                    <sup className="text-[8px] font-medium tracking-widest ml-0.5">
                      {b.sub}
                    </sup>
                  ) : null}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
