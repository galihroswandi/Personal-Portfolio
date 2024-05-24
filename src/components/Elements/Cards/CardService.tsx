import { TextHeaderWithIcon } from "../Sections/HeaderContent";

export default function CardService({
  title,
  children,
  desc,
}: {
  title: string;
  children: React.ReactNode;
  desc: string;
}) {
  return (
    <section className="bg-slate-100 dark:bg-slate-900 w-fit p-4 sm:p-5 rounded">
      <TextHeaderWithIcon
        title={title}
        desc=""
        customClassTitle="text-base font-medium"
      >
        {children}
      </TextHeaderWithIcon>
      <p className="text-sm text-slate-600 dark:text-slate-500 mt-2">{desc}</p>
    </section>
  );
}
