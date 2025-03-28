// frontend/src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ onResetView, nodeSize, setNodeSize }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Graph Controls</h2>
      
      <button
        onClick={onResetView}
        className="block w-full mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Reset View
      </button>

      <label className="block mb-2 text-sm font-medium">Node Size: {nodeSize}</label>
      <input
        type="range"
        min="1"
        max="20"
        value={nodeSize}
        onChange={(e) => setNodeSize(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
};

export default Sidebar;
