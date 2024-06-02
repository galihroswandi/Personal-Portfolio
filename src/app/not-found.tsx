import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col justify-center items-center">
      <Image src={"/img/404.png"} alt="404" width={500} height={500} />
      <section>
        <Link href="/" className="text-slate-600 flex gap-2 items-center group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-arrow-left group-hover:-translate-x-4 transition-transform duration-500"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Go back to Home
        </Link>
      </section>
    </section>
  );
}
