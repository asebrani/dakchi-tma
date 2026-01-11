import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StepCardProps {
  stepNumber: string;
  title: string;
  description: string;
  children: ReactNode;
  index?: number;
}

const StepCard = ({ stepNumber, title, description, children, index = 0 }: StepCardProps) => {
  return (
    <motion.div
      className="group relative z-10 flex flex-col gap-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Visual Container */}
      <div className="h-[280px] lg:h-[320px] w-full rounded-2xl glass-card relative overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_30px_-10px_rgba(33,212,105,0.15)] bg-card">
        {/* Step Number - Top Left */}
        <span className="absolute top-4 left-4 text-primary font-bold text-4xl lg:text-5xl opacity-30 select-none pointer-events-none z-10">
          {stepNumber}
        </span>
        {children}
      </div>

      {/* Text Content */}
      <div className="flex flex-col gap-2 px-2">
        <h3 className="text-xl lg:text-2xl font-bold text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default StepCard;
