export default function GovtBuildingIllustration() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      {/* Sky */}
      <rect width="400" height="300" fill="#0a1f44"/>
      {/* Stars */}
      <circle cx="30" cy="20" r="1.5" fill="white" opacity="0.6"/>
      <circle cx="80" cy="40" r="1" fill="white" opacity="0.5"/>
      <circle cx="340" cy="25" r="1.5" fill="white" opacity="0.6"/>
      <circle cx="370" cy="50" r="1" fill="white" opacity="0.4"/>
      <circle cx="150" cy="15" r="1" fill="white" opacity="0.5"/>
      <circle cx="290" cy="35" r="1.5" fill="white" opacity="0.6"/>

      {/* Main building body */}
      <rect x="80" y="130" width="240" height="140" fill="#0d2a5e" stroke="#0057FF" strokeWidth="1.5"/>
      {/* Pillars */}
      <rect x="95" y="130" width="18" height="140" fill="#0a1f44" stroke="#0057FF" strokeWidth="1"/>
      <rect x="140" y="130" width="18" height="140" fill="#0a1f44" stroke="#0057FF" strokeWidth="1"/>
      <rect x="185" y="130" width="18" height="140" fill="#0a1f44" stroke="#0057FF" strokeWidth="1"/>
      <rect x="230" y="130" width="18" height="140" fill="#0a1f44" stroke="#0057FF" strokeWidth="1"/>
      <rect x="287" y="130" width="18" height="140" fill="#0a1f44" stroke="#0057FF" strokeWidth="1"/>

      {/* Roof / Portico */}
      <polygon points="60,130 340,130 320,105 80,105" fill="#0d3a7a" stroke="#0057FF" strokeWidth="1.5"/>
      {/* Dome */}
      <ellipse cx="200" cy="95" rx="50" ry="30" fill="#0d2a5e" stroke="#f5a623" strokeWidth="2"/>
      <ellipse cx="200" cy="85" rx="30" ry="18" fill="#0a1f44" stroke="#f5a623" strokeWidth="1.5"/>
      {/* Flag */}
      <line x1="200" y1="67" x2="200" y2="35" stroke="#f5a623" strokeWidth="2"/>
      <polygon points="200,35 225,43 200,51" fill="#f5a623"/>

      {/* Windows with light */}
      <rect x="100" y="148" width="24" height="20" rx="2" fill="#f5a623" opacity="0.3"/>
      <rect x="145" y="148" width="24" height="20" rx="2" fill="#f5a623" opacity="0.5"/>
      <rect x="190" y="148" width="24" height="20" rx="2" fill="#0057FF" opacity="0.6"/>
      <rect x="235" y="148" width="24" height="20" rx="2" fill="#f5a623" opacity="0.4"/>
      <rect x="280" y="148" width="24" height="20" rx="2" fill="#f5a623" opacity="0.3"/>

      <rect x="100" y="182" width="24" height="20" rx="2" fill="#0057FF" opacity="0.4"/>
      <rect x="145" y="182" width="24" height="20" rx="2" fill="#f5a623" opacity="0.3"/>
      <rect x="190" y="182" width="24" height="20" rx="2" fill="#f5a623" opacity="0.5"/>
      <rect x="235" y="182" width="24" height="20" rx="2" fill="#0057FF" opacity="0.5"/>
      <rect x="280" y="182" width="24" height="20" rx="2" fill="#f5a623" opacity="0.4"/>

      {/* Door */}
      <rect x="180" y="225" width="40" height="45" rx="20" fill="#0a1f44" stroke="#f5a623" strokeWidth="1.5"/>
      <circle cx="215" cy="250" r="3" fill="#f5a623"/>

      {/* Steps */}
      <rect x="140" y="268" width="120" height="8" rx="1" fill="#0d3a7a" stroke="#0057FF" strokeWidth="1"/>
      <rect x="120" y="275" width="160" height="8" rx="1" fill="#0d3a7a" stroke="#0057FF" strokeWidth="1"/>

      {/* Ground */}
      <rect x="0" y="282" width="400" height="18" fill="#071428"/>

      {/* Light glow under dome */}
      <ellipse cx="200" cy="130" rx="60" ry="8" fill="#0057FF" opacity="0.15"/>
    </svg>
  );
}