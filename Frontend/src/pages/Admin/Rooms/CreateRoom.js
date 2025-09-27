import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";

import axios from "../../../axios";

import { useStateValue } from "../../../context/StateProvider";
import { actionTypes } from "../../../context/reducer";

import Sidebar from "./../Sidebar";
import Helmet from "react-helmet";
import "./CreateRoom.css";

function CreateRoom() {
  const [state, dispatch] = useStateValue();

  const [formData, setFormData] = useState({
    name: "",
    rentPerDay: "",
    type: "",
    maxCount: "",
    images: [],
    description: "",
    amenities: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const history = useHistory();
  const sideBar = useRef();

  // Room type options based on backend model
  const roomTypes = [
    "SingleAC",
    "DoubleAC",
    "Single",
    "Double",
    "Family",
    "Standard",
  ];

  function logout() {
    dispatch({
      type: actionTypes.AUTH,
      isAuth: false,
      accessToken: null,
      admin: null,
    });
    try {
      localStorage.removeItem("adminAuth");
    } catch (e) {}
  }

  function toggleSidebar() {
    sideBar.current.classList.toggle("collapse");
  }

  useEffect(() => {
    if (state.isAuth === false) {
      return history.push("/login");
    }
  }, [state.isAuth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImagesChange = (newImages) => {
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
    // Clear image error when images change
    if (errors.images) {
      setErrors((prev) => ({
        ...prev,
        images: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Room name is required";
    } else if (formData.name.length > 100) {
      newErrors.name = "Room name cannot exceed 100 characters";
    }

    if (!formData.rentPerDay) {
      newErrors.rentPerDay = "Rent per day is required";
    } else if (
      isNaN(formData.rentPerDay) ||
      parseFloat(formData.rentPerDay) < 0
    ) {
      newErrors.rentPerDay = "Rent must be a positive number";
    }

    if (!formData.type) {
      newErrors.type = "Room type is required";
    }

    if (!formData.maxCount) {
      newErrors.maxCount = "Maximum count is required";
    } else if (
      isNaN(formData.maxCount) ||
      parseInt(formData.maxCount) < 1 ||
      parseInt(formData.maxCount) > 10
    ) {
      newErrors.maxCount = "Maximum count must be between 1 and 10";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    } else if (formData.description.length > 1000) {
      newErrors.description = "Description cannot exceed 1000 characters";
    }

    if (!formData.images || formData.images.length === 0) {
      newErrors.images = "At least one image is required";
    } else if (formData.images.length > 10) {
      newErrors.images = "Maximum 10 images allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    // Create FormData object to handle file uploads
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name.trim());
    formDataToSend.append("rentPerDay", formData.rentPerDay);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("maxCount", formData.maxCount);
    formDataToSend.append("description", formData.description.trim());

    // Handle amenities
    if (formData.amenities) {
      const amenitiesArray = formData.amenities
        .split(",")
        .map((item) => item.trim());
      formDataToSend.append("amenities", JSON.stringify(amenitiesArray));
    }

    // Append each image file
    formData.images.forEach((image, index) => {
      // If image is a File object
      if (image instanceof File) {
        formDataToSend.append("images", image);
      }
      // If image is a URL string
      else if (typeof image === "string") {
        formDataToSend.append("imageUrls", image);
      }
    });

    axios
      .post("/api/rooms/create", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.success) {
          setMessage({ type: "success", text: "Room created successfully!" });
          setTimeout(() => {
            history.push("/admin/rooms");
          }, 1500);
        }
      })
      .catch((err) => {
        console.error("Error creating room:", err);
        setMessage({
          type: "danger",
          text: err.response?.data?.message || "Failed to create room",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div>
      <Helmet>
        <title>Create Room - Hotel Royal Blue Star</title>
      </Helmet>

      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link to="/admin" className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
          Hotel Royal Blue Star Admin
        </Link>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          onClick={toggleSidebar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <Link to="" onClick={logout} className="nav-link px-3" href="#">
              Sign out
            </Link>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light collapse"
            ref={sideBar}
          >
            <Sidebar />
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h2>Add Room</h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="needs-validation form-container"
              noValidate
            >
              {message.text && (
                <div className={`alert alert-${message.type}`} role="alert">
                  {message.text}
                </div>
              )}
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label required-field">
                      Room Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      placeholder="Enter room name..."
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="rentPerDay"
                      className="form-label required-field"
                    >
                      Rent Per Day (INR)
                    </label>
                    <input
                      type="number"
                      id="rentPerDay"
                      name="rentPerDay"
                      className={`form-control ${
                        errors.rentPerDay ? "is-invalid" : ""
                      }`}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      value={formData.rentPerDay}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.rentPerDay && (
                      <div className="invalid-feedback">
                        {errors.rentPerDay}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="type" className="form-label required-field">
                      Room Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      className={`form-select ${
                        errors.type ? "is-invalid" : ""
                      }`}
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select room type</option>
                      {roomTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.type && (
                      <div className="invalid-feedback">{errors.type}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="maxCount"
                      className="form-label required-field"
                    >
                      Maximum Occupancy
                    </label>
                    <input
                      type="number"
                      id="maxCount"
                      name="maxCount"
                      className={`form-control ${
                        errors.maxCount ? "is-invalid" : ""
                      }`}
                      placeholder="1-10"
                      min="1"
                      max="10"
                      value={formData.maxCount}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.maxCount && (
                      <div className="invalid-feedback">{errors.maxCount}</div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label required-field">
                      Room Images
                    </label>
                    <ImageUpload
                      images={formData.images}
                      onImagesChange={handleImagesChange}
                      maxImages={10}
                      disabled={isSubmitting}
                      className={errors.images ? "error" : ""}
                      required={true} // Add this prop
                    />
                    {errors.images && (
                      <div className="invalid-feedback d-block">
                        {errors.images}
                      </div>
                    )}
                    <div className="form-text">
                      Upload at least one image (maximum 10 images allowed)
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="amenities" className="form-label">
                      Amenities
                    </label>
                    <textarea
                      id="amenities"
                      name="amenities"
                      className="form-control"
                      placeholder="Enter amenities separated by commas..."
                      rows="3"
                      value={formData.amenities}
                      onChange={handleInputChange}
                    />
                    <div className="form-text">
                      Enter amenities separated by commas (optional)
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="description"
                      className="form-label required-field"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows="5"
                      className={`form-control ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      placeholder="Enter room description (minimum 10 characters)..."
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                    <div className="form-text">
                      Description must be at least 10 characters long
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to="/admin/rooms" className="btn btn-secondary me-md-2">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Room"}
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;
