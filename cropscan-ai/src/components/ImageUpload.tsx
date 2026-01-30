import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, X, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
  uploadedImage: string | null;
  onClear: () => void;
}

const ImageUpload = ({ onImageUpload, isAnalyzing, uploadedImage, onClear }: ImageUploadProps) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onImageUpload(acceptedFiles[0]);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
    noClick: !!uploadedImage,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <section id="upload" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upload Your <span className="gradient-text">Leaf Image</span>
            </h2>
            <p className="text-muted-foreground">
              Drag and drop or click to upload a clear image of your crop's leaf for analysis
            </p>
          </div>

          {/* Upload Zone */}
          <div
            {...getRootProps()}
            className={`upload-zone relative ${isDragActive ? "upload-zone-active" : ""} ${
              uploadedImage ? "p-4" : ""
            }`}
          >
            <input {...getInputProps()} />

            <AnimatePresence mode="wait">
              {uploadedImage ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative"
                >
                  {/* Image Preview */}
                  <div className="relative rounded-xl overflow-hidden aspect-video max-h-80 mx-auto">
                    <img
                      src={uploadedImage}
                      alt="Uploaded leaf"
                      className="w-full h-full object-contain bg-muted"
                    />

                    {/* Analyzing Overlay */}
                    {isAnalyzing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
                      >
                        <div className="relative">
                          <Loader2 className="w-12 h-12 text-primary animate-spin" />
                          <motion.div
                            className="absolute inset-0"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="w-4 h-4 text-primary absolute -top-2 left-1/2" />
                          </motion.div>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-foreground">Analyzing Image...</p>
                          <p className="text-sm text-muted-foreground">AI is processing your leaf</p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Actions */}
                  {!isAnalyzing && (
                    <div className="flex justify-center gap-4 mt-4">
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onClear();
                        }}
                        className="rounded-full"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Clear
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          open();
                        }}
                        className="rounded-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New
                      </Button>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-8"
                >
                  <motion.div
                    animate={isDragActive ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
                  >
                    {isDragActive ? (
                      <ImageIcon className="w-10 h-10 text-primary" />
                    ) : (
                      <Upload className="w-10 h-10 text-primary" />
                    )}
                  </motion.div>

                  <h3 className="text-xl font-semibold mb-2">
                    {isDragActive ? "Drop your image here" : "Drag & drop your leaf image"}
                  </h3>
                  <p className="text-muted-foreground mb-4">or click to browse files</p>
                  <p className="text-sm text-muted-foreground">
                    Supports: JPG, JPEG, PNG, WebP
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImageUpload;
