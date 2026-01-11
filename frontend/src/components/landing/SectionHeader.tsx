import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  highlightedWord: string;
  description: string;
}

const SectionHeader = ({ title, highlightedWord, description }: SectionHeaderProps) => {
  // Split title to insert highlighted word
  const parts = title.split(highlightedWord);

  return (
    <motion.div
      className="flex flex-col items-center text-center mb-16 lg:mb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6 text-foreground">
        {parts[0]}
        <span className="text-primary">{highlightedWord}</span>
        {parts[1] || ""}
      </h2>
      <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-light">
        {description}
      </p>
    </motion.div>
  );
};

export default SectionHeader;
