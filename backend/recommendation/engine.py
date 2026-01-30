def get_recommendation(disease, confidence_level):
    recommendations = {
        "Healthy": {
            "high": {"treatment": ["No treatment needed"], "prevention": ["Maintain standard care", "Regular monitoring", "Maintain soil health", "Proper watering schedule"]},
            "medium": {"treatment": ["No treatment needed"], "prevention": ["Monitor daily", "Observe for early signs"]},
            "low": {"treatment": ["No treatment needed"], "prevention": ["Observe crop for early signs"]}
        },
        "Late Blight": {
            "high": {"treatment": ["Apply copper-based fungicides immediately", "Remove infected leaves", "Avoid overhead irrigation"], "prevention": ["Rotate crops annually", "Use resistant varieties", "Maintain proper spacing", "Apply preventive fungicides in humid weather"]},
            "medium": {"treatment": ["Use neem oil", "Remove minor lesions"], "prevention": ["Reduce leaf wetness duration", "Monitor humidity"]},
            "low": {"treatment": ["Observe crop"], "prevention": ["Maintain field hygiene"]}
        },
        "Bacterial Leaf Spot": {
            "high": {"treatment": ["Apply copper hydroxide spray every 7-10 days", "Remove severely infected plant material", "Disinfect tools"], "prevention": ["Use disease-free certified seeds", "Practice crop rotation", "Ensure good drainage", "Control insect vectors"]},
            "medium": {"treatment": ["Remove infected leaves", "Apply organic bactericide"], "prevention": ["Monitor soil moisture", "Improve airflow"]},
            "low": {"treatment": ["Observe"], "prevention": ["Daily monitoring", "Early detection"]}
        },
        "Powdery Mildew": {
            "high": {"treatment": ["Apply sulfur-based fungicides weekly", "Use neem oil", "Prune affected leaves"], "prevention": ["Plant resistant varieties", "Avoid excessive nitrogen", "Water in morning", "Maintain sunlight exposure"]},
            "medium": {"treatment": ["Neem oil weekly", "Reduce humidity"], "prevention": ["Improve airflow", "Avoid overcrowding"]},
            "low": {"treatment": ["Observe crop"], "prevention": ["Regular inspection"]}
        },
        "Septoria Leaf Spot": {
            "high": {"treatment": ["Apply copper fungicide", "Remove infected leaves"], "prevention": ["Crop rotation", "Maintain good airflow"]},
            "medium": {"treatment": ["Organic fungicide"], "prevention": ["Regular pruning", "Avoid wetting leaves"]},
            "low": {"treatment": ["Observe crop"], "prevention": ["Monitor daily"]}
        },
        "Leaf Mold": {
            "high": {"treatment": ["Apply fungicide", "Remove infected leaves"], "prevention": ["Avoid humidity buildup", "Improve ventilation", "Do not wet leaves"]},
            "medium": {"treatment": ["Organic fungicide", "Neem oil"], "prevention": ["Increase sunlight exposure", "Reduce leaf wetness"]},
            "low": {"treatment": ["Observe crop"], "prevention": ["Daily monitoring"]}
        },
        "Target Spot": {
            "high": {"treatment": ["Apply fungicide", "Remove infected plant material"], "prevention": ["Maintain spacing", "Crop rotation"]},
            "medium": {"treatment": ["Neem oil", "Organic sprays"], "prevention": ["Monitor soil moisture", "Inspect leaves"]},
            "low": {"treatment": ["Observe crop"], "prevention": ["Daily inspection"]}
        },
        "Yellow Leaf Curl Virus": {
            "high": {"treatment": ["Remove infected plants", "Control whiteflies"], "prevention": ["Use resistant varieties", "Monitor pests", "Maintain hygiene"]},
            "medium": {"treatment": ["Isolate infected plants"], "prevention": ["Quarantine affected areas"]},
            "low": {"treatment": ["Observe crop"], "prevention": ["Regular monitoring"]}
        },
        "Spider Mites": {
            "high": {"treatment": ["Use miticides", "Remove affected leaves"], "prevention": ["Introduce natural predators", "Keep leaves clean"]},
            "medium": {"treatment": ["Organic sprays", "Neem oil"], "prevention": ["Monitor regularly", "Prune affected areas"]},
            "low": {"treatment": ["Observe crop"], "prevention": ["Daily monitoring"]}
        },
        "Tomato Mosaic Virus": {
            "high": {"treatment": ["Remove infected plants", "Disinfect tools"], "prevention": ["Use virus-free seeds", "Quarantine infected areas", "Maintain hygiene"]},
            "medium": {"treatment": ["Quarantine infected area"], "prevention": ["Clean tools", "Monitor neighboring crops"]},
            "low": {"treatment": ["Observe crop"], "prevention": ["Prevent spread"]}
        }
    }

    default = {"treatment": ["No specific treatment available"], "prevention": ["Follow general crop care guidelines"]}

    disease_data = recommendations.get(disease)
    if not disease_data:
        return default

    return disease_data.get(confidence_level.lower(), default)
