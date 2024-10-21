
import React, { useEffect, useState } from "react";
import styles from "../styles/BackgroundVideo.module.css";

//model
interface BackgroundVideoProps {
  isDarkMode: boolean;
}
// JF - Bacground video exeprimental should really be animated svg on one run - reused some code from before here

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ isDarkMode }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div className={styles.backgroundVideoContainer}>
      {!isMobile && (
        <video
          key={isDarkMode ? "dark-video" : "light-video"} 
          className={styles.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          onError={() => console.error("Video failed to load")}
        >
          <source
            src={isDarkMode ? "/videos/dark-mode-video.mp4" : "/videos/light-mode-video.mp4"}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}
      
  
      <div className={`${styles.overlay} ${isDarkMode ? styles.darkOverlay : ""}`} />
    </div>
  );
};

export default BackgroundVideo;
