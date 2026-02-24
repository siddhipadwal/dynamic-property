"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const MapPicker = dynamic(() => import('@/components/MapPicker'), { ssr: false });

export default function EditPropertyClient({ property, propertyId }) {
  const [formData, setFormData] = useState({
    name: '', 
    location: '', 
    image: '/assets/images/latest-properties/properties1.jpg', 
    images: [],
    video: '',
    pricePerSqFt: '', 
    areaMin: '', 
    areaMax: '', 
    possessionDate: '', 
    description: '', 
    category: 'Residential', 
    status: 'Under Construction', 
    isBestChoice: false, 
    latitude: '', 
    longitude: ''
  });
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) { router.push('/admin/login'); return; }
    if (property) {
      let parsedImages = [];
      try {
        if (property.images) {
          parsedImages = typeof property.images === 'string' ? JSON.parse(property.images) : property.images;
        }
      } catch (e) {
        parsedImages = [];
      }
      
      setFormData({
        name: property.name || '', 
        location: property.location || '', 
        image: property.image || '/assets/images/latest-properties/properties1.jpg', 
        images: parsedImages,
        video: property.video || '',
        pricePerSqFt: property.pricePerSqFt || '', 
        areaMin: property.areaMin || '', 
        areaMax: property.areaMax || '', 
        possessionDate: property.possessionDate || '', 
        description: property.description || '', 
        category: property.category || 'Residential', 
        status: property.status || 'Under Construction', 
        isBestChoice: property.isBestChoice === true || property.isBestChoice === 1 || property.isBestChoice === '1', 
        latitude: property.latitude || '', 
        longitude: property.longitude || ''
      });
    }
  }, [property, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      const response = await fetch('/api/upload', { method: 'POST', body: formDataUpload });
      const data = await response.json();
      if (response.ok) setFormData(prev => ({ ...prev, image: data.url }));
      else setError(data.error || 'Failed to upload image');
    } catch (err) { setError('Failed to upload image. Please try again.'); }
    finally { setUploading(false); }
  };

  const handleMultipleImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    setError('');
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        const response = await fetch('/api/upload', { method: 'POST', body: formDataUpload });
        const data = await response.json();
        if (response.ok) uploadedUrls.push(data.url);
      }
      setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
    } catch (err) { setError('Failed to upload images. Please try again.'); }
    finally { setUploading(false); }
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid video file (MP4, WebM, or OGG)');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError('Video file must be less than 50MB');
      return;
    }
    setUploading(true);
    setError('');
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      const response = await fetch('/api/upload', { method: 'POST', body: formDataUpload });
      const data = await response.json();
      if (response.ok) setFormData(prev => ({ ...prev, video: data.url }));
      else setError(data.error || 'Failed to upload video');
    } catch (err) { setError('Failed to upload video. Please try again.'); }
    finally { setUploading(false); }
  };

  const removeImage = (index) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const removeVideo = () => {
    setFormData(prev => ({ ...prev, video: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`/api/properties/${propertyId}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ 
          ...formData, 
          pricePerSqFt: parseInt(formData.pricePerSqFt), 
          areaMin: parseInt(formData.areaMin), 
          areaMax: parseInt(formData.areaMax), 
          isBestChoice: formData.isBestChoice,
          images: JSON.stringify(formData.images)
        }) 
      });
      const data = await response.json();
      if (response.ok) router.push('/admin/dashboard');
      else setError(data.error || 'Failed to update property');
    } catch (err) { setError('An error occurred. Please try again.'); }
    finally { setLoading(false); }
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-lg font-lora" style={{ color: '#02333B' }}>Property not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <h1 className="text-xl sm:text-2xl font-bold font-lora" style={{ color: '#02333B' }}>Edit Property</h1>
            <div className="hidden sm:block">
              <Link href="/admin/dashboard" className="hover:opacity-70 transition" style={{ color: '#B39359' }}>Back to Dashboard</Link>
            </div>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition absolute right-3 top-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: '#02333B' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="sm:hidden mt-4 pb-4 border-t pt-4">
              <Link href="/admin/dashboard" className="block px-4 py-2 text-center rounded-md" style={{ background: 'rgba(179, 147, 89, 0.1)', color: '#B39359' }}>Back to Dashboard</Link>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="bg-white rounded-lg sm:rounded-xl shadow p-4 sm:p-6">
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>Property Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition" style={{ '--tw-ring-color': '#B39359' }} placeholder="e.g., ALPINE PRIMO" required />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>Location *</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange}
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition" style={{ '--tw-ring-color': '#B39359' }} placeholder="e.g., Andheri West, Mumbai" required />
            </div>

            <div className="mb-4">
              <button type="button" onClick={() => setShowMapPicker(!showMapPicker)} className="flex items-center gap-2 px-4 py-2 text-white rounded-md hover:opacity-90 transition" style={{ background: '#B39359' }}>
                {showMapPicker ? 'Hide Map' : 'Pick Location'}
              </button>
              {showMapPicker && <div className="mt-3"><MapPicker onLocationSelect={(lat, lng) => { setFormData(prev => ({ ...prev, latitude: lat.toString(), longitude: lng.toString() })); }} initialLat={parseFloat(formData.latitude) || 19.0760} initialLng={parseFloat(formData.longitude) || 72.8777} /></div>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>Latitude</label>
                <input type="text" name="latitude" value={formData.latitude} onChange={handleChange}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition" style={{ '--tw-ring-color': '#B39359' }} placeholder="e.g., 19.0760" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>Longitude</label>
                <input type="text" name="longitude" value={formData.longitude} onChange={handleChange}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition" style={{ '--tw-ring-color': '#B39359' }} placeholder="e.g., 72.8777" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>
                Main Image <span className="text-xs font-normal text-gray-500">(Shows in property card)</span>
              </label>
              <div className="mb-2">
                <input type="file" id="imageFile" accept="image/*" onChange={handleMainImageChange} className="hidden" />
                <label htmlFor="imageFile" className="inline-flex items-center px-4 py-2 text-white rounded-md cursor-pointer hover:opacity-90 transition" style={{ background: '#B39359' }}>
                  {uploading ? 'Uploading...' : 'Upload Main Image'}
                </label>
              </div>
              {formData.image && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Preview:</p>
                  <img src={formData.image} alt="Property preview" className="w-32 sm:w-48 h-24 sm:h-32 object-cover rounded-md border" />
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>
                Multiple Images <span className="text-xs font-normal text-gray-500">(Gallery - select multiple)</span>
              </label>
              <div className="mb-2">
                <input type="file" id="multipleImages" accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml,image/bmp,image/heic" multiple onChange={handleMultipleImagesChange} className="hidden" />
                <label htmlFor="multipleImages" className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-md cursor-pointer hover:opacity-90 transition" style={{ background: '#02333B' }}>
                  {uploading ? 'Uploading...' : 'Add Multiple Images'}
                </label>
                <span className="ml-2 text-xs text-gray-500">(Select multiple images at once)</span>
              </div>
              {formData.images.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Gallery Preview ({formData.images.length} images):</p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-20 object-cover rounded-md border" />
                        <button type="button" onClick={() => removeImage(index)} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>
                Property Video <span className="text-xs font-normal text-gray-500">(Will show in property details)</span>
              </label>
              <div className="mb-2">
                <input type="file" id="propertyVideo" accept="video/mp4,video/webm,video/ogg" onChange={handleVideoChange} className="hidden" />
                <label htmlFor="propertyVideo" className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-md cursor-pointer hover:opacity-90 transition" style={{ background: '#E11D48' }}>
                  {uploading ? 'Uploading...' : 'Upload Video'}
                </label>
                <span className="ml-2 text-xs text-gray-500">(MP4, WebM, OGG - max 50MB)</span>
              </div>
              {formData.video && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Video Preview:</p>
                  <div className="relative inline-block">
                    <video src={formData.video} className="w-48 h-32 object-cover rounded-md border" controls />
                    <button type="button" onClick={removeVideo} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-sm flex items-center justify-center">×</button>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>Price per sq.ft (₹) *</label>
              <input type="number" name="pricePerSqFt" value={formData.pricePerSqFt} onChange={handleChange}
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition" style={{ '--tw-ring-color': '#B39359' }} placeholder="e.g., 25000" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>Min Area (sq.ft) *</label>
                <input type="number" name="areaMin" value={formData.areaMin} onChange={handleChange}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition" style={{ '--tw-ring-color': '#B39359' }} placeholder="e.g., 650" required />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>Max Area (sq.ft) *</label>
                <input type="number" name="areaMax" value={formData.areaMax} onChange={handleChange}
                  className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition" style={{ '--tw-ring-color': '#B39359' }} placeholder="e.g., 1200" required />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>Possession Date</label>
              <input type="date" name="possessionDate" value={formData.possessionDate} onChange={handleChange}
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition" style={{ '--tw-ring-color': '#B39359' }} />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>Category *</label>
              <select name="category" value={formData.category} onChange={handleChange}
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition" style={{ '--tw-ring-color': '#B39359' }}>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Land">Land</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>Property Status *</label>
              <select name="status" value={formData.status} onChange={handleChange}
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition" style={{ '--tw-ring-color': '#B39359' }}>
                <option value="Under Construction">Under Construction</option>
                <option value="Ready to Move">Ready to Move</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" name="isBestChoice" checked={formData.isBestChoice} onChange={(e) => setFormData(prev => ({ ...prev, isBestChoice: e.target.checked }))}
                  className="w-5 h-5 border-gray-300 rounded focus:ring-[#B39359]" style={{ color: '#B39359' }} />
                <span className="ml-2 font-medium" style={{ color: '#02333B' }}>Mark as Best Choice</span>
              </label>
            </div>

            <div className="mb-5 sm:mb-6">
              <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>Description *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={4}
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition" style={{ '--tw-ring-color': '#B39359' }} placeholder="Enter property description..." required />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button type="submit" disabled={loading || uploading} className="flex-1 text-white py-2 sm:py-3 px-4 rounded-md hover:opacity-90 transition disabled:opacity-50 font-medium" style={{ background: '#02333B' }}>
                {loading ? 'Updating...' : 'Update Property'}
              </button>
              <Link href="/admin/dashboard" className="flex-1 bg-gray-500 text-white py-2 sm:py-3 px-4 rounded-md hover:bg-gray-600 transition text-center font-medium">Cancel</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
