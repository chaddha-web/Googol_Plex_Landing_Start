import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number };

function Base({
  size = 20,
  strokeWidth = 1.6,
  children,
  className,
  ...rest
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

export const Globe = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20" />
  </Base>
);

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14" />
    <path d="m13 5 7 7-7 7" />
  </Base>
);

export const ArrowLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="M19 12H5" />
    <path d="m11 19-7-7 7-7" />
  </Base>
);

export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </Base>
);

export const Camera = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="6" width="18" height="13" rx="2.5" />
    <circle cx="12" cy="12.5" r="3.2" />
    <path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6" />
  </Base>
);

export const Sparkles = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v4" />
    <path d="M12 17v4" />
    <path d="M3 12h4" />
    <path d="M17 12h4" />
    <path d="m5.6 5.6 2.8 2.8" />
    <path d="m15.6 15.6 2.8 2.8" />
    <path d="m18.4 5.6-2.8 2.8" />
    <path d="m8.4 15.6-2.8 2.8" />
  </Base>
);

export const Music2 = (p: IconProps) => (
  <Base {...p}>
    <circle cx="8" cy="18" r="4" />
    <path d="M12 18V2l7 4" />
  </Base>
);

export const Facebook = (p: IconProps) => (
  <Base {...p}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </Base>
);

export const Twitter = (p: IconProps) => (
  <Base {...p}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </Base>
);

export const Youtube = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </Base>
);

export const Instagram = (p: IconProps) => (
  <Base {...p}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </Base>
);
