# SignalScope --- Project Context

> **Project:** SignalScope\
> **Theme:** Telling Real From Synthetic in the Age of Generative Media\
> **Problem Statement:** SIH 2026 --- Problem Statement 2\
> **Institution:** L. J. Institute of Engineering and Technology
> \[C-433\]\
> **Development Window:** 10--15 September 2026

------------------------------------------------------------------------

## 1. Project Overview

### 1.1 Objective

Build a system that accepts an image and classifies it as:

-   **Real**
-   **AI-generated**

The system must also provide a confidence score and be evaluated on a
held-out test set that contains images from **generators not seen during
training**.

The primary technical challenge is therefore **generalization to unseen
generators**, not merely achieving high performance on images similar to
the training data.

### 1.2 Target Users

The problem statement identifies:

-   Journalists
-   Platforms
-   Fact-checkers
-   Everyday users

### 1.3 Domain

-   AI
-   Media Forensics
-   Trust & Safety

### 1.4 Technologies Mentioned

-   Computer Vision
-   Multimodal ML
-   Generative AI for explanations

### 1.5 Challenge Level

Advanced / above-average difficulty.

------------------------------------------------------------------------

# 2. Problem Definition

## 2.1 Background

Text-to-image models can generate photorealistic images very quickly.
Synthetic images can be used for misinformation, fraud, fake product
listings, and manipulated evidence.

A major difficulty is that detectors that perform well on generators
seen during training can fail on images produced by new, unseen
generators.

## 2.2 Core Problem

Build a system that:

1.  Accepts an input image.
2.  Classifies the image as real or AI-generated.
3.  Produces a confidence score.
4.  Provides a prediction interface that works on a new image.
5.  Is evaluated on the organizer-provided held-out test set.
6.  Generalizes to synthetic images from generators absent from the
    training data.

## 2.3 Primary Challenge

The held-out test set includes:

-   Held-out real photographs.
-   Synthetic images from generators not included in training.

The **unseen-generator split is the key differentiator** and its ROC-AUC
carries the most weight in the core evaluation.

------------------------------------------------------------------------

# 3. Scope

## 3.1 In Scope

The core project is focused on detecting AI-generated / synthetic
imagery in general, including:

-   Scenes
-   Objects
-   Art
-   Product shots

Optional extensions may include:

-   Faithful explanations
-   Generator attribution
-   Robustness to degradation
-   Provenance and metadata
-   Image-text consistency
-   Deployable interfaces
-   Active-defence analysis

## 3.2 Out of Scope

The problem statement explicitly excludes:

-   Face-swap deepfakes of real, identifiable people.
-   Political claims.
-   Real-world event verification.
-   Features that identify or profile specific real people.
-   Sourcing images of identifiable individuals for the project.

## 3.3 Responsible Output

The system must frame results as **likelihood assessments**.

Preferred:

> Likely AI-generated --- confidence 88%

Avoid:

> This image is definitely fake.

The system must avoid fabricated certainty and accusations.

------------------------------------------------------------------------

# 4. Requirements

## 4.1 Mandatory Core Requirements

Every team must deliver:

-   Real-vs-AI-generated image classification.
-   A confidence score.
-   A trained model.
-   An honest train/validation/test split.
-   ROC-AUC on the held-out set.
-   ROC-AUC for the unseen-generator split.
-   Macro-F1.
-   Confusion matrix.
-   Accuracy at a stated threshold.
-   False-positive rate at a stated threshold.
-   A minimal prediction interface.
-   A prediction on a new image.

A submission without the core task is considered incomplete regardless
of bonus modules.

## 4.2 Optional Bonus Modules

### Module A --- Faithful Explanation

For each verdict, provide a human-readable explanation of visual cues.

Possible cues listed in the problem statement include:

-   Implausible textures.
-   Warped text.
-   Lighting/shadow inconsistencies.
-   Anatomical errors.

Ideally provide a visual heat-map.

The explanation is evaluated on:

-   Correctness.
-   Localization.
-   Usefulness.
-   Honest uncertainty.
-   Avoidance of over-claiming.

### Module B --- Generator Attribution

Go beyond real/fake classification and identify a likely generator
family or specific model.

