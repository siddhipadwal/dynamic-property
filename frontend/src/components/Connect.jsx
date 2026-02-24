"use client";

import { useState } from 'react';
import Link from "next/link";

export default function Connect() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value = '' } = e.target;
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Check if all fields are filled (all 4 fields required)
    const isFormFilled = () => {
        return formData.name.trim() !== '' && 
               formData.email.trim() !== '' && 
               formData.mobile.trim() !== '' && 
               formData.message.trim() !== '';
    };

    // Validate Indian mobile number (optional field)
    const validatePhone = (phone) => {
        if (!phone || phone.trim() === '') {
            return null; // Optional field
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
        
        // Check if it's exactly 10 digits and starts with 6, 7, 8, or 9
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
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else {
            const emailError = validateEmail(formData.email);
            if (emailError) {
                newErrors.email = emailError;
            }
        }
        
        // Mobile is optional - only validate if provided
        if (formData.mobile.trim()) {
            const phoneError = validatePhone(formData.mobile);
            if (phoneError) {
                newErrors.mobile = phoneError;
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
                    name: formData.name,
                    email: formData.email,
                    phone: formData.mobile,
                    message: formData.message
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', message: 'Thank you for connecting with us! We will get back to you soon.' });
                setFormData({
                    name: '',
                    email: '',
                    mobile: '',
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

    return (
        <div className="mt-[80px] lg:mt-[120px] xl:mt-[-160px] relative z-50 pl-[40px] lg:pl-[50px] xl:pl-[0px] hidden lg:block">
            <div className="container">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 relative">
                        <ul className="tab-nav search-tab inline-flex px-[15px] sm:px-[30px] py-[22px] border-l border-t border-r border-solid border-[#016450] border-opacity-25 rounded-tl-[15px] rounded-tr-[15px] bg-white">
                            <li
                                data-tab="contact"
                                className="mr-[5px] sm:mr-[10px] md:mr-[46px] my-1 active"
                            >
                                <button className="font-lora leading-none px-[5px] sm:px-[10px] capitalize text-primary transition-all text-base xl:text-[22px] relative">
                                    Fill The Form To Connect With Us
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-12 selectricc-border-none">
                        <div
                            id="contact"
                            className="tab-content bg-white border border-solid border-[#016450] border-opacity-25 rounded-bl-[15px] rounded-br-[15px] rounded-tr-[15px] px-[15px] sm:px-[30px] py-[40px] active"
                        >
                            {/* Status Message */}
                            {status.message && (
                                <div className={`mb-6 p-4 rounded-xl animate-fade-in ${status.type === 'success'
                                    ? 'bg-green-50 text-green-700 border border-green-200'
                                    : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                                    {status.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} method="get">
                                <div className="advanced-searrch flex flex-wrap items-center -mb-[45px]">
                                    {/* Name */}
                                    <div className="advanced-searrch-list flex items-center lg:border-r lg:border-[#D6D4D4] lg:mr-[40px] xl:mr-[50px] mb-[45px] flex-1">
                                        <div className="mr-4 shrink-0 text-primary flex items-center">
                                            <i className="fa-solid fa-user text-[24px]" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="font-lora text-primary text-[17px] xl:text-[20px] mb-1">
                                                Name
                                            </label>
                                            <input
                                                name="name"
                                                type="text"
                                                placeholder="Your Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="text-[17px] placeholder:text-[17px] font-light w-full focus:outline-none"
                                                required=""
                                            />
                                            {errors.name && (
                                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                            )}
                                        </div>
                                    </div>
                                    {/* Email */}
                                    <div className="advanced-searrch-list flex items-center lg:border-r lg:border-[#D6D4D4] lg:mr-[40px] xl:mr-[50px] mb-[45px] flex-1">
                                        <div className="mr-4 shrink-0 text-primary flex items-center">
                                            <i className="fa-solid fa-envelope text-[24px]" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="font-lora text-primary text-[17px] xl:text-[20px] mb-1">
                                                Email Address
                                            </label>
                                            <input
                                                name="email"
                                                type="email"
                                                placeholder="Your Email Address"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="text-[17px] placeholder:text-[17px] font-light w-full focus:outline-none"
                                                required=""
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>
                                    {/* Mobile */}
                                    <div className="advanced-searrch-list flex items-center lg:border-r lg:border-[#D6D4D4] lg:mr-[40px] xl:mr-[50px] mb-[45px] flex-1">
                                        <div className="mr-4 shrink-0 text-primary flex items-center">
                                            <i className="fa-solid fa-phone text-[24px]" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="font-lora text-primary text-[17px] xl:text-[20px] mb-1">
                                                Mobile Number
                                            </label>
                                            <input
                                                name="mobile"
                                                type="tel"
                                                placeholder="Your Mobile Number"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                className="text-[17px] placeholder:text-[17px] font-light w-full focus:outline-none"
                                            />
                                            {errors.mobile && (
                                                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                                            )}
                                        </div>
                                    </div>
                                    {/* Message */}
                                    <div className="advanced-searrch-list flex items-center mb-[45px] flex-1">
                                        <div className="mr-4 shrink-0 text-primary flex items-center">
                                            <i className="fa-solid fa-message text-[24px]" />
                                        </div>
                                        <div className="flex-1">
                                            <label className="font-lora text-primary text-[17px] xl:text-[19px] mb-1">
                                                Message regarding property
                                            </label>
                                            <input
                                                name="message"
                                                type="text"
                                                placeholder="Your Message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="text-[17px] placeholder:text-[17px] font-light w-full focus:outline-none"
                                                required=""
                                            />
                                            {errors.message && (
                                                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    {/* Submit Button - Only visible when all fields are filled */}
                                    {isFormFilled() && (
                                        <div className="advanced-searrch-list mb-[45px] flex items-center flex-1">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="search-properties-btn bg-black text-white px-8 py-4 rounded-md w-full hover:bg-gray-800 transition-all duration-300 cursor-pointer"
                                            >
                                                {isSubmitting ? 'Submitting...' : 'Submit'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
