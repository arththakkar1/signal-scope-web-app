# Technology Stack

This document lists the core technologies, libraries, and frameworks utilized in the SignalScope project.

## 1. Machine Learning & Data Processing
- **JAX, Flax & Optax:** The current `SimpleCNN` model, training step, and inference integration use these libraries.
- **PyTorch & Torchvision:** Used by the image-folder data loader, which supplies NumPy batches to the JAX training loop.
- **Scikit-learn:** Used for computing robust evaluation metrics (ROC-AUC, Macro-F1).
- **OpenCV & Albumentations:** High-performance libraries for image I/O, pre-processing, and extensive data augmentation (crucial for generalization).

## 2. Backend Application
- **Django:** Hosts `GET /api/ping/`, `POST /api/predict/`, and `POST /api/explain/`. Uploaded images are processed in memory and are not persisted.

## 3. Frontend Application (Module F)
- **React (or Vue/Vanilla JS):** For building the responsible, drag-and-drop web interface.
- **Tailwind CSS (Optional):** For rapid and consistent styling of the UI components.

## Stack Diagram
```mermaid
flowchart LR
    A[Frontend Next.js / React] <-->|REST API| B[Backend Django]
    B <--> C[ML Engine JAX / Flax]
    C <--> D[Data PyTorch / Torchvision]
```