Examples mentioned:

-   GAN.
-   Diffusion.
-   Specific model.

A separate metric is required for this task if implemented.

### Module C --- Robustness to Degradation

Test and maintain performance under:

-   JPEG compression.
-   Resizing.
-   Screenshots.
-   Light editing.

Show degradation-vs-accuracy analysis.

### Module D --- Provenance & Metadata

Read available signals such as:

-   C2PA / Content Credentials.
-   EXIF.

Explain how metadata evidence is combined with the visual model's
verdict.

### Module E --- Multimodal Image + Text

Given an image and a generic caption/claim, assess whether the text is
consistent with the image.

This module is intended for generic captions, not political claims about
real events.

### Module F --- Real-Time / Deployable

Provide a usable interface such as:

-   Drag-and-drop.
-   Batch scanning.
-   Browser-extension mockup.

The interface should have sensible latency and present results
responsibly as likelihoods.

### Module G --- Active Defence Analysis

Study how easily the detector can be fooled using simple adversarial or
post-processing attacks and identify useful mitigations.

Failure analysis should be presented honestly.

------------------------------------------------------------------------

# 5. Dataset & Evaluation Protocol

## 5.1 Training / Validation Data

The provided source is described as a CIFAKE-style real-vs-synthetic
dataset containing:

-   Real photographs.
-   Images from a disclosed set of generators such as Stable Diffusion.

The scale is approximately:

> 100k+ labelled images

The dataset is balanced between real and fake images.

## 5.2 Held-Out Test Data

The organizer-provided held-out test set contains:

-   Held-out real photos.
-   Synthetic images from generators not present in training.

Examples given in the problem statement include a newer diffusion model
and Midjourney-class output.

The held-out test set is used only for judging.

## 5.3 Unseen-Generator Split

This split is central to the challenge.

The model must generalize beyond the generators used for training.

**Primary project priority:**

> Maximize held-out unseen-generator ROC-AUC without data leakage.

## 5.4 Additional Public Data

Public synthetic-image datasets may be added to the training set.

The problem statement gives **GenImage** as an example.

Any added public dataset must be cited, including its source/licence
where applicable.

## 5.5 Data Compliance Rules

-   Do not train on the organizer's held-out test set.
-   Do not substitute a team's own test data for the core score.
-   Do not scrape images of real, identifiable people.
-   Public data used for the project must be disclosed.

------------------------------------------------------------------------

# 6. Evaluation Metrics

## 6.1 Primary Metric

### ROC-AUC

Report:

1.  Overall held-out ROC-AUC.
2.  Unseen-generator-split ROC-AUC.

The unseen-generator AUC carries the most weight.

## 6.2 Required Additional Metrics

-   Macro-F1.
-   Confusion matrix.
-   Accuracy at the chosen threshold.
-   False-positive rate at the chosen threshold.

## 6.3 Threshold

The team must state its selected operating threshold and report accuracy
and FPR at that threshold.

------------------------------------------------------------------------

# 7. Evaluation & Scoring

  Category                        Weight
  ---------------------------- ---------
  AI/ML Implementation                25
  Technical Implementation            20
  Innovation & Creativity             15
  Explanation & Trust Impact          15
  User Experience                     10
  Problem Understanding               10
  Presentation & Demo                  5
  **Total**                      **100**

## 7.1 AI/ML Implementation --- 25

Primarily evaluated using held-out AUC, with emphasis on the
unseen-generator split.

Also considers:

-   Sound methodology.
-   Honest data split.
-   No leakage.
-   Calibration.
-   Correct metric reporting.

## 7.2 Technical Implementation --- 20

Considers:

-   Reproducibility.
-   Code quality.
-   Project structure.
-   Robustness engineering.
-   Deployment.

An unreproducible core can cap the score.

## 7.3 Innovation & Creativity --- 15

Higher scores are associated with:

-   Novel detection/explanation approaches.
-   Strong generalization ideas.

Standard tutorial-level implementations receive lower scores.

## 7.4 Explanation & Trust Impact --- 15

Higher scores require explanations that are:

-   Correct.
-   Localized.
-   Useful.
-   Honestly hedged.

