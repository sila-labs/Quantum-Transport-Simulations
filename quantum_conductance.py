import kwant
import numpy as np
import matplotlib.pyplot as plt

def make_system(length=10, t=-1):
    lat = kwant.lattice.square()
    syst = kwant.Builder()

    for i in range(length):
        syst[lat(i, 0)] = 0  # On-site energy
        if i > 0:
            syst[lat(i - 1, 0), lat(i, 0)] = t  # Hopping term

    lead = kwant.Builder(kwant.TranslationalSymmetry((-1, 0)))
    lead[lat(0, 0)] = 0
    lead[lat(0, 0), lat(1, 0)] = t
    syst.attach_lead(lead)
    syst.attach_lead(lead.reversed())

    return syst.finalized()

def compute_conductance(system, energies):
    conductance = []
    for E in energies:
        smatrix = kwant.smatrix(system, E)
        conductance.append(smatrix.transmission(1, 0))
    return conductance

system = make_system()

kwant.plot(system)

energies = np.linspace(-3, 3, 100)
conductance = compute_conductance(system, energies)

plt.figure(figsize=(8, 5))
plt.plot(energies, conductance, label="Conductance")
plt.xlabel("Energy (E)")
plt.ylabel("Conductance (e²/h)")
plt.title("Quantum Conductance in a 1D Chain")
plt.legend()
plt.grid()
plt.show()