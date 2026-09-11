import jax
import jax.numpy as jnp
import optax
import flax.linen as nn
from flax.training import train_state
from model.training.architecture import SimpleCNN

def create_train_state(rng, learning_rate):
    model = SimpleCNN(num_classes=2)
    # Dummy input to initialize variables (B, H, W, C)
    dummy_input = jnp.ones([1, 224, 224, 3])
    variables = model.init(rng, dummy_input, training=False)
    params = variables['params']
    
    tx = optax.adamw(learning_rate)
    return train_state.TrainState.create(
        apply_fn=model.apply, params=params, tx=tx)

@jax.jit
def train_step(state, batch):
    images, labels = batch
    # Transpose from PyTorch (B, C, H, W) to JAX (B, H, W, C)
    images = jnp.transpose(images, (0, 2, 3, 1))
    
    def loss_fn(params):
        logits = state.apply_fn({'params': params}, images, training=True)
        one_hot = jax.nn.one_hot(labels, 2)
        loss = optax.softmax_cross_entropy(logits=logits, labels=one_hot).mean()
        return loss, logits
    
    grad_fn = jax.value_and_grad(loss_fn, has_aux=True)
    (loss, logits), grads = grad_fn(state.params)
    state = state.apply_gradients(grads=grads)
    
    accuracy = jnp.mean(jnp.argmax(logits, -1) == labels)
    metrics = {'loss': loss, 'accuracy': accuracy}
    return state, metrics