Fluent but unfaithful explanations score poorly.

## 7.5 User Experience --- 10

Focus areas:

-   Clear verdict.
-   Responsible wording.
-   Accessibility.
-   Overall usability.

## 7.6 Problem Understanding --- 10

Demonstrate understanding of:

-   Generalization.
-   Appropriate module selection.
-   Honest limitations.

## 7.7 Presentation & Demo --- 5

The demo must clearly show the system and its capabilities.

------------------------------------------------------------------------

# 8. Tie-Break Priority

If teams are tied or nearly tied, the problem statement specifies this
order:

1.  Unseen-generator-split AUC.
2.  Overall held-out AUC.
3.  Reproducibility.
4.  Explanation faithfulness.
5.  Depth of other bonus modules.

This reinforces that **unseen-generator generalization is the highest
technical priority**.

------------------------------------------------------------------------

# 9. Proposed System Architecture

The problem statement provides the following illustrative architecture:

``` text
Image
  +
Optional Caption / Metadata
        |
        v
Pre-processing & Augmentation
        |
        v
CV Detector (CNN / ViT)
        |
        v
Calibrated Verdict
        |
        v
Explainer
  - Heat-map
  - Grounded Text
        |
        v
Responsible UI
  "Likely AI-generated"
```

This architecture is illustrative, not prescriptive.

## 9.1 Components

### Input

-   Image.
-   Optional caption.
-   Optional metadata.

### Pre-processing

Prepare images for the detection model and support robustness
experiments.

### Detection

Use a computer-vision model for real-vs-synthetic classification.

The problem statement encourages:

-   CNN or ViT backbones.
-   Transfer learning.
-   Frequency / artifact-based features.

### Calibration

Produce confidence values that communicate uncertainty responsibly.

### Explanation

If Module A is implemented:

-   Localize important regions.
-   Identify supported visual cues.
-   Generate grounded explanations.
-   Avoid unsupported claims.

### User Interface

Display:

-   Image.
-   Verdict.
-   Confidence.
-   Explanation where available.
-   Heatmap where available.
-   Responsible uncertainty wording.

------------------------------------------------------------------------

# 10. ML Strategy

## 10.1 Baseline

Start with a reproducible transfer-learning baseline.

Record:

-   Model.
-   Dataset split.
-   Training configuration.
-   Overall AUC.
-   Unseen-generator AUC.
-   Macro-F1.
-   Confusion matrix.

The provided baseline must be compared against in the final report.

## 10.2 Generalization Strategy

The main research/engineering goal is to improve performance on unseen
generators.

Potential directions explicitly encouraged by the problem statement:

-   Data augmentation.
-   Domain adaptation.
-   Calibration.
-   Frequency-domain / artifact-based features.
-   CNN / ViT transfer learning.

## 10.3 Robustness Strategy

Where appropriate, test:

-   Compression.
-   Resizing.
-   Screenshots.
-   Light editing.

## 10.4 Calibration Strategy

Confidence should be calibrated and presented as a likelihood rather
than certainty.

**Implementation decision:** TBD after baseline experiments.

------------------------------------------------------------------------

# 11. Explainability Strategy

If Module A is implemented, the explanation pipeline should follow:

``` text
Image
  |
  v
Detector
  |
  +----> Prediction
  |
  v
Localization / Heatmap
  |
  v
Relevant Visual Regions
  |
  v
Grounded Explanation
```

## 11.1 Explanation Requirements

An explanation should:

-   Point to actual image evidence.
-   Localize suspicious regions where possible.
-   Be understandable to a non-expert.
-   Communicate uncertainty.
-   Avoid unsupported claims.

## 11.2 Example

``` text
Verdict:
Likely AI-generated

Confidence:
88%

Possible visual cues:
- Handle geometry appears physically inconsistent.
- Reflections do not match the apparent light source.

Heatmap:
[Localized suspicious regions]
```

The problem statement uses a similar illustrative scenario.

------------------------------------------------------------------------

# 12. Robustness

The system should be evaluated against common transformations where the
relevant bonus is attempted.

``` text
Original Image
     |
     +--> JPEG Compression
     |
     +--> Resize
     |
     +--> Screenshot
     |
     +--> Light Editing
```

