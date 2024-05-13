import Navbar from "@/components/Fragments/Navbar";
import Sidebar from "@/components/Fragments/Sidebar";

export default function Home() {
  return (
    <section className="relative px-5">
      <Navbar />
      <Sidebar />
    </section>
  );
}
