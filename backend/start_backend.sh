#!/bin/bash
# Load conda into the environment
source ~/miniforge3/etc/profile.d/conda.sh
conda activate qtransport

# Run the FastAPI backend via uvicorn
cd ~/Quantum-Transport-Simulations/backend
exec uvicorn main:app --host 127.0.0.1 --port 6465
