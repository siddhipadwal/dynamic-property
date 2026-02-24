"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddPartner() {
  const [formData, setFormData] = useState({ name: '', logo: '/assets/images/brands/brand1.png' });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [partners, setPartners] = useState([]);
  const [partnersLoading, setPartnersLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [showMyBrands, setShowMyBrands] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) router.push('/admin/login');
  }, [router]);

  useEffect(() => { fetchPartners(); }, []);

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/partners');
      const data = await response.json();
      if (response.ok) setPartners(data.partners);
    } catch (err) { console.error('Error fetching partners:', err); }
    finally { setPartnersLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this partner?')) return;
    setDeleting(id);
    try {
      const response = await fetch(`/api/partners?id=${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (response.ok) setPartners(partners.filter(p => p.id !== id));
      else alert(data.error || 'Failed to delete partner');
    } catch (err) { alert('An error occurred. Please try again.'); }
    finally { setDeleting(null); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      const response = await fetch('/api/upload', { method: 'POST', body: formDataUpload });
      const data = await response.json();
      if (response.ok) setFormData(prev => ({ ...prev, logo: data.url }));
      else setError(data.error || 'Failed to upload image');
    } catch (err) { setError('Failed to upload image. Please try again.'); }
    finally { setUploading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/partners', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await response.json();
      if (response.ok) router.push('/admin/dashboard');
      else setError(data.error || 'Failed to create partner');
    } catch (err) { setError('An error occurred. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Mobile Responsive */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <h1 className="text-xl sm:text-2xl font-bold font-lora" style={{ color: '#02333B' }}>Add New Partner</h1>

            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <button onClick={() => setShowMyBrands(!showMyBrands)} className="px-4 py-2 text-white rounded-md hover:opacity-90 transition" style={{ background: '#02333B' }}>
                {showMyBrands ? 'Hide My Brands' : 'My Brands'}
              </button>
              <Link href="/admin/dashboard" className="text-gray-600 hover:opacity-70" style={{ color: '#B39359' }}>Back to Dashboard</Link>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition absolute right-3 top-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: '#02333B' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-4 pb-4 border-t pt-4 flex flex-col gap-3">
              <button onClick={() => { setShowMyBrands(!showMyBrands); setMobileMenuOpen(false); }} className="px-4 py-2 text-white rounded-md text-center" style={{ background: '#02333B' }}>
                {showMyBrands ? 'Hide My Brands' : 'My Brands'}
              </button>
              <Link href="/admin/dashboard" className="px-4 py-2 text-center rounded-md" style={{ background: 'rgba(179, 147, 89, 0.1)', color: '#B39359' }}>Back to Dashboard</Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="bg-white rounded-lg sm:rounded-xl shadow p-4 sm:p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>Partner Name *</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}
                className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition" style={{ '--tw-ring-color': '#B39359' }}
                placeholder="e.g., Lodha" required />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>Partner Logo</label>
              <div className="mb-2">
                <input type="file" id="logoFile" accept="image/*" onChange={handleFileChange} className="hidden" />
                <label htmlFor="logoFile" className="inline-flex items-center px-4 py-2 text-white rounded-md cursor-pointer hover:opacity-90 transition" style={{ background: '#B39359' }}>
                  {uploading ? 'Uploading...' : 'Upload Logo'}
                </label>
              </div>

              {formData.logo && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 mb-1">Preview:</p>
                  <img src={formData.logo} alt="Partner logo preview" className="w-32 sm:w-48 h-24 sm:h-32 object-contain rounded-md border" />
                  <p className="text-xs text-gray-500 mt-1">Path: {formData.logo}</p>
                </div>
              )}

              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Or choose a default logo:</p>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <button key={num} type="button" onClick={() => setFormData(prev => ({ ...prev, logo: `/assets/images/brands/brand${num}.png` }))}
                      className={`p-1 sm:p-2 border-2 rounded-md hover:transition ${formData.logo === `/assets/images/brands/brand${num}.png` ? 'border-[#B39359]' : 'border-gray-200'}`}
                      style={{ borderColor: formData.logo === `/assets/images/brands/brand${num}.png` ? '#B39359' : '' }}>
                      <img src={`/assets/images/brands/brand${num}.png`} alt={`Brand ${num}`} className="w-full h-10 sm:h-12 object-contain" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button type="submit" disabled={loading || uploading}
                className="flex-1 text-white py-2 sm:py-3 px-4 rounded-md hover:opacity-90 transition disabled:opacity-50 font-medium" style={{ background: '#02333B' }}>
                {loading ? 'Creating...' : 'Create Partner'}
              </button>
              <Link href="/admin/dashboard" className="flex-1 bg-gray-500 text-white py-2 sm:py-3 px-4 rounded-md hover:bg-gray-600 transition text-center font-medium">
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* My Brands Section */}
        {showMyBrands && (
          <div className="mt-6 sm:mt-8 bg-white rounded-lg sm:rounded-xl shadow p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold font-lora mb-4" style={{ color: '#02333B' }}>My Brands</h2>
            {partnersLoading ? (
              <p className="text-gray-500">Loading brands...</p>
            ) : partners.length === 0 ? (
              <p className="text-gray-500 text-sm">No brands added yet. Add your first brand using the form above.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {partners.map((partner) => (
                  <div key={partner.id} className="border border-gray-200 rounded-lg p-4 flex flex-col items-center">
                    <img src={partner.logo} alt={partner.name} className="w-28 sm:w-32 h-16 sm:h-20 object-contain mb-3" />
                    <h3 className="text-base sm:text-lg font-semibold mb-3" style={{ color: '#02333B' }}>{partner.name}</h3>
                    <button onClick={() => handleDelete(partner.id)} disabled={deleting === partner.id}
                      className="px-4 py-2 text-white rounded-md hover:opacity-90 transition disabled:opacity-50" style={{ background: '#DC2626' }}>
                      {deleting === partner.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
