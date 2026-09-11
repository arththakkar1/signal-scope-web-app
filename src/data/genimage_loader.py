import os
import torch
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
from PIL import Image
import numpy as np

def create_dummy_dataset(root_dir, num_samples=100):
    """Generates a small dummy GenImage-style dataset for testing."""
    if os.path.exists(root_dir):
        return
    print(f"Creating dummy dataset at {root_dir}...")
    for split in ['train', 'val']:
        for class_name in ['real', 'ai']:
            class_dir = os.path.join(root_dir, split, class_name)
            os.makedirs(class_dir, exist_ok=True)
            for i in range(num_samples):
                # Generate random image
                img_data = np.random.randint(0, 255, (224, 224, 3), dtype=np.uint8)
                img = Image.fromarray(img_data)
                img.save(os.path.join(class_dir, f"img_{i}.png"))

def get_dataloaders(root_dir, batch_size=32, img_size=224):
    create_dummy_dataset(root_dir)
    
    transform = transforms.Compose([
        transforms.Resize((img_size, img_size)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    
    train_dataset = datasets.ImageFolder(os.path.join(root_dir, 'train'), transform=transform)
    val_dataset = datasets.ImageFolder(os.path.join(root_dir, 'val'), transform=transform)
    
    def numpy_collate(batch):
        # Convert torch tensors to numpy arrays for JAX
        images, labels = zip(*batch)
        return np.stack([img.numpy() for img in images]), np.array(labels)
        
    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, collate_fn=numpy_collate, drop_last=True)
    val_loader = DataLoader(val_dataset, batch_size=batch_size, shuffle=False, collate_fn=numpy_collate, drop_last=False)
    
    return train_loader, val_loader
