"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SEOSettings() {
  const [seoData, setSeoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedPage, setSelectedPage] = useState('global');
  const [apiError, setApiError] = useState('');
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      router.push('/admin/login');
      return;
    }
    fetchSEO();
  }, [router]);

  const fetchSEO = async () => {
    setApiError('');
    setLoading(true);
    try {
      const response = await fetch('/api/seo');
      const data = await response.json();
      if (response.ok) {
        setSeoData(data.seo || []);
      } else {
        setApiError(data.error || 'Failed to fetch SEO settings');
      }
    } catch (err) {
      setApiError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    const currentSeo = seoData.find(s => s.page_slug === selectedPage);

    if (!currentSeo) {
      setMessage({ type: 'error', text: 'No SEO data found for selected page' });
      setSaving(false);
      return;
    }

    try {
      const response = await fetch('/api/seo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_slug: selectedPage,
          page_name: currentSeo.page_name,
          meta_title: currentSeo.meta_title || '',
          meta_description: currentSeo.meta_description || '',
          meta_keywords: currentSeo.meta_keywords || '',
          featured_image: currentSeo.featured_image || ''
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'SEO settings saved successfully!' });
        fetchSEO();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save SEO settings' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An error occurred while saving' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setSeoData(seoData.map(seo =>
      seo.page_slug === selectedPage
        ? { ...seo, [field]: value }
        : seo
    ));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        handleChange('featured_image', data.url);
        setMessage({ type: 'success', text: 'Image uploaded successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to upload image' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Upload failed: ' + err.message });
    } finally {
      setUploading(false);
    }
  };

  const currentSeo = seoData.find(s => s.page_slug === selectedPage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">SEO Settings</h1>
          <Link
            href="/admin/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          {/* Page Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Page
            </label>
            {seoData.length > 0 ? (
              <select
                value={selectedPage}
                onChange={(e) => {
                  setSelectedPage(e.target.value);
                  setMessage({ type: '', text: '' });
                }}
                className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {seoData.map((seo, idx) => (
                  <option key={`${seo.page_slug}-${idx}`} value={seo.page_slug}>
                    {seo.page_name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-red-500">
                No pages found. Error: {apiError || 'Unknown error'}
                <button
                  onClick={fetchSEO}
                  className="ml-2 text-blue-600 underline"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          {/* Message */}
          {message.text && (
            <div className={`mb-4 p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
              {message.text}
            </div>
          )}

          {/* SEO Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Featured Image - Upload from Computer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image (OG Image)
                </label>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />

                <div className="flex gap-2 items-start">
                  {/* Upload Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    style={{
                      backgroundColor: uploading ? '#9CA3AF' : '#16A34A',
                      color: '#ffffff',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      cursor: uploading ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!uploading) e.currentTarget.style.backgroundColor = '#15803D';
                    }}
                    onMouseLeave={(e) => {
                      if (!uploading) e.currentTarget.style.backgroundColor = '#16A34A';
                    }}
                  >
                    {uploading ? 'Uploading...' : 'Upload from Computer'}
                  </button>

                  {/* Image URL Input */}
                  <input
                    type="text"
                    value={currentSeo?.featured_image || ''}
                    onChange={(e) => handleChange('featured_image', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Or enter image URL manually"
                  />
                </div>

                {/* Image Preview */}
                {currentSeo?.featured_image && (
                  <div className="mt-3">
                    <img
                      src={currentSeo.featured_image}
                      alt="Featured preview"
                      className="w-48 h-48 object-cover rounded border"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleChange('featured_image', '')}
                      className="mt-2 text-sm text-red-600 hover:underline"
                    >
                      Remove Image
                    </button>
                  </div>
                )}

                <p className="mt-2 text-sm text-gray-500">
                  Recommended size: 1200x630 pixels for social media sharing
                </p>
              </div>

              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={currentSeo?.meta_title || ''}
                  onChange={(e) => handleChange('meta_title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter meta title"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Recommended: 50-60 characters
                </p>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={currentSeo?.meta_description || ''}
                  onChange={(e) => handleChange('meta_description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter meta description"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Recommended: 150-160 characters
                </p>
              </div>

              {/* Meta Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Keywords
                </label>
                <textarea
                  value={currentSeo?.meta_keywords || ''}
                  onChange={(e) => handleChange('meta_keywords', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter meta keywords (comma separated)"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Example: real estate, properties, buy, sell, rent
                </p>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Search Preview:</h3>
                <div className="bg-white p-3 rounded border">
                  <p className="text-blue-700 text-lg truncate">
                    {currentSeo?.meta_title || 'Page Title'}
                  </p>
                  <p className="text-green-700 text-sm truncate">
                    mywebsite.com/{selectedPage}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {currentSeo?.meta_description || 'Page description will appear here...'}
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    backgroundColor: saving ? '#9CA3AF' : '#01333C',
                    color: '#ffffff',
                    padding: '10px 24px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: saving ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (!saving) e.currentTarget.style.backgroundColor = '#02505C';
                  }}
                  onMouseLeave={(e) => {
                    if (!saving) e.currentTarget.style.backgroundColor = '#01333C';
                  }}
                >
                  {saving ? 'Saving...' : 'Save SEO Settings'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
