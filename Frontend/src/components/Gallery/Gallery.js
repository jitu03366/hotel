import React, { useState, useEffect } from "react";
import "./Gallery.css";

// Import sample images (replace with your actual room images)
import room1 from "../../style/img/bedroom.jpg";
import room2 from "../../style/img/booking.jpg";
import room3 from "../../style/img/delivery.jpg";
import room4 from "../../style/img/food.jpg";
import room5 from "../../style/img/gym.jpg";
import banquet1 from "../../style/img/lobby.jpg";
import banquet2 from "../../style/img/reception.jpg";
import restaurant1 from "../../style/img/bedroom.jpg";

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample images data with captions
  const galleryImages = [
    {
      src: room1,
      alt: "Luxury Suite",
      category: "Rooms",
      description: "Elegantly furnished suite with premium amenities",
    },
    {
      src: room2,
      alt: "Deluxe Room",
      category: "Rooms",
      description: "Spacious room with modern comforts",
    },
    {
      src: room3,
      alt: "Executive Room",
      category: "Rooms",
      description: "Business class accommodation with work area",
    },
    {
      src: room4,
      alt: "Family Room",
      category: "Rooms",
      description: "Perfect for families with extra space",
    },
    {
      src: room5,
      alt: "Presidential Suite",
      category: "Rooms",
      description: "Our most luxurious offering with panoramic views",
    },
    {
      src: banquet1,
      alt: "Grand Ballroom",
      category: "Banquet",
      description: "Elegant space for weddings and celebrations",
    },
    {
      src: banquet2,
      alt: "Conference Hall",
      category: "Banquet",
      description: "Professional setting for business events",
    },
    {
      src: restaurant1,
      alt: "Fine Dining Restaurant",
      category: "Dining",
      description: "Multi-cuisine restaurant with exquisite dishes",
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000); // Change slide every 4 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, galleryImages.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1
    );
  };

  const goToSlide = (slideIndex) => {
    setIsAutoPlaying(false);
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-hero">Discover Our Premises</h1>

      {/* Main Carousel */}
      <div className="gallery-carousel">
        <div className="carousel-container">
          <div
            className="carousel-slides"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {galleryImages.map((image, index) => (
              <div className="carousel-slide" key={index}>
                <img src={image.src} alt={image.alt} />
                <div className="slide-overlay"></div>
                <div className="slide-content">
                  <span className="image-category">{image.category}</span>
                  <h3 className="image-title">{image.alt}</h3>
                  <p className="image-description">{image.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button className="carousel-control prev" onClick={goToPrevious}>
            <span>&#10094;</span>
          </button>
          <button className="carousel-control next" onClick={goToNext}>
            <span>&#10095;</span>
          </button>

          {/* Play/Pause Button */}
          <button
            className="play-pause-btn"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          >
            {isAutoPlaying ? "❚❚" : "▶"}
          </button>
        </div>

        {/* Indicators */}
        <div className="carousel-indicators">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="thumbnail-gallery">
        <h2 className="thumbnail-title">Explore More</h2>
        <div className="thumbnail-container">
          {galleryImages.map((image, index) => (
            <div
              className={`thumbnail-item ${
                index === currentIndex ? "active" : ""
              }`}
              key={index}
              onClick={() => goToSlide(index)}
            >
              <img src={image.src} alt={image.alt} />
              <div className="thumbnail-overlay">
                <span>{image.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
