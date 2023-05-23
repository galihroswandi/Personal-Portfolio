"use client";
import { useState } from "react";

const Calculator = () => {
  const [angka1, setAngka1] = useState(0);
  const [angka2, setAngka2] = useState(0);

  return (
    <div className="min-h-screen flex flex-col gap-2 w-52">
      <input
        type="number"
        placeholder="Angka1"
        onChange={(e) => setAngka1(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Angka2"
        onChange={(e) => setAngka2(Number(e.target.value))}
      />
      <p>Hasil : {angka1 + angka2}</p>
    </div>
  );
};

export default Calculator;
