import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Upload, X } from "lucide-react";
import { Badge, Star, Circle, Diamond, Sparkles } from "lucide-react";

const Classify = () => {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [classificationResult, setClassificationResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const classifyImage = async () => {
    if (uploadedImage) {
      const file = base64ToFile(uploadedImage, "upload.png");

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8000/predict", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          console.error("Failed to classify image");
          return;
        }

        const data = await response.json();
        setClassificationResult(data);
        console.log("Classification result:", data);
      } catch (err) {
        console.error("Error during classification:", err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-b from-gray-800 to-slate-800 min-h-screen relative">
        <div className="relative flex flex-col">
          <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="sticky top-0 w-full bg-white/5 backdrop-blur-lg border-b border-white/20 p-4 flex justify-between items-center transition-colors z-20"
          >
            <h1
              className="font-mono text-3xl text-violet-100 cursor-pointer"
              onClick={() => navigate("/")}
            >
              F.i.C.
            </h1>
          </motion.header>

          <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <div className="w-full max-w-2xl">
              <motion.div
                className={`relative border-2 rounded-2xl bg-gray-300/20 shadow-lg transition-all duration-300 ${
                  isDragging
                    ? "border-violet-400 bg-violet-500/10"
                    : uploadedImage
                    ? "border-gray-300"
                    : "border-dashed border-gray-300"
                }`}
                style={{ aspectRatio: "16/10" }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={!uploadedImage ? handleClick : undefined}
                whileHover={!uploadedImage ? { scale: 1.02 } : {}}
                whileTap={!uploadedImage ? { scale: 0.98 } : {}}
              >
                {uploadedImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="w-full h-full object-contain rounded-2xl"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                      className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full cursor-pointer">
                    <motion.div
                      animate={{
                        y: isDragging ? -10 : 0,
                        scale: isDragging ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center"
                    >
                      <Upload
                        className={`text-6xl mb-4 transition-colors ${
                          isDragging ? "text-violet-400" : "text-white/70"
                        }`}
                        size={64}
                      />
                      <p
                        className={`text-xl font-medium mb-2 transition-colors ${
                          isDragging ? "text-violet-300" : "text-white/90"
                        }`}
                      >
                        {isDragging
                          ? "Drop your image here"
                          : "Upload an image"}
                      </p>
                      <p className="text-white/60 text-center">
                        Drag and drop or click to browse
                      </p>
                      <p className="text-white/40 text-sm mt-2">
                        Supports: JPG, PNG, GIF, WebP
                      </p>
                    </motion.div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </motion.div>

              {uploadedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex justify-center space-x-4"
                >
                  <button
                    onClick={classifyImage}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Classify Image
                  </button>
                  <button
                    onClick={removeImage}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  >
                    Remove Image
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        {classificationResult && (
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 1 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-t-3xl mx-4 mb-0 min-h-screen relative"
            style={{ marginTop: "-16vh" }} // Overlap with viewport to show partially
          >
            <div className="p-8 pt-12">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex justify-center mb-6"
              >
                <div className="w-12 h-1 bg-white/40 rounded-full"></div>
              </motion.div>

              
            </div>
          </motion.section>
        )}
      </div>
    </motion.div>
  );
};

export default Classify;
