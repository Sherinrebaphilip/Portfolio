import { motion } from 'framer-motion';
import { useRef } from 'react';
import styles from './ProjectGallery.module.css';

const projects = [
  {
    title: "Kidnapped Robot Problem",
    description: "The \"Kidnapped Robot Problem\" project focuses on localization for autonomous mobile robots when displaced by an unknown force, such as being picked up and moved without their own sensors registering the change. This project explores package like Find Object 2D and pose estimation to help robots accurately identify their new location in unpredictable settings. Key tools include object detection algorithms (e.g., SURF, SIFT) and a depth camera, allowing the robot to recalibrate its position based on detected objects. The goal is to improve robotic navigation, even in scenarios with sudden and untrackable relocations.",
    tags: ["ROS", "Python", "Computer Vision", "Pose Estimation"],
    image: "/images/projects/kidnapped_robot_problem.png",
    layout: "normal"
  },
  {
    title: "Accident Detection via Computer Vision",
    description: "This approach employs Mask R-CNN for precise vehicle detection and a centroid-based algorithm for efficient tracking. Vehicle positions are updated using Euclidean distances between centroids across frames. Accident detection relies on analyzing bounding box overlaps, trajectory angles, and speed changes to identify potential collisions. Key indicators include bounding box overlap, trajectory intersection angles, and acceleration variations.",
    tags: ["Mask R-CNN", "Tracking Algorithms", "Euclidean Geometry"],
    image: "/images/projects/accident_detection.png",
    layout: "reverse"
  },
  {
    title: "Quadcopter with Obstacle Avoidance",
    description: "This project focuses on developing a real-time anti-collision system for unmanned aerial vehicles (UAVs), specifically targeting quadcopters. Leveraging low-cost ultrasonic sensors and a microcontroller, the system enables both autonomous and remote-controlled UAVs to detect and avoid obstacles in real-time. Given the payload limitations of smaller UAVs, this project prioritizes lightweight, efficient components to ensure reliable obstacle detection without compromising flight agility.",
    tags: ["UAVs", "Ultrasonic Sensors", "Microcontroller", "Autonomous Flight"],
    image: "/images/projects/quadcopter.png",
    layout: "normal"
  }
];

export function ProjectGallery() {
  const containerRef = useRef<HTMLElement>(null);
  
  return (
    <section ref={containerRef} className={styles.gallerySection}>
      <div className={styles.header}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
        >
          Selected Works
        </motion.h2>
      </div>

      <div className={styles.projectsContainer}>
        {projects.map((project, index) => {
          const isReverse = project.layout === "reverse";

          return (
            <article 
              key={index} 
              className={`${styles.projectRow} ${isReverse ? styles.reverseRow : ''}`}
            >
              <motion.div 
                className={styles.textContent}
                initial={{ opacity: 0, x: isReverse ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.tagContainer}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className={styles.imageContent}
                initial={{ opacity: 0, x: isReverse ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                <div className={styles.imageWrapper}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className={styles.projectImage} 
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
