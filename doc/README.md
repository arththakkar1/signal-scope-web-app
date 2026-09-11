# SignalScope Documentation

Welcome to the SignalScope documentation repository. SignalScope is a system that accepts an image and classifies it as either Real or AI-generated.

The current runnable integration uses a Django API backed by the PyTorch/ResNet18 inference path and a Next.js upload interface. It is a development integration only: trained checkpoint quality, calibration, and faithful explanation heatmaps still need to be completed for production use.

## Documentation Structure

- **explanation/**: Core concepts, system overview, and feature details.
- **how-to/**: Step-by-step guides for evaluation, robustness testing, and ML tasks.
- **reference/**: Specifications, metrics, and technology stacks.
- **tutorials/**: Getting started guides.

For more context, see the project `context.md` file in the root directory.
