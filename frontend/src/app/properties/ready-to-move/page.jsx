"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import ScrollUp from "@/components/ScrollUp";
import SocialFloating from "@/components/SocialFloating";
import MobileMenu from "@/components/MobileMenu";


export default function ReadyToMovePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties');
      const data = await response.json();
      if (response.ok) {
        // Filter only Ready to Move properties
        const readyToMove = data.properties.filter(
          p => p.status === 'Ready to Move'
        );
        setProperties(readyToMove);
      } else {
        setError('Failed to fetch properties');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <MobileMenu />

      {/* FULL WIDTH HERO WITH PARALLAX EFFECT */}
      <div className="relative w-full bg-[#03333B] font-lora overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#B39359] rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#B39359] rounded-full filter blur-3xl animate-float delay-500"></div>
        </div>

        {/* INNER CONTENT */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* SPACE FROM HEADER */}
          <div className="
            pt-28 sm:pt-32 md:pt-36 lg:pt-40
            pb-14 sm:pb-18 md:pb-22 lg:pb-24
            text-center max-w-5xl mx-auto
          ">

            {/* PROPERTY NAME - Animated Entrance */}
            <h1 className="
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
              font-bold text-white leading-tight
              mb-4 sm:mb-5
              animate-slide-up
            ">
              Ready To Move
            </h1>

            {/* LOCATION - Animated with delay */}
            <div className="
              flex items-center justify-center gap-2
              text-white/90 text-xs sm:text-sm md:text-base
              mb-6 sm:mb-8
              animate-slide-up delay-200
            ">

              <span className="font-sans text-center break-words">
                Browse premium ready-to-move-in properties
              </span>
            </div>

            {/* BADGES - Animated with delay */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 animate-slide-up delay-300">


              {/* Animated Stats Badge */}
              {!loading && !error && properties.length > 0 && (
                <span
                  className="
      bg-white/10 text-white
      text-xs sm:text-sm font-semibold
      px-2 sm:px-5 py-1 sm:py-1.5
      rounded-full
      border border-white/20
      hover:scale-110 hover:shadow-lg hover:shadow-white/10
      transition-all duration-300 cursor-default
      whitespace-nowrap
    "
                >
                  {properties.length}{" "}
                  {properties.length === 1 ? "Property" : "Properties"} Available
                </span>
              )}

            </div>

          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[60px] sm:h-[80px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </div>

      {/* Breadcrumb Bar - Moved outside hero to avoid overlapping */}
      <div className="bg-[#02333B] border-t border-white/10">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center justify-center gap-1 sm:gap-2 font-lora text-xs sm:text-sm text-white/70">
            <Link href="/" className="hover:text-white transition duration-300">
              Home
            </Link>
            <span className="text-[#B39359]">/</span>
            <span className="text-white font-medium whitespace-nowrap">
              Ready to Move
            </span>
          </div>
        </div>
      </div>


      {/* Properties Grid */}
      <section className="py-16 sm:py-20 bg-[#F5F9F8]">
        <div className="container mx-auto px-4">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <h2 className="font-lora text-3xl md:text-4xl font-semibold text-gray-800 mb-3 animate-fade-in-up">
              Move-In Ready Properties
            </h2>
            <div className="w-20 h-1 bg-[#B39359] mx-auto mb-4"></div>
            <p className="font-karla text-gray-600 text-base sm:text-lg">
              Find your dream home ready for immediate move-in with complete amenities
            </p>
          </div>

          {/* States */}
          {loading ? (
            <div className="text-center py-16 sm:py-20">
              <div className="inline-block bg-white shadow-lg rounded-2xl px-8 py-8 animate-pulse">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 border-4 border-[#B39359] border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-karla text-lg text-gray-600">
                    Loading properties, please wait…
                  </p>
                </div>
              </div>
            </div>

          ) : error ? (
            <div className="text-center py-16 sm:py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
              </div>
              <p className="font-karla text-red-500 text-lg">{error}</p>
            </div>

          ) : properties.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                <i className="fas fa-key text-gray-400 text-3xl"></i>
              </div>
              <p className="font-karla text-gray-500 text-lg">
                No ready to move properties found.
              </p>
            </div>

          ) : (
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10
              ${properties.length === 1 ? "justify-items-center" : ""}`}
            >
              {properties.map((property, index) => (
                <div
                  key={property.id}
                  className="property-card-animate"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <ScrollUp />
      <SocialFloating />
      <Footer />
    </>
  );
}
