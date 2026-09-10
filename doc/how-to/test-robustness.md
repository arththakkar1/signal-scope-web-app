# How to Test Robustness

SignalScope needs to maintain performance under common transformations.

## Process
1. Take a sample of the test dataset.
2. Apply transformations:
   - JPEG Compression (varying quality levels)
   - Resizing (scaling down and up)
   - Screenshots (capture and crop)
   - Light Editing (brightness, contrast adjustments)
3. Rerun inference and compare the degraded ROC-AUC against the original ROC-AUC.
