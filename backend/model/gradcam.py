import torch
import numpy as np
import cv2
import os

def generate_gradcam(model, image_tensor, save_path="gradcam.jpg"):
    model.model.eval()

    gradients = []
    activations = []

    # Last convolution layer in MobileNetV2
    target_layer = model.model.features[-1]

    def forward_hook(module, input, output):
        activations.append(output)

    def backward_hook(module, grad_input, grad_output):
        gradients.append(grad_output[0])

    # Register hooks
    forward_handle = target_layer.register_forward_hook(forward_hook)
    backward_handle = target_layer.register_full_backward_hook(backward_hook)

    # Forward
    output = model.model(image_tensor)
    class_idx = output.argmax()
    model.model.zero_grad()
    output[0, class_idx].backward()

    # Remove hooks
    forward_handle.remove()
    backward_handle.remove()

    # Grad-CAM computation
    grads = gradients[0].mean(dim=(2, 3), keepdim=True)
    cam = torch.relu((grads * activations[0]).sum(dim=1)).squeeze()
    cam = cam.detach().cpu().numpy()

    cam = cv2.resize(cam, (224, 224))
    cam = cam / cam.max() if cam.max() != 0 else cam

    # Convert to heatmap
    heatmap = np.uint8(255 * cam)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

    # Save image
    cv2.imwrite(save_path, heatmap)

    return save_path
