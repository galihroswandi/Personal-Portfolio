import DarkLight from "./DarkLight";

export default function ProfileAvatar() {
  return (
    <>
      <section className="w-full relative hidden lg:block header">
        <div className="hexagone w-full h-24 rounded-xl"></div>
        <DarkLight
          borderLeft={false}
          customParentClass="text-slate-600 dark:text-slate-100 absolute top-0.5 right-1"
        />
      </section>

      <svg
        style={{ visibility: "hidden", position: "absolute" }}
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="round">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
