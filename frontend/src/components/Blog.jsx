export default function Blog() {
  return (
    <>
      {/* Blog Hero Section */}
      <section className="relative overflow-hidden min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#02333B] via-[#02333B] to-[#034b56]">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(179, 147, 89, 0.15)' }} />
            <div className="absolute bottom-20 right-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(179, 147, 89, 0.1)' }} />
          </div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        </div>

        {/* Content */}
        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full border" style={{ backgroundColor: 'rgba(179, 147, 89, 0.2)', color: '#B39359', borderColor: 'rgba(179, 147, 89, 0.3)' }}>
                Our Blog
              </span>
            </div>

            <h1 className="font-lora text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Latest{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r" style={{ backgroundImage: 'linear-gradient(135deg, #B39359 0%, #D4AF37 100%)' }}>
                News
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto">
              Stay updated with the latest real estate news, property insights, and market trends.
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

      {/* Blog Content Section */}
      <div className="py-16 sm:py-20 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Blog Posts Yet</h2>
            <p className="text-gray-500">Check back soon for updates!</p>
          </div>
        </div>
      </div>
    </>
  );
}
