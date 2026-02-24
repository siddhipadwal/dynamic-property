"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollUp from "@/components/ScrollUp";
import SocialFloating from "@/components/SocialFloating";
import MobileMenu from "@/components/MobileMenu";


function Counter({ end, duration = 2000, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

function AnimatedSection({ children, className = '', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}>
      {children}
    </div>
  );
}

function ContactFormModal({ isOpen, onClose, propertyName }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (isOpen && propertyName) {
      setFormData(prev => ({ ...prev, message: `I'm interested in ${propertyName}. Please contact me with more information.` }));
    }
  }, [isOpen, propertyName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h3 className="text-xl font-bold text-[#03333B] mb-2">Contact Us</h3>
        <p className="text-gray-600 text-sm mb-6">Fill out the form below and well get back to you soon.</p>
        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h4 className="text-lg font-semibold text-green-600 mb-2">Thank You!</h4>
            <p className="text-gray-600 text-sm">We have received your inquiry and will contact you shortly.</p>
            <button onClick={onClose} className="mt-6 bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B39359] outline-none" placeholder="Your Name" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B39359] outline-none" placeholder="your@email.com" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B39359] outline-none" placeholder="+91 98765 43210" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Message *</label><textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B39359] outline-none resize-none" placeholder="Your message..." /></div>
            {submitStatus === 'error' && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">Failed to submit form. Please try again.</div>}
            <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-[#B39359] disabled:opacity-50 flex items-center justify-center gap-2">
              {isSubmitting ? <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}


export default function PropertyDetailClient({ property: initialProperty }) {
  const [property, setProperty] = useState(initialProperty);
  const [loading, setLoading] = useState(!initialProperty);
  const [error, setError] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
const [activeMediaTab, setActiveMediaTab] = useState('photos');
  const params = useParams();

  // Parse images from JSON or use fallback images
  const getGalleryImages = () => {
    const images = [];
    // Add main image
    if (property?.image) images.push(property.image);
    // Add image2
    if (property?.image2) images.push(property.image2);
    // Add image3
    if (property?.image3) images.push(property.image3);
    // Add images from JSON array
    if (property?.images) {
      try {
        const parsedImages = typeof property.images === 'string' ? JSON.parse(property.images) : property.images;
        if (Array.isArray(parsedImages)) {
          parsedImages.forEach(img => {
            if (img && !images.includes(img)) images.push(img);
          });
        }
      } catch (e) {
        console.error('Error parsing images:', e);
      }
    }
    // Fallback images if none
    if (images.length === 0) {
      images.push('/assets/images/properties/property1.jpg');
      images.push('/assets/images/properties/property2.jpg');
      images.push('/assets/images/properties/property3.jpg');
    }
    return images;
  };

  const galleryImages = getGalleryImages();

  useEffect(() => {
    if (initialProperty) {
      setLoading(false);
      return;
    }
    if (params.id) fetchProperty();
  }, [params.id, initialProperty]);

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/properties/${params.id}`);
      const data = await response.json();
      if (response.ok) setProperty(data.property);
      else setError(data.error || 'Property not found');
    } catch (err) {
      setError('An error occurred while fetching the property');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header /><MobileMenu />
        <div className="min-h-screen flex items-center justify-center"><div className="text-xl animate-pulse">Loading...</div></div>
        <Footer />
      </>
    );
  }

  if (error || !property) {
    return (
      <>
        <Header /><div className="min-h-screen flex items-center justify-center"><div className="text-xl text-red-500">{error || 'Property not found'}</div></div><Footer />
      </>
    );
  }

  return (
    <>
      <Header /><MobileMenu />

      <div className="relative w-full bg-[#03333B] font-lora overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#B39359] rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#B39359] rounded-full filter blur-3xl animate-float delay-500"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-14 sm:pb-18 md:pb-22 lg:pb-24 text-center max-w-5xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-5 animate-slide-up">{property.name}</h1>
            <div className="flex items-center justify-center gap-2 text-white/90 text-xs sm:text-sm md:text-base mb-6 sm:mb-8 animate-slide-up delay-200">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#B39359] animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-sans text-center break-words">{property.location}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 animate-slide-up delay-300">
              <span className="bg-[#B39359] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-1.5 sm:py-2 rounded-full hover:scale-110 hover:shadow-lg hover:shadow-[#B39359]/30 transition-all duration-300">For Sale</span>
              <span className={`text-xs sm:text-sm font-semibold px-4 sm:px-5 py-1.5 sm:py-2 rounded-full hover:scale-110 hover:shadow-lg transition-all duration-300 ${property.status === "Under Construction" ? "bg-orange-500 text-white hover:shadow-orange-500/30" : "bg-green-500 text-white hover:shadow-green-500/30"}`}>{property.status}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[60px] sm:h-[80px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path></svg>
        </div>
      </div>

      <div className="py-6 sm:py-8 lg:py-12 font-lora">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection delay={100}>
            <Link href="/properties" className="text-primary hover:text-[#B39359] hover:translate-x-2 inline-flex items-center gap-2 mb-6 text-sm sm:text-base transition-all duration-300 font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Back to Properties
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            <AnimatedSection delay={200} className="order-1 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-lg group">
                <div className="relative overflow-hidden cursor-pointer" onClick={() => setIsGalleryOpen(true)}>
                  <img src={galleryImages[activeImageIndex]} alt={property.name} className="w-full h-56 sm:h-72 md:h-80 lg:h-[420px] object-cover transform transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    </div>
                  </div>
                </div>

{/* Thumbnail Gallery - Exactly 5 items max with View More on last position */}
                <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                  {/* If video exists: 1st image + video + 3 more = 5 items. If no video: 5 images = 5 items */}
                  {property?.video ? (
                    <>
                      {/* First Image - Click changes main image only */}
                      <button onClick={() => setActiveImageIndex(0)} className={`flex-shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden transition-all duration-300 hover:opacity-80 relative ${activeImageIndex === 0 ? 'ring-2 ring-[#B39359] ring-offset-2' : 'opacity-70 hover:opacity-100'}`}>
                        <img src={galleryImages[0]} alt="View 1" className="w-full h-full object-cover" />
                      </button>
                      
                      {/* Video Thumbnail - Opens video in gallery */}
                      <button onClick={() => { setActiveMediaTab('videos'); setIsGalleryOpen(true); }} className="flex-shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden transition-all duration-300 hover:opacity-80 relative opacity-70 hover:opacity-100">
                        <video src={property.video} className="w-full h-full object-cover" muted preload="metadata" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#B39359] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </button>
                      
                      {/* Next 2 images - Click changes main image only */}
                      {galleryImages.slice(1, 3).map((img, index) => (
                        <button key={index + 1} onClick={() => setActiveImageIndex(index + 1)} className={`flex-shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden transition-all duration-300 hover:opacity-80 relative ${activeImageIndex === index + 1 ? 'ring-2 ring-[#B39359] ring-offset-2' : 'opacity-70 hover:opacity-100'}`}>
                          <img src={img} alt={`View ${index + 2}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                      
                      {/* View More - 5th position (on last image) */}
                      {galleryImages.length > 4 ? (
                        <button onClick={() => setIsGalleryOpen(true)} className="flex-shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden transition-all duration-300 hover:opacity-80 relative opacity-70 hover:opacity-100">
                          <img src={galleryImages[3]} alt="View More" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg cursor-pointer hover:bg-black/60">
                            <span className="text-white text-xs font-medium">+{galleryImages.length - 4} More</span>
                          </div>
                        </button>
                      ) : (
                        <button onClick={() => setActiveImageIndex(3)} className={`flex-shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden transition-all duration-300 hover:opacity-80 relative ${activeImageIndex === 3 ? 'ring-2 ring-[#B39359] ring-offset-2' : 'opacity-70 hover:opacity-100'}`}>
                          <img src={galleryImages[3]} alt="View 4" className="w-full h-full object-cover" />
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {/* First 4 images - Click changes main image only */}
                      {galleryImages.slice(0, 4).map((img, index) => (
                        <button key={index} onClick={() => setActiveImageIndex(index)} className={`flex-shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden transition-all duration-300 hover:opacity-80 relative ${activeImageIndex === index ? 'ring-2 ring-[#B39359] ring-offset-2' : 'opacity-70 hover:opacity-100'}`}>
                          <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                      
                      {/* View More - 5th position (on last image thumbnail) */}
                      {galleryImages.length > 4 ? (
                        <button onClick={() => setIsGalleryOpen(true)} className="flex-shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden transition-all duration-300 hover:opacity-80 relative opacity-70 hover:opacity-100">
                          <img src={galleryImages[4]} alt="View More" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg cursor-pointer hover:bg-black/60">
                            <span className="text-white text-xs font-medium">+{galleryImages.length - 4} More</span>
                          </div>
                        </button>
                      ) : (
                        galleryImages[4] && (
                          <button onClick={() => setActiveImageIndex(4)} className={`flex-shrink-0 w-20 h-16 sm:w-24 sm:h-20 rounded-lg overflow-hidden transition-all duration-300 hover:opacity-80 relative ${activeImageIndex === 4 ? 'ring-2 ring-[#B39359] ring-offset-2' : 'opacity-70 hover:opacity-100'}`}>
                            <img src={galleryImages[4]} alt="View 5" className="w-full h-full object-cover" />
                          </button>
                        )
                      )}
                    </>
                  )}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300} className="order-2 lg:order-2">
              <div className="flex flex-col justify-center h-full">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="bg-secondary text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default">For Sale</span>
                  <span className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default ${property.status === "Under Construction" ? "bg-orange-500 text-white hover:shadow-orange-500/30" : "bg-green-500 text-white hover:shadow-green-500/30"}`}>{property.status}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-[#03333B] hover:text-[#B39359] transition-colors duration-300">{property.name}</h1>
                <div className="flex items-start gap-2 text-gray-600 mb-6 text-sm sm:text-base hover:text-primary transition-colors duration-300">
                  <svg className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{property.location}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100 hover:border-[#B39359]/30 card-hover group">
                    <p className="text-[11px] text-gray-500 mb-1 uppercase tracking-wide">Price per sq.ft</p>
                    <p className="text-lg sm:text-xl font-bold text-primary group-hover:text-[#B39359] transition-colors duration-300">₹<Counter end={property.pricePerSqFt} duration={1500} /></p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100 hover:border-[#B39359]/30 card-hover group">
                    <p className="text-[11px] text-gray-500 mb-1 uppercase tracking-wide">Carpet Area</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">{property.areaMin} – {property.areaMax} sq.ft</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100 hover:border-[#B39359]/30 card-hover group">
                    <p className="text-[11px] text-gray-500 mb-1 uppercase tracking-wide">Possession Date</p>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">{property.possessionDate && new Date(property.possessionDate).getFullYear() > 1900 ? new Date(property.possessionDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}</p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100 hover:border-[#B39359]/30 card-hover group">
                    <p className="text-[11px] text-gray-500 mb-1 uppercase tracking-wide">Category</p>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">{property.category}</p>
                  </div>
                </div>
                <button onClick={() => setIsContactModalOpen(true)} className="w-full bg-primary text-white py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#B39359] hover:scale-[1.02] hover:shadow-lg hover:shadow-[#B39359]/25 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group">
                  <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Contact Agent
                </button>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={500}>
            <div className="mt-10 sm:mt-12 lg:mt-16">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#03333B] tracking-wide flex items-center gap-3"><span className="w-8 h-0.5 bg-[#B39359]"></span>DESCRIPTION</h2>
              <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-[#B39359]">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{property.description}</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <div className="mt-10 sm:mt-12 lg:mt-16">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#03333B] tracking-wide flex items-center gap-3"><span className="w-8 h-0.5 bg-[#B39359]"></span>PROPERTY DETAILS</h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] sm:min-w-full">
                    <tbody className="divide-y divide-gray-100">
                      {[
                        ["Property Name", property.name],
                        ["Location", property.location],
                        ["Price per sq.ft", `₹${property.pricePerSqFt?.toLocaleString()}`],
                        ["Carpet Area", `${property.areaMin} – ${property.areaMax} sq.ft`],
                        ["Possession Date", property.possessionDate && new Date(property.possessionDate).getFullYear() > 1900 ? new Date(property.possessionDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' }) : '-'],
                        ["Property Status", property.status],
                        ["Category", property.category],
                        ["Added Date", property.addedDate ? new Date(property.addedDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' }) : '-'],
                      ].map(([label, value], index) => (
                        <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-[#B39359]/5 hover:scale-[1.01] transition-all duration-200`}>
                          <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-500">{label}</td>
                          <td className="px-4 sm:px-6 py-4 text-sm text-gray-900 font-medium">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={700}>
            <div className="mt-10 sm:mt-12 lg:mt-16">
              <div className="bg-gradient-to-r from-[#03333B] to-[#055661] rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B39359] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#B39359] opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">Interested in this property?</h3>
                  <p className="text-white/80 mb-6 max-w-xl mx-auto text-sm sm:text-base">Get in touch with us for more details or to schedule a site visit.</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button onClick={() => setIsContactModalOpen(true)} className="bg-[#B39359] text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#03333B] transition-all duration-300 hover:scale-105 hover:shadow-lg">Contact Now</button>
                    <button className="bg-white/10 text-white px-6 py-3 rounded-xl font-semibold border border-white/30 hover:bg-white hover:text-[#03333B] transition-all duration-300 hover:scale-105 hover:shadow-lg">Download Brochure</button>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 animate-fade-in">
          <button onClick={() => setIsGalleryOpen(false)} className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white p-2 hover:rotate-90 transition-transform duration-300 z-50">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {/* Tabs */}
          <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-50 flex gap-2">
            {property?.video && (
              <button
                onClick={() => setActiveMediaTab('videos')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeMediaTab === 'videos' ? 'bg-[#B39359] text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
              >
                Videos
              </button>
            )}
            <button
              onClick={() => setActiveMediaTab('photos')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${activeMediaTab === 'photos' ? 'bg-[#B39359] text-white' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              Photos
            </button>
          </div>

          <div className="w-full max-w-5xl">
            {activeMediaTab === 'photos' ? (
              <>
                {/* Main Image with Navigation */}
                <div className="relative">
                  <img src={galleryImages[activeImageIndex]} alt={`Gallery ${activeImageIndex + 1}`} className="w-full h-[50vh] sm:h-[65vh] object-contain rounded-lg" />

                  {/* Navigation Arrows */}
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>

                  {/* Image Counter */}
                  <span className="absolute bottom-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </span>
                </div>

                {/* Thumbnails - Like Magicbricks */}
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2 justify-center">
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded overflow-hidden transition-all duration-300 ${activeImageIndex === index ? 'ring-2 ring-[#B39359] ring-offset-2' : 'opacity-60 hover:opacity-100'}`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              property?.video && (
                <video
                  src={property.video}
                  className="w-full h-[50vh] sm:h-[65vh] object-contain rounded-lg"
                  controls
                  autoPlay
                />
              )
            )}
          </div>
        </div>
      )}

      <ContactFormModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} propertyName={property?.name} />
      <ScrollUp /><SocialFloating /><Footer />
    </>
  );
}
