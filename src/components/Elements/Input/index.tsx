import React from "react";

export default function Input({
  type,
  name,
  placeholder,
}: {
  type: string;
  name: string;
  placeholder: string;
}) {
  return (
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      autoComplete="off"
      className="border border-slate-800 placeholder:text-slate-500 text-slate-800 py-2 px-4 bg-transparent focus:outline-none rounded-sm"
    />
  );
}
