import Navbar from "@/components/Fragments/Navbar";
import Sidebar from "@/components/Fragments/Sidebar";

export default function Home() {
  return (
    <section className="relative md:px-5 lg:px-14 xl:max-w-[85%] mx-auto">
      <Navbar />
      <Sidebar />
      <main className="w-full h-[200vh] p-4 md:pl-20 lg:pl-72 lg:py-9">
        <section className="w-full h-screen">
          <h1>Header Testing</h1>
        </section>
      </main>
    </section>
  );
}
