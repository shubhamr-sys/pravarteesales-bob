export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 420"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Server rack left */}
      <rect x="60" y="80" width="100" height="220" rx="8" fill="#0d2a5e" stroke="#0057FF" strokeWidth="1.5"/>
      <rect x="70" y="95" width="80" height="14" rx="3" fill="#0057FF" opacity="0.6"/>
      <rect x="70" y="115" width="80" height="14" rx="3" fill="#0057FF" opacity="0.5"/>
      <rect x="70" y="135" width="80" height="14" rx="3" fill="#0057FF" opacity="0.4"/>
      <rect x="70" y="155" width="80" height="14" rx="3" fill="#0057FF" opacity="0.3"/>
      <circle cx="138" cy="102" r="4" fill="#22c55e"/>
      <circle cx="138" cy="122" r="4" fill="#22c55e"/>
      <circle cx="138" cy="142" r="4" fill="#f5a623"/>
      <circle cx="138" cy="162" r="4" fill="#22c55e"/>
      <rect x="70" y="195" width="80" height="40" rx="3" fill="#0d3a7a" stroke="#0057FF" strokeWidth="1"/>
      <circle cx="110" cy="215" r="12" fill="#0057FF" opacity="0.4"/>
      <circle cx="110" cy="215" r="6" fill="#0057FF"/>

      {/* Server rack right */}
      <rect x="360" y="60" width="90" height="240" rx="8" fill="#0d2a5e" stroke="#0057FF" strokeWidth="1.5"/>
      <rect x="370" y="75" width="70" height="12" rx="2" fill="#0057FF" opacity="0.5"/>
      <rect x="370" y="93" width="70" height="12" rx="2" fill="#0057FF" opacity="0.4"/>
      <rect x="370" y="111" width="70" height="12" rx="2" fill="#0057FF" opacity="0.35"/>
      <rect x="370" y="129" width="70" height="12" rx="2" fill="#0057FF" opacity="0.3"/>
      <circle cx="427" cy="81" r="3.5" fill="#22c55e"/>
      <circle cx="427" cy="99" r="3.5" fill="#22c55e"/>
      <circle cx="427" cy="117" r="3.5" fill="#f5a623"/>
      <circle cx="427" cy="135" r="3.5" fill="#22c55e"/>

      {/* Central shield */}
      <path d="M260 110 L300 130 L300 195 Q260 230 260 230 Q220 230 220 195 L220 130 Z"
        fill="#0057FF" opacity="0.12" stroke="#0057FF" strokeWidth="2"/>
      <path d="M260 128 L285 141 L285 187 Q260 208 260 208 Q235 208 235 187 L235 141 Z"
        fill="#0057FF" opacity="0.18"/>
      <path d="M248 172 L257 181 L275 161" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Connecting dashed lines */}
      <line x1="160" y1="150" x2="220" y2="160" stroke="#0057FF" strokeWidth="1" strokeDasharray="4,3" opacity="0.6"/>
      <line x1="300" y1="160" x2="360" y2="155" stroke="#0057FF" strokeWidth="1" strokeDasharray="4,3" opacity="0.6"/>
      <line x1="160" y1="200" x2="260" y2="240" stroke="#0057FF" strokeWidth="1" strokeDasharray="4,3" opacity="0.35"/>
      <line x1="360" y1="200" x2="260" y2="240" stroke="#0057FF" strokeWidth="1" strokeDasharray="4,3" opacity="0.35"/>

      {/* Network nodes */}
      <circle cx="190" cy="290" r="18" fill="#0d2a5e" stroke="#0057FF" strokeWidth="1.5"/>
      <circle cx="190" cy="290" r="8" fill="#0057FF" opacity="0.5"/>
      <circle cx="330" cy="290" r="18" fill="#0d2a5e" stroke="#0057FF" strokeWidth="1.5"/>
      <circle cx="330" cy="290" r="8" fill="#0057FF" opacity="0.5"/>
      <circle cx="260" cy="325" r="20" fill="#0d2a5e" stroke="#f5a623" strokeWidth="2"/>
      <circle cx="260" cy="325" r="9" fill="#f5a623" opacity="0.7"/>

      <line x1="190" y1="290" x2="330" y2="290" stroke="#0057FF" strokeWidth="1.5" opacity="0.4"/>
      <line x1="190" y1="290" x2="260" y2="325" stroke="#0057FF" strokeWidth="1.5" opacity="0.4"/>
      <line x1="330" y1="290" x2="260" y2="325" stroke="#0057FF" strokeWidth="1.5" opacity="0.4"/>

      {/* Pulse rings */}
      <circle cx="260" cy="325" r="30" fill="none" stroke="#f5a623" strokeWidth="1" opacity="0.25"/>
      <circle cx="260" cy="325" r="42" fill="none" stroke="#f5a623" strokeWidth="0.5" opacity="0.12"/>

      {/* Data packets */}
      <rect x="202" y="256" width="12" height="8" rx="2" fill="#0057FF" opacity="0.8"/>
      <rect x="295" y="260" width="12" height="8" rx="2" fill="#0057FF" opacity="0.8"/>
      <rect x="250" y="274" width="12" height="8" rx="2" fill="#f5a623" opacity="0.8"/>

      {/* Cloud */}
      <ellipse cx="260" cy="44" rx="52" ry="20" fill="#0d2a5e" stroke="#0057FF" strokeWidth="1.5"/>
      <ellipse cx="224" cy="52" rx="28" ry="17" fill="#0d2a5e" stroke="#0057FF" strokeWidth="1.5"/>
      <ellipse cx="296" cy="52" rx="28" ry="17" fill="#0d2a5e" stroke="#0057FF" strokeWidth="1.5"/>
      <line x1="242" y1="66" x2="242" y2="110" stroke="#0057FF" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>
      <line x1="278" y1="66" x2="278" y2="110" stroke="#0057FF" strokeWidth="1" strokeDasharray="3,3" opacity="0.5"/>

      {/* Floor line */}
      <line x1="40" y1="370" x2="480" y2="370" stroke="#0057FF" strokeWidth="1" opacity="0.2"/>
      <rect x="60" y="300" width="100" height="70" rx="0" fill="#0d2a5e" opacity="0.4"/>
      <rect x="360" y="300" width="90" height="70" rx="0" fill="#0d2a5e" opacity="0.4"/>
    </svg>
  );
}