'use client';

import React, { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

const gifSlides = [
    { src: '/assets/review_1.gif', alt: 'Slide 1', caption: 'No Image' },
    { src: '/assets/review_2.gif', alt: 'Slide 2', caption: 'No Image' },
    // { src: '/assets/review_1.gif', alt: 'Slide 3', caption: 'Empty' },
];

export default function HeroSlider() {
    const glideRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (glideRef.current) {
            const glide = new Glide(glideRef.current, {
                type: 'carousel',
                autoplay: 5000,
                animationDuration: 800,
                hoverpause: true,
                perView: 1,
            });

            glide.mount();

            return () => {
                glide.destroy(); // explicitly call it, ignore return value
            };
        }

        return; // ensure the effect always returns `void` or a function
    }, []);

    return (
        <div ref={glideRef} className="glide relative w-full">
            <div className="glide__track" data-glide-el="track">
                <ul className="glide__slides">
                    {gifSlides.map((slide, idx) => (
                        <li key={idx} className="glide__slide relative w-full">
                            <img
                                src={slide.src}
                                alt={slide.alt}
                                className="object-cover w-full min-h-[50vh] rounded-xl"
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2" data-glide-el="controls">
                <button data-glide-dir="<" className="text-white mx-2 text-2xl">‹</button>
                <button data-glide-dir=">" className="text-white mx-2 text-2xl">›</button>
            </div>
        </div>
    );
}
