# SignalScope

Telling Real From Synthetic in the Age of Generative Media.

SignalScope is a system designed to accept an image and classify it as **Real** or **AI-generated**. Built for the SIH 2026 Challenge (Problem Statement 2), this system focuses on generalization to unseen generators, maintaining high performance on synthetic images from generators not seen during training.

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Repository Structure](#repository-structure)
- [Core and Bonus Modules](#core-and-bonus-modules)
- [ML Model & Evaluation](#ml-model--evaluation)
- [Setup & Run Instructions](#setup--run-instructions)
- [Robustness & Limitations](#robustness--limitations)

---

## Project Overview

The primary challenge is detecting AI-generated images, ensuring the model performs well not only on known generators but also on unseen ones. The project evaluates its success using the unseen-generator split ROC-AUC as the primary metric.

**Target Users:** Journalists, Platforms, Fact-checkers, Everyday users.

---

## Architecture

Our proposed system is composed of several modules:

1. **Input Processing:** Accepts an image along with optional metadata. Pre-processing prepares the image for detection.
2. **CV Detector (ML Backend):** A computer-vision backbone (CNN/ViT based) performs the real-vs-synthetic classification.
3. **Calibration:** Produces a calibrated confidence score to frame the verdict responsibly as a likelihood.
4. **Explainer:** Generates a heat-map and localized textual explanations highlighting suspicious visual cues.
5. **Responsible UI (Frontend):** A minimal, user-friendly interface that displays the verdict, confidence score, and visual explanations without fabricated certainty.

---

## Repository Structure

```text
SignalScope/
│
├── README.md                 # Project documentation
├── context.md                # Full project context and requirements
├── doc/                      # Detailed system documentation
│
├── src/                      # Backend and Frontend application code
│
├── model/                    # ML Model components
│   ├── training/             # Training scripts and notebooks
│   ├── inference/            # Model inference pipeline
│   └── predict/              # Prediction interface
│
├── report/                   # Model reports and sample evaluations
│
├── requirements.txt          # Python dependencies
│
└── tests/                    # Unit and integration tests
```

---

## Core and Bonus Modules

- [x] **Core Requirement:** Real-vs-AI-generated image classification with a confidence score.
- [ ] **Module A - Faithful Explanation:** Heat-map and text-based explanations of visual cues.
- [ ] **Module C - Robustness to Degradation:** Ensuring high performance against JPEG compression, resizing, and screenshots.
- [ ] **Module F - Deployable Interface:** Responsible drag-and-drop web UI.

*(Checkboxes indicate currently implemented or planned features).*

---

## ML Model & Evaluation

- **Primary Metric:** Unseen-generator ROC-AUC.
- **Dataset:** CIFAKE-style dataset (balanced between real and fake images).
- **Training Strategy:** Transfer learning using robust CV backbones, with heavy data augmentation to improve generalization.

### Placeholder Results
| Metric | Score |
| ------ | ----- |
| Overall AUC | *TBD* |
| Unseen-generator AUC | *TBD* |
| Macro-F1 | *TBD* |
| Accuracy (at optimal threshold) | *TBD* |
| False-Positive Rate | *TBD* |

---

## Setup & Run Instructions

### 1. Clone and Install Dependencies
```bash
git clone https://github.com/arththakkar1/signal-scope-web-app.git
cd signal-scope-web-app
pip install -r requirements.txt
```

### 2. Run the Web Interface
*(Coming soon: Commands to start the FastAPI/Flask backend and React/Vue frontend).*

### 3. Run Predictions
Use the CLI prediction script (to be added in `model/predict/`):
```bash
python model/predict/predict.py --image path/to/image.jpg
```

---

## Robustness & Limitations

### Robustness
We actively test against common image degradations:
- **JPEG Compression:** Maintaining performance across quality levels.
- **Resizing & Screenshots:** Ensuring artifact-based detection doesn't fail on scaled images.

### Known Limitations
- The model may struggle with highly compressed images or novel generators that do not exhibit standard spectral artifacts.
- It is not designed to authenticate real-world events or verify the identity of specific people (face-swap deepfakes).

---

**Demo Video:** [Link to Demo] (TBD)  
**Deployed Application:** [Link to Web App] (TBD)
