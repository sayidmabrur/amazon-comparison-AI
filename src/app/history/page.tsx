'use client';

import React, { useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { displayImage } from '@/utils/helpers';
import HotComparison from '@/components/layout/HotComparison';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const mockHistories = [
    {
        id: 1,
        date: '2025-05-30',
        left: {
            title: 'Wireless Bluetooth Earbuds',
            imageUrl: '',
            label: '-50%',
            labelColor: 'red',
            ratingScore: 4.5,
            ratingDesc: '(1250)',
            price: '$29.99',
            score: '62.2',
            originalPrice: '$59.99',
            category: 'Electronics',
            timeLeft: '23 hours left',
        },
        right: {
            title: 'Smart Watch Fitness Tracker',
            imageUrl: '',
            label: '-44%',
            labelColor: 'red',
            ratingScore: 4.3,
            ratingDesc: '(850)',
            price: '$49.99',
            score: '62.2',
            originalPrice: '$89.99',
            category: 'Electronics',
            timeLeft: '1 day left',
        },
    },
    {
        id: 1,
        date: '2025-05-30',
        left: {
            title: 'Wireless Bluetooth Earbuds',
            imageUrl: '',
            label: '-50%',
            labelColor: 'red',
            ratingScore: 4.5,
            ratingDesc: '(1250)',
            price: '$29.99',
            score: '62.2',
            originalPrice: '$59.99',
            category: 'Electronics',
            timeLeft: '23 hours left',
        },
        right: {
            title: 'Smart Watch Fitness Tracker',
            imageUrl: '',
            label: '-44%',
            labelColor: 'red',
            ratingScore: 4.3,
            ratingDesc: '(850)',
            price: '$49.99',
            score: '62.2',
            originalPrice: '$89.99',
            category: 'Electronics',
            timeLeft: '1 day left',
        },
    },
    {
        id: 1,
        date: '2025-05-30',
        left: {
            title: 'Wireless Bluetooth Earbuds',
            imageUrl: '',
            label: '-50%',
            labelColor: 'red',
            ratingScore: 4.5,
            ratingDesc: '(1250)',
            price: '$29.99',
            score: '62.2',
            originalPrice: '$59.99',
            category: 'Electronics',
            timeLeft: '23 hours left',
        },
        right: {
            title: 'Smart Watch Fitness Tracker',
            imageUrl: '',
            label: '-44%',
            labelColor: 'red',
            ratingScore: 4.3,
            ratingDesc: '(850)',
            price: '$49.99',
            score: '62.2',
            originalPrice: '$89.99',
            category: 'Electronics',
            timeLeft: '1 day left',
        },
    },
    // Add more items...
];

const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false, // disable default arrows
};

export default function HistoryPage() {
    const sliderRef = useRef<Slider>(null);

    const handlePrev = () => sliderRef.current?.slickPrev();
    const handleNext = () => sliderRef.current?.slickNext();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-white"
        >
            <Navbar />
            <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-semibold">Hot Comparison</h1>
                    <p className="mt-2 text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
                        Our real-time comparison of trending products based on ratings, discounts, and popularity. Swipe through and explore which deal is hotter!
                    </p>
                </div>

                {/* Custom Navigation Buttons */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={handlePrev}
                        className="p-2 text-gray-800 rounded flex items-center"
                        aria-label="Previous"
                    >
                        <FaArrowLeft size={20} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="p-2 text-gray-800 rounded flex items-center"
                        aria-label="Next"
                    >
                        <FaArrowRight size={20} />
                    </button>
                </div>

                <div className='p-5'>
                    <Slider {...sliderSettings} ref={sliderRef}>
                        {/* <div className='p-5'> */}

                        {mockHistories.map((history, index) => (
                            <div key={index} className="px-4">
                                <div className="p-6 rounded-2xl">
                                    <p className="text-center text-xs sm:text-sm text-gray-600 font-medium tracking-wide mb-4">
                                        <span className="uppercase text-gray-400">Compared on:</span>{' '}
                                        <span className="text-gray-700">{history.date}</span>
                                    </p>


                                    <HotComparison left={history.left} right={history.right} />

                                    <div className="mt-4 text-center">
                                        <button className="px-4 mt-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                            // </div>
                        ))}
                    </Slider>
                </div>
            </main>
            <Footer />
        </motion.div>
    );
}
