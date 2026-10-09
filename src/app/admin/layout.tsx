export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Admin pages are completely standalone — no site Navbar or Footer
  return <>{children}</>;
}
