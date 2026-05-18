"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "@/components/icons";
import { LoopVideo } from "@/components/video";
import { VIDEOS } from "@/lib/assets";

const cards = [
  {
    tag: "Strategy",
    title: "Research & Insight",
    body: "We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.",
    video: VIDEOS.serviceStrategy,
    placeholder: "placeholder-video-4"
  },
  {
    tag: "Craft",
    title: "Design & Execution",
    body: "From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.",
    video: VIDEOS.serviceCraft,
    placeholder: "placeholder-video-5"
  }
];

export function ServicesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-black py-28 md:py-40 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight font-serif">
            What we do
          </h2>
          <p className="text-white/40 text-sm hidden md:block tracking-widest uppercase">
            Our services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 * i }}
              className="group liquid-glass rounded-3xl overflow-hidden"
            >
              <div className="relative aspect-video overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                  <LoopVideo
                    src={c.video}
                    placeholderClass={c.placeholder}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <p className="text-white/40 text-xs tracking-widest uppercase">
                    {c.tag}
                  </p>
                  <div className="liquid-glass rounded-full p-2 text-white">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
                <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight font-serif">
                  {c.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
