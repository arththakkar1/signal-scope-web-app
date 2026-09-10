# How to Test Robustness

SignalScope must perform reliably even when images are compressed, resized, or lightly edited (Module C). This guide outlines how to execute the robustness testing suite.

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
2. **Run Robustness Suite:** Execute the robustness testing script:
   ```bash
   python model/inference/test_robustness.py --config configs/robustness.yaml
   ```
3. **Review Results:** The script will generate a series of plots in `report/` showing the degradation-vs-accuracy curves. Ensure the performance drop remains within acceptable limits.
