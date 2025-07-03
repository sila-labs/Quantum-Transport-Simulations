import { useState } from "react";
import SimulationForm from "./components/SimulationForm";
import PlotDisplay from "./components/PlotDisplay";
import './styles.css';
import DeviceDiagram from "./components/DeviceDiagram";

export default function App() {
  const [conductancePlot, setConductancePlot] = useState(null);
  const [wavefunctionPlot, setWavefunctionPlot] = useState(null);
  const [wavefunctionEigenvalue, setWavefunctionEigenvalue] = useState(null);

  return (
    <div className="app-wrapper">
      <h1>Quantum Transport Simulator</h1>
      <div className="container">
        <div className="panel">
          <SimulationForm
            setConductancePlot={setConductancePlot}
            setWavefunctionPlot={setWavefunctionPlot}
            setWavefunctionEigenvalue={setWavefunctionEigenvalue}
          />
        </div>
        <div className="panel">
          <DeviceDiagram />
          <div className="container">
            {/* Your panels */}
          </div>
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
