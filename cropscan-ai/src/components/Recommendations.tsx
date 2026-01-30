import { motion } from "framer-motion";
import { Leaf, Pill, Shield, Droplets, Sun, Bug, Scissors, AlertCircle } from "lucide-react";

interface RecommendationsProps {
  treatment: string[];
  prevention: string[];
}

const Recommendations = ({ treatment, prevention }: RecommendationsProps) => {
  const treatmentIcons = [Pill, Droplets, Shield, Bug];
  const preventionIcons = [Leaf, Sun, Scissors, AlertCircle];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid md:grid-cols-2 gap-6"
    >
      {/* Treatment Tips */}
      <div className="result-card">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
            <Pill className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Treatment</h3>
            <p className="text-sm text-muted-foreground">Recommended actions</p>
          </div>
        </div>

        <div className="space-y-4">
          {treatment.map((tip, index) => {
            const Icon = treatmentIcons[index % treatmentIcons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-destructive/5 rounded-xl border border-destructive/10"
              >
                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-destructive" />
                </div>
                <p className="text-sm leading-relaxed">{tip}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Prevention Tips */}
      <div className="result-card">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Prevention</h3>
            <p className="text-sm text-muted-foreground">Protect future crops</p>
          </div>
        </div>

        <div className="space-y-4">
          {prevention.map((tip, index) => {
            const Icon = preventionIcons[index % preventionIcons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-success/5 rounded-xl border border-success/10"
              >
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-success" />
                </div>
                <p className="text-sm leading-relaxed">{tip}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Recommendations;
