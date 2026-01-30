import torch
from torchvision import models

class DiseaseModel:
    def __init__(self, num_classes):
        self.device = torch.device("cpu")  # lightweight, CPU-only

        self.model = models.mobilenet_v2(pretrained=True)
        self.model.classifier[1] = torch.nn.Linear(1280, num_classes)
        self.model.to(self.device)
        self.model.eval()

    def load_weights(self, path=None):
        if path:
            self.model.load_state_dict(
                torch.load(path, map_location=self.device)
            )

    def predict(self, image_tensor):
        image_tensor = image_tensor.to(self.device)
        with torch.no_grad():
            outputs = self.model(image_tensor)
        return outputs
