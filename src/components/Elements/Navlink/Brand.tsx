import Link from "next/link";

interface Props {
  title: string;
}

const Brand = (props: Props) => {
  const { title } = props;
  return (
    <Link
      href="/"
      className="font-Sharp-bold-10 text-2xl bg-clip-text  text-transparent bg-gradient-to-r from-pink-600 to-[#5961F9]"
    >
      {title}
    </Link>
  );
};

export default Brand;
