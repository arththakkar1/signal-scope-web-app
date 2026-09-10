# System Overview

The proposed system architecture for SignalScope includes:

## 1. Input Processing
- Accepts Image, optional caption, optional metadata.
- Pre-processing & Augmentation.

## 2. Detection (CV Detector)
- Uses a computer-vision model (CNN or ViT) for real-vs-synthetic classification.

## 3. Calibration & Explanation
- **Calibrated Verdict**: Produces likelihoods instead of absolute certainty.
- **Explainer**: Generates a heat-map and grounded text explaining visual cues (e.g., implausible textures, warped text).

## 4. User Interface
- Responsible UI returning results like "Likely AI-generated - confidence 88%".
