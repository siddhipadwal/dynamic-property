"use client";

import Link from "next/link";

export default function Header() {
    return (
        <>
            <section className="bg-no-repeat bg-left-bottom xl:bg-right-bottom bg-contain xl:bg-cover bg-[#E9F1FF] h-[450px] lg:h-[500px] xl:h-[650px] flex flex-wrap items-center relative">
                <div className="container">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="max-w-[420px] text-center mx-auto">
                                <div className="mb-5">
                                    <span className="text-base text-secondary block">About us</span>
                                </div>
                                <h1
                                    className="font-lora text-primary text-[32px] sm:text-[40px] md:text-[58px] lg:text-[40px] leading-tight xl:text-2xl title font-medium"
                                    style={{ color: "white" }}
                                >
                                    About Dynamic Properties<span style={{ color: "white" }}>.</span>
                                </h1>
                                <p className="text-base mt-5" style={{ color: "#B39359" }}>
                                    We offer the right property choices tailored to your needs, giving
                                    you access to the best opportunities across a wide range of
                                    premium developments.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Hero section end */}
            {/* About section start */}
            <section className="relative z-[1] mt-[80px] xl:mt-0">
                <div className="container">
                    <div className="items-center">
                        <div className="lg:mb-[60px] mb-10 -mt-[150px]">
                            <img
                                className="mx-auto w-full"
                                src="assets/images/img/about/1.png"
                                width={597}
                                height={716}
                                alt="about image"
                            />
                        </div>
                        <div className="max-w-[830px] mx-auto text-center">
                            <span className="text-secondary text-tiny inline-block mb-2">
                                Since 2014
                            </span>
                            <h2 className="font-lora text-primary text-[24px] sm:text-[30px] leading-[1.3888] xl:text-[35px] capitalize mb-[30px] lg:mb-[50px] font-medium">
                                We Provide Right Choice of Properties that You need and have great
                                opportunity to choose from thousands of Collection
                                <span className="text-secondary">.</span>
                            </h2>
                            <div className="flex justify-center">
                                <ul className="flex flex-wrap list-none">
                                    <li className="block">
                                        <span className="font-lora text-secondary text-xl">
                                            <span className="counter-up">20</span>
                                            <span>k+</span>
                                        </span>
                                        <p>Properties</p>
                                    </li>
                                    <li className="block pl-[30px] sm:pl-[40px] md:pl-[60px]">
                                        <span className="font-lora text-secondary text-xl">
                                            <span className="counter-up">12</span>
                                            <span>k+</span>
                                        </span>
                                        <p>Customers</p>
                                    </li>
                                    <li className="block pl-[30px] sm:pl-[40px] md:pl-[60px]">
                                        <span className="font-lora text-secondary text-xl">
                                            <span className="counter-up">100</span>
                                            <span>+</span>
                                        </span>
                                        <p>Channel Partners</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* About section end */}
            {/* About Us Section Start */}
            <section className="about-section pt-[80px] lg:pt-[120px]">
                <div className="container">
                    <div className="grid grid-cols-12 gap-6 items-center">
                        <div className="col-span-12 lg:col-span-6">
                            <span className="text-secondary text-tiny inline-block mb-2">
                                Why Choose us
                            </span>
                            <h2 className="font-lora text-primary text-[24px] sm:text-[30px] leading-[1.277] xl:text-xl capitalize mb-5 lg:mb-16 font-medium max-w-[500px]">
                                We offer the latest properties, ensuring the best choices for our
                                valued clients.
                                <span className="text-secondary" />
                            </h2>
                            <div className="scene" data-relative-input="true">
                                <img
                                    data-depth="0.1"
                                    src="assets/images/img/about/about_2.png"
                                    className=""
                                    loading="lazy"
                                    width={729}
                                    height={663}
                                    alt="about Image"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6 lg:pl-[70px]">
                            <p className="max-w-[448px] ">
                                Huge number of propreties availabe here for buy, sell and Rent. Also
                                you find here co-living property so lots opportunity you have to
                                choose here and enjoy huge discount.{" "}
                            </p>
                            <div className="-mb-10 mt-12 xl:mt-[70px] 2xl:mt-[100px]">
                                <div className="flex flex-wrap mb-5 lg:mb-10">
                                    <img
                                        src="assets/images/icon/doller.png"
                                        className="self-start mr-5"
                                        loading="lazy"
                                        width={50}
                                        height={50}
                                        alt="Budget Friendly Properties"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-lora text-primary text-[22px] xl:text-lg capitalize mb-2">
                                            Budget Friendly
                                        </h3>
                                        <p className="max-w-[315px]">
                                            We offer budget-friendly property options that give you the
                                            best value without compromising on quality.
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
                                        alt="Prime Location Properties"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-lora text-primary text-[22px] xl:text-lg capitalize mb-2">
                                            Prime Location
                                        </h3>
                                        <p className="max-w-[315px]">
                                            Our properties are located in prime areas with excellent
                                            connectivity and future growth potential.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap mb-5 lg:mb-10">
                                    <img
                                        src="assets/images/icon/trusted.png"
                                        className="self-start mr-5"
                                        loading="lazy"
                                        width={50}
                                        height={50}
                                        alt="Trusted Real Estate Company"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-lora text-primary text-[22px] xl:text-lg capitalize mb-2">
                                            Trusted by Thousands
                                        </h3>
                                        <p className="max-w-[315px]">
                                            Trusted by thousands of happy clients for delivering
                                            transparent deals and reliable property solutions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* About Us Section End */}
            {/* service Section Start*/}
            <section className="py-[80px] lg:py-[120px]">
                <div className="container">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12">
                            <div className="mb-[30px] lg:mb-[60px] text-center">
                                <span className="text-secondary text-tiny inline-block mb-2">
                                    Our Services
                                </span>
                                <h2 className="font-lora text-primary text-[24px] sm:text-[30px] xl:text-xl capitalize font-medium">
                                    Services We Provide<span className="text-secondary">.</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px]">
                        <div className="relative group">
                            <a href="" className="block">
                                <img
                                    src="assets/images/img/services/sale.png"
                                    className="w-full h-full block mx-auto rounded-[6px_6px_0px_0px]"
                                    loading="lazy"
                                    width={270}
                                    height={290}
                                    alt="Sale Property"
                                />
                                <div className="drop-shadow-[0px_2px_15px_rgba(0,0,0,0.1)] hover:drop-shadow-[0px_8px_20px_rgba(0,0,0,0.15)] bg-[#FFFDFC] rounded-[0px_0px_6px_6px] px-[25px] py-[25px]">
                                    <h3 className="font-lora font-normal text-[24px] xl:text-lg text-primary group-hover:text-secondary transition-all mb-[5px]">
                                        Sale Property
                                        <span className="text-secondary group-hover:text-primary">
                                            .
                                        </span>{" "}
                                    </h3>
                                    <p className="font-light text-tiny">
                                        Helping you sell your property at the best market value.
                                    </p>
                                </div>
                            </a>
                        </div>
                        <div className="relative group">
                            <a href="" className="block">
                                <img
                                    src="assets/images/img//services/buy.png"
                                    className="w-full h-full block mx-auto rounded-[6px_6px_0px_0px]"
                                    loading="lazy"
                                    width={270}
                                    height={290}
                                    alt="Buy Property"
                                />
                                <div className="drop-shadow-[0px_2px_15px_rgba(0,0,0,0.1)] hover:drop-shadow-[0px_8px_20px_rgba(0,0,0,0.15)] bg-[#FFFDFC] rounded-[0px_0px_6px_6px] px-[25px] py-[25px]">
                                    <h3 className="font-lora font-normal text-[24px] xl:text-lg text-primary group-hover:text-secondary transition-all mb-[5px]">
                                        Buy Property
                                        <span className="text-secondary group-hover:text-primary">
                                            .
                                        </span>{" "}
                                    </h3>
                                    <p className="font-light text-tiny">
                                        Assisting you in finding the perfect property to buy.{" "}
                                    </p>
                                </div>
                            </a>
                        </div>
                        <div className="relative group">
                            <a href="" className="block">
                                <img
                                    src="assets/images/img/services/rent.png"
                                    className="w-full h-full block mx-auto rounded-[6px_6px_0px_0px]"
                                    loading="lazy"
                                    width={270}
                                    height={290}
                                    alt="Rent Property"
                                />
                                <div className="drop-shadow-[0px_2px_15px_rgba(0,0,0,0.1)] hover:drop-shadow-[0px_8px_20px_rgba(0,0,0,0.15)] bg-[#FFFDFC] rounded-[0px_0px_6px_6px] px-[25px] py-[25px]">
                                    <h3 className="font-lora font-normal text-[24px] xl:text-lg text-primary group-hover:text-secondary transition-all mb-[5px]">
                                        Rent Property
                                        <span className="text-secondary group-hover:text-primary">
                                            .
                                        </span>{" "}
                                    </h3>
                                    <p className="font-light text-tiny">
                                        Offering the right rental properties to suit your needs.
                                    </p>
                                </div>
                            </a>
                        </div>
                        <div className="relative group">
                            <a href="" className="block">
                                <img
                                    src="assets/images/img/services/co-living.png"
                                    className="w-full h-full block mx-auto rounded-[6px_6px_0px_0px]"
                                    loading="lazy"
                                    width={270}
                                    height={290}
                                    alt="Co-Living"
                                />
                                <div className="drop-shadow-[0px_2px_15px_rgba(0,0,0,0.1)] hover:drop-shadow-[0px_8px_20px_rgba(0,0,0,0.15)] bg-[#FFFDFC] rounded-[0px_0px_6px_6px] px-[25px] py-[25px]">
                                    <h3 className="font-lora font-normal text-[24px] xl:text-lg text-primary group-hover:text-secondary transition-all mb-[5px]">
                                        Co-Living
                                        <span className="text-secondary group-hover:text-primary">
                                            .
                                        </span>{" "}
                                    </h3>
                                    <p className="font-light text-tiny">
                                        Providing comfortable and modern co-living spaces.{" "}
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/* service Section End*/} 
            
        </>
    );
}
