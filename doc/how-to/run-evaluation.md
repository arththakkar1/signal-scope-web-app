# How to Run Evaluation

## 1. Prepare Test Data
Ensure you have the organizer-provided held-out test set or a local unseen-generator split.

## 2. Compute Primary Metrics
Run inference on the test set and calculate:
- ROC-AUC (overall and unseen-generator split)
- Macro-F1

## 3. Select Operating Threshold
State the selected operating threshold and compute Accuracy and False-Positive Rate (FPR).

## 4. Record Results
Log the experiment ID, model, dataset, hyperparameters, and results.
