import { motion } from 'framer-motion';
import { useRef } from 'react';
import styles from './ProjectGallery.module.css';

const projects = [
  {
    title: "Kidnapped Robot Problem",
    description: "Developed a probabilistic localization algorithm using Monte Carlo methods to determine the robot's pose in a known environment.",
    tags: ["Python", "ROS", "C++", "Particle Filters"],
    color: "#00f0ff"
  },
  {
    title: "Accident Detection System",
    description: "Real-time pipeline processing traffic camera feeds using advanced Computer Vision models to flag anomalies and collisions automatically.",
    tags: ["Python", "OpenCV", "PyTorch", "TensorRT"],
    color: "#ffffff"
  },
  {
    title: "Autonomous Quadcopter",
    description: "Engineered a custom flight controller and perception stack for dynamic obstacle avoidance in GPS-denied complex environments.",
    tags: ["C++", "ROS", "Computer Vision", "Control Systems"],
    color: "#888888"
  }
];

export function ProjectGallery() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} className={`${styles.gallerySection}`}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Selected Works</h2>
      </div>
      <div className={styles.cardsContainer}>
        {projects.map((project, index) => {
          const topOffset = `calc(20vh + ${index * 60}px)`;
          return (
            <motion.div 
              key={index} 
              className={`${styles.card} glass`}
              style={{
                top: topOffset,
                zIndex: index
              }}
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.description}</p>
                </div>
                <div className={styles.bentoGrid}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
