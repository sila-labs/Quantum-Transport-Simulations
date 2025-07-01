const PlotDisplay = ({ plot, title, subtitle }) => {
  if (!plot) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-amber-200">
      <h2 className="text-lg font-semibold text-center text-rose-600 mb-1">
        {title}
      </h2>
      {subtitle && (
        <p className="text-center text-gray-600 text-sm mb-4">{subtitle}</p>
      )}
      <img
        src={`data:image/png;base64,${plot}`}
        alt={title}
        className="w-full max-w-xl mx-auto rounded-lg border"
      />
    </div>
  );
};

export default PlotDisplay;
