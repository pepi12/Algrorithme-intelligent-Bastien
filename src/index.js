import React from "react";
import { render } from "react-dom";
import './index.css';
import GestionGraphs from './component/GestionGraphs';

render(
  <div className="monApp">
    <GestionGraphs nbGraphs={10}/>
  </div>,
  document.getElementById("root")
);
