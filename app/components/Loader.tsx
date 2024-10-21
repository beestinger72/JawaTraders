import React from 'react';
import styles from '../styles/Loader.module.css'; 

//JF Basic loader component made to customise as wanted tatooine to apear as animated svg,
const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading...</p> 
    </div>
  );
};

export default Loader;