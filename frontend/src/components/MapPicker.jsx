"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* =============================
   Custom Marker Icon - Home Pointer
============================= */
const createCustomIcon = (animated = false) =>
  L.divIcon({
    className: animated ? "animate-marker" : "",
    html: `
      <div style="
        width: 40px;
        height: 40px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
      ">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9.5L12 3L21 9.5V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9.5Z" fill="url(#homeGradientPicker)" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 22V12H15V22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <defs>
            <linearGradient id="homeGradientPicker" x1="3" y1="3" x2="21" y2="22" gradientUnits="userSpaceOnUse">
              <stop stop-color="#B39359"/>
              <stop offset="1" stop-color="#8B6914"/>
            </linearGradient>
          </defs>
        </svg>
        <div style="
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 10px solid #8B6914;
          position: absolute;
          bottom: -2px;
        "></div>
      </div>
      <style>
        .leaflet-div-icon {
          background: none !important;
          border: none !important;
        }
      </style>
    `,
    iconSize: [40, 50],
    iconAnchor: [20, 50],
  });

/* =============================
   Center Reference Marker - Home Pointer
============================= */
const createCenterIcon = () =>
  L.divIcon({
    html: `
      <div style="
        width: 32px;
        height: 32px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
      ">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9.5L12 3L21 9.5V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9.5Z" fill="#02333B" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 22V12H15V22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div style="
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid #02333B;
          position: absolute;
          bottom: -2px;
        "></div>
      </div>
    `,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
  });

/* =============================
   Map Click Handler
============================= */
function MapEvents({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

/* =============================
   Map Picker Component
============================= */
export default function MapPicker({
  onLocationSelect,
  initialLat = 19.076,
  initialLng = 72.8777,
}) {
  const [position, setPosition] = useState([initialLat, initialLng]);

  const handleSelect = (lat, lng) => {
    setPosition([lat, lng]);
    onLocationSelect(lat, lng);
  };

  const isSelected =
    position[0] !== initialLat || position[1] !== initialLng;

  return (
    <div className="relative animate-map">
      {/* MAP CONTAINER */}
      <div
        className="
          h-[280px] sm:h-[340px] md:h-[380px]
          w-full rounded-2xl overflow-hidden
          border border-[#B39359]/30
          shadow-lg hover:shadow-xl
          transition-all duration-500
        "
      >
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapEvents onSelect={handleSelect} />

          {/* SELECTED MARKER */}
          {isSelected && (
            <Marker
              position={position}
              icon={createCustomIcon(true)}
            />
          )}

          {/* CENTER MARKER */}
          <Marker
            position={[initialLat, initialLng]}
            icon={createCenterIcon()}
          />
        </MapContainer>

        {/* INSTRUCTION OVERLAY */}
        <div
          className="
            absolute top-3 left-3 z-[1000]
            bg-white/90 backdrop-blur-md
            px-4 py-2 rounded-xl
            shadow-lg border border-[#B39359]/30
          "
        >
          <p className="text-xs font-medium text-gray-700 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#B39359] rounded-full animate-pulse"></span>
            Click on map to select location
          </p>
        </div>
      </div>

      {/* COORDINATES CARD */}
      {isSelected && (
        <div
          className="
            mt-3 p-3 rounded-xl
            bg-gradient-to-r from-[#02333B]/5 to-[#B39359]/10
            border-l-4 border-[#B39359]
            shadow-sm animate-map
          "
        >
          <p className="text-xs text-gray-500 mb-1">
            Selected Coordinates
          </p>
          <p className="text-sm font-semibold text-gray-800">
            📍 {position[0].toFixed(6)}, {position[1].toFixed(6)}
          </p>
        </div>
      )}

      <p className="text-[11px] text-gray-400 mt-2 text-center sm:text-left">
        Click anywhere on the map to pick the exact property location
      </p>
    </div>
  );
}
