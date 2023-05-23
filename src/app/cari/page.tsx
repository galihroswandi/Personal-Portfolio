"use client";

import { useState } from "react";
import SectionResult from "./sectionResult";

const Cari = () => {
  const [query, setQuery] = useState("");
  const onSearch = (e: any) => {
    e.preventDefault();
    setQuery(e.target[0].value);
  };
  return (
    <div onSubmit={onSearch} className="min-h-screen">
      <form className="flex gap-x-5 mt-10 ml-10">
        <input
          type="text"
          placeholder="Cari user github"
          autoFocus
          className="ring ring-indigo-500 rounded-md px-5 py-2"
        />
        <button
          type="submit"
          className="py-1 px-5 bg-indigo-400 rounded-md text-slate-50"
        >
          Cari Orang
        </button>
      </form>
      {query && <SectionResult query={query} />}
    </div>
  );
};
export default Cari;
