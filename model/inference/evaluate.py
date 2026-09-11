import jax
import jax.numpy as jnp
import numpy as np
from sklearn.metrics import roc_auc_score, f1_score
from model.training.architecture import SimpleCNN

@jax.jit
def eval_step(state, batch):
    images, labels = batch
    images = jnp.transpose(images, (0, 2, 3, 1))
    logits = state.apply_fn({'params': state.params}, images, training=False)
    probs = jax.nn.softmax(logits, axis=-1)
    return probs, labels

def evaluate_model(state, val_loader):
    all_probs = []
    all_labels = []
    
    for batch in val_loader:
        probs, labels = eval_step(state, batch)
        # Use probability of class 1 (AI-generated)
        all_probs.append(np.array(probs)[:, 1])
        all_labels.append(np.array(labels))

    all_probs = np.concatenate(all_probs)
    all_labels = np.concatenate(all_labels)
    
    # Calculate ROC-AUC
    try:
        roc_auc = roc_auc_score(all_labels, all_probs)
    except ValueError:
        roc_auc = 0.5 # In case of single class in dummy dataset
        
    # Calculate Macro-F1
    preds = (all_probs > 0.5).astype(int)
    macro_f1 = f1_score(all_labels, preds, average='macro')
    
    return {'roc_auc': roc_auc, 'macro_f1': macro_f1}
