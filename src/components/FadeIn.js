import { motion } from 'framer-motion';

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{
      duration: 0.3,
      delay: delay,
      ease: "easeOut"
    }}
  >
    {children}
  </motion.div>
);

export default FadeIn; 