import React from "react";

export default function StackImage({
  children,
  titleTech,
}: {
  children: React.ReactNode;
  titleTech: string;
}) {
  return (
    <section className="bg-slate-100 dark:bg-slate-900 flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium py-2.5 px-4 w-fit rounded-full">
      {children} {titleTech}
    </section>
  );
}
