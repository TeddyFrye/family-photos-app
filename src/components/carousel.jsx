import { useState, useEffect } from "react";
import { loadMediaFiles } from "./imageData";
import "../../styles/carousel.css";
import firstImage from "../assets/photos/first-image.jpeg";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadAndShuffleMedia = async () => {
      let loadedImages = await loadMediaFiles();

      // Find and remove the first image from the loaded images
      const firstImagePath = firstImage;
      loadedImages = loadedImages.filter((image) => image !== firstImagePath);

      // Shuffle the remaining images
      const shuffledImages = shuffleArray(loadedImages);

      // Unshift the first image so it's always the first in the array
      shuffledImages.unshift(firstImagePath);

      setImages(shuffledImages);
    };

    loadAndShuffleMedia();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleCarouselClick = (event) => {
    const { clientX } = event;
    const { offsetWidth } = event.currentTarget;
    if (clientX > offsetWidth / 2) {
      goToNextImage(); // If click is on the right side
    } else {
      goToPreviousImage(); // If click is on the left side
    }
  };

  const currentImage = images[currentImageIndex];
  const isVideo = currentImage ? currentImage.endsWith(".mp4") : false;

  return (
    <section id="carousel" onClick={handleCarouselClick}>
      {currentImage &&
        (isVideo ? (
          <video controls>
            <source src={currentImage} type="video/mp4" />
          </video>
        ) : (
          <img src={currentImage} alt="Display" />
        ))}
    </section>
  );
};

export default Carousel;
