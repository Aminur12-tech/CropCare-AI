import { useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Layers, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface GradCAMViewerProps {
  originalImage: string;
  gradcamImage: string;
}

const GradCAMViewer = ({ originalImage, gradcamImage }: GradCAMViewerProps) => {
  const [opacity, setOpacity] = useState([50]);
  const [zoom, setZoom] = useState(1);
  const [activeView, setActiveView] = useState<"compare" | "overlay">("compare");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="result-card"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
            <Layers className="w-5 h-5 text-info" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Grad-CAM Visualization</h3>
            <p className="text-sm text-muted-foreground">Highlighted disease regions</p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-muted rounded-full p-1">
          <Button
            variant={activeView === "compare" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("compare")}
            className="rounded-full px-4"
          >
            Compare
          </Button>
          <Button
            variant={activeView === "overlay" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveView("overlay")}
            className="rounded-full px-4"
          >
            Overlay
          </Button>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center gap-4 mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setZoom(Math.max(1, zoom - 0.25))}
          className="rounded-full"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <span className="text-sm font-medium w-16 text-center">{Math.round(zoom * 100)}%</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setZoom(Math.min(3, zoom + 0.25))}
          className="rounded-full"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>

      {activeView === "compare" ? (
        /* Side-by-Side Comparison */
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <ImageIcon className="w-4 h-4" />
              Original Image
            </div>
            <div className="rounded-xl overflow-hidden bg-muted aspect-square">
              <motion.img
                src={originalImage}
                alt="Original leaf"
                className="w-full h-full object-contain"
                style={{ transform: `scale(${zoom})` }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Layers className="w-4 h-4" />
              Grad-CAM Overlay
            </div>
            <div className="rounded-xl overflow-hidden bg-muted aspect-square">
              <motion.img
                src={gradcamImage}
                alt="Grad-CAM visualization"
                className="w-full h-full object-contain"
                style={{ transform: `scale(${zoom})` }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Overlay Mode */
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden bg-muted aspect-video relative">
            <motion.img
              src={originalImage}
              alt="Original leaf"
              className="absolute inset-0 w-full h-full object-contain"
              style={{ transform: `scale(${zoom})` }}
            />
            <motion.img
              src={gradcamImage}
              alt="Grad-CAM overlay"
              className="absolute inset-0 w-full h-full object-contain"
              style={{ transform: `scale(${zoom})`, opacity: opacity[0] / 100 }}
            />
          </div>

          {/* Opacity Slider */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground w-20">Opacity</span>
            <Slider
              value={opacity}
              onValueChange={setOpacity}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm font-medium w-12">{opacity[0]}%</span>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 p-4 bg-muted/30 rounded-xl">
        <p className="text-sm text-muted-foreground mb-2 font-medium">Understanding the Heatmap</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500" />
            <span className="text-sm">High attention (diseased)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-500" />
            <span className="text-sm">Medium attention</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500" />
            <span className="text-sm">Low attention</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GradCAMViewer;
