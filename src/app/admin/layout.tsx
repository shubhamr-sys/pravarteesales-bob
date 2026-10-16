export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Site Navbar/Footer hide themselves on /admin/* so Logout is not covered.
  return <>{children}</>;
}
