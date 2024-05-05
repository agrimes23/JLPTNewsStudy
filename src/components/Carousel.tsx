import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ImageSliderProps = {
  imageUrls: string[];
};

// TODO: Find good Arrow images
// animate carousel transition
// put on timer to always go to the next image

const Carousel = ({ imageUrls }: ImageSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);

  const showNextImage = () => {
    setImageIndex(index => {
        if (index === imageUrls.length - 1) return 0
        return index + 1
    })
  }

  const showPrevImage = () => {
    setImageIndex(index => {
        if (index === 0) return imageUrls.length - 1
        return index - 1
    })
  }

  return (
    <div className="w-full h-[900px] relative ">
      <img
        className="w-screen h-full object-cover"
        src={imageUrls[imageIndex]}
      />
      <button
        className="flex absolute top-0 bottom-0 left-0 p-[1rem] cursor-pointer justify-center items-center bg-white"
        onClick={showPrevImage}
      >
        <span className="w-[2rem] h-[2rem]">{"<"}</span>
      </button>
      <button
        className="flex absolute top-0 bottom-0 right-0 p-[1rem] cursor-pointer justify-center items-center"
        onClick={showNextImage}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
