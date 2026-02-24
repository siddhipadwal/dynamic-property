"use client";

import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function BestChoices() {
    const [properties, setProperties] = useState([]);
    const [activeTab, setActiveTab] = useState("under-construction");
    const [loading, setLoading] = useState(true);
    const [swiperInstance, setSwiperInstance] = useState(null);

    const fetchProperties = async () => {
        try {
            const response = await fetch('/api/properties');
            const data = await response.json();
            if (data.properties) {
                setProperties(data.properties);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const filteredProperties = properties.filter(property => {
        // First filter by isBestChoice - handle both boolean and integer (1/0) types
        const isBestChoice = property.isBestChoice === true || property.isBestChoice === 1 || property.isBestChoice === '1';
        if (!isBestChoice) return false;
        
        // Then filter by status
        if (activeTab === "under-construction") return property.status === "Under Construction";
        if (activeTab === "ready-to-move") return property.status === "Ready to Move";
        return true;
    });

    const goNext = () => {
        if (swiperInstance) {
            swiperInstance.slideNext();
        }
    };

    const goPrev = () => {
        if (swiperInstance) {
            swiperInstance.slidePrev();
        }
    };

    return (
        <section className="popular-properties py-[80px] lg:py-[125px]">
            <div className="container">
                {/* Section Heading */}
                <div className="grid grid-cols-12 mb-[30px]">
                    <div className="col-span-12 flex flex-col items-center justify-center">
                        <span className="text-secondary text-tiny inline-block mb-2">
                            Best Choice
                        </span>
                        <h2 className="font-lora text-primary text-[24px] sm:text-[30px] xl:text-[30px] capitalize font-medium">
                            Popular Properties<span className="text-secondary">.</span>
                        </h2>
                    </div>
                </div>
                
                {/* Tabs */}
                <div className="flex justify-center mb-[40px]">
                    <button
                        onClick={() => setActiveTab("under-construction")}
                        className={`tab-button px-6 py-2 font-medium border-b-2 mr-4 transition-all ${
                            activeTab === "under-construction" 
                            ? "border-primary text-primary" 
                            : "border-transparent text-gray-500 hover:text-primary"
                        }`}
                    >
                        Under Construction
                    </button>
                    <button
                        onClick={() => setActiveTab("ready-to-move")}
                        className={`tab-button px-6 py-2 font-medium border-b-2 transition-all ${
                            activeTab === "ready-to-move" 
                            ? "border-primary text-primary" 
                            : "border-transparent text-gray-500 hover:text-primary"
                        }`}
                    >
                        Ready to Move
                    </button>
                </div>
                
                {/* Properties Swiper */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button 
                        onClick={goPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[50px] h-[50px] rounded-full bg-white shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all -ml-5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <button 
                        onClick={goNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[50px] h-[50px] rounded-full bg-white shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all -mr-5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>

                    {loading ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500">Loading properties...</p>
                        </div>
                    ) : filteredProperties.length > 0 ? (
                        <Swiper
                            modules={[Navigation, Autoplay]}
                            onSwiper={setSwiperInstance}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            spaceBetween={30}
                            slidesPerView={1}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                            className="best-choices-swiper"
                        >
                            {filteredProperties.map((property) => (
                                <SwiperSlide key={property.id}>
                                    <PropertyCard property={property} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-500">No properties found</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
