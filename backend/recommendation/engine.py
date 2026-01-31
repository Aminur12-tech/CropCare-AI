def get_recommendation(disease, confidence_level):
    recommendations = {
        "Healthy": {
            "high": {
                "treatment": ["No treatment needed"],
                "prevention": [
                    "Maintain standard care",
                    "Regular monitoring",
                    "Maintain soil health",
                    "Proper watering schedule"
                ]
            },
            "medium": {
                "treatment": ["No treatment needed"],
                "prevention": [
                    "Monitor daily",
                    "Observe for early signs",
                    "Maintain balanced fertilization"
                ]
            },
            "low": {
                "treatment": [
                    "No treatment required at this stage",
                    "Avoid unnecessary chemical use"
                ],
                "prevention": [
                    "Observe crop closely for 5–7 days",
                    "Maintain good hygiene in the field",
                    "Ensure proper irrigation and drainage",
                    "Recheck image if symptoms increase"
                ]
            }
        },

        "Late Blight": {
            "high": {
                "treatment": [
                    "Apply copper-based fungicides immediately",
                    "Remove infected leaves",
                    "Avoid overhead irrigation"
                ],
                "prevention": [
                    "Rotate crops annually",
                    "Use resistant varieties",
                    "Maintain proper spacing",
                    "Apply preventive fungicides in humid weather"
                ]
            },
            "medium": {
                "treatment": [
                    "Use neem oil",
                    "Remove minor lesions"
                ],
                "prevention": [
                    "Reduce leaf wetness duration",
                    "Monitor humidity"
                ]
            },
            "low": {
                "treatment": [
                    "Avoid fungicide until symptoms are clear",
                    "Remove only visibly suspicious leaves"
                ],
                "prevention": [
                    "Improve air circulation",
                    "Avoid evening irrigation",
                    "Monitor leaf spots daily",
                    "Re-scan image after 3–4 days"
                ]
            }
        },

        "Bacterial Leaf Spot": {
            "high": {
                "treatment": [
                    "Apply copper hydroxide spray every 7–10 days",
                    "Remove severely infected plant material",
                    "Disinfect tools"
                ],
                "prevention": [
                    "Use disease-free certified seeds",
                    "Practice crop rotation",
                    "Ensure good drainage",
                    "Control insect vectors"
                ]
            },
            "medium": {
                "treatment": [
                    "Remove infected leaves",
                    "Apply organic bactericide"
                ],
                "prevention": [
                    "Monitor soil moisture",
                    "Improve airflow"
                ]
            },
            "low": {
                "treatment": [
                    "Avoid spraying chemicals initially",
                    "Remove only heavily spotted leaves"
                ],
                "prevention": [
                    "Avoid overhead watering",
                    "Sanitize tools regularly",
                    "Inspect leaves daily",
                    "Confirm disease before treatment"
                ]
            }
        },

        "Powdery Mildew": {
            "high": {
                "treatment": [
                    "Apply sulfur-based fungicides weekly",
                    "Use neem oil",
                    "Prune affected leaves"
                ],
                "prevention": [
                    "Plant resistant varieties",
                    "Avoid excessive nitrogen",
                    "Water in morning",
                    "Maintain sunlight exposure"
                ]
            },
            "medium": {
                "treatment": [
                    "Neem oil weekly",
                    "Reduce humidity"
                ],
                "prevention": [
                    "Improve airflow",
                    "Avoid overcrowding"
                ]
            },
            "low": {
                "treatment": [
                    "Wipe leaves with water spray",
                    "Apply diluted neem oil if symptoms persist"
                ],
                "prevention": [
                    "Increase sunlight exposure",
                    "Improve ventilation",
                    "Monitor white powder formation daily"
                ]
            }
        },

        "Septoria Leaf Spot": {
            "high": {
                "treatment": [
                    "Apply copper fungicide",
                    "Remove infected leaves"
                ],
                "prevention": [
                    "Crop rotation",
                    "Maintain good airflow"
                ]
            },
            "medium": {
                "treatment": ["Organic fungicide"],
                "prevention": [
                    "Regular pruning",
                    "Avoid wetting leaves"
                ]
            },
            "low": {
                "treatment": [
                    "Do not apply fungicide yet",
                    "Remove only severely affected leaves"
                ],
                "prevention": [
                    "Avoid splashing soil onto leaves",
                    "Water at plant base",
                    "Daily leaf inspection"
                ]
            }
        },

        "Leaf Mold": {
            "high": {
                "treatment": [
                    "Apply fungicide",
                    "Remove infected leaves"
                ],
                "prevention": [
                    "Avoid humidity buildup",
                    "Improve ventilation",
                    "Do not wet leaves"
                ]
            },
            "medium": {
                "treatment": [
                    "Organic fungicide",
                    "Neem oil"
                ],
                "prevention": [
                    "Increase sunlight exposure",
                    "Reduce leaf wetness"
                ]
            },
            "low": {
                "treatment": [
                    "Improve ventilation first",
                    "Avoid chemical sprays initially"
                ],
                "prevention": [
                    "Reduce greenhouse humidity",
                    "Increase plant spacing",
                    "Monitor underside of leaves"
                ]
            }
        },

        "Target Spot": {
            "high": {
                "treatment": [
                    "Apply fungicide",
                    "Remove infected plant material"
                ],
                "prevention": [
                    "Maintain spacing",
                    "Crop rotation"
                ]
            },
            "medium": {
                "treatment": [
                    "Neem oil",
                    "Organic sprays"
                ],
                "prevention": [
                    "Monitor soil moisture",
                    "Inspect leaves"
                ]
            },
            "low": {
                "treatment": [
                    "Avoid fungicide until confirmed",
                    "Remove isolated spots manually"
                ],
                "prevention": [
                    "Maintain clean field",
                    "Monitor lower leaves",
                    "Re-evaluate after few days"
                ]
            }
        },

        "Yellow Leaf Curl Virus": {
            "high": {
                "treatment": [
                    "Remove infected plants",
                    "Control whiteflies"
                ],
                "prevention": [
                    "Use resistant varieties",
                    "Monitor pests",
                    "Maintain hygiene"
                ]
            },
            "medium": {
                "treatment": ["Isolate infected plants"],
                "prevention": ["Quarantine affected areas"]
            },
            "low": {
                "treatment": [
                    "Do not remove plant immediately",
                    "Monitor for leaf curling symptoms"
                ],
                "prevention": [
                    "Control whiteflies early",
                    "Use yellow sticky traps",
                    "Inspect new leaves frequently"
                ]
            }
        },

        "Spider Mites": {
            "high": {
                "treatment": [
                    "Use miticides",
                    "Remove affected leaves"
                ],
                "prevention": [
                    "Introduce natural predators",
                    "Keep leaves clean"
                ]
            },
            "medium": {
                "treatment": [
                    "Organic sprays",
                    "Neem oil"
                ],
                "prevention": [
                    "Monitor regularly",
                    "Prune affected areas"
                ]
            },
            "low": {
                "treatment": [
                    "Spray water on leaf undersides",
                    "Avoid chemical miticides"
                ],
                "prevention": [
                    "Increase humidity slightly",
                    "Check leaf underside daily",
                    "Early detection prevents spread"
                ]
            }
        },

        "Tomato Mosaic Virus": {
            "high": {
                "treatment": [
                    "Remove infected plants",
                    "Disinfect tools"
                ],
                "prevention": [
                    "Use virus-free seeds",
                    "Quarantine infected areas",
                    "Maintain hygiene"
                ]
            },
            "medium": {
                "treatment": ["Quarantine infected area"],
                "prevention": [
                    "Clean tools",
                    "Monitor neighboring crops"
                ]
            },
            "low": {
                "treatment": [
                    "Avoid removing plant immediately",
                    "Observe leaf patterns closely"
                ],
                "prevention": [
                    "Wash hands before handling plants",
                    "Disinfect tools as precaution",
                    "Monitor symptom progression"
                ]
            }
        }
    }

    default = {
        "treatment": ["No specific treatment available"],
        "prevention": ["Follow general crop care guidelines"]
    }

    disease_data = recommendations.get(disease)
    if not disease_data:
        return default

    return disease_data.get(confidence_level.lower(), default)
