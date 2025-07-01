from fastapi import FastAPI
from pydantic import BaseModel
import kwant
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import io
import base64
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for all origins (adjust as needed for security)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use ["http://localhost:5173"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Request Models ----------

class SimulationRequest(BaseModel):
    length: int
    width: int
    disorder_strength: float
    magnetic_field: float  # Peierls phase parameter (φ)

class EigenstateRequest(SimulationRequest):
    eig_index: int = 0

# ---------- System Builder Function ----------

def make_system(length, width, disorder_strength, magnetic_field):
    lat = kwant.lattice.square()
    syst = kwant.Builder()

    for x in range(length):
        for y in range(width):
            onsite_energy = disorder_strength * (2 * np.random.rand() - 1)
            syst[lat(x, y)] = onsite_energy

            # Hopping in x-direction
            if x > 0:
                syst[lat(x - 1, y), lat(x, y)] = -1

            # Hopping in y-direction with Peierls phase
            if y > 0:
                phase = np.exp(1j * 2 * np.pi * magnetic_field * x)
                syst[lat(x, y - 1), lat(x, y)] = -1 * phase

    # Define lead
    lead = kwant.Builder(kwant.TranslationalSymmetry((-1, 0)))
    for y in range(width):
        lead[lat(0, y)] = 0
        lead[lat(0, y), lat(1, y)] = -1
        if y > 0:
            lead[lat(0, y - 1), lat(0, y)] = -1

    syst.attach_lead(lead)
    syst.attach_lead(lead.reversed())

    return syst

# ---------- Simulation Endpoint ----------

@app.post("/simulate")
async def simulate(request: SimulationRequest):
    syst = make_system(
        request.length,
        request.width,
        request.disorder_strength,
        request.magnetic_field,
    )
    system = syst.finalized()

    # Energy sweep
    energies = np.linspace(-3, 3, 100)
    conductance = []
    for E in energies:
        smatrix = kwant.smatrix(system, E)
        conductance.append(smatrix.transmission(1, 0))

    # Plot conductance
    plt.figure(figsize=(6, 4))
    plt.plot(energies, conductance, label="Conductance")
    plt.xlabel("Energy (E)")
    plt.ylabel("Conductance (e²/h)")
    plt.title("Quantum Transport Simulation")
    plt.legend()
    plt.grid()

    img_io = io.BytesIO()
    plt.savefig(img_io, format="png")
    img_io.seek(0)
    img_base64 = base64.b64encode(img_io.read()).decode("utf-8")
    plt.close()

    return {
        "energies": list(energies),
        "conductance": conductance,
        "plot": img_base64
    }

# ---------- Eigenstate Viewer Endpoint ----------

@app.post("/eigenstate")
async def eigenstate(request: EigenstateRequest):
    syst = make_system(
        request.length,
        request.width,
        request.disorder_strength,
        request.magnetic_field,
    )
    system = syst.finalized()

    # Diagonalize the Hamiltonian
    h = system.hamiltonian_submatrix(sparse=False)
    eigvals, eigvecs = np.linalg.eigh(h)

    # Extract and plot the selected eigenstate
    eig_index = request.eig_index
    psi = eigvecs[:, eig_index]
    density = np.abs(psi) ** 2

    plt.figure(figsize=(5, 5))
    kwant.plotter.map(system, density, colorbar=True)
    img_io = io.BytesIO()
    plt.savefig(img_io, format="png")
    img_io.seek(0)
    img_base64 = base64.b64encode(img_io.read()).decode("utf-8")
    plt.close()

    return {
        "eig_index": eig_index,
        "eigenvalue": float(eigvals[eig_index]),
        "plot": img_base64
    }

# ---------- Root Endpoint ----------

@app.get("/")
async def root():
    return {"message": "Quantum Transport Simulation API is running!"}
