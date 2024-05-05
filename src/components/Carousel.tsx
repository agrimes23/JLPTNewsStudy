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


//   const showNextImage = () => {
//     setImageIndex(index => {
//         if (index === imageUrls.length - 1) return 0
//         return index + 1
//     })
//   }

//   const showPrevImage = () => {
//     setImageIndex(index => {
//         if (index === 0) return imageUrls.length - 1
//         return index - 1
//     })
//   }

  return (
    <div className="flex w-[100%] h-[96%] relative z-0 overflow-hidden">
       
        {imageUrls.map((url, idx) => (
          <motion.img
            key={url}
            initial={{ opacity: 0, x: 1200 }}
            animate={{ opacity: 1, x: `${-100 * imageIndex}%` }}
            exit={{ opacity: 0, x: idx === imageIndex ? -1200 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-[150%] h-[100%] object-cover rounded-2xl"
            src={url}
          />
        ))}
            
      {/* Dots */}
      <div className="absolute flex bottom-[0.5rem] left-[50%] translate-x-[-50%] gap-[0.4rem]">
        {imageUrls.map((_, index) => (
            <button className="" onClick={() => setImageIndex(index)}>{index === imageIndex ? "⚪" : "◯"}</button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
