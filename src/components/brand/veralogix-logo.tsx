import { cn } from '@/lib/utils';

type VeralogixLogoProps = {
  variant?: 'full' | 'icon';
  className?: string;
};

export function VeralogixLogo({ variant = 'full', className }: VeralogixLogoProps) {
  return (
    <svg
      viewBox="0 0 360 80"
      className={cn('w-auto h-10', className)}
      aria-label="Veralogix Logo"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
      
      {variant === 'full' && (
        <text
          x="0"
          y="50"
          fontFamily='"Space Grotesk", Montserrat, sans-serif'
          fontWeight="700"
          fontSize="48"
          fill="white"
          dominantBaseline="central"
        >
          VERA
          <tspan fill="url(#logo-gradient)">LOGIX</tspan>
        </text>
      )}

      <g transform="translate(260, 0)">
        <circle cx="40" cy="40" r="40" fill="hsl(var(--primary))" />
        <path d="M40 0 a40 40 0 0 1 0 80" fill="none" stroke="black" strokeWidth="2" />
        <path d="M40 0 a40 40 0 0 0 0 80" fill="none" stroke="black" strokeWidth="2" />
        <path d="M0 40 a40 40 0 0 1 80 0" fill="none" stroke="black" strokeWidth="2" />

        <circle cx="16" cy="16" r="5" fill="white" stroke="black" strokeWidth="1.5"/>
        <circle cx="64" cy="16" r="5" fill="white" stroke="black" strokeWidth="1.5"/>
        <circle cx="40" cy="40" r="5" fill="white" stroke="black" strokeWidth="1.5"/>
        <circle cx="16" cy="64" r="5" fill="white" stroke="black" strokeWidth="1.5"/>
        <circle cx="64" cy="64" r="5" fill="white" stroke="black" strokeWidth="1.5"/>

        <path d="M16 16 L 40 40 L 16 64" fill="none" stroke="black" strokeWidth="2" />
        <path d="M64 16 L 40 40 L 64 64" fill="none" stroke="black" strokeWidth="2" />
        <path d="M16 16 L 64 16" fill="none" stroke="black" strokeWidth="2" />
        <path d="M16 64 L 64 64" fill="none" stroke="black" strokeWidth="2" />
      </g>
    </svg>
  );
}