For each degradation, record performance and compare it with the
original.

------------------------------------------------------------------------

# 13. User Experience

## 13.1 Basic User Flow

``` text
User opens SignalScope
        |
        v
Uploads image
        |
        v
System analyzes image
        |
        v
Prediction + confidence
        |
        v
Optional explanation + heatmap
```

## 13.2 Responsible Result

Use wording such as:

> **Likely AI-generated**

rather than definitive accusations.

The interface should make uncertainty clear.

------------------------------------------------------------------------

# 14. Repository Structure

The required repository should contain:

``` text
SignalScope/
│
├── README.md
├── context.md
│
├── src/                  # or app/
│   └── ...
│
├── model/
│   ├── training/
│   ├── inference/
│   └── predict/
│
├── report/
│   ├── model-report
│   └── explanation-samples/
│
├── requirements.txt
│
└── tests/
```

The exact implementation structure may evolve, but the required README,
source/app, model, report, and environment/run-instruction components
must remain available.

------------------------------------------------------------------------

# 15. README Requirements

The README must contain:

1.  Core and bonus modules implemented.
2.  Setup and run instructions.
3.  Datasets and their sources/licences.
4.  Overall AUC.
5.  Unseen-generator AUC.
6.  Macro-F1.
7.  Confusion matrix.
8.  Architecture overview.
9.  Robustness/calibration approach.
10. Known limitations.
11. Demo video link.
12. Deployed application link if applicable.

A judge should be able to reproduce a prediction in approximately 10
minutes or less.

------------------------------------------------------------------------

# 16. Model Report

A one-page model report must cover:

  -----------------------------------------------------------------------
  Field                               Required Information
  ----------------------------------- -----------------------------------
  Task                                Binary real-vs-AI-generated

  Data & Split                        Sources, sizes, exact splits

  Model / Approach                    Backbone, hyperparameters,
                                      augmentation, calibration

  Metrics & Results                   Overall AUC, unseen AUC, macro-F1,
                                      accuracy, FPR, confusion matrix

  Baseline                            Provided baseline comparison

  Limitations                         Honest failure cases
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 17. Demo Requirements

A **3--5 minute recorded demo** is required.

The demo should show:

-   The core system running.
-   Prediction on a new image.
-   Any implemented bonus modules.
-   Clear and responsible presentation of results.

------------------------------------------------------------------------

# 18. Development Rules

## 18.1 Development Window

All substantive work must be committed between:

> **10 September -- 15 September 2026**

Commit history must reflect actual development during this period.

## 18.2 Allowed Resources

Allowed and encouraged:

-   Open-source libraries.
-   Pretrained backbones.
-   Public datasets.
-   AI coding assistants.

These must be appropriately disclosed/cited where required.

## 18.3 Prohibited

-   Copying a public real-vs-fake notebook wholesale.
-   Training on the held-out test set.
-   Scraping images of identifiable real people.
-   Building prohibited individual-identification features.
-   Political-claim adjudication.

An originality declaration should list third-party code or notebooks
referenced.

------------------------------------------------------------------------

# 19. Experiment Tracking

Every meaningful ML experiment should record:

``` text
Experiment ID
Model
Dataset
Train/Validation Split
Augmentations
Hyperparameters
Training Time
Overall AUC
Unseen AUC
Macro-F1
Accuracy
FPR
Observations
Failure Cases
```

## 19.1 Experiment Table

  Experiment   Model     Overall AUC   Unseen AUC   Macro-F1 Notes
  ------------ ------- ------------- ------------ ---------- ------------------
  Baseline     TBD               TBD          TBD        TBD Initial baseline
  EXP-001      TBD               TBD          TBD        TBD 
  EXP-002      TBD               TBD          TBD        TBD 

------------------------------------------------------------------------

# 20. Known Limitations

This section must be updated throughout development.

Track:

-   Generators that cause failures.
-   Image types that cause failures.
-   Degradations that reduce accuracy.
-   False positives.
-   False negatives.
-   Calibration weaknesses.
-   Explanation weaknesses.

Do not hide known failure cases.

------------------------------------------------------------------------

