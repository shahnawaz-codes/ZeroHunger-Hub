import { Navbar } from "@/components/layout/Navbar";

export default function AppLayout({ children }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
