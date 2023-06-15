import React from "react";

export default function SkillSection({ text }: { text: string }) {
  return (
    <span className="border rounded-full py-1 px-4 border-slate-800">
      {text}
    </span>
  );
}
