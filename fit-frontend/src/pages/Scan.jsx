import { useState, useRef, useCallback } from "react";
import { FiCamera, FiUpload, FiCheck, FiX, FiImage, FiTag, FiPlus, FiRefreshCw, FiVideo, FiVideoOff, FiEdit2, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useWardrobe } from "../context/WardrobeContext";
import "../styles/auth.css";

export default function Scan() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [detectedItem, setDetectedItem] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [mode, setMode] = useState("upload"); // "upload" or "camera"
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState("");
  const [editedColor, setEditedColor] = useState("");
  const [addedToWardrobe, setAddedToWardrobe] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { addItem } = useWardrobe();

  // Available categories and colors for editing
  const categories = [
    "T-Shirt", "Casual Shirt", "Formal Shirt", "Polo Shirt", "Blouse",
    "Jeans", "Chinos", "Trousers", "Shorts", "Skirt",
    "Hoodie", "Sweater", "Cardigan", "Jacket", "Blazer", "Coat",
    "Dress", "Tank Top", "Other"
  ];

  const colors = [
    "White", "Black", "Gray", "Navy Blue", "Light Blue", "Dark Blue",
    "Red", "Pink", "Beige", "Brown", "Cream", "Green", "Yellow", "Other"
  ];
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Simulated AI detection - randomly selects realistic clothing items
  const detectItem = () => {
    const clothingItems = [
      { category: "T-Shirt", color: "White", confidence: 94 },
      { category: "T-Shirt", color: "Black", confidence: 92 },
      { category: "T-Shirt", color: "Navy Blue", confidence: 91 },
      { category: "Casual Shirt", color: "Light Blue", confidence: 89 },
      { category: "Formal Shirt", color: "White", confidence: 93 },
      { category: "Polo Shirt", color: "Gray", confidence: 88 },
      { category: "Jeans", color: "Dark Blue", confidence: 95 },
      { category: "Jeans", color: "Light Blue", confidence: 91 },
      { category: "Jeans", color: "Black", confidence: 90 },
      { category: "Chinos", color: "Beige", confidence: 87 },
      { category: "Trousers", color: "Black", confidence: 92 },
      { category: "Shorts", color: "Navy", confidence: 86 },
      { category: "Hoodie", color: "Gray", confidence: 93 },
      { category: "Hoodie", color: "Black", confidence: 91 },
      { category: "Sweater", color: "Cream", confidence: 88 },
      { category: "Cardigan", color: "Brown", confidence: 85 },
      { category: "Jacket", color: "Black", confidence: 94 },
      { category: "Denim Jacket", color: "Blue", confidence: 92 },
      { category: "Blazer", color: "Navy", confidence: 89 },
      { category: "Dress", color: "Black", confidence: 91 },
      { category: "Dress", color: "Red", confidence: 88 },
      { category: "Skirt", color: "Black", confidence: 87 },
      { category: "Blouse", color: "White", confidence: 90 },
      { category: "Tank Top", color: "White", confidence: 86 },
    ];
    
    // Randomly select an item
    const randomIndex = Math.floor(Math.random() * clothingItems.length);
    const item = clothingItems[randomIndex];
    
    // Add slight variation to confidence
    const confidenceVariation = Math.floor(Math.random() * 6) - 2; // -2 to +3
    return {
      ...item,
      confidence: Math.min(99, Math.max(80, item.confidence + confidenceVariation))
    };
  };

  // Process captured/uploaded image
  const processImage = useCallback((imageUrl, fileName = "camera_capture") => {
    setPreview(imageUrl);
    setScanComplete(false);
    setDetectedItem(null);

    setIsScanning(true);
    setTimeout(() => {
      const result = detectItem();
      setDetectedItem(result);
      setIsScanning(false);
      setScanComplete(true);
    }, 1500);
  }, []);

  // Start camera
  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      setCameraError("Unable to access camera. Please check permissions.");
      setCameraActive(false);
    }
  }, []);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }, []);

  // Capture photo from camera
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageUrl = canvas.toDataURL("image/jpeg", 0.9);
    stopCamera();
    processImage(imageUrl, "camera_capture");
  }, [stopCamera, processImage]);

  // Switch mode
  const switchMode = useCallback((newMode) => {
    if (newMode === mode) return;
    
    resetScan();
    stopCamera();
    setMode(newMode);
    
    if (newMode === "camera") {
      setTimeout(() => startCamera(), 100);
    }
  }, [mode, stopCamera, startCamera]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    processImage(URL.createObjectURL(file), file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      processImage(URL.createObjectURL(file), file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const resetScan = () => {
    setImage(null);
    setPreview(null);
    setDetectedItem(null);
    setScanComplete(false);
    setIsScanning(false);
    setAddedToWardrobe(false);
    setShowSuccess(false);
    setIsEditing(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="scan-page">
      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Header */}
      <div className="scan-header">
        <h1 className="scan-title">
          <FiCamera className="title-icon" /> Scan Your Outfit
        </h1>
        <p className="scan-subtitle">
          Upload or capture an image to automatically detect and categorize your clothing
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="scan-mode-toggle">
        <button
          className={`mode-btn ${mode === "upload" ? "active" : ""}`}
          onClick={() => switchMode("upload")}
        >
          <FiUpload /> Upload
        </button>
        <button
          className={`mode-btn ${mode === "camera" ? "active" : ""}`}
          onClick={() => switchMode("camera")}
        >
          <FiVideo /> Camera
        </button>
      </div>

      {/* Main Content */}
      <div className="scan-main">
        {/* Upload/Camera Section */}
        <div className="scan-upload-section">
          {mode === "upload" ? (
            <>
              <div
                className={`upload-zone ${preview ? "has-image" : ""} ${isScanning ? "scanning" : ""}`}
                onClick={!preview ? triggerFileInput : undefined}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />

                {!preview ? (
                  <div className="upload-placeholder">
                    <FiUpload className="upload-icon" />
                    <h3>Drop your image here</h3>
                    <p>or click to browse</p>
                    <div className="upload-formats">
                      <span>PNG</span>
                      <span>JPG</span>
                      <span>WEBP</span>
                    </div>
                  </div>
                ) : (
                  <div className="preview-container">
                    <img src={preview} alt="Preview" className="preview-image" />
                    {isScanning && (
                      <div className="scanning-overlay">
                        <div className="scan-line"></div>
                        <p>Scanning...</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {preview && (
                <div className="upload-actions">
                  <button className="action-btn secondary" onClick={triggerFileInput}>
                    <FiRefreshCw /> Change Image
                  </button>
                  <button className="action-btn danger" onClick={resetScan}>
                    <FiX /> Clear
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className={`camera-zone ${preview ? "has-image" : ""} ${isScanning ? "scanning" : ""}`}>
                {!preview ? (
                  <>
                    {cameraError ? (
                      <div className="camera-error">
                        <FiVideoOff className="error-icon" />
                        <p>{cameraError}</p>
                        <button className="action-btn secondary" onClick={startCamera}>
                          <FiRefreshCw /> Try Again
                        </button>
                      </div>
                    ) : cameraActive ? (
                      <div className="camera-preview">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="camera-video"
                        />
                        <div className="camera-frame">
                          <div className="frame-corner top-left"></div>
                          <div className="frame-corner top-right"></div>
                          <div className="frame-corner bottom-left"></div>
                          <div className="frame-corner bottom-right"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="camera-loading">
                        <div className="pulse-dot"></div>
                        <p>Initializing camera...</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="preview-container">
                    <img src={preview} alt="Captured" className="preview-image" />
                    {isScanning && (
                      <div className="scanning-overlay">
                        <div className="scan-line"></div>
                        <p>Scanning...</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="camera-actions">
                {!preview && cameraActive && (
                  <button className="capture-btn" onClick={capturePhoto}>
                    <FiCamera /> Capture Photo
                  </button>
                )}
                {preview && (
                  <>
                    <button className="action-btn secondary" onClick={() => { resetScan(); startCamera(); }}>
                      <FiRefreshCw /> Retake
                    </button>
                    <button className="action-btn danger" onClick={resetScan}>
                      <FiX /> Clear
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* Results Section */}
        <div className="scan-results-section">
          <h2 className="section-title">
            <FiTag /> Detection Results
          </h2>

          {!preview && !detectedItem && (
            <div className="no-results">
              <FiImage className="no-results-icon" />
              <p>Upload an image to see detection results</p>
            </div>
          )}

          {isScanning && (
            <div className="scanning-status">
              <div className="pulse-dot"></div>
              <p>Analyzing your clothing item...</p>
            </div>
          )}

          {scanComplete && detectedItem && (
            <div className="results-card">
              <div className="demo-disclaimer">
                <FiAlertCircle />
                <span>Demo Mode: Results are simulated. Edit below to correct.</span>
              </div>

              <div className="result-header">
                <FiCheck className="success-icon" />
                <span>Detection Complete</span>
                <button 
                  className="edit-btn"
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setEditedCategory(detectedItem.category);
                    setEditedColor(detectedItem.color);
                  }}
                >
                  <FiEdit2 /> {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="result-details">
                <div className="result-item">
                  <span className="result-label">Category</span>
                  {isEditing ? (
                    <select 
                      className="edit-select"
                      value={editedCategory}
                      onChange={(e) => setEditedCategory(e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="result-value">{detectedItem.category}</span>
                  )}
                </div>
                <div className="result-item">
                  <span className="result-label">Color</span>
                  {isEditing ? (
                    <select 
                      className="edit-select"
                      value={editedColor}
                      onChange={(e) => setEditedColor(e.target.value)}
                    >
                      {colors.map(col => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="result-value">{detectedItem.color}</span>
                  )}
                </div>
              </div>

              {isEditing && (
                <button 
                  className="save-edit-btn"
                  onClick={() => {
                    setDetectedItem({
                      ...detectedItem,
                      category: editedCategory,
                      color: editedColor,
                      confidence: 100
                    });
                    setIsEditing(false);
                  }}
                >
                  <FiCheck /> Save Changes
                </button>
              )}

              <button 
                className={`add-to-wardrobe-btn ${addedToWardrobe ? "added" : ""}`}
                onClick={() => {
                  if (addedToWardrobe) return;
                  
                  addItem({
                    category: detectedItem.category,
                    color: detectedItem.color,
                    image: preview,
                  });
                  
                  setAddedToWardrobe(true);
                  setShowSuccess(true);
                  
                  // Hide success message after 3 seconds
                  setTimeout(() => {
                    setShowSuccess(false);
                  }, 3000);
                }}
                disabled={addedToWardrobe}
              >
                {addedToWardrobe ? (
                  <><FiCheckCircle /> Added to Wardrobe</>
                ) : (
                  <><FiPlus /> Add to Wardrobe</>
                )}
              </button>

              {showSuccess && (
                <div className="success-toast">
                  <FiCheckCircle />
                  <span>Item successfully added to your wardrobe!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="scan-tips">
        <h3>Tips for Best Results</h3>
        <div className="tips-grid">
          <div className="tip-item">
            <span className="tip-number">1</span>
            <p>Use good lighting for clear images</p>
          </div>
          <div className="tip-item">
            <span className="tip-number">2</span>
            <p>Capture the full clothing item</p>
          </div>
          <div className="tip-item">
            <span className="tip-number">3</span>
            <p>Avoid busy backgrounds</p>
          </div>
          <div className="tip-item">
            <span className="tip-number">4</span>
            <p>Lay flat or hang for best shape</p>
          </div>
        </div>
      </div>
    </div>
  );
}
