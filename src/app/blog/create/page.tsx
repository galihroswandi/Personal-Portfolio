import Navbar from "@/components/Fragments/Navbar";
import QuillEditor from "@/components/Fragments/QuillEditor";
import Sidebar from "@/components/Fragments/Sidebar";
import ParticlesBackground from "@/utils/ParticlesBackground";

export default function page() {
  return (
    <>
      <ParticlesBackground customParentClass="hidden dark:block" />
      <section className="relative md:px-5 lg:px-14 xl:max-w-[85%] mx-auto overflow-x-hidden">
        <Navbar />
        <Sidebar />
        <main className="w-full px-5 md:pl-20 lg:pl-72 lg:py-3 pb-20">
          <QuillEditor />
        </main>
      </section>
    </>
  );
}
