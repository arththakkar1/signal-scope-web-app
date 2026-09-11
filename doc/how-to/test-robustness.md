# How to Test Robustness

SignalScope must perform reliably even when images are compressed, resized, or lightly edited (Module C). This guide records the planned robustness protocol; the referenced configuration and test script have not yet been implemented.

## 1. Robustness Pipeline

```mermaid
flowchart LR
    A[Original Test Images] --> B{Apply Degradation}
    B --> C[JPEG Compression Q=50, 70, 90]
    B --> D[Resizing scale=0.5x, 2.0x]
    B --> E[Screenshot / Cropping]
    B --> F[Light Editing Brightness/Contrast]
    
    C --> G[Run Inference]
    D --> G
    E --> G
    F --> G
    
    G --> H[Compare ROC-AUC drop vs Baseline]
```

## 2. Steps
1. **Configure Pipeline:** Define the degradation parameters in the configuration file (`configs/robustness.yaml`).
2. **Implement the suite:** Add the degradation configuration and test runner before running this protocol.
3. **Review Results:** Record degradation-vs-accuracy curves in `report/` only after testing a trained checkpoint. Do not report results from the current untrained integration baseline.
