import React from "react";
import Brand from "./Brand";
import Button from "./Button";
import Horizontal from "./Horizontal";

const Navlink = () => {
  return (
    <nav className="border-y border-y-slate-900 mt-3 py-2 flex justify-between">
      <Brand title="galihroswandi" />
      <Button>
        <Horizontal />
        <Horizontal />
      </Button>
    </nav>
  );
};

export default Navlink;
