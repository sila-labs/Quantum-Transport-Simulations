// src/components/DeviceDiagram.jsx
const DeviceDiagram = () => {
  return (
    <div className="panel">
      <h2>Quantum Transport Setup</h2>
      <svg
        width="100%"
        height="150"
        viewBox="0 0 650 150"
        xmlns="http://www.w3.org/2000/svg"
        >
        {/* Left Lead */}
        <rect x="0" y="40" width="100" height="70" fill="#45a29e" />
        <text x="10" y="30" fill="#c5c6c7" fontSize="14">Source (Left Lead)</text>

        {/* Right Lead */}
        <rect x="550" y="40" width="100" height="70" fill="#66fcf1" />
        <text x="500" y="30" fill="#c5c6c7" fontSize="14">Drain (Right Lead)</text>

        {/* Scattering Region */}
        <rect x="100" y="40" width="450" height="70" fill="#1f2833" stroke="#00AAFF" strokeWidth="2" />
        <text x="110" y="130" fill="#c5c6c7" fontSize="14">Scattering Region (Disordered / Magnetized Lattice)</text>

        {/* Arrows for electron flow */}
        <polygon points="120,75 140,65 140,85" fill="#00AAFF" />
        <polygon points="280,75 300,65 300,85" fill="#00AAFF" />
        <polygon points="440,75 460,65 460,85" fill="#00AAFF" />

        {/* Optional magnetic field label */}
        <text x="310" y="20" fill="#7CFC00" fontSize="12">B →</text>
        </svg>


      <p style={{ marginTop: '10px', fontSize: '13px', color: '#c5c6c7' }}>
        This simulation models quantum electron transport through a finite two-dimensional lattice 
        (tight-binding model), which represents a nanoscale conductor or material sample.
        Electrons enter the system from the source lead (left), traverse the scattering region
        (which may include disorder and magnetic field effects), and exit through the drain lead (right).
        The scattering region mimics a physical medium such as a nanowire, graphene flake, or quantum Hall bar,
        depending on the parameters set.
        </p>
    </div>
  );
};

export default DeviceDiagram;
