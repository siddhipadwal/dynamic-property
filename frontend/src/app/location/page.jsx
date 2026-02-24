"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollUp from "@/components/ScrollUp";
import MobileMenu from "@/components/MobileMenu";
import Cities from "@/components/Cities";

// Dynamically import MapComponent to avoid SSR issues with Leaflet
const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block w-12 h-12 border-4 border-[#B39359] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-karla text-lg text-gray-600">Loading map...</p>
      </div>
    </div>
  )
});

export default function MapPage() {
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
        // Filter properties that have latitude and longitude
        const propertiesWithLocation = data.properties.filter(
          prop => prop.latitude && prop.longitude
        );
        setProperties(propertiesWithLocation);
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
      <div className="relative w-full bg-[#02333B] font-lora overflow-hidden">
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
              animate-fade-up
            ">

              Property Location
            </h1>

            {/* LOCATION - Animated with delay */}
            <div className="
              flex items-center justify-center
              text-white/85 text-xs sm:text-sm md:text-base
              animate-fade-up delay-200
            ">

              <span className="font-sans text-center break-words">
                Explore properties by location
              </span>
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

      {/* Breadcrumb Bar */}
      <div className="bg-[#02333B] border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-2 font-lora text-sm text-white/70">
            <Link href="/" className="hover:text-white transition duration-300">
              Home
            </Link>
            <span className="text-[#B39359]">/</span>
            <span className="text-white font-medium">Property Location</span>
          </div>
        </div>
      </div>


      {/* Map Section */}
      <section className="py-16 sm:py-20 bg-[#F5F9F8]">
        <div className="container mx-auto px-4">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <h2 className="font-lora text-3xl md:text-4xl font-semibold text-gray-800 mb-3 animate-fade-in-up">
              Find Your Property Location
            </h2>
            <div className="w-20 h-1 bg-[#B39359] mx-auto mb-4"></div>
            <p className="font-karla text-gray-600 text-base sm:text-lg">
              Click on markers to view property details
            </p>
          </div>

          {/* States */}
          {loading ? (
            <div className="h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block w-12 h-12 border-4 border-[#B39359] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-karla text-lg text-gray-600">Loading properties...</p>
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
                <i className="fas fa-map-marker-alt text-gray-400 text-3xl"></i>
              </div>
              <p className="font-karla text-gray-500 text-lg mb-2">
                No properties with location data available.
              </p>
              <p className="font-karla text-gray-400 text-sm">
                Add latitude and longitude to properties to see them on the map.
              </p>
              <Link
                href="/admin/properties/add"
                className="inline-block mt-4 bg-[#B39359] text-white px-6 py-2 rounded-md hover:bg-[#9a7d4a] transition"
              >
                Add Property
              </Link>
            </div>

          ) : (
            <div className="mb-4 text-sm text-gray-600">
              Showing {properties.length} {properties.length === 1 ? 'property' : 'properties'} by location
            </div>
          )}

          {/* Map Container */}
          {!loading && !error && properties.length > 0 && (
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <PropertyMap properties={properties} />
            </div>
          )}

        </div>
      </section>

      {/* Cities Section */}
      <Cities />

      {/* Social Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-lora text-3xl md:text-4xl font-semibold text-gray-800 mb-3">
              Follow Us
            </h2>
            <div className="w-20 h-1 bg-[#B39359] mx-auto mb-4"></div>
            <p className="font-karla text-gray-600 text-base">
              Stay connected with us on social media
            </p>
          </div>
          
          <div className="flex justify-center gap-4">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#02333B] text-white flex items-center justify-center hover:bg-[#B39359] transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#02333B] text-white flex items-center justify-center hover:bg-[#B39359] transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#02333B] text-white flex items-center justify-center hover:bg-[#B39359] transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#02333B] text-white flex items-center justify-center hover:bg-[#B39359] transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-[#02333B] text-white flex items-center justify-center hover:bg-[#B39359] transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <ScrollUp />
      <Footer />
    </>
  );
}
