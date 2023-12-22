import { useState, useEffect } from "react";
import { loadMediaFiles } from "./imageData";
import "../../styles/carousel.css";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadAndShuffleMedia = async () => {
      const loadedImages = await loadMediaFiles();
      const shuffledImages = shuffleArray(loadedImages);
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

  const currentImage = images[currentImageIndex];
  const isVideo = currentImage ? currentImage.endsWith(".mp4") : false;

  return (
    <section id="carousel" onClick={goToNextImage}>
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
