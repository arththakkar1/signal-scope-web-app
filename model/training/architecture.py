import flax.linen as nn
import jax.numpy as jnp

class SimpleCNN(nn.Module):
    """A simple CNN architecture using Flax."""
    num_classes: int = 2

    @nn.compact
    def __call__(self, x, training: bool):
        # x shape: (B, C, H, W) -> we need (B, H, W, C) for Flax/JAX standard or just use it as is if defined
        # PyTorch dataloader gives (B, C, H, W). We'll transpose it in the training loop.
        x = nn.Conv(features=32, kernel_size=(3, 3))(x)
        x = nn.relu(x)
        x = nn.max_pool(x, window_shape=(2, 2), strides=(2, 2))
        
        x = nn.Conv(features=64, kernel_size=(3, 3))(x)
        x = nn.relu(x)
        x = nn.max_pool(x, window_shape=(2, 2), strides=(2, 2))
        
        x = x.reshape((x.shape[0], -1)) # flatten
        x = nn.Dense(features=128)(x)
        x = nn.relu(x)
        # We output logits
        x = nn.Dense(features=self.num_classes)(x)
        return x
