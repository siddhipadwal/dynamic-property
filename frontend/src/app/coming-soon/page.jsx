import ClientLayout from "@/components/ClientLayout";
import Link from "next/link";

export const metadata = {
  title: "Coming Soon | Premier Real Estate",
  description: "Something exciting is coming your way. Stay tuned!",
};

export default function ComingSoon() {
  return (
    <ClientLayout>
      <div className="min-h-screen flex items-center justify-center bg-[#02333B] relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#B39359] rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#B39359] rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-[#B39359] opacity-20 rounded-full animate-ping"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Logo - Bigger and with background */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <Link href="/" className="inline-block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8">
                <img
                  src="/assets/images/img/logo-main.png"
                  alt="Dynamic Properties"
                  className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto mx-auto"
                />
              </div>
            </Link>
          </div>

          {/* Main Content */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-[#B39359] text-sm sm:text-lg tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 font-medium">
              Something Big Is Coming
            </h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white font-lora leading-tight">
              STAY TUNED
            </h1>
          </div>

          {/* Decorative Line */}
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#B39359] mx-auto mb-6 sm:mb-8"></div>

          {/* Description */}
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-2 sm:px-0">
            We are working on something extraordinary to enhance your real estate experience. 
            Our team is putting the finishing touches on something truly special for you.
          </p>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-[#B39359]/30 mb-8 sm:mb-10 md:mb-12">
            <span className="w-2 sm:w-3 h-2 sm:h-3 bg-[#B39359] rounded-full animate-pulse"></span>
            <span className="text-white font-medium tracking-wide text-sm sm:text-base">Coming Soon</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#B39359] text-white font-semibold rounded-md hover:bg-[#a18048] transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-[#02333B] transition-all duration-300 text-sm sm:text-base"
            >
              Contact Us
            </Link>
          </div>

          {/* Footer Note */}
          <p className="text-gray-400 text-xs sm:text-sm mt-10 sm:mt-12">
            © {new Date().getFullYear()} Dynamic Properties. All rights reserved.
          </p>
        </div>
      </div>
    </ClientLayout>
  );
}
