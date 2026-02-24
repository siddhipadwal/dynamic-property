"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';

// Custom marker icon - enhanced animated map pin with teal theme color #02333B
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-wrapper" style="
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        animation: markerFloat 2s ease-in-out infinite;
        filter: drop-shadow(0 8px 16px rgba(0,0,0,0.3));
        cursor: pointer;
        transition: transform 0.3s ease;
      " onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
        <!-- Pulsing outer ring -->
        <div class="pulse-outer" style="
          position: absolute;
          bottom: 0;
          width: 30px;
          height: 15px;
          background: rgba(2, 51, 59, 0.25);
          border-radius: 50%;
          animation: pulseOuter 2s ease-out infinite;
        "></div>
        
        <!-- Main marker -->
        <svg width="50" height="65" viewBox="0 0 50 65" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:relative;z-index:2;">
          <!-- Drop shadow ellipse -->
          <ellipse cx="25" cy="60" rx="14" ry="5" fill="rgba(0,0,0,0.25)" filter="blur(3px)"/>
          
          <!-- Pin body with gradient -->
          <defs>
            <linearGradient id="markerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#056a7a"/>
              <stop offset="50%" stop-color="#02333B"/>
              <stop offset="100%" stop-color="#011a1f"/>
            </linearGradient>
            <filter id="markerGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- Main pin shape -->
          <path d="M25 0C11.193 0 0 11.193 0 25C0 42.5 25 65 25 65C25 65 50 42.5 50 25C50 11.193 38.807 0 25 0Z" fill="url(#markerGradient)" filter="url(#markerGlow)"/>
          
          <!-- White inner circle -->
          <circle cx="25" cy="23" r="13" fill="white" stroke="#B39359" stroke-width="2.5"/>
          
          <!-- Center dot -->
          <circle cx="25" cy="23" r="6" fill="#B39359"/>
          
          <!-- Highlight shine -->
          <ellipse cx="20" cy="15" rx="6" ry="4" fill="white" opacity="0.3"/>
        </svg>
        
        <!-- Inner pulse ring -->
        <div class="pulse-inner" style="
          position: absolute;
          bottom: 8px;
          width: 20px;
          height: 10px;
        ">
          <span style="
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(179, 147, 89, 0.5);
            border-radius: 50%;
            animation: pulseInner 1.5s ease-out infinite;
          "></span>
        </div>
      </div>
      
      <style>
        @keyframes markerFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseOuter {
          0% { transform: scale(0.5); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes pulseInner {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
        .custom-marker { background: transparent !important; border: none !important; }
        .leaflet-popup-content-wrapper {
          border-radius: 20px !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.25) !important;
          overflow: hidden;
          animation: popupScaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .leaflet-popup-content { margin: 0 !important; width: 320px !important; }
        .leaflet-popup-tip { 
          background: white !important;
          box-shadow: none !important;
        }
        .leaflet-popup { 
          animation: popupFadeIn 0.3s ease-out;
        }
        @keyframes popupScaleIn {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes popupFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        /* Hover effect for marker */
        .marker-wrapper:hover {
          animation-play-state: paused;
          transform: scale(1.15) translateY(-5px);
          z-index: 1000 !important;
        }
      </style>
    `,
    iconSize: [50, 75],
    iconAnchor: [25, 75],
    popupAnchor: [0, -75]
  });
};

export default function PropertyMap({ properties }) {
  const getMapCenter = () => {
    if (properties.length === 0) {
      return [19.0760, 72.8777];
    }
    const latSum = properties.reduce((sum, prop) => sum + parseFloat(prop.latitude), 0);
    const lngSum = properties.reduce((sum, prop) => sum + parseFloat(prop.longitude), 0);
    return [latSum / properties.length, lngSum / properties.length];
  };

  return (
    <>
      <style jsx global>{`
        @keyframes cardSlideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes imageZoom {
          from { transform: scale(1.1); }
          to { transform: scale(1); }
        }
        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes priceReveal {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes buttonSlide {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .popup-card {
          width: 320px;
          animation: cardSlideIn 0.5s ease-out;
          border-radius: 20px;
          overflow: hidden;
        }
        .popup-image-container {
          position: relative;
          height: 180px;
          overflow: hidden;
        }
        .popup-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: imageZoom 0.6s ease-out;
        }
        .popup-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
        }
        .popup-badge {
          animation: badgePulse 2s ease-in-out infinite;
        }
        .popup-content {
          padding: 16px;
          background: white;
        }
        .popup-title {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
          transition: color 0.3s ease;
          cursor: pointer;
        }
        .popup-title:hover {
          color: #B39359;
        }
        .popup-location {
          display: flex;
          align-items: center;
          color: #6b7280;
          font-size: 14px;
          margin-bottom: 12px;
        }
        .popup-location svg {
          color: #B39359;
          flex-shrink: 0;
        }
        .popup-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          border-radius: 12px;
          margin-bottom: 12px;
          border: 1px solid #e5e7eb;
        }
        .popup-details-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .popup-details-item svg {
          color: #B39359;
        }
        .popup-price {
          font-size: 22px;
          font-weight: 700;
          color: #02333B;
          animation: priceReveal 0.5s ease-out 0.2s both;
        }
        .popup-price-label {
          font-size: 12px;
          color: #6b7280;
        }
        .popup-button {
          background: linear-gradient(135deg, #02333B 0%, #034b56 100%);
          color: #ffffff;
          text-color: #fff;
          padding: 12px 20px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          animation: buttonSlide 0.5s ease-out 0.3s both;
        }
        .popup-button:hover {
          background: linear-gradient(135deg, #B39359 0%, #D4AF37 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(179, 147, 89, 0.4);
        }
        .popup-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
        }
        .status-ready {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
          color: white !important;
        }
        .status-construction {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
          color: white !important;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 480px) {
          .popup-card {
            width: 260px !important;
          }
          .popup-image-container {
            height: 140px;
          }
          .popup-content {
            padding: 12px;
          }
          .popup-title {
            font-size: 16px;
          }
          .popup-price {
            font-size: 18px;
          }
          .popup-details {
            flex-direction: column;
            gap: 8px;
            padding: 10px;
          }
          .popup-details-item {
            width: 100%;
            justify-content: space-between;
          }
          .popup-footer {
            flex-direction: column;
            gap: 10px;
          }
          .popup-button {
            width: 100%;
          }
        }
        
        @media (min-width: 481px) and (max-width: 768px) {
          .popup-card {
            width: 290px !important;
          }
        }
      `}</style>
      
      <MapContainer 
        center={getMapCenter()} 
        zoom={12} 
        style={{ height: '600px', width: '100%' }}
        scrollWheelZoom={true}
        className="rounded-xl shadow-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property, index) => (
          <Marker 
            key={property.id} 
            position={[parseFloat(property.latitude), parseFloat(property.longitude)]}
            icon={createCustomIcon()}
          >
            <Popup>
              <div className="popup-card">
                {/* Image Section */}
                <div className="popup-image-container">
                  <img 
                    src={property.image} 
                    alt={property.name}
                  />
                  <div className="popup-image-overlay"></div>
                  
                  {/* For Sale Badge */}
                  <div className="absolute top-3 left-3 popup-badge">
                    <span className="bg-[#02333B] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                      For Sale
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-lg popup-badge ${
                      property.status === 'Under Construction' ? 'status-construction' : 'status-ready'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="popup-content">
                  {/* Property Name */}
                  <h3 className="popup-title truncate">
                    {property.name}
                  </h3>
                  
                  {/* Location */}
                  <div className="popup-location">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate ml-1">{property.location}</span>
                  </div>
                  
                  {/* Area & Date Details */}
                  <div className="popup-details">
                    <div className="popup-details-item">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                      <span className="font-medium text-gray-700">{property.areaMin} – {property.areaMax} sq.ft</span>
                    </div>
                    <div className="popup-details-item text-gray-500 text-xs">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                        {property.addedDate
                          ? new Date(property.addedDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  
                  {/* Price & CTA */}
                  <div className="popup-footer">
                    <div>
                      <span className="popup-price-label">Price per sq.ft</span>
                      <p className="popup-price">
                        ₹{property.pricePerSqFt.toLocaleString()}
                      </p>
                    </div>

                    <Link
                      href={`/properties/${property.id}`}
                      className="popup-button"
                    >
                      View Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
