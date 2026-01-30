import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ConfidenceGauge from "./ConfidenceGauge";

interface Prediction {
  disease: string;
  confidence: number;
}

interface PredictionResultsProps {
  mainPrediction: Prediction;
  topPredictions: Prediction[];
}

const PredictionResults = ({ mainPrediction, topPredictions }: PredictionResultsProps) => {
  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 70) return { level: "High", icon: CheckCircle, className: "confidence-high" };
    if (confidence >= 40) return { level: "Medium", icon: AlertTriangle, className: "confidence-medium" };
    return { level: "Low", icon: XCircle, className: "confidence-low" };
  };

  const mainConfidence = getConfidenceLevel(mainPrediction.confidence);
  const MainIcon = mainConfidence.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="result-card"
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">Prediction Results</h3>
      </div>

      {/* Main Prediction */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 p-6 bg-accent/30 rounded-2xl">
        <ConfidenceGauge confidence={mainPrediction.confidence} size="lg" />

        <div className="flex-1 text-center md:text-left">
          <p className="text-sm text-muted-foreground mb-2">Detected Disease</p>
          <h4 className="text-2xl md:text-3xl font-bold mb-3">{mainPrediction.disease}</h4>
          <Badge variant="outline" className={`${mainConfidence.className} px-3 py-1`}>
            <MainIcon className="w-4 h-4 mr-1" />
            {mainConfidence.level} Confidence
          </Badge>
        </div>
      </div>

      {/* Top 3 Predictions */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground mb-4">Top Predictions</h4>
        <div className="space-y-3">
          {topPredictions.map((prediction, index) => {
            const conf = getConfidenceLevel(prediction.confidence);
            const Icon = conf.icon;

            return (
              <motion.div
                key={prediction.disease}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl"
              >
                <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>

                <div className="flex-1">
                  <p className="font-medium">{prediction.disease}</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor:
                          prediction.confidence >= 70
                            ? "hsl(var(--success))"
                            : prediction.confidence >= 40
                            ? "hsl(var(--warning))"
                            : "hsl(var(--destructive))",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${prediction.confidence}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    />
                  </div>
                  <span className="text-sm font-semibold w-12">{prediction.confidence}%</span>
                  <Icon className={`w-4 h-4 ${conf.className.replace("bg-", "text-").replace("/10", "")}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default PredictionResults;
