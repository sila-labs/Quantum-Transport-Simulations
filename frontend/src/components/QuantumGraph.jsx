// frontend/src/components/QuantumGraph.jsx
import React, { useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";

const QuantumGraph = ({ graphRef, nodeSize }) => {
  const data = {
    nodes: [
      { id: "node1" },
      { id: "node2" }
    ],
    links: [
      { source: "node1", target: "node2" }
    ]
  };

  return (
    <div className="w-full h-screen bg-white">
      <ForceGraph2D
        ref={graphRef}
        graphData={data}
        nodeCanvasObject={(node, ctx) => {
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI, false);
          ctx.fillStyle = "blue";
          ctx.fill();
        }}
      />
    </div>
  );
};

export default QuantumGraph;
