"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { LoopVideo } from "@/components/video";
import {
  ArrowLeft,
  Chrome,
  CircleFilled,
  Eye,
  EyeOff,
  Github
} from "@/components/icons";
import { VIDEOS } from "@/lib/assets";

type StepProps = { number: number; text: string; active?: boolean };

const StepItem = ({ number, text, active = false }: StepProps) => (
  <div
    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
      active
        ? "bg-white text-black border border-white"
        : "bg-[#1A1A1A] text-white border-none"
    }`}
  >
    <div
      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
        active ? "bg-black text-white" : "bg-white/10 text-white/40"
      }`}
    >
      {number}
    </div>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

type SocialButtonProps = {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
};

const SocialButton = ({ icon: Ico, label }: SocialButtonProps) => (
  <button
    type="button"
    className="bg-black border border-white/10 rounded-xl h-12 flex items-center justify-center gap-2 text-white text-sm font-medium hover:bg-white/5 transition-colors"
  >
    <Ico size={16} />
    <span>{label}</span>
  </button>
);

type InputGroupProps = {
  label: string;
  placeholder: string;
  type?: string;
  rightSlot?: React.ReactNode;
  helper?: string;
};

const InputGroup = ({
  label,
  placeholder,
  type = "text",
  rightSlot,
  helper
}: InputGroupProps) => {
  const id = label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-white block">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="bg-[#1A1A1A] border-none rounded-xl h-11 w-full px-4 text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20 transition-shadow"
        />
        {rightSlot && (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {rightSlot}
          </div>
        )}
      </div>
      {helper && <p className="text-xs text-white/40">{helper}</p>}
    </div>
  );
};

function HeroLeft() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };
  const child = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <div className="relative hidden lg:flex w-[52%] flex-col items-center justify-end pb-32 px-12 rounded-3xl overflow-hidden shadow-2xl h-full">
      <LoopVideo
        src={VIDEOS.signup}
        placeholderClass="placeholder-video"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="relative z-10 w-full max-w-xs space-y-8"
      >
        <motion.div
          variants={child}
          className="flex items-center gap-2 text-white"
        >
          <CircleFilled size={20} />
          <span className="text-xl font-semibold tracking-tight">Googolplex</span>
        </motion.div>

        <motion.div variants={child} className="space-y-3">
          <h1 className="text-4xl font-medium tracking-tight whitespace-nowrap">
            Join Googolplex
          </h1>
          <p className="text-white/60 text-sm leading-relaxed px-4">
            Follow these 3 quick phases to activate your space.
          </p>
        </motion.div>

        <motion.div variants={child} className="space-y-2">
          <StepItem number={1} text="Register your identity" active />
        </motion.div>
        <motion.div variants={child} className="space-y-2 -mt-6">
          <StepItem number={2} text="Configure your studio" />
        </motion.div>
        <motion.div variants={child} className="space-y-2 -mt-6">
          <StepItem number={3} text="Finalize your profile" />
        </motion.div>
      </motion.div>
    </div>
  );
}

function FormRight() {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs transition-colors"
        >
          <ArrowLeft size={14} /> Back to Googolplex
        </Link>

        <div className="space-y-2">
          <h2 className="text-3xl font-medium tracking-tight">
            Create New Profile
          </h2>
          <p className="text-white/40 text-sm">
            Input your basic details to begin the journey.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SocialButton icon={Chrome} label="Google" />
          <SocialButton icon={Github} label="Github" />
        </div>

        <div className="relative flex items-center">
          <div className="flex-1 border-t border-white/10" />
          <span className="bg-black px-4 text-xs font-medium text-white/40 uppercase tracking-widest">
            Or
          </span>
          <div className="flex-1 border-t border-white/10" />
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <InputGroup label="First Name" placeholder="Jane" />
            <InputGroup label="Last Name" placeholder="Doe" />
          </div>

          <InputGroup
            label="Email"
            type="email"
            placeholder="jane@googolplex.io"
          />

          <InputGroup
            label="Password"
            type={showPwd ? "text" : "password"}
            placeholder="••••••••"
            helper="Requires at least 8 symbols."
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                aria-label={showPwd ? "Hide password" : "Show password"}
                className="text-white/40 hover:text-white transition-colors p-1"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />

          <button
            type="submit"
            className="w-full h-14 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] transition-all mt-4"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-white/50">
          Member of the team?{" "}
          <Link href="/signup" className="text-white font-medium hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <main className="flex min-h-screen w-full bg-black selection:bg-white/30 p-2 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4">
      <HeroLeft />
      <FormRight />
    </main>
  );
}
