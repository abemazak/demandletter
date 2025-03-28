import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer 
      className={styles.footer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>DemandPro</h3>
          <p className={styles.footerText}>
            Advanced Demand Letter Generator with integrated strategy framework
          </p>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Quick Links</h3>
          <ul className={styles.footerLinks}>
            <li><a href="/">Home</a></li>
            <li><a href="/guide">Strategy Guide</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/terms">Terms of Use</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Legal</h3>
          <p className={styles.footerText}>
            This tool is provided for professional use only. Always review generated content for accuracy.
          </p>
        </div>
      </div>
      
      <div className={styles.copyright}>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>&copy; {currentYear} DemandPro. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer; 