import React from "react";
import { Counter } from "./features/counter/Counter";

export const App = () => {
  return (
    <div className="p-0 m-0">
      <header className="w-full mb-10 text-center p-7 bg-gradient-to-r from-green-400 to-teal-900">
        On This Day - Births
      </header>
      <Counter />
    </div>
  );
};
