import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <motion.header 
      className={styles.header}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.headerContent}>
        <motion.div 
          className={styles.logo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">
            <span className={styles.logoText}>Handy<span className={styles.highlight}>Law</span> by <span className={styles.smallText}>Lawtte</span></span>
          </Link>
        </motion.div>
        
        <nav className={styles.nav}>
          <motion.ul className={styles.navList}>
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/">
                <span>Home</span>
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/guide">
                <span>Strategy Guide</span>
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/about">
                <span>About</span>
              </Link>
            </motion.li>
          </motion.ul>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header; 