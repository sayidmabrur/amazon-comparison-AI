'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import LessonBookCard from './LessonBookCard'; // Adjust the import path if necessary

export default function ProductSlider() {
    const products = [
        {
            id: 1,
            image: "",
            title: 'Echo Dot (4th Gen) | Smart speaker with Alexa',
            price: '$49.99',
            rating: 4,
            ratingCount: 1243,
            description:
                'Our AI model suggests this Echo Dot as the best smart speaker under $50, balancing features and price perfectly.',
        },
        {
            id: 2,
            image: "",
            title: 'Fire TV Stick 4K streaming device',
            price: '$39.99',
            rating: 5,
            ratingCount: 987,
            description:
                'The best streaming device for 4K entertainment with Alexa voice remote.',
        },
        {
            id: 3,
            image: "",
            title: 'Kindle Paperwhite – Now waterproof',
            price: '$129.99',
            rating: 4,
            ratingCount: 832,
            description:
                'Our AI highly recommends Kindle Paperwhite for avid readers who want to read anywhere.',
        },
        {
            id: 4,
            image: "",
            title: 'Amazon Smart Plug',
            price: '$24.99',
            rating: 3,
            ratingCount: 456,
            description:
                'Smart plug to control your home appliances with Alexa voice commands.',
        },
    ];

    return (
        <div className="w-full flex py-3 justify-end">
            <div className="w-full max-w-md">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={24}
                    slidesPerView={1}
                >
                    {products.map((product) => (
                        <SwiperSlide
                            key={product.id}
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <LessonBookCard product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
