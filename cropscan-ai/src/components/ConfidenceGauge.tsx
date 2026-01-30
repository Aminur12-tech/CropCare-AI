import { motion } from "framer-motion";

interface ConfidenceGaugeProps {
  confidence: number;
  size?: "sm" | "md" | "lg";
}

const ConfidenceGauge = ({ confidence, size = "md" }: ConfidenceGaugeProps) => {
  const sizes = {
    sm: { width: 80, stroke: 6, fontSize: "text-lg" },
    md: { width: 120, stroke: 8, fontSize: "text-2xl" },
    lg: { width: 160, stroke: 10, fontSize: "text-4xl" },
  };

  const config = sizes[size];
  const radius = (config.width - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (confidence / 100) * circumference;

  const getColor = () => {
    if (confidence >= 70) return "hsl(var(--success))";
    if (confidence >= 40) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  const getLevel = () => {
    if (confidence >= 70) return "High";
    if (confidence >= 40) return "Medium";
    return "Low";
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={config.width} height={config.width} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={config.stroke}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={config.stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={`font-bold ${config.fontSize}`}
          style={{ color: getColor() }}
        >
          {confidence}%
        </motion.span>
        <span className="text-xs text-muted-foreground">{getLevel()}</span>
      </div>
    </div>
  );
};

export default ConfidenceGauge;
