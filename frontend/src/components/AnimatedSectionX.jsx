import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function AnimatedSectionX({ children, ...props }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.section>
  ); 
}
export default AnimatedSectionX;