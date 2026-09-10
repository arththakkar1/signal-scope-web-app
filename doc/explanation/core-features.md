# Core Features

This document outlines the mandatory requirements and optional extensions targeted by SignalScope.

## 1. Feature Map Flowchart

```mermaid
mindmap
  root((SignalScope))
    Core Requirements
      Real vs AI Classification
      Calibrated Confidence Score
      Unseen-Generator Evaluation
      Minimal Interface
    Bonus Modules
      Faithful Explanation Module A
      Robustness to Degradation Module C
      Deployable Interface Module F
```

## 2. Mandatory Core Features
- **Real-vs-AI-generated Image Classification:** The foundation of the system.
- **Confidence Score:** Required for communicating uncertainty responsibly.
- **Evaluation:** Must report ROC-AUC, Macro-F1, Accuracy, and FPR specifically isolating the unseen-generator split.

## 3. Targeted Bonus Modules
- **Module A - Faithful Explanation:** Localizing suspicious visual cues (implausible textures, anatomical errors) with human-readable text and visual heat-maps.
- **Module C - Robustness to Degradation:** Ensuring the model maintains high accuracy when subjected to common real-world transformations (compression, cropping, resizing).
- **Module F - Real-Time / Deployable Interface:** A fully functional, low-latency web application demonstrating the model's capabilities in real-time.
