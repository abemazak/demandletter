import { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Form.module.css';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30,
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2
    }
  }
};

const letterVariants = {
  hidden: { opacity: 0, scale: 0.99 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30,
      delay: 0.1
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  },
  tap: {
    scale: 0.98
  }
};

export default function GeneratedLetter({ letter, onBack }) {
  const letterRef = useRef(null);

  const handleCopy = () => {
    // Handle both plain text and HTML content
    const textContent = typeof letter === 'string' 
      ? letter
      : '';
      
    navigator.clipboard.writeText(textContent)
      .then(() => {
        alert('Letter copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy to clipboard');
      });
  };

  const handleDownload = () => {
    const fileName = `demand-letter-${new Date().toISOString().split('T')[0]}.txt`;
    const textContent = typeof letter === 'string' 
      ? letter
      : '';
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const element = document.createElement('a');
    element.setAttribute('href', url);
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      className={styles.resultContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        className={styles.letterContent}
        variants={letterVariants}
        ref={letterRef}
        whileHover={{ 
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
        }}
      >
        {letter}
      </motion.div>
      
      <motion.div 
        className={styles.actionButtons}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button 
          onClick={handleCopy}
          className={styles.copyButton}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Copy to Clipboard
        </motion.button>
        <motion.button 
          onClick={handleDownload}
          className={styles.downloadButton}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Download as TXT
        </motion.button>
        <motion.button 
          onClick={onBack}
          className={styles.backButton}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Back to Form
        </motion.button>
      </motion.div>
    </motion.div>
  );
} 