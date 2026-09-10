# Problem Statement

## Background
Text-to-image models can generate photorealistic images very quickly, leading to potential misuse in misinformation, fraud, and manipulated evidence.

## Core Problem
Build a system that:
1. Accepts an input image.
2. Classifies the image as real or AI-generated.
3. Produces a confidence score.
4. Generalizes to synthetic images from generators absent from the training data.

The unseen-generator split is the key differentiator and its ROC-AUC carries the most weight.
