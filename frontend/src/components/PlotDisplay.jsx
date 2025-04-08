const PlotDisplay = ({ plot }) => {
    if (!plot) return null;
  
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-amber-200">
        <h2 className="text-lg font-semibold text-center text-rose-600 mb-4">
          Simulation Result
        </h2>
        <img
          src={`data:image/png;base64,${plot}`}
          alt="Quantum Simulation Result"
          className="w-full max-w-xl mx-auto rounded-lg border"
        />
      </div>
    );
  };
  
  export default PlotDisplay;
  