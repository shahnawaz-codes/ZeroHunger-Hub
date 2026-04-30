import { Navbar } from "@/components/Navbar";

export default function AppLayout({ children }) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
