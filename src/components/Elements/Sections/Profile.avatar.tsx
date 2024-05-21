import DarkLight from "./DarkLight";

export default function ProfileAvatar() {
  return (
    <section className="hidden lg:flex justify-end items-start header w-full h-24 bg-gradient-to-r from-primary-green to-primary-blue rounded-xl ">
      <DarkLight borderLeft={false} customParentClass="text-slate-100" />
    </section>
  );
}
