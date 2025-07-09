import React, { useState } from "react";
import axios from "axios";

const SimulationForm = ({ setConductancePlot, setWavefunctionPlot, setWavefunctionEigenvalue }) => {
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(10);
  const [disorder_strength, setDisorderStrength] = useState(0.5);
  const [magnetic_field, setMagneticField] = useState(0.1);
  const [eig_index, setEigIndex] = useState(0);
  const [target_energy, setTargetEnergy] = useState(0.0);  // NEW

  const handleSimulation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8001/simulate", {
      //const response = await axios.post("/qtransport/api/simulate", {
        length,
        width,
        disorder_strength,
        magnetic_field,
      });

      setConductancePlot(response.data.plot);
    } catch (error) {
      console.error("Simulation failed:", error);
    }
  };

 const handleEigenstate = async () => {
    try {
      const response = await axios.post("http://localhost:8001/eigenstate", {
      //const response = await axios.post("/qtransport/api/eigenstate", {
        length,
        width,
        disorder_strength,
        magnetic_field,
        target_energy,
      });

      setWavefunctionPlot(response.data.plot);
      setWavefunctionEigenvalue(response.data.eigenvalue);
    } catch (error) {
      console.error("Eigenstate fetch failed:", error);
    }
  };


  return (
    <form
      onSubmit={handleSimulation}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-6 w-full max-w-md border border-amber-200"
    >
      <h2 className="text-xl font-semibold text-center text-rose-600">Adjust Simulation Settings</h2>

      {/* Length */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Length: <span className="font-semibold text-rose-600">{length}</span>
        </label>
        <input type="range" min="5" max="50" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
      </div>

      {/* Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Width: <span className="font-semibold text-rose-600">{width}</span>
        </label>
        <input type="range" min="5" max="50" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full" />
      </div>

      {/* Disorder Strength */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Disorder Strength: <span className="font-semibold text-rose-600">{disorder_strength.toFixed(2)}</span>
        </label>
        <input type="range" min="0" max="1" step="0.01" value={disorder_strength} onChange={(e) => setDisorderStrength(Number(e.target.value))} className="w-full" />
      </div>

      {/* Magnetic Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Magnetic Field: <span className="font-semibold text-rose-600">{magnetic_field.toFixed(2)}</span>
        </label>
        <input type="range" min="0" max="1" step="0.01" value={magnetic_field} onChange={(e) => setMagneticField(Number(e.target.value))} className="w-full" />
      </div>

      {/* Target Energy */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Target Energy: <span className="font-semibold text-rose-600">{target_energy.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="-3"
          max="3"
          step="0.05"
          value={target_energy}
          onChange={(e) => setTargetEnergy(Number(e.target.value))}
          className="w-full"
        />
      </div>


      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-all duration-200"
        >
          Run Conductance
        </button>
        <button
          type="button"
          onClick={handleEigenstate}
          className="flex-1 bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 transition-all duration-200"
        >
          View Eigenstate
        </button>
      </div>
    </form>
  );
};

export default SimulationForm;
