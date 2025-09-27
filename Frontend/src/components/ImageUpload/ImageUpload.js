import React, { useState, useRef, useCallback } from "react";
import axios from "../../axios";
import "./ImageUpload.css";
import PropTypes from "prop-types";

const ImageUpload = ({
  images = [],
  onImagesChange,
  maxImages = 10,
  disabled = false,
  className = "",
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFiles = useCallback(
    async (files) => {
      if (disabled || uploading) return;

      const fileArray = Array.from(files);
      const validFiles = fileArray.filter((file) => {
        const isValidType = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ].includes(file.type);
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
        return isValidType && isValidSize;
      });

      if (validFiles.length === 0) {
        alert(
          "Please select valid image files (JPEG, PNG, WebP) under 5MB each."
        );
        return;
      }

      if (images.length + validFiles.length > maxImages) {
        alert(
          `You can only upload up to ${maxImages} images. You currently have ${images.length} images.`
        );
        return;
      }

      setUploading(true);
      const formData = new FormData();

      validFiles.forEach((file) => {
        formData.append("images", file);
      });

      try {
        const response = await axios.post("/api/upload/multiple", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress((prev) => ({
              ...prev,
              uploading: percentCompleted,
            }));
          },
        });

        if (response.data.success) {
          const newImageUrls = response.data.data.images.map(
            (img) => img.imageUrl
          );
          onImagesChange([...images, ...newImageUrls]);
          setUploadProgress({});
        } else {
          throw new Error(response.data.message || "Upload failed");
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert(
          error.response?.data?.message ||
            "Failed to upload images. Please try again."
        );
      } finally {
        setUploading(false);
      }
    },
    [images, onImagesChange, maxImages, disabled, uploading]
  );

  // Handle drag and drop
  const handleDrag = useCallback((e) => {
    ImageUpload.propTypes = {
      images: PropTypes.array,
      onImagesChange: PropTypes.func,
      maxImages: PropTypes.number,
      disabled: PropTypes.bool,
      className: PropTypes.string,
    };
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled || uploading) return;

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFiles(files);
      }
    },
    [disabled, uploading, handleFiles]
  );

  // Handle file input change
  const handleFileInputChange = useCallback(
    (e) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFiles(files);
      }
    },
    [handleFiles]
  );

  // Remove image
  const removeImage = useCallback(
    (indexToRemove) => {
      if (disabled || uploading) return;

      const newImages = images.filter((_, index) => index !== indexToRemove);
      onImagesChange(newImages);
    },
    [images, onImagesChange, disabled, uploading]
  );

  // Open file dialog
  const openFileDialog = useCallback(() => {
    if (disabled || uploading) return;
    fileInputRef.current?.click();
  }, [disabled, uploading]);

  return (
    <div className={`image-upload-container ${className}`}>
      <div
        className={`image-upload-dropzone ${dragActive ? "drag-active" : ""} ${
          disabled ? "disabled" : ""
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileInputChange}
          style={{ display: "none" }}
          disabled={disabled || uploading}
        />

        {uploading ? (
          <div className="upload-progress">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Uploading...</span>
            </div>
            <p>Uploading images...</p>
            {uploadProgress.uploading && (
              <div className="progress mt-2">
                <div
                  className="progress-bar"
                  style={{ width: `${uploadProgress.uploading}%` }}
                ></div>
              </div>
            )}
          </div>
        ) : (
          <div className="upload-placeholder">
            <i className="fas fa-cloud-upload-alt"></i>
            <h5>Drag & Drop Images Here</h5>
            <p>
              or <span className="text-primary">click to browse</span>
            </p>
            <small className="text-muted">
              Supports: JPEG, PNG, WebP (Max 5MB each)
            </small>
            <small className="text-muted d-block">
              Max {maxImages} images • {images.length}/{maxImages} uploaded
            </small>
          </div>
        )}
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="image-preview-grid">
          {images.map((imageUrl, index) => (
            <div key={index} className="image-preview-item">
              <img
                src={imageUrl}
                alt={`Upload ${index + 1}`}
                className="preview-image"
                onError={(e) => {
                  e.target.src = "/placeholder-image.png";
                }}
              />
              <button
                type="button"
                className="remove-image-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                disabled={disabled || uploading}
                title="Remove image"
              >
                <i className="fas fa-times"></i>
              </button>
              <div className="image-overlay">
                <span className="image-number">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Status */}
      {images.length > 0 && (
        <div className="upload-status">
          <small className="text-muted">
            {images.length} image{images.length !== 1 ? "s" : ""} uploaded
            {images.length < maxImages &&
              ` • ${maxImages - images.length} more allowed`}
          </small>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
