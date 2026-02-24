"use client";

import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer bg-gradient-to-br from-[#01333C] to-[#021a21] pt-[80px] lg:pt-[120px] pb-30 md:pb-[80px] lg:pb-[110px] font-normal relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary opacity-10 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary opacity-10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="container relative z-10">
                <div className="grid grid-cols-12 gap-x-[30px] mb-[-30px]">
                    {/* Company Info */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4 mb-[30px]">
                        <Link href="/" className="block mb-[25px] group">
                            <img
                                src="/assets/images/img/logo-main.png"
                                loading="lazy"
                                alt="footer logo"
                                className="footer-logo w-[120px] lg:w-[150px] h-auto transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>
                        <p className="mb-[20px] xl:mb-[30px] max-w-[270px] text-white/70 leading-relaxed">
                            Properties are most budget friendly so you have opportunity to find your dream property. Our main responsibility is to clients satisfaction.
                        </p>

                        {/* Social Media Icons - Improved and Animated */}
                        <div className="flex flex-wrap gap-3">
                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="group relative w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white overflow-hidden transition-all duration-500 hover:bg-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.5)] hover:scale-110"
                            >
                                <span className="absolute inset-0 bg-[#1877F2] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                                <svg className="w-5 h-5 relative z-10 group-hover:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>

                            {/* Twitter/X */}
                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="group relative w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white overflow-hidden transition-all duration-500 hover:bg-black hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:scale-110"
                            >
                                <span className="absolute inset-0 bg-black transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                                <svg className="w-5 h-5 relative z-10 group-hover:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="group relative w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white overflow-hidden transition-all duration-500 hover:bg-gradient-to-tr hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:shadow-[0_0_20px_rgba(225,48,108,0.5)] hover:scale-110"
                            >
                                <span className="absolute inset-0 bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F77737] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                                <svg className="w-5 h-5 relative z-10 group-hover:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>

                            {/* YouTube */}
                            <a
                                href="https://youtube.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className="group relative w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white overflow-hidden transition-all duration-500 hover:bg-[#FF0000] hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] hover:scale-110"
                            >
                                <span className="absolute inset-0 bg-[#FF0000] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                                <svg className="w-5 h-5 relative z-10 group-hover:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="group relative w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white overflow-hidden transition-all duration-500 hover:bg-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.5)] hover:scale-110"
                            >
                                <span className="absolute inset-0 bg-[#0A66C2] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
                                <svg className="w-5 h-5 relative z-10 group-hover:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-2 mb-[30px]">
                        <h3 className="font-lora font-normal text-[22px] leading-[1.222] text-white mb-[20px] lg:mb-[30px] relative">
                            Quick Links<span className="text-secondary">.</span>
                            <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-secondary"></span>
                        </h3>
                        <ul className="text-[16px] leading-none mb-[-20px]">
                            {[
                                { name: 'About Us', href: '/about' },
                                { name: 'Properties', href: '/properties' },
                                { name: 'Location', href: '/location' },
                                { name: 'Blog Post', href: '/blog' },
                                { name: 'Contact', href: '/contact' }
                            ].map((link) => (
                                <li key={link.name} className="mb-[20px] group">
                                    <Link
                                        href={link.href}
                                        className="inline-block transition-all duration-300 text-white/70 group-hover:text-secondary group-hover:translate-x-2"
                                    >
                                        <span className="flex items-center gap-2">
                                            <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-2 mb-[30px]">
                        <h3 className="font-lora font-normal text-[22px] leading-[1.222] text-white mb-[20px] lg:mb-[30px] relative">
                            Services<span className="text-secondary">.</span>
                            <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-secondary"></span>
                        </h3>
                        <ul className="text-[16px] leading-none mb-[-20px]">
                            {[
                                { name: 'Add Property', href: '/coming-soon' },
                                { name: 'Our Team', href: '/coming-soon' },
                                { name: 'Careers', href: '/coming-soon' },
                                { name: 'FAQ', href: '/coming-soon' },
                                { name: 'Support', href: '/contact' }
                            ].map((link) => (
                                <li key={link.name} className="mb-[20px] group">
                                    <Link
                                        href={link.href}
                                        className="inline-block transition-all duration-300 text-white/70 group-hover:text-secondary group-hover:translate-x-2"
                                    >
                                        <span className="flex items-center gap-2">
                                            <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4 mb-[30px]">
                        <h3 className="font-lora font-normal text-[22px] leading-[1.222] text-white mb-[20px] lg:mb-[30px] relative">
                            Contact<span className="text-secondary">.</span>
                            <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-secondary"></span>
                        </h3>
                        <ul className="space-y-5 text-sm text-white/80">
                            {/* Address */}
                            <li className="flex items-start gap-4 group">
                                <span className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-all duration-300">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                <p className="leading-relaxed">
                                    Level 2, Dewan Center,<br />
                                    Office No. 36, Jogeshwari West,<br />
                                    Mumbai – 400102
                                </p>
                            </li>
                            {/* Phone 1 */}
                            <li className="flex items-center gap-4 group">
                                <span className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-all duration-300">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </span>
                                <div>
                                    <a href="tel:+917317241999" className="hover:text-secondary transition-colors block">
                                        +91 73172 41999
                                    </a>
                                    <a href="tel:+919175070228" className="hover:text-secondary transition-colors block">
                                        +91 91750 70228
                                    </a>
                                </div>
                            </li>
                            {/* Email */}
                            <li className="flex items-start gap-4 group">
                                <span className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-secondary transition-all duration-300">
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <div className="flex flex-col gap-1">
                                    <a href="mailto:sadique.k@dynamicproperties.in" className="hover:text-secondary transition-colors">
                                        sadique.k@dynamicproperties.in
                                    </a>
                                    <a href="mailto:halder.amitava@dynamicproperties.in" className="hover:text-secondary transition-colors">
                                        halder.amitava@dynamicproperties.in
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright Bar */}
                <div className="border-t border-white/10 mt-[60px] pt-[30px]">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-white/60">
                            ©{" "}
                            <Link href="/" className="text-secondary hover:underline">
                                Dynamic Properties
                            </Link>
                            {" "}All Rights Reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-white/60">
                            <Link href="/coming-soon" className="hover:text-secondary transition-colors">Privacy Policy</Link>
                            <Link href="/coming-soon" className="hover:text-secondary transition-colors">Terms & Conditions</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
