import {FC} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import classes from './ImageSlider.module.css'; // Updated to CSS Module

interface ImageSliderProps {
    images: string[];
}

const ImageSlider: FC<ImageSliderProps> = ({ images }) => {
    return (
        <Swiper
            navigation={true}
            modules={[Navigation]}
            className={classes.imageSlider} // Updated className
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
