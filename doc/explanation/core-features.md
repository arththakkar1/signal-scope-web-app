# Core Features

## 1. Mandatory Core Requirements
- Real-vs-AI-generated image classification.
- Confidence score.
- Held-out test set evaluation with unseen-generator split ROC-AUC.
- Minimal prediction interface.

## 2. Optional Bonus Modules
- **Faithful Explanation**: Human-readable explanation of visual cues and heat-maps.
- **Generator Attribution**: Identify generator family (GAN, Diffusion).
- **Robustness to Degradation**: Test against JPEG compression, resizing, etc.
- **Provenance & Metadata**: Combine metadata evidence (C2PA, EXIF) with visual verdict.
- **Multimodal Image + Text**: Assess image consistency with a generic caption.
