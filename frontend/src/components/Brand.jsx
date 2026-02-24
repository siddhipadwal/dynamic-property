"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Brand() {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const response = await fetch('/api/partners');
            const data = await response.json();
            if (response.ok) {
                setPartners(data.partners);
            }
        } catch (error) {
            console.error('Error fetching partners:', error);
        } finally {
            setLoading(false);
        }
    };

    // Duplicate partners more times for truly continuous marquee effect
    const duplicatedPartners = partners.length > 0 ? [...partners, ...partners, ...partners, ...partners] : [];

    return (
        <section className="brand-section pt-[80px] lg:pt-[125px] pb-[80px] lg:pb-[125px]">
            <div className="container">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className="mb-[60px] text-center">
                            <span className="text-secondary text-tiny inline-block mb-2">
                                Backed by India's Premier and Trusted Developers
                            </span>
                            <h2 className="font-lora text-primary text-[24px] sm:text-[30px] xl:text-xl capitalize font-medium">
                                Reliable Partners<span className="text-secondary">.</span>
                            </h2>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="brand-slider overflow-hidden">
                            {loading ? (
                                <div className="text-center">
                                    <p className="text-gray-500">Loading partners...</p>
                                </div>
                            ) : duplicatedPartners.length > 0 ? (
                                <Swiper
                                    modules={[Autoplay, Navigation]}
                                    spaceBetween={30}
                                    slidesPerView={2}
                                    loop={true}
                                    autoplay={{
                                        delay: 0,
                                        disableOnInteraction: false,
                                        pauseOnMouseEnter: false,
                                    }}
                                    speed={3000}
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        480: {
                                            slidesPerView: 3,
                                            spaceBetween: 30,
                                        },
                                        768: {
                                            slidesPerView: 4,
                                            spaceBetween: 30,
                                        },
                                        1024: {
                                            slidesPerView: 5,
                                            spaceBetween: 40,
                                        },
                                    }}
                                    className="brand-swiper"
                                >
                                    {duplicatedPartners.map((partner, index) => (
                                        <SwiperSlide key={`${partner.id}-${index}`} className="text-center">
                                            <a href="#" className="block">
                                                <img
                                                    src={partner.logo}
                                                    className="w-auto h-auto block mx-auto"
                                                    loading="lazy"
                                                    width={280}
                                                    height={260}
                                                    alt={partner.name}
                                                />
                                            </a>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="text-center">
                                    <p className="text-gray-500">No partners found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
