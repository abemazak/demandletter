import { useRef } from 'react';
import styles from '../styles/Form.module.css';

export default function GeneratedLetter({ letter, onBack }) {
  const letterRef = useRef(null);

  const handleCopy = () => {
    // Handle HTML content safely
    const tempElement = document.createElement('div');
    tempElement.innerHTML = letter || '';
    const textContent = tempElement.textContent || tempElement.innerText || '';

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
    // Handle HTML content safely
    const tempElement = document.createElement('div');
    tempElement.innerHTML = letter || '';
    const textContent = tempElement.textContent || tempElement.innerText || '';
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'demand_letter.txt';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>HandyLaw Document</title>
          <link rel="stylesheet" href="https://use.typekit.net/aoz8yor.css" />
          <style>
            body {
              font-family: 'acre', sans-serif;
              line-height: 1.5;
              margin: 1in;
            }
            
            h3 {
              margin-top: 20px;
              margin-bottom: 10px;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
            }
            
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            
            th {
              background-color: #f5f5f5;
            }
            
            @media print {
              body {
                margin: 0.5in;
              }
            }
          </style>
        </head>
        <body>
          ${letter}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Print after a short delay to allow content to render
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultHeader}>
        <h2>Generated Document</h2>
        <div className={styles.resultActions}>
          <button onClick={handleCopy}>Copy to Clipboard</button>
          <button onClick={handleDownload}>Download as TXT</button>
          <button onClick={handlePrint}>Print Letter</button>
          <button onClick={onBack}>Back to Form</button>
        </div>
      </div>
      <pre 
        ref={letterRef} 
        className={styles.letterContent}
        dangerouslySetInnerHTML={{ __html: letter }}
      />
    </div>
  );
} 