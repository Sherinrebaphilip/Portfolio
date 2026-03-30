import { motion } from 'framer-motion';
import styles from './SkillsGrid.module.css';

const skills = [
  { category: "Languages", items: ["Python", "C++", "TypeScript", "Go"] },
  { category: "AI / ML", items: ["PyTorch", "TensorRT", "OpenCV", "ROS"] },
  { category: "Backend", items: ["Django", "FastAPI", "Node.js", "PostgreSQL"] },
  { category: "Infrastructure", items: ["Docker", "Kubernetes", "AWS", "CI/CD"] },
];

export function SkillsGrid() {
  return (
    <section className={`${styles.skillsSection} section`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Technical Arsenal</h2>
        </div>
        
        <div className={styles.grid}>
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              className={`${styles.skillCard} glass`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <h3 className={styles.categoryTitle}>{skillGroup.category}</h3>
              <ul className={styles.skillList}>
                {skillGroup.items.map(item => (
                  <li key={item} className={styles.skillItem}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
