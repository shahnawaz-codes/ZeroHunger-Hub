import RoleGuard from "@/components/guard/roleGuard";
import { Navbar } from "@/components/layout/Navbar";
export const metadata = {
  title: "ZeroHunger — Find discounted food",
  description: "Browse surplus meals from restaurants near you",
};
export default function AppLayout({ children }) {
  return (
    <RoleGuard allowedRole="user">
      <Navbar />
      {children}
    </RoleGuard>
  );
}
