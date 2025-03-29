import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Form.module.css';

// Animation variants
const uploadContainerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 35
    }
  }
};

const uploadDropAreaVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25
    }
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 5px 15px rgba(157, 0, 255, 0.2)",
    backgroundColor: "rgba(157, 0, 255, 0.05)",
    borderColor: "var(--secondary-color)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  },
  dragOver: {
    scale: 1.05,
    boxShadow: "0 10px 25px rgba(157, 0, 255, 0.3)",
    backgroundColor: "rgba(157, 0, 255, 0.1)",
    borderColor: "var(--secondary-color)",
    borderWidth: "2px",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const fileItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  },
  hover: {
    y: -2,
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25
    }
  }
};

export default function DocumentUpload({ onUpload }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [parsedDocuments, setParsedDocuments] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    // Validate file types and sizes
    const validFiles = validateFiles(droppedFiles);
    
    if (validFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...validFiles]);
    }
  }, []);
  
  // Handle drag events
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  // Handle file input change
  const handleFileInputChange = useCallback((e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Validate file types and sizes
    const validFiles = validateFiles(selectedFiles);
    
    if (validFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...validFiles]);
    }
  }, []);
  
  // Validate files for type and size
  const validateFiles = (filesToValidate) => {
    const validTypes = [
      'application/pdf', 
      'image/jpeg', 
      'image/png', 
      'image/jpg',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validatedFiles = [];
    
    for (let file of filesToValidate) {
      if (!validTypes.includes(file.type)) {
        setError(`File type ${file.type} is not supported.`);
        continue;
      }
      
      if (file.size > maxSize) {
        setError(`File ${file.name} exceeds the 10MB size limit.`);
        continue;
      }
      
      // Add a unique ID and preview URL to each file
      validatedFiles.push({
        file,
        id: `file-${Date.now()}-${Math.random().toString(36).substring(2)}`,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
        docType: 'unknown'
      });
    }
    
    return validatedFiles;
  };
  
  // Handle document type selection for a file
  const handleDocTypeChange = useCallback((fileId, docType) => {
    setFiles(prevFiles =>
      prevFiles.map(fileObj =>
        fileObj.id === fileId ? { ...fileObj, docType } : fileObj
      )
    );
  }, []);
  
  // Remove file from the list
  const handleRemoveFile = useCallback((fileId) => {
    setFiles(prevFiles => {
      const updatedFiles = prevFiles.filter(fileObj => fileObj.id !== fileId);
      
      // Revoke object URL for images to free memory
      const fileToRemove = prevFiles.find(fileObj => fileObj.id === fileId);
      if (fileToRemove && fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      
      return updatedFiles;
    });
  }, []);
  
  // Process and upload files
  const handleProcessFiles = async () => {
    if (files.length === 0) {
      setError("Please add at least one file to upload.");
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      // Create form data for upload
      const formData = new FormData();
      
      files.forEach(fileObj => {
        formData.append('files', fileObj.file);
        formData.append('docTypes', fileObj.docType);
      });
      
      // Upload files to API
      const response = await fetch('/api/parse-documents', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload and parse documents');
      }
      
      const data = await response.json();
      
      // Return parsed data to parent component
      setParsedDocuments(data.parsedData);
      
      if (onUpload) {
        onUpload(data.parsedData);
      }
      
      // Clear files after successful upload
      setFiles([]);
      
    } catch (err) {
      setError(err.message || 'An error occurred while processing documents');
    } finally {
      setIsUploading(false);
    }
  };
  
  // Get document type label based on document type
  const getDocumentTypeLabel = (docType) => {
    const docTypes = {
      'medical': 'Medical Records',
      'billing': 'Medical Bills',
      'insurance': 'Insurance Documents',
      'police': 'Police Report',
      'employment': 'Employment/Wage Document',
      'photos': 'Accident Photos',
      'other': 'Other'
    };
    
    return docTypes[docType] || 'Select Document Type';
  };
  
  // Get file type icon based on file type
  const getFileTypeIcon = (file) => {
    if (!file) return '📄';
    
    if (file.type.startsWith('image/')) {
      return '🖼️';
    } else if (file.type.includes('pdf')) {
      return '📑';
    } else if (file.type.includes('word')) {
      return '📝';
    } else {
      return '📄';
    }
  };
  
  return (
    <motion.div 
      className={styles.formGroup}
      variants={uploadContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2>Document Upload</h2>
      <p className={styles.uploadDescription}>
        Upload relevant documents like medical records, bills, or other supporting materials. The system will parse them automatically.
      </p>
      
      <motion.div 
        className={styles.uploadDropArea}
        variants={uploadDropAreaVariants}
        initial="hidden"
        animate={isDragging ? "dragOver" : "visible"}
        whileHover="hover"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <div className={styles.uploadIconContainer}>
          <svg className={styles.uploadIcon} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <div className={styles.uploadInstructions}>
          <p>Drag and drop files here or <span>browse files</span></p>
          <p className={styles.uploadSubtext}>Supports PDF, DOCX, JPG, PNG (max 10MB each)</p>
        </div>
        <input 
          type="file"
          ref={fileInputRef}
          className={styles.fileInput}
          onChange={handleFileInputChange}
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </motion.div>
      
      {files.length > 0 && (
        <div className={styles.uploadedFiles}>
          <h3>Uploaded Files</h3>
          <ul className={styles.fileList}>
            {files.map((fileObj) => (
              <motion.li 
                key={fileObj.id} 
                className={styles.fileItem}
                variants={fileItemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <div className={styles.filePreview}>
                  {fileObj.preview ? (
                    <img src={fileObj.preview} alt="Preview" />
                  ) : (
                    <span className={styles.fileIcon}>{getFileTypeIcon(fileObj.file)}</span>
                  )}
                </div>
                <div className={styles.fileDetails}>
                  <div className={styles.fileName}>{fileObj.file.name}</div>
                  <div className={styles.fileSize}>{(fileObj.file.size / 1024 / 1024).toFixed(2)} MB</div>
                  <select 
                    className={styles.docTypeSelect}
                    value={fileObj.docType}
                    onChange={(e) => handleDocTypeChange(fileObj.id, e.target.value)}
                  >
                    <option value="unknown">Select Document Type</option>
                    <option value="medical">Medical Records</option>
                    <option value="billing">Medical Bills</option>
                    <option value="insurance">Insurance Documents</option>
                    <option value="police">Police Report</option>
                    <option value="employment">Employment/Wage Document</option>
                    <option value="photos">Accident Photos</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <button 
                  className={styles.removeFileBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(fileObj.id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </motion.li>
            ))}
          </ul>
          
          <div className={styles.uploadActions}>
            <button 
              type="button" 
              className={styles.processBtn}
              onClick={handleProcessFiles}
              disabled={isUploading || files.length === 0}
            >
              {isUploading ? 
                'Processing...' : 
                `Process ${files.length} Document${files.length !== 1 ? 's' : ''}`}
            </button>
          </div>
        </div>
      )}
      
      {error && <div className={styles.error}>{error}</div>}
      
      {parsedDocuments && (
        <div className={styles.parsedData}>
          <h3>Document Analysis Results</h3>
          <div className={styles.parsedDataContent}>
            <pre>{JSON.stringify(parsedDocuments, null, 2)}</pre>
          </div>
        </div>
      )}
    </motion.div>
  );
} 