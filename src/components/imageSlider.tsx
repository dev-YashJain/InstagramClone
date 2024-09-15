// src/components/ImageSlider.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

interface ImageSliderProps {
    images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
    return (
        <Swiper
            navigation={true}
            modules={[Navigation]}
            className="imageSlider"
        >
            {images.map((image: string, index: number) => (
                <SwiperSlide key={index}>
                    <img src={image} alt={`Slide ${index}`} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ImageSlider;
