"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Validate Indian mobile number - more flexible
    const validatePhone = (phone) => {
        if (!phone || phone.trim() === '') {
            return 'Phone number is required';
        }
        
        // Remove all non-digit characters except +
        let cleanPhone = phone.replace(/[^\d+]/g, '');
        
        // If starts with +91, remove it for validation
        if (cleanPhone.startsWith('+91')) {
            cleanPhone = cleanPhone.substring(3);
        }
        
        // Remove any leading 0
        if (cleanPhone.startsWith('0')) {
            cleanPhone = cleanPhone.substring(1);
        }
        
        // Now check if it's exactly 10 digits and starts with 6, 7, 8, or 9
        const phoneRegex = /^[6-9]\d{9}$/;
        
        if (!phoneRegex.test(cleanPhone)) {
            return 'Enter 10-digit number starting with 6, 7, 8, or 9';
        }
        
        return null;
    };

    // Validate email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || email.trim() === '') {
            return 'Email is required';
        }
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return null;
    };

    // Validate required fields
    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else {
            const phoneError = validatePhone(formData.phone);
            if (phoneError) {
                newErrors.phone = phoneError;
            }
        }
        
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form before submitting
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: data.message });
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to submit form' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputFields = [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: false },
        { name: 'phone', label: 'Mobile Number', type: 'tel', required: true, placeholder: '10-digit mobile number' },
        { name: 'email', label: 'Email Address', type: 'email', required: true },
    ];

    const contactInfo = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Address',
            content: 'Level 2, Dewan Center, Office No. 36, Jogeshwari West, Mumbai – 400102',
            delay: 100
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: 'Call Us',
            content: '+91 73172 41999\n+91 91750 70228',
            delay: 200
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Email Us',
            content: 'sadique.k@dynamicproperties.in\n halder.amitava@dynamicproperties.in',
            email: true,
            delay: 300
        }
    ];

    if (!mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#B39359' }}></div>
            </div>
        );
    }

    return (
        <>
            {/* Hero Section with Animated Gradient Background - Using Theme Colors */}
            <section className="relative overflow-hidden min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] flex items-center">
                {/* Animated Background - Using Primary Color #02333B */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#02333B] via-[#02333B] to-[#034b56]">
                    {/* Floating Shapes - Using Secondary Color #B39359 */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(179, 147, 89, 0.15)' }} />
                        <div className="absolute bottom-20 right-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(179, 147, 89, 0.1)', animationDelay: '1s' }} />
                        <div className="absolute top-1/2 left-1/3 w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-2xl animate-float" style={{ backgroundColor: 'rgba(3, 75, 86, 0.3)', animationDelay: '2s' }} />
                    </div>

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
                </div>

                {/* Content */}
                <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="mb-4 animate-fade-in-up">
                            <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full border" style={{ backgroundColor: 'rgba(179, 147, 89, 0.2)', color: '#B39359', borderColor: 'rgba(179, 147, 89, 0.3)' }}>
                                Get In Touch
                            </span>
                        </div>

                        <h1 className="font-lora text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up delay-100">
                            Contact{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: 'linear-gradient(135deg, #B39359 0%, #D4AF37 100%)' }}>
                                Us
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto animate-fade-in-up delay-200">
                            Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                        </p>

                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg className="w-full h-16 sm:h-24 text-white" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Contact Section */}
            <div className="py-16 sm:py-20 lg:py-24 bg-white">
                <div className="container px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Contact Form */}
                        <div className="relative animate-fade-in-up delay-300">
                            {/* Glassmorphism Card */}
                            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden p-6 sm:p-8 lg:p-10">
                                {/* Decorative gradient - Using Secondary Color #B39359 */}
                                <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2" style={{ background: 'linear-gradient(to bottom right, rgba(179, 147, 89, 0.1), transparent)' }} />
                                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full translate-y-1/2 -translate-x-1/2" style={{ background: 'linear-gradient(to top right, rgba(3, 51, 59, 0.1), transparent)' }} />

                                <div className="relative z-10">
                                    <h2 className="font-lora text-2xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#02333B' }}>
                                        Send us a Message
                                    </h2>
                                    <p className="text-gray-600 mb-8">
                                        Fill out the form below and we&apos;ll get back to you within 24 hours.
                                    </p>

                                    {/* Status Message */}
                                    {status.message && (
                                        <div className={`p-4 mb-6 rounded-xl animate-fade-in ${status.type === 'success'
                                            ? 'bg-green-50 text-green-700 border border-green-200'
                                            : 'bg-red-50 text-red-700 border border-red-200'
                                            }`}>
                                            {status.message}
                                        </div>
                                    )}

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            {inputFields.map((field, index) => (
                                                <div
                                                    key={field.name}
                                                    className={`relative animate-fade-in-up ${field.name === 'message' ? 'sm:col-span-2' : ''}`}
                                                    style={{ animationDelay: `${400 + (index * 100)}ms` }}
                                                >
                                                    <input
                                                        type={field.type}
                                                        name={field.name}
                                                        value={formData[field.name]}
                                                        onChange={handleChange}
                                                        onFocus={() => setFocusedField(field.name)}
                                                        onBlur={() => setFocusedField(null)}
                                                        required={field.required}
                                                        className={`peer w-full px-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none transition-all duration-300 placeholder-transparent ${errors[field.name] 
                                                            ? 'border-red-400 focus:border-red-500 bg-red-50' 
                                                            : 'border-gray-200 focus:border-[#B39359] focus:bg-white'}`}
                                                        placeholder={field.label}
                                                        id={field.name}
                                                    />
                                                    <label
                                                        htmlFor={field.name}
                                                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === field.name || formData[field.name]
                                                            ? '-top-2.5 text-xs bg-white px-1 font-medium'
                                                            : 'top-3.5 text-gray-400'
                                                            }`}
                                                        style={focusedField === field.name || formData[field.name] ? { color: errors[field.name] ? '#ef4444' : '#B39359' } : {}}
                                                    >
                                                        {field.label}
                                                        {field.required && <span className="text-red-500 ml-1">*</span>}
                                                    </label>
                                                    {errors[field.name] && (
                                                        <p className="mt-1 text-sm text-red-500">{errors[field.name]}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Message Textarea */}
                                        <div className="relative animate-fade-in-up" style={{ animationDelay: '800ms' }}>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                onFocus={() => setFocusedField('message')}
                                                onBlur={() => setFocusedField(null)}
                                                required
                                                rows={5}
                                                className={`peer w-full px-4 py-3.5 bg-gray-50 border-2 rounded-xl focus:outline-none transition-all duration-300 placeholder-transparent resize-none ${errors.message 
                                                    ? 'border-red-400 focus:border-red-500 bg-red-50' 
                                                    : 'border-gray-200 focus:border-[#B39359] focus:bg-white'}`}
                                                placeholder="Your Message"
                                                id="message"
                                            />
                                            <label
                                                htmlFor="message"
                                                className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || formData.message
                                                    ? '-top-2.5 text-xs bg-white px-1 font-medium'
                                                    : 'top-3.5 text-gray-400'
                                                    }`}
                                                style={focusedField === 'message' || formData.message ? { color: errors.message ? '#ef4444' : '#B39359' } : {}}
                                            >
                                                Your Message <span className="text-red-500">*</span>
                                            </label>
                                            {errors.message && (
                                                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                                            )}
                                        </div>

                                        {/* Submit Button - Using Secondary Color #B39359 */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full group overflow-hidden rounded-xl font-semibold text-white shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
                                            style={{ background: 'linear-gradient(135deg, #B39359 0%, #D4AF37 100%)' }}
                                        >
                                            <span className="relative flex items-center justify-center gap-2 py-4">
                                                {isSubmitting ? (
                                                    <>
                                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </>
                                                )}
                                            </span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info & Map */}
                        <div className="space-y-8">
                            {/* Contact Info Cards */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
                                {contactInfo.map((info, index) => (
                                    <div
                                        key={info.title}
                                        className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden animate-fade-in-up hover:scale-[1.02] hover:translate-x-2"
                                        style={{ animationDelay: `${info.delay + 400}ms` }}
                                    >
                                        {/* Gradient Border Effect on Hover - Using Secondary Color #B39359 */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10" style={{ background: 'linear-gradient(135deg, #B39359, #D4AF37)' }} />
                                        <div className="absolute inset-[2px] bg-white rounded-2xl -z-10" />

                                        <div className="relative z-10 flex items-start gap-4">
                                            <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #B39359 0%, #D4AF37 100%)' }}>
                                                {info.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold mb-1" style={{ color: '#02333B' }}>
                                                    {info.title}
                                                </h3>
                                                {info.email ? (
                                                    <a
                                                        href={`mailto:${info.content}`}
                                                        className="text-gray-600 hover:text-[#B39359] transition-colors duration-300 block"
                                                    >
                                                        {info.content}
                                                    </a>
                                                ) : (
                                                    <p className="text-gray-600 whitespace-pre-line">
                                                        {info.content}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Google Map */}
                            <div className="relative rounded-3xl overflow-hidden shadow-xl h-64 sm:h-80 lg:h-96 animate-fade-in-up" style={{ animationDelay: '700ms' }}>
                                <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(2, 51, 59, 0.2), transparent)' }} />
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.21173140832!2d72.68601877812497!3d19.082132202138897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b78fcc5e5f23%3A0xa63b83302fec0e88!2sDynamic%20Properties%20-%20Real%20Estate%20Agent!5e0!3m2!1sen!2sin!4v1768584027954!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(20%) contrast(1.1)' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="hover:filter-none transition-filter duration-300"
                                />

                                {/* Floating Badge */}
                                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-20 animate-fade-in">
                                    <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        Mumbai, India
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative CTA Section - Using Theme Colors */}
            <section className="relative py-16 sm:py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #02333B 0%, #034b56 100%)' }}>
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(179, 147, 89, 0.1)' }} />
                    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(179, 147, 89, 0.1)', animationDelay: '1.5s' }} />
                </div>

                <div className="container relative z-10 px-4 sm:px-6 lg:px-8 text-center">
                    <div className="animate-fade-in-up">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Ready to Find Your Dream Home?
                        </h2>
                        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                            Let us help you find the perfect property. Contact us today for a free consultation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/properties"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg group"
                                style={{ background: 'linear-gradient(135deg, #B39359 0%, #D4AF37 100%)' }}
                            >
                                Browse Properties
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link
                                href="tel:+919175070228"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 group bg-white/10 hover:bg-white/20 border border-white/20"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Call Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
