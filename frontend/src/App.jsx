import { useState } from "react";
import SimulationForm from "./components/SimulationForm";
import PlotDisplay from "./components/PlotDisplay";

export default function App() {
  const [plot, setPlot] = useState(null);

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800 p-10 flex flex-col items-center space-y-10 font-serif">
      <h1 className="text-4xl font-bold text-rose-700">Quantum Transport Simulator</h1>
      <SimulationForm setPlot={setPlot} />
      <PlotDisplay plot={plot} />
    </div>
  );
}
