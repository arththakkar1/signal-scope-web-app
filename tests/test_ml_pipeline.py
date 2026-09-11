import os
import jax
import sys
import numpy as np
import pytest

# Add project root to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.data.genimage_loader import get_dataloaders
from model.training.train import create_train_state, train_step
from model.inference.evaluate import evaluate_model

def test_pipeline_end_to_end(tmpdir):
    """Tests the full JAX/Flax pipeline on a small dummy dataset."""
    data_dir = os.path.join(tmpdir, "dummy_genimage")
    train_loader, val_loader = get_dataloaders(data_dir, batch_size=4, img_size=224)
    
    rng = jax.random.PRNGKey(0)
    state = create_train_state(rng, learning_rate=1e-3)
    
    # Test one training step
    batch = next(iter(train_loader))
    state, metrics = train_step(state, batch)
    
    assert 'loss' in metrics
    assert 'accuracy' in metrics
    assert not np.isnan(metrics['loss'])
    
    # Test evaluation
    eval_metrics = evaluate_model(state, val_loader)
    assert 'roc_auc' in eval_metrics
    assert 'macro_f1' in eval_metrics
