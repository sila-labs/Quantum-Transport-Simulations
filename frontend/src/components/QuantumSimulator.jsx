// src/components/QuantumSimulator.jsx
import React, { useState } from "react";
import axios from "axios";

const QuantumSimulator = () => {
  const [form, setForm] = useState({
    length: 10,
    width: 5,
    disorder_strength: 0.5,
    magnetic_field: 0.1,
  });

  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/simulate", form);
      setPlot(response.data.plot);
    } catch (error) {
      console.error("Simulation failed:", error);
    }
    setLoading(false);
  };

  return (
    
    <div className="max-w-4xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 bg-gray-100 p-6 rounded-lg shadow"
      >
        {Object.keys(form).map((key) => (
          <label key={key} className="flex flex-col">
            {key.replace("_", " ").toUpperCase()}
            <input
              type="number"
              step="any"
              name={key}
              value={form[key]}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
        ))}
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Run Simulation
        </button>
      </form>

      {loading && <p className="mt-6 text-center">Running simulation...</p>}

      {plot && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Conductance vs Energy</h2>
          <img
            src={`data:image/png;base64,${plot}`}
            alt="Conductance Plot"
            className="mx-auto border border-gray-300 rounded"
          />
        </div>
      )}
    </div>
  );
};

export default QuantumSimulator;
