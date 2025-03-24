from fastapi import FastAPI
from pydantic import BaseModel
import kwant
import numpy as np
import matplotlib.pyplot as plt
import io
import base64

app = FastAPI()

# just got back from vacation! will update this code starting Mon. 3/24
# working on ittt will update 3/25
# Define request model
class SimulationRequest(BaseModel):
    length: int
    width: int
    disorder_strength: float
    magnetic_field: float  # Peierls phase parameter (φ)

# Function to build and simulate the system
def run_quantum_simulation(length, width, disorder_strength, magnetic_field):
    lat = kwant.lattice.square()
    syst = kwant.Builder()

    for x in range(length):
        for y in range(width):
            # On-site energy with disorder
            syst[lat(x, y)] = disorder_strength * (2 * np.random.rand() - 1)

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

    # Finalize system
    system = syst.finalized()

    # Compute conductance
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

    # Save plot to a base64 image
    img_io = io.BytesIO()
    plt.savefig(img_io, format="png")
    img_io.seek(0)
    img_base64 = base64.b64encode(img_io.read()).decode("utf-8")
    plt.close()

    return {"energies": list(energies), "conductance": conductance, "plot": img_base64}

# FastAPI Route
@app.post("/simulate")
async def simulate(request: SimulationRequest):
    result = run_quantum_simulation(request.length, request.width, request.disorder_strength, request.magnetic_field)
    return result

# need to add endpoints for simulating different materials, i.e., graphene etc.
@app.get("/")
async def root():
    return {"message": "Quantum Transport Simulation API is running!"}
