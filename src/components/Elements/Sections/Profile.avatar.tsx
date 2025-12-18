import Image from "next/image";
import DarkLight from "./DarkLight";

export default function ProfileAvatar() {
  return (
    <>
      <section className="w-full relative hidden lg:block">
        <div className="inverted w-full h-24"></div>
        <DarkLight
          borderLeft={false}
          customParentClass="text-slate-600 dark:text-slate-100 absolute top-1 right-1"
        />
      </section>

      {/* https://corner-inverter.douiri.org/ */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="block absolute"
        width="0"
        height="0"
      >
        <defs>
          <clipPath id="clip" clipPathUnits="objectBoundingBox">
            <path d="M0.05,0H0.8A0.05,0.1,0,0,1,0.85,0.1V0.2A0.05,0.1,0,0,0,0.9,0.3H0.95A0.05,0.1,0,0,1,1,0.4V0.9A0.05,0.1,0,0,1,0.95,1H0.05A0.05,0.1,0,0,1,0,0.9V0.1A0.05,0.1,0,0,1,0.05,0Z" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
}
