import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ImageUpload from "@/components/ImageUpload";
import ResultsSection from "@/components/ResultsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { analyzeImage, AnalysisResult, mapBackendToFrontend, FrontendAnalysisResult } from "@/services/api";
import { toast } from "sonner";

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FrontendAnalysisResult | null>(null);
  
  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleImageUpload = async (file: File) => {
  setUploadedImage(URL.createObjectURL(file));
  setAnalysisResult(null);
  setIsAnalyzing(true);

  try {
    const apiResult: AnalysisResult = await analyzeImage(file);
    const frontendResult: FrontendAnalysisResult = mapBackendToFrontend(apiResult);

    setAnalysisResult(frontendResult);

    toast.success("Analysis Complete!", {
      description: `Detected: ${frontendResult.mainPrediction.disease} with ${frontendResult.mainPrediction.confidence}% confidence`,
    });

    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  } catch (error) {
    toast.error("Analysis Failed", {
      description: "Please try again with a different image.",
    });
  } finally {
    setIsAnalyzing(false);
  }
};

  const handleClear = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      
      <main>
        <HeroSection />
        
        <ImageUpload
          onImageUpload={handleImageUpload}
          isAnalyzing={isAnalyzing}
          uploadedImage={uploadedImage}
          onClear={handleClear}
        />

        {analysisResult && uploadedImage && (
          <div id="results">
            <ResultsSection result={analysisResult} originalImage={uploadedImage} />
          </div>
        )}

        <AboutSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
