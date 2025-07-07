// src/App.jsx

import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import SimulationForm from "./components/SimulationForm";
import PlotDisplay from "./components/PlotDisplay";
import DeviceDiagram from "./components/DeviceDiagram";
import "./styles.css";

export default function App() {
  const [conductancePlot, setConductancePlot] = useState(null);
  const [wavefunctionPlot, setWavefunctionPlot] = useState(null);
  const [wavefunctionEigenvalue, setWavefunctionEigenvalue] = useState(null);

  // Mobile breakpoint: 768px and below
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="app-wrapper">
      <h1>Quantum Transport Simulator V 2.0</h1>

      <div
        className="container"
        style={{ flexDirection: isMobile ? "column" : "row" }}
      >
        {/* LEFT (or Top) Panel */}
        <div
          className="panel"
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <SimulationForm
            setConductancePlot={setConductancePlot}
            setWavefunctionPlot={setWavefunctionPlot}
            setWavefunctionEigenvalue={setWavefunctionEigenvalue}
          />
          <DeviceDiagram />
        </div>

        {/* RIGHT (or Bottom) Panel */}
        <div className="panel" style={{ flex: "1" }}>
          <PlotDisplay plot={conductancePlot} title="Conductance vs Energy" />
          <PlotDisplay
            plot={wavefunctionPlot}
            title="Wavefunction |ψ(x, y)|²"
            subtitle={
              wavefunctionEigenvalue !== null
                ? `Eigenvalue: E = ${wavefunctionEigenvalue.toFixed(4)}`
                : ""
            }
          />
        </div>
      </div>
    </div>
  );
}
