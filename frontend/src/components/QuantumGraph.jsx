import React, { useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

const QuantumGraph = () => {
  const fgRef = useRef();

  const data = {
    nodes: [
      { id: "node1" },
      { id: "node2" }
    ],
    links: [
      { source: "node1", target: "node2" }
    ]
  };

  // Force dimensions when mounted
  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.width = 800;
      fgRef.current.height = 600;
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
      {/* Outer div controls border and padding */}
      <div className="p-4 border-8 border-red-500 bg-white rounded-xl shadow-xl">
        {/* Inner div constrains graph size */}
        <div className="w-[800px] h-[600px]">
          <ForceGraph2D
            ref={fgRef}
            graphData={data}
            width={800}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default QuantumGraph;
