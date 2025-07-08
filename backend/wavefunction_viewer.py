import kwant
import numpy as np
import matplotlib.pyplot as plt
from matplotlib import cm
import argparse

from core_experiments.disordered_qhe_2d import make_system  # Modify if you're using another system script

def plot_wavefunction(syst, eig_index=0):
    # Finalize and get Hamiltonian matrix
    finalized_syst = syst.finalized()
    ham_mat = finalized_syst.hamiltonian_submatrix(sparse=False)
    
    # Diagonalize
    eigvals, eigvecs = np.linalg.eigh(ham_mat)
    
    # Select eigenstate and compute |ψ|^2
    psi = eigvecs[:, eig_index]
    density = np.abs(psi) ** 2

    # Plot wavefunction
    kwant.plotter.map(finalized_syst, density, colorbar=True,
                      cmap=cm.plasma,
                      title=f"Eigenstate #{eig_index} (E = {eigvals[eig_index]:.4f})")

    # Optionally save the figure
    plt.savefig(f'images/eigenstate_{eig_index}.png', dpi=300)
    plt.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Visualize eigenstates of a quantum system.")
    parser.add_argument('--eig_index', type=int, default=0, help='Eigenstate index to plot')
    parser.add_argument('--disorder', type=float, default=0.0, help='Disorder strength')
    args = parser.parse_args()

    syst = make_system(disorder_strength=args.disorder)  # ensure your builder accepts this arg
    plot_wavefunction(syst, eig_index=args.eig_index)
