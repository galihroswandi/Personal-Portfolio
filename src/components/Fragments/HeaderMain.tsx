export default function HeaderMain({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-slate-600 border-dashed py-4 md:py-6 mb-6">
      <TextTitle textname={title} />
      {children}
      <p className="text-sm md:text-base text-slate-600">{desc}</p>
    </header>
  );
}

const TextTitle = (props: { textname: string }) => {
  return (
    <h1 className="text-2xl md:text-3xl font-semibold text-slate-600 mb-0.5 md:mb-2">
      {props.textname}
    </h1>
  );
};
