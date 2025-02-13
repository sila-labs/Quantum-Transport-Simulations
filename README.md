# Quantum Transport Simulations Repository

This repository contains Python scripts for simulating quantum transport phenomena using the Kwant package.

## Experiments Included

1. **Quantum Conductance in 1D Chain** (`quantum_conductance_1d.py`)
   - Simulates electron transport through a simple 1D tight-binding model.
   - Shows conductance behavior based on the Landauer formula.

2. **Anderson Localization in 1D** (`anderson_localization_1d.py`)
   - Introduces disorder into the 1D model to observe localization effects.

3. **Quantum Hall Effect in 2D (Peierls Phase Implementation)** (`qhe_2d_peierls.py`)
   - Models a 2D tight-binding system under a perpendicular magnetic field.
   - Implements Peierls phase factor to simulate Landau levels.

4. **Disorder Effects in the Quantum Hall System** (`disordered_qhe_2d.py`)
   - Adds disorder to the 2D Quantum Hall system to analyze localization and conductance breakdown.

## Important Mathematical Background

### **1D Tight-Binding Model Hamiltonian**
The Hamiltonian for a 1D tight-binding system is given by:

```
H = Σᵢ εᵢ cᵢ† cᵢ + Σ⟨i,j⟩ tᵢⱼ cᵢ† cⱼ
```

where:
- `εᵢ` is the on-site energy.
- `cᵢ†`, `cᵢ` are the creation and annihilation operators.
- `tᵢⱼ` is the hopping amplitude between sites `i` and `j`.

### **Landauer Formula for Conductance**
The conductance in a quantum transport system is given by:

```
G = (2e²/h) T(E)
```

where `T(E)` is the transmission probability at energy `E`.

### **2D Tight-Binding Model with Magnetic Field (Quantum Hall Effect)**
For a 2D lattice in a perpendicular magnetic field, the Hamiltonian is modified as:

```
H = Σₓ,ᵧ εₓ,ᵧ cₓ,ᵧ† cₓ,ᵧ + Σ⟨x',y'⟩ tₓ',ᵧ' e^(iφₓ',ᵧ') cₓ',ᵧ'† cₓ,ᵧ
```

where the Peierls phase `φₓ',ᵧ'` is introduced to simulate the effect of the magnetic field.

### **Anderson Localization**
When disorder is introduced into the system, the electron wavefunctions become localized, leading to a suppression of conductance. This phenomenon is modeled by adding random fluctuations to the on-site energy `εᵢ`.

## Installation

### Using Conda (Recommended)
Create a new environment and install dependencies:
```bash
conda env create -f environment.yml
conda activate quantum-transport-simulations
```

### Using pip
Alternatively, install dependencies via pip:
```bash
pip install -r requirements.txt
```

## Running the Experiments
Each script can be executed independently. For example, to run the 1D quantum conductance simulation:
```bash
python quantum_conductance_1d.py
```
Results will be displayed graphically using Matplotlib.

## Technologies Used
- **Python 3.10**
- **Kwant** - Quantum transport simulations
- **NumPy** - Numerical computations
- **Matplotlib** - Data visualization
- **SciPy** - Scientific computing

## Importance & Applications
These simulations are crucial for understanding:
- **Quantum transport in nanowires and mesoscopic systems**
- **Effects of disorder and localization in materials**
- **Quantum Hall physics and topological states**

## Results

### 1D Chain
![1D Chain](images/1d_chain.jpg)

### 2D Lattice
![2D Lattice](images/2d_lattice.jpg)

### 1D Quantum Conductance Simulation
![1D Conductance](images/1d_conductance.jpg)

### Anderson Localization in 1D
![Anderson Localization](images/anderson_localization.jpg)

### Quantum Hall Effect in 2D
![Quantum Hall Effect](images/qhe_disorder_0.jpg)

### Disorder in Quantum Hall Effect
![Disordered QHE disorder = 0.0](images/qhe_disorder_0.jpg)
![Disordered QHE disorder = 1.0](images/qhe_disorder_1.jpg)
![Disordered QHE disorder = 2.0](images/qhe_disorder_2.jpg)
![Disordered QHE disorder = 3.0](images/qhe_disorder_3.jpg)

This repository serves as a foundation for exploring more complex quantum transport phenomena. Contributions and extensions are welcome!

---

name: quantum-transport-simulations
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.10
  - kwant
  - numpy
  - matplotlib
  - scipy
