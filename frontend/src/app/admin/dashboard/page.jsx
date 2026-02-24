"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enquiries, setEnquiries] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showEnquiries, setShowEnquiries] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      router.push('/admin/login');
      return;
    }
    fetchProperties();
    fetchEnquiries();
  }, [router]);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties', {
        cache: 'no-store'
      });
      const data = await response.json();
      if (response.ok) {
        setProperties(data.properties);
      } else {
        setError('Failed to fetch properties');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchEnquiries = async () => {
    setEnquiryLoading(true);
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      if (response.ok) {
        setEnquiries(data.enquiries || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    } finally {
      setEnquiryLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setEnquiries(enquiries.map(e => e.id === id ? { ...e, is_read: true } : e));
        setUnreadCount(Math.max(0, unreadCount - 1));
      }
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    
    try {
      const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
      const response = await fetch(`/api/properties/${numericId}`, { 
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Remove property from local state
        setProperties(properties.filter(p => p.id !== numericId && String(p.id) !== String(id)));
        alert('Property deleted successfully!');
      } else {
        // Even if API says not found, remove from UI if already deleted
        if (data.message && data.message.includes('already')) {
          setProperties(properties.filter(p => p.id !== numericId && String(p.id) !== String(id)));
          alert('Property removed from list.');
        } else {
          alert('Error: ' + (data.error || 'Failed to delete'));
        }
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('An error occurred: ' + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 mx-auto mb-4" style={{ borderColor: '#B39359' }}></div>
          <p className="text-lg" style={{ color: '#02333B' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header - Mobile Responsive */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <div className="flex items-center gap-4">
              <img
                src="/assets/images/img/logo-main.png"
                alt="Company Logo"
                className="h-14 sm:h-16 w-auto rounded-xl shadow-sm"
              />

              <h1
                className="text-lg sm:text-xl font-semibold font-lora"
                style={{ color: '#02333B' }}
              >
                Admin Dashboard
              </h1>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition absolute right-3 top-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: '#02333B' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex flex-wrap items-center gap-2 lg:gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowEnquiries(!showEnquiries)}
                  className="relative p-2 hover:bg-gray-100 transition rounded-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: '#02333B' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {showEnquiries && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-96 bg-white rounded-lg shadow-xl z-50 max-h-[500px] overflow-hidden">
                    <div className="px-4 py-3 border-b flex justify-between items-center" style={{ background: 'linear-gradient(135deg, #B39359 0%, #8B6914 100%)' }}>
                      <h3 className="font-semibold text-white font-lora">New Enquiries</h3>
                      {unreadCount > 0 && (
                        <span className="bg-white text-[#B39359] text-xs px-2 py-1 rounded-full font-medium">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="overflow-y-auto max-h-80">
                      {enquiryLoading ? (
                        <div className="p-4 text-center text-gray-500">Loading...</div>
                      ) : unreadCount === 0 ? (
                        <div className="p-6 text-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-green-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-gray-500 text-sm">All caught up!</p>
                        </div>
                      ) : (
                        enquiries.filter(e => !e.is_read).slice(0, 10).map((enquiry) => (
                          <div
                            key={enquiry.id}
                            className="px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
                            style={{ background: 'rgba(179, 147, 89, 0.05)' }}
                            onClick={() => { setSelectedEnquiry(enquiry); setShowEnquiryModal(true); markAsRead(enquiry.id); }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #B39359 0%, #8B6914 100%)' }}>
                                {enquiry.name ? enquiry.name.charAt(0).toUpperCase() : '?'}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-gray-900 truncate">{enquiry.name || 'Unknown'}</p>
                                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#B39359' }}></span>
                                </div>
                                <p className="text-sm text-gray-600 truncate">{enquiry.email}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {new Date(enquiry.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {enquiries.length > 0 && (
                      <div className="px-4 py-3 border-t bg-gray-50">
                        <Link href="/admin/enquiries" className="block text-center text-sm font-medium py-2 hover:opacity-80 transition" style={{ color: '#B39359' }} onClick={() => setShowEnquiries(false)}>
                          View All ({enquiries.length})
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Link href="/admin/seo" className="px-3 lg:px-4 py-2 text-white rounded-md hover:opacity-90 transition text-sm font-medium" style={{ background: '#02333B' }}>SEO</Link>
              <Link href="/admin/partners/add" className="px-3 lg:px-4 py-2 text-white rounded-md hover:opacity-90 transition text-sm font-medium" style={{ background: '#B39359' }}>+ Partners</Link>
              <Link href="/admin/properties/add" className="px-3 lg:px-4 py-2 text-white rounded-md hover:opacity-90 transition text-sm font-medium" style={{ background: '#02333B' }}>+ Property</Link>
              <button onClick={handleLogout} className="px-3 lg:px-4 py-2 text-white rounded-md hover:opacity-90 transition text-sm font-medium" style={{ background: '#DC2626' }}>Logout</button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <button onClick={() => setShowEnquiries(!showEnquiries)} className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded-lg transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" style={{ color: '#02333B' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span style={{ color: '#02333B' }}>Enquiries</span>
                    {unreadCount > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>}
                  </button>
                  {showEnquiries && (
                    <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50 max-h-64 overflow-hidden">
                      <div className="overflow-y-auto max-h-48">
                        {unreadCount === 0 ? (
                          <div className="p-4 text-center text-gray-500">No new enquiries</div>
                        ) : (
                          enquiries.filter(e => !e.is_read).slice(0, 5).map((enquiry) => (
                            <div key={enquiry.id} className="px-4 py-2 border-b hover:bg-gray-50" onClick={() => { setSelectedEnquiry(enquiry); setShowEnquiryModal(true); markAsRead(enquiry.id); }}>
                              <p className="font-medium text-sm">{enquiry.name || 'Unknown'}</p>
                              <p className="text-xs text-gray-500">{enquiry.email}</p>
                            </div>
                          ))
                        )}
                      </div>
                      <Link href="/admin/enquiries" className="block text-center py-2 text-sm font-medium border-t" style={{ color: '#B39359' }} onClick={() => { setShowEnquiries(false); setMobileMenuOpen(false); }}>View All</Link>
                    </div>
                  )}
                </div>
                <Link href="/admin/seo" className="px-4 py-2 text-white rounded-md text-center text-sm font-medium" style={{ background: '#02333B' }} onClick={() => setMobileMenuOpen(false)}>SEO Settings</Link>
                <Link href="/admin/partners/add" className="px-4 py-2 text-white rounded-md text-center text-sm font-medium" style={{ background: '#B39359' }} onClick={() => setMobileMenuOpen(false)}>+ Add Partners</Link>
                <Link href="/admin/properties/add" className="px-4 py-2 text-white rounded-md text-center text-sm font-medium" style={{ background: '#02333B' }} onClick={() => setMobileMenuOpen(false)}>+ Add Property</Link>
                <button onClick={handleLogout} className="px-4 py-2 text-white rounded-md text-center text-sm font-medium" style={{ background: '#DC2626' }}>Logout</button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500">Total Properties</h3>
            <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2" style={{ color: '#02333B' }}>{properties.length}</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500">Under Construction</h3>
            <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2" style={{ color: '#F97316' }}>{properties.filter(p => p.status === 'Under Construction').length}</p>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow hover:shadow-md transition">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500">Ready to Move</h3>
            <p className="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2" style={{ color: '#22C55E' }}>{properties.filter(p => p.status === 'Ready to Move').length}</p>
          </div>
          <Link href="/admin/enquiries" className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow hover:shadow-md transition block">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-500">Total Enquiries</h3>
            <div className="flex items-center justify-between mt-1 sm:mt-2">
              <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#B39359' }}>{enquiries.length}</p>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: '#B39359' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
        )}

        {/* Properties Table - Mobile Responsive */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b">
            <h2 className="text-lg sm:text-xl font-semibold font-lora" style={{ color: '#02333B' }}>All Properties</h2>
          </div>

          {properties.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No properties found. Click Add Property to create one.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Location</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Price/sqft</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <img src={property.image} alt={property.name} className="h-12 w-16 sm:h-16 sm:w-24 object-cover rounded" />
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{property.name}</div>
                        <div className="text-xs sm:text-sm text-gray-500">{property.category}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell">{property.location}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden lg:table-cell">₹{property.pricePerSqFt.toLocaleString()}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${property.status === 'Under Construction' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                          {property.status === 'Under Construction' ? 'Construction' : 'Ready'}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                        <Link href={`/admin/properties/edit/${property.id}`} className="hover:opacity-70 mr-2 sm:mr-4 inline-block" style={{ color: '#B39359' }}>Edit</Link>
                        <Link href={`/properties/${property.id}`} className="hover:opacity-70 mr-2 sm:mr-4 inline-block" style={{ color: '#22C55E' }}>View</Link>
                        <button onClick={() => handleDelete(property.id)} className="hover:opacity-70 inline-block" style={{ color: '#DC2626' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Enquiry Detail Modal - Mobile Responsive */}
      {showEnquiryModal && selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4" onClick={() => setShowEnquiryModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b flex justify-between items-center" style={{ background: 'linear-gradient(135deg, #B39359 0%, #8B6914 100%)' }}>
              <div>
                <h3 className="text-lg font-bold text-white font-lora">Enquiry Details</h3>
                <p className="text-white/80 text-xs">{new Date(selectedEnquiry.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <button onClick={() => setShowEnquiryModal(false)} className="p-1 hover:bg-white/20 rounded-lg transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto max-h-[60vh]">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, #B39359 0%, #8B6914 100%)' }}>
                  {selectedEnquiry.name ? selectedEnquiry.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 font-lora">{selectedEnquiry.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-500">Contact Form Enquiry</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-xs font-medium text-gray-500 uppercase">Email</label>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-sm block mt-1 hover:opacity-70" style={{ color: '#B39359' }}>{selectedEnquiry.email}</a>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <label className="text-xs font-medium text-gray-500 uppercase">Phone</label>
                  {selectedEnquiry.phone ? (
                    <a href={`tel:${selectedEnquiry.phone}`} className="text-sm block mt-1 hover:opacity-70" style={{ color: '#B39359' }}>{selectedEnquiry.phone}</a>
                  ) : (
                    <p className="text-gray-400 text-sm mt-1">Not provided</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase block mb-2">Message</label>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap text-sm">{selectedEnquiry.message}</p>
                </div>
              </div>
            </div>
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-gray-50 flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 rounded-b-2xl">
              <a href={`mailto:${selectedEnquiry.email}?subject=Re: Your Enquiry&body=Dear ${selectedEnquiry.name},%0D%0A%0D%0A`} className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition text-sm font-medium text-center" style={{ background: '#B39359' }}>Reply via Email</a>
              <button onClick={() => setShowEnquiryModal(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-medium">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
