import React from "react";

export default function StackImage({
  children,
  titleTech,
}: {
  children: React.ReactNode;
  titleTech: string;
}) {
  return (
    <section className="bg-slate-100 flex items-center gap-2 text-slate-600 font-medium py-2.5 px-4 w-fit rounded-full">
      {children} {titleTech}
    </section>
  );
}
