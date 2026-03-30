import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import styles from './Hero.module.css';

const FRAME_COUNT = 240;

function currentFrame(index: number, isMobile: boolean) {
  const paddedIndex = index.toString().padStart(3, '0');
  const folder = isMobile ? 'herosection_small' : 'herosection';
  return `/images/${folder}/ezgif-frame-${paddedIndex}.jpg`;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 683 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 683);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Preload images
  useEffect(() => {
    setImagesLoaded(0);
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i, isMobile);
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const ctx = canvasRef.current?.getContext('2d');
    const image = images[Math.floor(latest)];

    if (ctx && image && image.complete) {
      const canvas = canvasRef.current!;
      if (canvas.width !== image.width || canvas.height !== image.height) {
        canvas.width = image.width;
        canvas.height = image.height;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0);
    }
  });

  // Handle initial frame draw smoothly
  useEffect(() => {
    const currentIdx = Math.floor(frameIndex.get());
    const image = images[currentIdx];
    if (canvasRef.current && image?.complete) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (canvas.width !== image.width || canvas.height !== image.height) {
        canvas.width = image.width;
        canvas.height = image.height;
      }
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(image, 0, 0);
    }
  }, [images, frameIndex]);

  // Feature sections mapped to scroll Progress:


  const feature3Opacity = useTransform(scrollYProgress, [0.7, 0.75, 0.85, 0.9], [0, 1, 1, 0]);
  const feature3Y = useTransform(scrollYProgress, [0.7, 0.75], [50, 0]);

  const introOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const words = "Sherin Reba Philip".split(" ");

  return (
    <section ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.stickyWrapper}>

        <canvas ref={canvasRef} className={styles.sequenceCanvas} />

        <div className={styles.overlayTextContainer}>
          <motion.div style={{ opacity: introOpacity }} className={styles.introContainer}>
            <h1 className={styles.heroTitle}>
              {words.map((word, wordIdx) => {
                const globalOffset = wordIdx * 6;
                return (
                  <span key={wordIdx} className={styles.wordWrapper}>
                    {word.split("").map((char, charIdx) => (
                      <motion.span
                        key={charIdx}
                        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{
                          duration: 1,
                          delay: (globalOffset + charIdx) * 0.04,
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    {wordIdx !== words.length - 1 && <span>&nbsp;</span>}
                  </span>
                );
              })}
            </h1>
            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Scroll to explore
            </motion.p>
          </motion.div>




          <div className={`${styles.featureWrapper} ${styles.featureCenter}`}>
            <motion.div
              className={styles.featureBox}
              style={{ opacity: feature3Opacity, y: feature3Y }}
            >
              <h3>Unmatched Autonomy</h3>
              <p>Complex algorithms seamlessly engineered for scale and extreme precision.</p>
            </motion.div>
          </div>

        </div>

        {imagesLoaded < FRAME_COUNT && (
          <div className={styles.loader}>
            <p>Loading frames... {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%</p>
          </div>
        )}
      </div>
    </section>
  );
}
