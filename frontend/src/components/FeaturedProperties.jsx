"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";

export default function FeaturedProperties() {
    const [properties, setProperties] = useState([]);
    const [activeTab, setActiveTab] = useState("all-properties");
    const [loading, setLoading] = useState(true);

    // Load saved order from localStorage
    const getSavedOrder = () => {
        try {
            const saved = localStorage.getItem('property_order');
            return saved ? JSON.parse(saved) : {};
        } catch {
            return {};
        }
    };

    // Sort properties by saved order
    const sortPropertiesByOrder = (props) => {
        const order = getSavedOrder();
        if (Object.keys(order).length === 0) return props;
        return [...props].sort((a, b) => (order[a.id] || 999) - (order[b.id] || 999));
    };

    const fetchProperties = async () => {
        try {
            const response = await fetch('/api/properties');
            const data = await response.json();
            if (data.properties) {
                // Apply localStorage order
                const sortedProperties = sortPropertiesByOrder(data.properties);
                setProperties(sortedProperties);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const filteredProperties = properties.filter(property => {
        if (activeTab === "all-properties") return true;
        
        // For Buy - show only Sale properties
        if (activeTab === "ForBuy") {
            return property.category === "Sale";
        }
        
        // For Rent - show message (no properties)
        if (activeTab === "ForRent") {
            return false;
        }
        
        // Co-living - show message (no properties)
        if (activeTab === "co-living2") {
            return false;
        }
        
        return true;
    });

    return (
        <section className="featured-properties py-[80px] lg:py-[125px]">
            <div className="container">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <span className="text-secondary text-tiny inline-block mb-2">
                            Newly Added
                        </span>
                    </div>
                    <div className="col-span-12 flex flex-wrap flex-col md:flex-row items-start justify-between mb-[50px]">
                        <div className="mb-5 lg:mb-0">
                            <h2 className="font-lora text-primary text-[24px] sm:text-[30px] xl:text-xl capitalize font-medium">
                                Featured Properties<span className="text-secondary">.</span>
                            </h2>
                        </div>
                        <ul className="all-properties flex flex-wrap lg:pt-[10px]">
                            <li
                                data-tab="all-properties"
                                className={`mr-[30px] md:mr-[45px] mb-4 lg:mb-0 leading-none ${activeTab === "all-properties" ? "active" : ""}`}
                            >
                                <button
                                    onClick={() => setActiveTab("all-properties")}
                                    className={`leading-none capitalize text-primary hover:text-secondary transition-all text-[16px] ease-out ${activeTab === "all-properties" ? "text-secondary" : ""}`}
                                >
                                    All Properties
                                </button>
                            </li>
                            <li
                                data-tab="ForBuy"
                                className={`mr-[30px] md:mr-[45px] mb-4 lg:mb-0 leading-none ${activeTab === "ForBuy" ? "active" : ""}`}
                            >
                                <button
                                    onClick={() => setActiveTab("ForBuy")}
                                    className={`leading-none capitalize text-primary hover:text-secondary transition-all text-[16px] ease-out ${activeTab === "ForBuy" ? "text-secondary" : ""}`}
                                >
                                    For Buy
                                </button>
                            </li>
                            <li
                                data-tab="ForRent"
                                className={`mr-[30px] md:mr-[45px] mb-4 lg:mb-0 leading-none ${activeTab === "ForRent" ? "active" : ""}`}
                            >
                                <button
                                    onClick={() => setActiveTab("ForRent")}
                                    className={`leading-none capitalize text-primary hover:text-secondary transition-all text-[16px] ease-out ${activeTab === "ForRent" ? "text-secondary" : ""}`}
                                >
                                    For Rent
                                </button>
                            </li>
                            <li
                                data-tab="co-living2"
                                className={`md:mr-[0px] mb-4 lg:mb-0 leading-none ${activeTab === "co-living2" ? "active" : ""}`}
                            >
                                <button
                                    onClick={() => setActiveTab("co-living2")}
                                    className={`leading-none capitalize text-primary hover:text-secondary transition-all text-[16px] ease-out ${activeTab === "co-living2" ? "text-secondary" : ""}`}
                                >
                                    Co-living
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="col-span-12">
                        <div className="all-properties properties-tab-content active">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
                                {loading ? (
                                    <div className="col-span-12 text-center py-10">
                                        <p className="text-gray-500">Loading properties...</p>
                                    </div>
                                ) : filteredProperties.length > 0 ? (
                                    filteredProperties.slice(0, 9).map((property) => (
                                        <PropertyCard key={property.id} property={property} />
                                    ))
                                ) : (
                                    <div className="col-span-12 text-center py-14 animate-fadeIn">
                                        <div className="inline-flex flex-col items-center gap-3">
                                            <span className="text-4xl animate-bounce">🏡</span>

                                            <h3 className="text-xl font-semibold text-primary">
                                                No properties available right now
                                            </h3>

                                            <p className="text-gray-500 max-w-md">
                                                We currently don't have any properties listed here.
                                                If you have one, we'd love to hear from you 💌
                                            </p>

                                            <Link
                                                href="/contact"
                                                className="mt-4 inline-flex items-center gap-2 bg-secondary text-white px-7 py-3 rounded-md font-semibold
                       hover:bg-primary transition-all duration-300 hover:scale-105 shadow-md"
                                            >
                                                📞 Contact Us
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
