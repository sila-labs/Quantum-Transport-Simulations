# qhe_2d_tbm.py
import kwant
import numpy as np
import matplotlib.pyplot as plt
import cmath

def make_qhe_system(width=10, length=20, t=-1, phi=0.1):
    """Creates a 2D tight-binding model with a perpendicular magnetic field."""
    
    lat = kwant.lattice.square()  # Square lattice
    syst = kwant.Builder()

    # Add sites and hopping terms with Peierls phase
    for x in range(length):
        for y in range(width):
            syst[lat(x, y)] = 0  # On-site energy (ε = 0)

            # Hopping in x-direction (normal hopping)
            if x > 0:
                syst[lat(x - 1, y), lat(x, y)] = t
            
            # Hopping in y-direction (magnetic field effect)
            if y > 0:
                phase = cmath.exp(1j * 2 * np.pi * phi * x)  # Peierls phase
                syst[lat(x, y - 1), lat(x, y)] = t * phase  

    # Define left lead
    lead = kwant.Builder(kwant.TranslationalSymmetry((-1, 0)))  # Infinite in -x direction
    for y in range(width):
        lead[lat(0, y)] = 0  # On-site energy
        lead[lat(0, y), lat(1, y)] = t  # Normal hopping in x-direction
        if y > 0:
            lead[lat(0, y - 1), lat(0, y)] = t  # Hopping in y-direction

    # Attach leads to both sides
    syst.attach_lead(lead)
    syst.attach_lead(lead.reversed())  # Right lead

    return syst.finalized()

def compute_conductance(system, energies):
    conductance = []
    for E in energies:
        smatrix = kwant.smatrix(system, E)
        conductance.append(smatrix.transmission(1, 0))
    return conductance

system = make_qhe_system(width=10, length=20, phi=0.1)  # Increase width for edge states
kwant.plot(system)  # Visualize system

energies = np.linspace(-3, 3, 100)
conductance = compute_conductance(system, energies)

# Plot conductance vs energy
plt.figure(figsize=(8, 5))
plt.plot(energies, conductance, label="Quantum Hall System")
plt.xlabel("Energy (E)")
plt.ylabel("Conductance (e²/h)")
plt.title("Quantum Hall Effect: Conductance vs Energy")
plt.legend()
plt.grid()
plt.show()
