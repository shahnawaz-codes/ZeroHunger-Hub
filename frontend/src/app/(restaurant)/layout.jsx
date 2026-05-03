import RoleGuard from "@/components/guard/roleGuard";

export default function restaurantLayout({ children }) {
  return <RoleGuard allowedRole="restaurant">{children}</RoleGuard>;
}
