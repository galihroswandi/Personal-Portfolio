import Image from "next/image";
import ButtonWithImage from "../Buttons/ButtonWithImage";

export default function HeaderContent() {
  return (
    <section className="text-slate-600 flex justify-between items-center gap-2 mb-5">
      <TextHeaderWithIcon title="Career" desc="My professional career journey">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
            clipRule="evenodd"
          />
          <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
        </svg>
      </TextHeaderWithIcon>
      <ButtonWithImage
        useButton={false}
        linkUrl="https://www.cakeresume.com/pdf/s--tBeLbuI1RntBOWKzRq21Gg--/7E8Nz.pdf"
        customParentClass={`flex items-center gap-2`}
      >
        <section className="border-b-2 border-slate-600 px-0.5">
          <Image
            src={"/icons/arrow-bottom.svg"}
            width={20}
            height={20}
            alt="download icon"
            className="w-3.5 animate-bounce transition duration-500"
          />
        </section>
        <span className="text-base">Download CV</span>
      </ButtonWithImage>
    </section>
  );
}

export const TextHeaderWithIcon = ({
  children,
  title,
  desc,
  customClassTitle = "text-xl md:text-2xl font-semibold",
}: {
  children: React.ReactNode;
  title: string;
  desc: string;
  customClassTitle?: string;
}) => {
  return (
    <section className="text-slate-600">
      <section className="flex items-center gap-2 mb-1">
        {children}
        <h1 className={`${customClassTitle} text-slate-600`}>{title}</h1>
      </section>
      <p className="text-sm md:text-base">{desc}</p>
    </section>
  );
};
