"use client";

import Link from "next/link";

export default function Header() {
    return (
        <section className="about-section pt-10">
            <div className="container">
                <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-12 lg:col-span-6">
                        <span className="text-secondary text-tiny inline-block mb-2">
                            Why Choose us
                        </span>
                        <h2 className="font-lora text-primary text-[24px] sm:text-[30px] leading-[1.277] xl:text-xl capitalize mb-5 lg:mb-16 font-medium max-w-[500px]">
                            We Provide Latest Properties for our valuable Clients
                            <span className="text-secondary">.</span>
                        </h2>
                        <div className="scene" data-relative-input="true">
                            <img
                                data-depth="0.1"
                                src="assets/images/img/about/about_1.png"
                                className=""
                                loading="lazy"
                                width={829}
                                height={763}
                                alt="about Image"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6 lg:pl-[70px]">
                        <p className="max-w-[448px]">
                            Discover a wide range of premium properties available for buying,
                            selling, and renting. From luxury residences to modern co-living
                            spaces, we offer multiple options to match your lifestyle, budget, and
                            comfort—along with exclusive deals and attractive offers.
                        </p>
                        <div className="-mb-10 mt-12 xl:mt-[70px] 2xl:mt-[100px]">
                            <div className="flex flex-wrap mb-5 lg:mb-10">
                                <img
                                    src="assets/images/icon/doller.png"
                                    className="self-start mr-5"
                                    loading="lazy"
                                    width={50}
                                    height={50}
                                    alt="Budget Friendly"
                                />
                                <div className="flex-1">
                                    <h3 className="font-lora text-primary text-[22px] xl:text-lg capitalize mb-2">
                                        Budget Friendly Options
                                    </h3>
                                    <p className="max-w-[315px]">
                                        Choose from carefully curated properties that offer excellent
                                        value, competitive pricing, and flexible options to suit every
                                        budget.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap mb-5 lg:mb-10">
                                <img
                                    src="assets/images/icon/location.png"
                                    className="self-start mr-5"
                                    loading="lazy"
                                    width={50}
                                    height={50}
                                    alt="Prime Location"
                                />
                                <div className="flex-1">
                                    <h3 className="font-lora text-primary text-[22px] xl:text-lg capitalize mb-2">
                                        Prime Locations
                                    </h3>
                                    <p className="max-w-[315px]">
                                        Our properties are located in well-connected, high-demand areas,
                                        offering convenience, accessibility, and excellent neighborhood
                                        value.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wr    ap mb-5 lg:mb-10">
                                <img
                                    src="assets/images/icon/trusted.png"
                                    className="self-start mr-5"
                                    loading="lazy"
                                    width={50}
                                    height={50}
                                    alt="Trusted Service"
                                />
                                <div className="flex-1">
                                    <h3 className="font-lora text-primary text-[22px] xl:text-lg capitalize mb-2">
                                        Trusted by Thousands
                                    </h3>
                                    <p className="max-w-[315px]">
                                        With years of experience and thousands of satisfied clients, we
                                        are a trusted name in delivering reliable and transparent
                                        property solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
