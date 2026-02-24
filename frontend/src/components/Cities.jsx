"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Cities() {
    const cities = [
        {
            name: "Andheri East",
            image: "assets/images/img/locations/andheri-east.png",
            properties: 36,
            link: "/properties?city=andheri-east",
        },
        {
            name: "Andheri West",
            image: "assets/images/img/locations/andheri-west.png",
            properties: 18,
            link: "/properties?city=andheri-west",
        },
        {
            name: "Jogeshwari",
            image: "assets/images/img/locations/jogeshwari.png",
            properties: 27,
            link: "/properties?city=jogeshwari",
        },
    ];

    return (
        <section className="explore-cities-section pb-[50px] pt-[80px] lg:pt-[125px] bg-gray-50">
            <div className="container">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className="mb-[30px] lg:mb-[60px] text-center">
                            <span className="text-secondary text-tiny inline-block mb-2">
                                Explore Cities
                            </span>
                            <h2 className="font-lora text-primary text-[24px] sm:text-[30px] xl:text-xl capitalize font-medium">
                                Find Your Neighborhood<span className="text-secondary">.</span>
                            </h2>
                        </div>
                        <div className="cities-slider relative">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={30}
                                slidesPerView={1}
                                navigation={{
                                    nextEl: ".cities-button-next",
                                    prevEl: ".cities-button-prev",
                                }}
                                pagination={{ 
                                    clickable: true,
                                    el: ".cities-pagination"
                                }}
                                loop={true}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 20,
                                    },
                                    480: {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                }}
                                className="cities-swiper px-[15px] py-[20px]"
                            >
                                {cities.map((city, index) => (
                                    <SwiperSlide key={index} className="text-center">
                                        <div className="group">
                                            <Link
                                                href={city.link}
                                                className="block transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-[12px] overflow-hidden bg-white"
                                            >
                                                <div className="relative overflow-hidden">
                                                    <img
                                                        src={city.image}
                                                        className="w-full max-w-[270px] h-[200px] mx-auto object-cover transition-transform duration-500 group-hover:scale-110"
                                                        loading="lazy"
                                                        alt={city.name}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                                <div className="bg-white rounded-[12px] px-[20px] py-[20px] -mt-5 relative mx-4 shadow-lg">
                                                    <span className="font-lora text-[18px] text-primary font-medium leading-none block mb-2">
                                                        {city.name}
                                                    </span>
                                                    <p className="text-[14px] text-secondary leading-none">
                                                        {city.properties} Properties
                                                    </p>
                                                    <div className="mt-3 flex items-center text-secondary text-sm font-medium group-hover:text-primary transition-colors duration-300">
                                                        <span>View All Properties</span>
                                                        <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            
                            {/* Custom Navigation Buttons */}
                            <div className="cities-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[50px] h-[50px] bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 -left-5 md:-left-8">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </div>
                            <div className="cities-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[50px] h-[50px] bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 -right-5 md:-right-8">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                            
                            {/* Custom Pagination */}
                            <div className="cities-pagination flex justify-center mt-8 gap-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
