import { motion } from "framer-motion";
import PredictionResults from "./PredictionResults";
import Recommendations from "./Recommendations";
import GradCAMViewer from "./GradCAMViewer";

interface AnalysisResult {
  mainPrediction: {
    disease: string;
    confidence: number;
  };
  topPredictions: Array<{
    disease: string;
    confidence: number;
  }>;
  recommendations: {
    treatment: string[];
    prevention: string[];
  };
  gradcamImage: string;
}

interface ResultsSectionProps {
  result: AnalysisResult;
  originalImage: string;
}

const ResultsSection = ({ result, originalImage }: ResultsSectionProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Analysis <span className="gradient-text">Complete</span>
          </h2>
          <p className="text-muted-foreground">
            Here's what our AI found in your crop image
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Prediction Results */}
          {/* Prediction Results */}
          {result?.mainPrediction && result?.topPredictions ? (
            <PredictionResults
              mainPrediction={result.mainPrediction}
              topPredictions={result.topPredictions}
            />
          ) : (
            <p className="text-center text-muted-foreground">Loading predictions...</p>
          )}

          {/* Grad-CAM Visualization */}
          <GradCAMViewer
            originalImage={originalImage}
            gradcamImage={result.gradcamImage}
          />

          {/* Recommendations */}
          <Recommendations
            treatment={result.recommendations?.treatment || []}
            prevention={result.recommendations?.prevention || []}
          />


        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
