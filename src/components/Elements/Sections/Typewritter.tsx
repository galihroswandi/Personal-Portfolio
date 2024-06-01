"use client";
import { Typewriter } from "react-simple-typewriter";

export default function Typewritter({ text }: { text: Array<string> }) {
  return (
    <Typewriter
      words={text}
      loop={5}
      cursor
      cursorStyle="|"
      typeSpeed={70}
      deleteSpeed={50}
      delaySpeed={1000}
    />
  );
}
