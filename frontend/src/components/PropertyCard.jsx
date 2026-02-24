import Link from 'next/link';

export default function PropertyCard({ property }) {
  return (

    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-48 sm:h-56 md:h-60 object-cover transform group-hover:scale-110 transition-transform duration-500"
        />

        {/* For Sale */}
        <div className="absolute top-4 left-4">
          <span className="bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            For Sale
          </span>
        </div>

        {/* Status */}
        <div className="absolute top-4 right-4">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full shadow ${property.status === "Under Construction"
                ? "bg-orange-500 text-white"
                : "bg-green-500 text-white"
              }`}
          >
            {property.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        {/* Name - Using Lora font and same size */}
        <h3 className="text-base font-lora font-semibold text-gray-800 mb-2 group-hover:text-[#B39359] transition-all duration-300 group-hover:scale-105 transform origin-left line-clamp-2 h-12">
          {property.name}
        </h3>

        {/* Location - With animated icon */}
        <div className="flex items-center text-gray-500 text-sm mb-4 group-hover:translate-x-1 transition-transform duration-300">
          <svg className="w-4 h-4 mr-1 text-[#B39359] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{property.location}</span>
        </div>

        {/* Details - Enhanced with better styling */}
        <div className="space-y-3 text-sm mb-4">
          {/* Area - With hover effect */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50 group-hover:bg-[#B39359]/5 transition-colors duration-300">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-[#B39359]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span className="font-medium text-gray-700">{property.areaMin} – {property.areaMax} sq.ft</span>
            </div>

            {/* Added Date - With icon */}
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {property.addedDate
                ? new Date(property.addedDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                : "N/A"}
            </div>
          </div>
        </div>

        {/* Price + CTA - Enhanced with better styling */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="group/price">
            <span className="text-xs text-gray-500 block mb-1">Price per sq.ft</span>
            <p className="text-2xl font-bold text-primary group-hover/price:text-[#B39359] transition-colors duration-300 group-hover/price:scale-110 transform origin-left inline-block">
              ₹{property.pricePerSqFt.toLocaleString()}
            </p>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#B39359] transition-all duration-300 hover:shadow-lg hover:shadow-[#B39359]/30 hover:-translate-y-0.5"
          >
            <span className="flex items-center">
              View Details
              <svg className="w-4 h-4 ml-1 group-hover/button:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>


  );
}
