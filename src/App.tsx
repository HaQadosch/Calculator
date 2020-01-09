import React from 'react';
import './reset.css'
import './App.css';
import './Buttons/buttons.css'

import { Equals } from "./Buttons/Equals";
import { Digits } from "./Buttons/Digits";
import { OpAdd, OpDivide, OpMultiply, OpSubtract } from "./Buttons/Ops";
import { Decimal } from "./Buttons/Decimal";
import { Clear } from "./Buttons/Clear";
import { Display } from "./Display/Display";

export const App: React.FC = () => {
  return (
    <main className="App">
      <Display />
      <section id="pad">
        <Digits />
        <Decimal />
        <OpAdd />
        <OpSubtract />
        <OpMultiply />
        <OpDivide />
        <Clear />
        <Equals />
      </section>
    </main>
  );
}
