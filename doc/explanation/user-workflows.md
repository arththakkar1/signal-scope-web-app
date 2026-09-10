# User Workflows

Understanding the user interaction with SignalScope is crucial. The primary goal is to provide a seamless, informative, and safe experience when a user checks an image for authenticity.

## 1. Interaction Flowchart

```mermaid
sequenceDiagram
    participant User
    participant Frontend UI
    participant Backend API
    participant ML Model
    participant Explainer
    
    User->>Frontend UI: Uploads Image
    Frontend UI->>Backend API: POST /predict (Image)
    Backend API->>Backend API: Validate & Pre-process
    Backend API->>ML Model: Request Inference
    ML Model-->>Backend API: Return Calibrated Verdict
    
    opt If Module A Enabled
        Backend API->>Explainer: Request Explanation
        Explainer-->>Backend API: Return Heatmap & Cues
    end
    
    Backend API-->>Frontend UI: Return Complete JSON Response
    Frontend UI->>User: Display Verdict, Confidence & Visuals
```

## 2. Core Actions
- **Upload:** Users can drag-and-drop images or upload them via standard dialogs.
- **Analysis State:** During analysis, users see a non-blocking loading state indicating processing.
- **Verdict Display:** The prediction is displayed boldly but responsibly. The system avoids definitive statements (like "100% fake") and instead uses calibrated phrasing.
- **Explanation Review:** If visual cues are found (e.g., warped text, anatomical errors), the user can view the heat-map overlay on their image.
