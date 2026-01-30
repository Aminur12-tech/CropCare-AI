import Recommendations from "@/components/Recommendations";

export interface AnalysisResult {
  prediction: string;
  confidence: number;
  confidence_level: "Low" | "Medium" | "High";
  top_3: {
    disease: string;
    probability: number;
  }[];
  recommendations: string;
  gradcam_image: string;
}

export interface FrontendAnalysisResult {
  mainPrediction: { disease: string; confidence: number; level: string };
  topPredictions: { disease: string; confidence: number }[];
  recommendations: { treatment: string[]; prevention: string[] };
  gradcamImage: string;
}


export const mapBackendToFrontend = (data: any) => {
  return {
    mainPrediction: data.prediction
      ? { disease: data.prediction, confidence: data.confidence || 0, level: data.confidence_level || "Low" }
      : { disease: "Unknown", confidence: 0, level: "Low" },
    topPredictions: data.top_3?.map((p: any) => ({
      disease: p.disease,
      confidence: p.probability,
    })) || [],
    recommendations: data.recommendation || { treatment: [], prevention: [] },
    gradcamImage: `http://127.0.0.1:8000${data.gradcam_image}`|| "",

  };
};




// // Generate a placeholder Grad-CAM visualization
// const generateGradCAMPlaceholder = (): string => {
//   const canvas = document.createElement('canvas');
//   canvas.width = 400;
//   canvas.height = 400;
//   const ctx = canvas.getContext('2d');
  
//   if (ctx) {
//     // Create a colorful heatmap gradient
//     const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
//     gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)');
//     gradient.addColorStop(0.3, 'rgba(255, 165, 0, 0.6)');
//     gradient.addColorStop(0.6, 'rgba(255, 255, 0, 0.4)');
//     gradient.addColorStop(1, 'rgba(0, 0, 255, 0.2)');
    
//     ctx.fillStyle = gradient;
//     ctx.fillRect(0, 0, 400, 400);
    
//     // Add some random spots
//     for (let i = 0; i < 5; i++) {
//       const x = 50 + Math.random() * 300;
//       const y = 50 + Math.random() * 300;
//       const r = 20 + Math.random() * 40;
      
//       const spotGradient = ctx.createRadialGradient(x, y, 0, x, y, r);
//       spotGradient.addColorStop(0, 'rgba(255, 0, 0, 0.7)');
//       spotGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
      
//       ctx.fillStyle = spotGradient;
//       ctx.beginPath();
//       ctx.arc(x, y, r, 0, Math.PI * 2);
//       ctx.fill();
//     }
//   }
  
//   return canvas.toDataURL();
// };

// Real API call structure (for production use)
export const analyzeImage = async (file: File, apiUrl: string = 'http://127.0.0.1:8000/predict'): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to analyze image');
  }

  return response.json();
};