import React from 'react';
import styles from '../styles/Loader.module.css'; 

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading...</p> 
    </div>
  );
};

export default Loader;