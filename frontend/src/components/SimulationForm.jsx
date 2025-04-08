import React, { useState } from "react";
import axios from "axios";

const SimulationForm = ({ setPlot }) => {
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(10);
  const [disorder_strength, setDisorderStrength] = useState(0.5);
  const [magnetic_field, setMagneticField] = useState(0.1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/simulate", {
        length,
        width,
        disorder_strength,
        magnetic_field,
      });
      setPlot(response.data.plot);
    } catch (error) {
      console.error("Simulation failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-6 w-full max-w-md border border-amber-200"
    >
      <h2 className="text-xl font-semibold text-center text-rose-600">Adjust Simulation Settings</h2>

      {/* Length */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Length: <span className="font-semibold text-rose-600">{length}</span>
        </label>
        <input
          type="range"
          min="5"
          max="50"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Width: <span className="font-semibold text-rose-600">{width}</span>
        </label>
        <input
          type="range"
          min="5"
          max="50"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Disorder Strength */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Disorder Strength: <span className="font-semibold text-rose-600">{disorder_strength.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={disorder_strength}
          onChange={(e) => setDisorderStrength(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Magnetic Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Magnetic Field: <span className="font-semibold text-rose-600">{magnetic_field.toFixed(2)}</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={magnetic_field}
          onChange={(e) => setMagneticField(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition-all duration-200"
      >
        Run Simulation
      </button>
    </form>
  );
};

export default SimulationForm;
