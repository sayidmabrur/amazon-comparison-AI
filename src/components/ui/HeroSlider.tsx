'use client';

import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const gifSlides = [
    { src: '/assets/review_1.gif', alt: 'Slide 1', caption: 'No Image' },
    { src: '/assets/review_1.gif', alt: 'Slide 2', caption: 'No Video' },
    { src: '/assets/review_1.gif', alt: 'Slide 3', caption: 'Empty' },
];

export default function HeroSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        arrows: true,
        adaptiveHeight: false,
    };


    return (
        <div className="relative h-screen w-full">
            <Slider {...settings}>
                {gifSlides.map((slide, idx) => (
                    <div key={idx} className="relative h-screen w-full">
                        <img src={slide.src} alt={slide.alt} className="object-cover w-full h-screen" />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
                            <h2 className="text-white text-4xl md:text-6xl font-bold shadow-lg">
                                {slide.caption}
                            </h2>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
