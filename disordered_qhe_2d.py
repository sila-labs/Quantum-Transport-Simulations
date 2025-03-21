# disordered_qhe_2d_tbm.py
import kwant
import numpy as np
import matplotlib.pyplot as plt
import cmath
import random


# for disordered --> work on 3d viz
def make_disordered_qhe_system(width=10, length=20, t=-1, phi=0.1, disorder_strength=1.0):
    """Creates a 2D Quantum Hall system with disorder."""
    
    lat = kwant.lattice.square()
    syst = kwant.Builder()

    for x in range(length):
        for y in range(width):
            syst[lat(x, y)] = disorder_strength * (2 * random.random() - 1)  # randomized on-site energy

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

    syst.attach_lead(lead)
    syst.attach_lead(lead.reversed())

    return syst.finalized()

def compute_conductance(system, energies):
    conductance = []
    for E in energies:
        smatrix = kwant.smatrix(system, E)
        conductance.append(smatrix.transmission(1, 0))
    return conductance

# Edit these params as you wish
width = 10
length = 20
phi = 0.1  # Magnetic field strength
disorder_strength = 3.0  # Adjust this to see different localization effects

system = make_disordered_qhe_system(width, length, phi=phi, disorder_strength=disorder_strength)
kwant.plot(system)

energies = np.linspace(-3, 3, 100)
conductance = compute_conductance(system, energies)

# there should be a calculate conductance button and it should route here
plt.figure(figsize=(8, 5))
plt.plot(energies, conductance, label=f"Disorder Strength: {disorder_strength}")
plt.xlabel("Energy (E)")
plt.ylabel("Conductance (e²/h)")
plt.title("Disorder Effects on Quantum Hall Conductance")
plt.legend()
plt.grid()
plt.show()

