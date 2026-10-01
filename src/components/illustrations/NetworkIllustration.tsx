export default function NetworkIllustration() {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
      <rect width="400" height="300" fill="#f8f9fa" rx="16"/>
      {/* Central node */}
      <circle cx="200" cy="150" r="32" fill="#0057FF" opacity="0.12"/>
      <circle cx="200" cy="150" r="20" fill="#0057FF" opacity="0.25"/>
      <circle cx="200" cy="150" r="10" fill="#0057FF"/>
      {/* Pulse rings */}
      <circle cx="200" cy="150" r="44" fill="none" stroke="#0057FF" strokeWidth="1" opacity="0.3"/>
      <circle cx="200" cy="150" r="58" fill="none" stroke="#0057FF" strokeWidth="0.5" opacity="0.15"/>

      {/* Satellite nodes */}
      <circle cx="80" cy="80" r="16" fill="#0a1f44" stroke="#0057FF" strokeWidth="1.5"/>
      <circle cx="80" cy="80" r="7" fill="#0057FF" opacity="0.7"/>
      <circle cx="320" cy="80" r="16" fill="#0a1f44" stroke="#0057FF" strokeWidth="1.5"/>
      <circle cx="320" cy="80" r="7" fill="#0057FF" opacity="0.7"/>
      <circle cx="80" cy="220" r="16" fill="#0a1f44" stroke="#f5a623" strokeWidth="1.5"/>
      <circle cx="80" cy="220" r="7" fill="#f5a623" opacity="0.7"/>
      <circle cx="320" cy="220" r="16" fill="#0a1f44" stroke="#f5a623" strokeWidth="1.5"/>
      <circle cx="320" cy="220" r="7" fill="#f5a623" opacity="0.7"/>
      <circle cx="200" cy="40" r="14" fill="#0a1f44" stroke="#0057FF" strokeWidth="1.5"/>
      <circle cx="200" cy="40" r="6" fill="#0057FF" opacity="0.7"/>
      <circle cx="200" cy="260" r="14" fill="#0a1f44" stroke="#0057FF" strokeWidth="1.5"/>
      <circle cx="200" cy="260" r="6" fill="#0057FF" opacity="0.7"/>

      {/* Connecting lines */}
      <line x1="200" y1="150" x2="80" y2="80" stroke="#0057FF" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.5"/>
      <line x1="200" y1="150" x2="320" y2="80" stroke="#0057FF" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.5"/>
      <line x1="200" y1="150" x2="80" y2="220" stroke="#f5a623" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.5"/>
      <line x1="200" y1="150" x2="320" y2="220" stroke="#f5a623" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.5"/>
      <line x1="200" y1="150" x2="200" y2="40" stroke="#0057FF" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.5"/>
      <line x1="200" y1="150" x2="200" y2="260" stroke="#0057FF" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.5"/>

      {/* Data packets on lines */}
      <circle cx="140" cy="115" r="5" fill="#0057FF" opacity="0.8"/>
      <circle cx="260" cy="115" r="5" fill="#0057FF" opacity="0.8"/>
      <circle cx="140" cy="185" r="5" fill="#f5a623" opacity="0.8"/>
      <circle cx="260" cy="185" r="5" fill="#f5a623" opacity="0.8"/>
    </svg>
  );
}