from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import shutil
import os
import numpy as np
from PIL import Image

from model.model_loader import DiseaseModel
from model.predict import predict_disease
from utils.image_utils import preprocess_image
from recommendation.engine import get_recommendation
from model.gradcam import generate_gradcam

# =====================
# CONFIG
# =====================
CLASS_NAMES = [
    "Healthy",
    "Early Blight",
    "Late Blight",
    "Septoria Leaf Spot",
    "Leaf Mold",
    "Bacterial Spot",
    "Target Spot",
    "Yellow Leaf Curl Virus",
    "Spider Mites",
    "Tomato Mosaic Virus"
]

UPLOAD_PATH = "temp.jpg"
STATIC_DIR = "static"
GRADCAM_FILENAME = "gradcam.jpg"

# Make sure static folder exists
os.makedirs(STATIC_DIR, exist_ok=True)

# =====================
# APP INIT
# =====================
app = FastAPI(
    title="CropCare AI+",
    description="Confidence-Aware & Explainable Crop Disease Detection",
    version="1.1"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# =====================
# LOAD MODEL ONCE
# =====================
model = DiseaseModel(num_classes=len(CLASS_NAMES))

# =====================
# ROUTES
# =====================
@app.get("/")
def root():
    return {"message": "CropCare AI+ Backend is running"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Save uploaded image temporarily
    with open(UPLOAD_PATH, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Load original image for Grad-CAM
    original_image = np.array(Image.open(UPLOAD_PATH).convert("RGB"))

    # Preprocess image for model
    image_tensor = preprocess_image(UPLOAD_PATH)

    # Run prediction
    result = predict_disease(model, image_tensor, CLASS_NAMES)

    # Run recommendation engine
    recommendation = get_recommendation(
        result["prediction"],
        result["confidence_level"]
    )
    result["recommendation"] = {
        "treatment": recommendation["treatment"],
        "prevention": recommendation["prevention"]
    }

    # Generate Grad-CAM
    gradcam_path = os.path.join(STATIC_DIR, GRADCAM_FILENAME)
    generate_gradcam(model, image_tensor, gradcam_path)

    # Return URL accessible by frontend
    result["gradcam_image"] = f"/static/{GRADCAM_FILENAME}"

    # Cleanup temp upload
    if os.path.exists(UPLOAD_PATH):
        os.remove(UPLOAD_PATH)

    return result
