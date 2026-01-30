import torch
import torch.nn.functional as F

def predict_disease(model, image_tensor, class_names):
    """
    Returns JSON-safe prediction output:
    - prediction
    - confidence (%)
    - confidence_level
    - top_3 predictions
    """

    outputs = model.predict(image_tensor)      # shape: [1, num_classes]
    probs = F.softmax(outputs, dim=1)[0]       # shape: [num_classes]

    # Top-1
    confidence, predicted_idx = torch.max(probs, dim=0)
    confidence_percent = round(confidence.item() * 100, 2)

    # Confidence level (USP)
    if confidence_percent >= 75:
        confidence_level = "High"
    elif confidence_percent >= 45:
        confidence_level = "Medium"
    else:
        confidence_level = "Low"

    # Top-3
    top_probs, top_idxs = torch.topk(probs, k=3)

    top_3 = []
    for idx, prob in zip(top_idxs, top_probs):
        top_3.append({
            "disease": class_names[idx.item()],
            "probability": round(prob.item() * 100, 2)
        })

    return {
        "prediction": class_names[predicted_idx.item()],
        "confidence": confidence_percent,
        "confidence_level": confidence_level,
        "top_3": top_3
    }
