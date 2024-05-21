export default function HeaderMain() {
  return (
    <header className="border-b border-slate-600 border-dashed py-4 md:py-6 mb-6">
      <TextTitle textname={`Hi, I${"'"}m Galih Roswandi`} />
      <section className="profesional flex items-center gap-7 px-3 mb-3 md:mb-5">
        <List textname="Software Engineer" />
        <List textname="Based In Tasikmalaya" />
      </section>
      <p className="text-sm md:text-base text-slate-600">
        Enthusiastic to continue working in the field of technology, especially
        websites. Experienced in creating websites that focus on frontend
        development.
      </p>
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

const List = (props: { textname: string }) => {
  return (
    <ul className="list-disc">
      <li className="text-sm md:text-base text-slate-600">{props.textname}</li>
    </ul>
  );
};
