import { motion } from "framer-motion";
import { Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  imageUrl: string;
  fileName: string;
  fileSize: string;
}

const ImagePreview = ({ imageUrl, fileName, fileSize }: ImagePreviewProps) => {
  return (
    <div className="group relative flex min-h-[400px] w-full flex-1 flex-col overflow-hidden rounded-xl bg-card/30 border border-border/50 lg:min-h-[500px]">
      {/* Image Preview */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
      
      {/* Scanning Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ top: "0%", opacity: 0 }}
          animate={{ 
            top: ["0%", "100%"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="absolute h-1 w-full bg-primary/80 shadow-[0_0_15px_hsl(var(--primary)/0.8)]"
        />
      </div>
      
      {/* Overlay Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end bg-gradient-to-t from-background/90 to-transparent">
        <div>
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-background/60 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm border border-border/50">
            <CheckCircle className="size-3.5 text-primary" />
            Image Uploaded
          </span>
          <p className="text-sm text-muted-foreground max-w-[300px] mt-1">
            {fileName} ({fileSize})
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="bg-secondary/80 border-border backdrop-blur-md hover:bg-secondary"
        >
          <Upload className="size-4 mr-2" />
          Replace
        </Button>
      </div>
    </div>
  );
};

export default ImagePreview;
