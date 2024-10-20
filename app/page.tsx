"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles/main.module.css";
import StarshipList from './components/StarshipList';
import { useTheme } from './theme/ThemeContext'; 
import { InlineNotification } from '@carbon/react';

const ThemeToggleButton = () => {
  const { toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme} className={styles.toggleButton}>
      Switch Side Of Force
    </button>
  );
};

export default function Home() {
  const { theme } = useTheme();
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
  const [lastAddedItem, setLastAddedItem] = useState<{ name: string; quantity: number } | null>(null);

  // notification
  const showNotification = (item: { name: string; quantity: number }) => {
    setLastAddedItem(item);
    setNotificationVisible(true);

    // Automatically hide the notification after 5 seconds 
    setTimeout(() => {
      setNotificationVisible(false);
    }, 5000);
  };

  return (
    
    <div className={`${styles.page} ${theme === 'dark' ? styles.dark : styles.light}`}>
      
       {notificationVisible && lastAddedItem && (
          <InlineNotification 
            title="Ship(s)Added"
            subtitle={`${lastAddedItem.name} - Quantity: ${lastAddedItem.quantity}`}
            kind="success"
            onClose={() => setNotificationVisible(false)}
            style={{ marginBottom: '20px', width: '100%' }} 
          />
        )} 
           
     <ThemeToggleButton />

      <main className={styles.main}>
       
          <Image
            className={styles.logo}
            src={theme === 'dark' ? '/images/logo-dark.svg' : '/images/logo.png'}
            alt="Logo"
            width={150}
            height={188}
            priority
          />
        <section className={styles.ctas}>
          <StarshipList onBuy={showNotification} />
        </section>

      </main>

      <footer className={styles.footer}>
     
      </footer>
    </div>
  );
}
