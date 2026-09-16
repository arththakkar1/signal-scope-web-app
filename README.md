# SignalScope

**Smart India Hackathon 2026 — Problem Statement 2: "Telling Real From Synthetic in the Age of Generative Media"**

SignalScope classifies images as real or AI-generated, using a full-resolution web UI backed by a PyTorch classification pipeline.

## Demo

[Watch the SignalScope demo](https://drive.google.com/file/d/1SQKdMZllhLB1Oy7HYb0MojEHvetKxSNH/view?usp=sharing)

## Project Folders

- [Frontend](frontend/) - Next.js web application
- [Backend](backend/) - Django API and detector service
- [Model](model/) - Training, inference, and model checkpoints
- [Documentation](doc/) - Tutorials, how-to guides, reference, and explanations
- [Tests](tests/) - ML pipeline tests
- [Reports](report/) - Evaluation metrics and explanation samples

## Stack

- **Frontend:** Next.js / TypeScript
- **Backend:** Django (plain views)
- **ML:** PyTorch, `open_clip`

## Evaluation Commands

```bash
python model/inference/evaluate_cifake.py
python model/inference/evaluate_clip_probe.py
python model/inference/evaluate_unseen_generators.py
```
