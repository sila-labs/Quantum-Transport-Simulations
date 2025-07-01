import { useState } from "react";
import SimulationForm from "./components/SimulationForm";
import PlotDisplay from "./components/PlotDisplay";

export default function App() {
  const [conductancePlot, setConductancePlot] = useState(null);
  const [wavefunctionPlot, setWavefunctionPlot] = useState(null);
  const [wavefunctionEigenvalue, setWavefunctionEigenvalue] = useState(null); // NEW

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800 p-10 flex flex-col items-center space-y-10 font-serif">
      <h1 className="text-4xl font-bold text-rose-700">Quantum Transport Simulator</h1>
      <SimulationForm
        setConductancePlot={setConductancePlot}
        setWavefunctionPlot={setWavefunctionPlot}
        setWavefunctionEigenvalue={setWavefunctionEigenvalue} // NEW
      />
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
  );
}
