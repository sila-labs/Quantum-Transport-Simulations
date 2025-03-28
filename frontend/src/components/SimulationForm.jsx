import React, { useState } from "react";
import axios from "axios";

const SimulationForm = () => {
  const [form, setForm] = useState({
    length: 10,
    width: 5,
    disorder_strength: 0.1,
    magnetic_field: 0.0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post("http://localhost:8000/simulate", form);
      setResult(res.data);
    } catch (error) {
      console.error("Simulation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center p-8 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl border-2 border-indigo-300">
        <h1 className="text-3xl font-extrabold text-center mb-10 text-indigo-800 tracking-wide">
          Quantum Transport Simulation
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          {[ 
            { label: "Length", name: "length" },
            { label: "Width", name: "width" },
            { label: "Disorder Strength", name: "disorder_strength", step: "0.01" },
            { label: "Magnetic Field", name: "magnetic_field", step: "0.01" },
          ].map(({ label, name, step }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="text-md font-semibold text-gray-700 mb-1">
                {label}
              </label>
              <input
                type="number"
                id={name}
                name={name}
                step={step || "1"}
                value={form[name]}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-200 text-lg"
          >
            {loading ? "Running..." : "Run Simulation"}
          </button>
        </form>

        {result?.plot && (
          <div className="mt-10 text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Simulation Result</h2>
            <img
              src={`data:image/png;base64,${result.plot}`}
              alt="Conductance Plot"
              className="mx-auto border-4 border-indigo-300 rounded-xl shadow-xl"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationForm;
