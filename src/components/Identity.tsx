import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Identity.module.css';

export function Identity() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const column1Opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const column1Y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  const column2Opacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);
  const column2Y = useTransform(scrollYProgress, [0.3, 0.8], [50, 0]);

  const column3Opacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const column3Y = useTransform(scrollYProgress, [0.5, 1], [50, 0]);

  // Safely encode URI for the specific filename containing spaces
  const imageURI = "/images/profile_photos/WhatsApp%20Image%202026-03-31%20at%2010.32.09%20PM.jpeg";

  return (
    <section ref={containerRef} className={`${styles.identitySection} section`}>
      <div className={styles.gridContainer}>
        
        {/* Left Column: Intro */}
        <motion.div 
          className={styles.introColumn}
          style={{ opacity: column1Opacity, y: column1Y }}
        >
          <h2 className={styles.mainTitle}>Software Developer</h2>
          <p className={styles.paragraph}>
            Analytical Python developer with strong foundations in data structures, algorithms, SQL, and RDBMS concepts, experienced in building backend applications using Django and REST APIs. Skilled in problem solving, debugging, and developing data-driven solutions, with growing exposure to data engineering practices and Python data processing tools.
          </p>
          <p className={styles.paragraph}>
            Passionate about Generative AI technologies and eager to apply modern data and AI concepts to real-world engineering challenges.
          </p>
        </motion.div>

        {/* Center Column: Experience Dashboard */}
        <motion.div 
          className={styles.glassBox}
          style={{ opacity: column2Opacity, y: column2Y }}
        >
          <h3 className={styles.sectionTitle}>Education</h3>
          <div className={styles.timelineItem}>
            <div className={styles.dateRight}>JUL 2023</div>
            <div className={styles.timelineContent}>
              <h4>M.Tech, Robotics & Automation</h4>
              <p>Saintgits College of Engineering, Kerala</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.dateRight}>JUL 2021</div>
            <div className={styles.timelineContent}>
              <h4>B.Tech, Electronics & Comm.</h4>
              <p>MBCCET, Kerala</p>
            </div>
          </div>

          <h3 className={styles.sectionTitle} style={{ marginTop: '2.5rem' }}>Experience</h3>
          <div className={styles.timelineItem}>
            <div className={styles.dateRight}>AUG 2025 - PRESENT</div>
            <div className={styles.timelineContent}>
              <h4>Software Developer</h4>
              <p>Voleergo Solution LLP, Kochi</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.dateRight}>MAR 2024 - FEB 2025</div>
            <div className={styles.timelineContent}>
              <h4>Python Trainee</h4>
              <p>Srishti Innovative, Trivandrum</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.dateRight}>OCT 2022 - DEC 2022</div>
            <div className={styles.timelineContent}>
              <h4>Junior Software Engineer (ROS)</h4>
              <p>Ingen Dynamics, Kozhikode</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Photo Popout overlaying Red */}
        <motion.div 
          className={styles.photoColumn}
          style={{ opacity: column3Opacity, y: column3Y }}
        >
           <div className={styles.redBackground}></div>
           <img 
             src={imageURI} 
             alt="Sherin Reba Philip" 
             className={styles.profileImage} 
           />
        </motion.div>

      </div>
    </section>
  );
}
