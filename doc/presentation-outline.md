# Presentation & Demo Outline

## 1. Introduction
- The problem: Synthetic images and generative media in misinformation.
- The solution: SignalScope, classifying Real vs AI-generated images.

## 2. Core Problem & Approach
- The unseen-generator challenge (generalizing beyond training data).
- Proposed architecture: Image -> Pre-processing -> CV Detector -> Calibrated Verdict.

## 3. Demo Walkthrough
- User opens SignalScope and uploads an image.
- System analyzes and returns "Likely AI-generated" or "Real" with a confidence score.
- Show Faithful Explanation (Heat-map and text cues).

## 4. Evaluation & Results
- Primary metric: ROC-AUC on unseen-generator split.
- Robustness to degradation (JPEG, resizing).
- Conclusion and Q&A.
