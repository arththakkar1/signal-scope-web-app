# User Workflows

## Basic User Flow
1. **Upload**: User opens SignalScope and uploads an image.
2. **Analysis**: System pre-processes and analyzes the image.
3. **Verdict**: System returns a prediction (Real/AI-generated) with a calibrated confidence score.
4. **Explanation**: If applicable, system provides an explanation and heatmap highlighting suspicious regions.

## Responsible Design
Results are framed as **likelihood assessments** (e.g., "Likely AI-generated - confidence 88%") rather than definitive accusations.
