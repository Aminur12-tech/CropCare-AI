import { motion } from "framer-motion";
import { Brain, Leaf, Shield, Zap, BarChart3, Eye } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description: "Advanced deep learning models trained on thousands of crop disease images for accurate detection.",
  },
  {
    icon: BarChart3,
    title: "Confidence Analysis",
    description: "Get detailed confidence scores and understand how certain the AI is about its predictions.",
  },
  {
    icon: Eye,
    title: "Grad-CAM Visualization",
    description: "See exactly which parts of the leaf the AI focuses on to make its diagnosis.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get predictions in under 3 seconds with our optimized inference pipeline.",
  },
  {
    icon: Shield,
    title: "Actionable Recommendations",
    description: "Receive treatment and prevention tips tailored to the detected disease.",
  },
  {
    icon: Leaf,
    title: "10+ Diseases Covered",
    description: "Growing database covering major crop diseases across multiple plant species.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">CropCare AI</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our cutting-edge AI technology helps farmers make informed decisions 
            about crop health with confidence-aware predictions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="result-card group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