# 21. Current Project Decisions

  -----------------------------------------------------------------------
  Decision                Status                  Reason
  ----------------------- ----------------------- -----------------------
  Core task               Confirmed               Required by problem
                                                  statement

  Primary ML objective    Confirmed               Unseen-generator AUC is
                                                  most important

  Explanation             Planned bonus           High value for trust
                                                  impact

  Robustness              Planned bonus           Supports real-world
                                                  usefulness

  Generator attribution   TBD                     Optional

  Metadata/provenance     TBD                     Optional

  Multimodal              TBD                     Optional

  Deployment              Planned                 Supports technical
                                                  implementation and UX
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 22. Open Questions

These are project decisions that must be resolved through experiments or
team discussion:

-   Which backbone gives the strongest unseen-generator performance?
-   Should the final model use a CNN, ViT, or hybrid approach?
-   Which augmentations improve unseen-generator generalization without
    harming real-image performance?
-   Which frequency/artifact features are useful?
-   Which calibration method gives reliable confidence?
-   Which explanation/localization method is sufficiently faithful?
-   Which bonus modules can realistically be completed within the
    development window?
-   What deployment architecture best satisfies reproducibility and
    latency requirements?

------------------------------------------------------------------------

# 23. Team Responsibilities

  ------------------------------------------------------------------------
  Member            Area              Deliverables       Status
  ----------------- ----------------- ------------------ -----------------
  TBD               ML / Detection    Model + training   Pending
                                      pipeline           

  TBD               Generalization    Augmentation /     Pending
                                      unseen-generator   
                                      experiments        

  TBD               Explainability    Heatmap + grounded Pending
                                      explanation        

  TBD               Backend           Prediction API     Pending

  TBD               Frontend          User interface     Pending

  TBD               Testing           Evaluation +       Pending
                                      robustness         

  TBD               Documentation     README + report +  Pending
                                      demo               
  ------------------------------------------------------------------------

------------------------------------------------------------------------

# 24. Definition of Done

## 24.1 Core

-   [ ] Real-vs-AI classifier
-   [ ] Confidence score
-   [ ] Proper train/validation split
-   [ ] Prediction interface
-   [ ] Overall ROC-AUC
-   [ ] Unseen-generator ROC-AUC
-   [ ] Macro-F1
-   [ ] Confusion matrix
-   [ ] Accuracy at selected threshold
-   [ ] FPR at selected threshold

## 24.2 Reproducibility

-   [ ] Public GitHub repository
-   [ ] README
-   [ ] Requirements/environment file
-   [ ] Clear setup instructions
-   [ ] Reproducible prediction
-   [ ] Model weights/release link if required because of size

## 24.3 Reporting

-   [ ] One-page model report
-   [ ] Dataset/licence documentation
-   [ ] Baseline comparison
-   [ ] Limitations
-   [ ] Experiment records

## 24.4 Demo

-   [ ] 3--5 minute demo video
-   [ ] New-image prediction demonstrated
-   [ ] Bonus modules demonstrated if implemented

## 24.5 Bonus

-   [ ] Faithful explanation
-   [ ] Heatmap/localization
-   [ ] Generator attribution
-   [ ] Robustness testing
-   [ ] Provenance/metadata
-   [ ] Image-text consistency
-   [ ] Deployable interface
-   [ ] Active-defence analysis

------------------------------------------------------------------------

# 25. References

## Primary Source

**SIH 2026 Internal Hackathon --- Problem Statement 2: SignalScope ---
Telling Real From Synthetic in the Age of Generative Media**

Source document supplied by the project team.

## External Resources

To be added as the project adopts:

-   Research papers.
-   Pretrained models.
-   Public datasets.
-   Open-source libraries.
-   Third-party code/notebooks.
-   C2PA / Content Credentials resources.

------------------------------------------------------------------------

# 26. Context Maintenance Rules

`context.md` is the project's working source of truth.

Whenever a major project decision is made:

1.  Update the relevant section.
2.  Record the decision and reason.
3.  Update experiment results.
4.  Update the current status.
5.  Update the definition-of-done checklist where appropriate.

Do not silently change an established architecture, model, dataset, or
requirement without recording the decision.
