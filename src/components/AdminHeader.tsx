"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";

interface Props {
  onLogout?: () => void;
}

export default function AdminHeader({ onLogout }: Props) {
  return (
    <div className="bg-[#0A1F44] text-white px-6 py-4 flex items-center justify-between gap-4">
      <Link href="/" className="flex items-center shrink-0">
        <Image
          src="/logo-white.png"
          alt="Pravartee Sales"
          width={160}
          height={48}
          className="h-9 w-auto object-contain"
          priority
        />
      </Link>
      {onLogout && (
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-3 py-1.5 rounded-lg transition-all duration-200"
        >
          <LogOut size={15} /> Logout
        </button>
      )}
    </div>
  );
}
