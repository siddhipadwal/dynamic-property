"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    id: 4,
    logo: "assets/images/img/builders logo/crescent.png",
    title: "LUXURY LIVING BY CRESCENT",
    description: "Crescent Bay offers breathtaking sea views and premium amenities in the heart of Mumbai.",
    location: "Parel Mumbai",
    heroImage: "assets/images/img/hero/crescent.png",
    link: "/properties/40",
  },
  {
    id: 1,
    logo: "assets/images/img/builders logo/Lodha.png",
    title: "LUXURY LIVING BY LODHA",
    description: "Lodha Savrano, Jogeshwari — A 3.5-acre landmark luxury development with 70% open spaces and world-class living.",
    location: "JOGESHWARI",
    heroImage: "assets/images/img/hero/lodha.png",
    link: "/properties/39",
  },
  {
    id: 2,
    logo: "assets/images/img/builders logo/sayba.png",
    title: "PREMIUM HOMES BY SAYBA",
    description: "SAYBA NOOR 2.0, Jogeshwari West — The most awaited launch of premium residences with balcony living.",
    location: "JOGESHWARI",
    heroImage: "assets/images/img/hero/sayba.png",
    link: "/properties/36",
  },
  {
    id: 3,
    logo: "assets/images/img/builders logo/dream homes.png",
    title: "URBAN LUXURY BY DREAM INDIA BUILDERS",
    description: "Star Address at Dream Aspire presents thoughtfully designed 1 & 2 BHK balcony homes in Oshiwara, Andheri West.",
    location: "Oshiwara Andheri West",
    heroImage: "assets/images/img/hero/dream aspire.png",
    link: "/properties/37",
  },
  
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slider - changes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-primary relative pt-[80px] lg:pt-[80px] xl:pt-[0px] mb-[70px] lg:mb-[0px]">
      <div className="hero-slider overflow-hidden relative min-h-[calc(100vh-80px)] lg:min-h-[700px] xl:min-h-[950px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`swiper-slide lg:h-[700px] xl:h-[950px] xs:h-auto flex flex-wrap items-center absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="container">
              <div className="grid grid-cols-12">
                {/* Left Content */}
                <div className="col-span-12 lg:col-span-5 xl:col-span-6">
                  <div className="slider-content max-w-[560px] relative z-[9]">
                    {/* Logo with animation */}
                    <div className={`relative mb-3 sm:mb-5 sub_title transition-all duration-500 delay-100 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                      <a href="" className="block mb-3 sm:mb-[25px]">
                        <img
                          src={slide.logo}
                          loading="lazy"
                          alt="logo"
                          className="footer-logo w-[150px] sm:w-[200px] md:w-[250px]"
                          width={250}
                          height={155}
                        />
                      </a>
                    </div>

                    {/* Title with animation */}
                    <h1
                      className={`font-lora text-secondary title font-normal transition-all duration-500 delay-200 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                      style={{ fontSize: "clamp(22px, 5vw, 40px)" }}
                    >
                      <span>{slide.title}</span>
                    </h1>

                    {/* Description with animation */}
                    <p className={`text-sm sm:text-base text-white mt-4 sm:mt-8 mb-6 sm:mb-12 max-w-[570px] transition-all duration-500 delay-300 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      {slide.description}
                    </p>

                    {/* Location with animation */}
                    <p className={`text-sm sm:text-base text-white mt-4 sm:mt-8 mb-6 sm:mb-12 max-w-[670px] flex items-center gap-2 sm:gap-3 transition-all duration-500 delay-400 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <img
                        src="assets/images/icon/location.png"
                        loading="lazy"
                        width={24}
                        height={24}
                        alt="Prime Location"
                        className="flex-shrink-0 w-5 h-5 sm:w-[34px] sm:h-[34px]"
                      />
                      <span>{slide.location}</span>
                    </p>

                    {/* Button with animation */}
                    <div className={`inline-block hero_btn transition-all duration-500 delay-500 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                      <a
                        href={slide.link}
                        className="before:rounded-md before:block before:absolute before:left-auto before:right-0 before:inset-y-0 before:-z-[1] before:bg-white before:w-0 hover:before:w-full hover:before:left-0 hover:before:right-auto hover:text-primary before:transition-all leading-none px-4 sm:px-[20px] py-3 sm:py-[15px] capitalize font-medium text-white text-[14px] xl:text-[16px] relative after:block after:absolute after:inset-0 after:-z-[2] after:bg-secondary after:rounded-md after:transition-all block"
                      >
                        Explore Now
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Side Image - Original Layout */}
                <div className="col-span-12 lg:col-span-7 xl:col-span-6">
                  <div className="relative mt-10 -right-6 md:mt-0 lg:absolute lg:right-0 lg:bottom-0 lg:w-3/4 xl:w-fit">
                    <img
                      className={`hero_image w-full transition-all duration-700 delay-300 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                      src={slide.heroImage}
                      width={866}
                      height={879}
                      alt="hero image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-10 bg-secondary" : "w-3 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2 text-white/80">
          <span className="text-2xl font-bold text-secondary">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>
          <span className="text-lg">/</span>
          <span className="text-lg">{String(slides.length).padStart(2, "0")}</span>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
          <div
            className="h-full bg-secondary transition-all duration-500 ease-linear"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Background Shapes */}
      <span className="shape-4 absolute -bottom-[100px] left-0 scene" data-relative-input="true">
        <img data-depth="0.1" src="assets/images/hero/shape4.svg" alt="" />
      </span>
    </section>
  );
}
