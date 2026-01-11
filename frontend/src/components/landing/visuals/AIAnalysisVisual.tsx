import { motion } from "framer-motion";

const AIAnalysisVisual = () => {
  const bars = [
    { opacity: 0.4, baseHeight: 32, hoverHeight: 64, delay: 0.075 },
    { opacity: 0.6, baseHeight: 48, hoverHeight: 96, delay: 0.1 },
    { opacity: 1, baseHeight: 80, hoverHeight: 48, delay: 0.15 },
    { opacity: 1, baseHeight: 56, hoverHeight: 112, delay: 0.2, glow: true },
    { opacity: 1, baseHeight: 96, hoverHeight: 40, delay: 0.1 },
    { opacity: 0.6, baseHeight: 40, hoverHeight: 80, delay: 0.075 },
    { opacity: 0.4, baseHeight: 24, hoverHeight: 56, delay: 0.1 },
  ];

  return (
    <>
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <motion.div
          className="w-32 h-32 bg-primary rounded-full blur-[80px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Waveform Bars */}
      <div className="relative flex items-center gap-1.5 h-32">
        {/* Label */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] tracking-widest uppercase text-primary font-bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Analyzing Context
        </motion.div>

        {/* Bars */}
        {bars.map((bar, index) => (
          <motion.div
            key={index}
            className="w-2 bg-primary rounded-full"
            style={{
              opacity: bar.opacity,
              boxShadow: bar.glow ? "0 0 15px rgba(33, 212, 105, 0.8)" : undefined,
            }}
            initial={{ height: bar.baseHeight }}
            animate={{
              height: [bar.baseHeight, bar.hoverHeight, bar.baseHeight],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: bar.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </>
  );
};

export default AIAnalysisVisual;
