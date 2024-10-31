'use client';
import React, { useEffect, useState } from "react";
import { images, impactStats } from "../../fakeDatas/impactData";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function ImpactStat({ number, description }) {
    return (
        <div className="text-start">
            <p className="text-4xl font-bold text-gray-400">{number}</p>
            <p className="text-lg mt-2">{description}</p>
        </div>
    );
}

function ImpactImageSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                goToNext();
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isHovered]);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const visibleImages = [
        images[currentIndex],
        images[(currentIndex + 1) % images.length],
        images[(currentIndex + 2) % images.length],
    ];

    return (
        <div
            className="relative w-full h-64 md:h-96 overflow-hidden flex items-center justify-center gap-5"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {visibleImages.map((image, index) => (
                <div
                    key={index}
                    className="w-1/2 h-3/4 flex-shrink-0 transition-skew duration-100 ease-out"
                >
                    <img src={image}  className="w-full h-full object-cover rounded-lg" />
                </div>
            ))}

            <button
                className="absolute left-4 top-1/2  bg-white bg-opacity-70 text-black rounded-full p-2 hover:bg-opacity-100"
                onClick={goToPrevious}
                aria-label="Previous Slide"
                tabIndex={0}
            >
                <FiChevronLeft className="h-6 w-6" />
            </button>
            <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 text-black rounded-full p-2 hover:bg-opacity-100"
                onClick={goToNext}
                aria-label="Next Slide"
                tabIndex={0}
            >
                <FiChevronRight className="h-6 w-6" />
            </button>
        </div>
    );
}

export default function ImpactSection() {
    return (
        <section className="bg-black text-white py-20">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our impact in numbers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                    {impactStats.map((stat, index) => (
                        <ImpactStat key={index} number={stat.number} description={stat.description} />
                    ))}
                </div>
                <ImpactImageSlider />
            </div>
        </section>
    );
}
