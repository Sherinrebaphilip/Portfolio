import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Identity.module.css';

export function Identity() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const sentences = [
    "My journey began with a profound fascination for how machines perceive the world.",
    "Pursuing a Master's in Robotics, I specialized in autonomous systems and complex algorithms.",
    "As I delved deeper, I realized the true bottleneck was often the architecture powering these models.",
    "This revelation led me to pivot towards robust, scalable system design.",
    "Currently building high-performance intelligence systems as a Python Backend Engineer at Voleergo Solution."
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.9 }
    }
  };

  return (
    <section ref={containerRef} className={`${styles.identitySection} section`}>
      <div className={styles.splitContainer}>
        
        {/* Left: Progress Bar */}
        <div className={styles.leftColumn}>
          <div className={styles.progressTrack}>
            <motion.div 
              className={styles.progressBar}
              style={{ scaleY, transformOrigin: "top" }}
            />
          </div>
        </div>

        {/* Right: Typography */}
        <div className={styles.rightColumn}>
          <motion.div
            className={styles.textContent}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-20%" }}
          >
            {sentences.map((sentence, i) => (
              <motion.p key={i} className={styles.paragraph} variants={itemVariants}>
                {sentence}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
