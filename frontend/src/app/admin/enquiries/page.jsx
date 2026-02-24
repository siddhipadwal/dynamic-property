"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      router.push('/admin/login');
      return;
    }
    fetchEnquiries();
  }, [router]);

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      
      if (response.ok) {
        const enquiryList = data.enquiries || [];
        console.log('Enquiries fetched:', enquiryList);
        setEnquiries(enquiryList);
      } else {
        setError(data.error || 'Failed to fetch enquiries');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error loading enquiries');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch('/api/contact', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      setEnquiries(enquiries.map(e => 
        e.id === id ? { ...e, is_read: true } : e
      ));
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleView = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setShowModal(true);
    if (!enquiry.is_read) {
      markAsRead(enquiry.id);
    }
  };

  const unreadCount = enquiries.filter(e => !e.is_read).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 mx-auto mb-4" style={{ borderColor: '#B39359' }}></div>
          <p className="text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/admin/dashboard" className="p-2 rounded-lg hover:bg-gray-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Enquiries</h1>
                <p className="text-xs sm:text-sm text-gray-500">Manage contact form submissions</p>
              </div>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 sm:px-3 py-1 rounded-full font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/api/contact?format=excel"
                target="_blank"
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md text-xs sm:text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="hidden sm:inline">Export</span>
              </a>
              <Link href="/admin/dashboard" className="px-2 sm:px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-xs sm:text-sm">
                <span className="hidden sm:inline">Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 sm:p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs sm:text-sm">Total</p>
                <p className="text-2xl sm:text-4xl font-bold">{enquiries.length}</p>
              </div>
              <div className="bg-white/20 p-2 sm:p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 sm:p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-xs sm:text-sm">Unread</p>
                <p className="text-2xl sm:text-4xl font-bold">{unreadCount}</p>
              </div>
              <div className="bg-white/20 p-2 sm:p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 sm:p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs sm:text-sm">Read</p>
                <p className="text-2xl sm:text-4xl font-bold">{enquiries.length - unreadCount}</p>
              </div>
              <div className="bg-white/20 p-2 sm:p-3 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 sm:px-6 py-3 sm:py-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Enquiries List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">All Enquiries</h2>
          </div>

          {enquiries.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <div className="bg-gray-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">No Enquiries Yet</h3>
              <p className="text-gray-500">Contact form submissions will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {enquiries.map((enquiry, index) => (
                <div 
                  key={enquiry.id} 
                  className={`p-3 sm:p-6 hover:bg-gray-50 transition cursor-pointer ${
                    !enquiry.is_read ? 'bg-blue-50/50' : ''
                  }`}
                  onClick={() => handleView(enquiry)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Avatar */}
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${
                        !enquiry.is_read ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'
                      }`}>
                        {enquiry.name ? enquiry.name.charAt(0).toUpperCase() : '?'}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {enquiry.name || 'Unknown'}
                          </h3>
                          {!enquiry.is_read && (
                            <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full font-medium">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{enquiry.email}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{enquiry.message}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 ml-13 sm:ml-0">
                      <div className="text-left sm:text-right">
                        <p className="text-xs sm:text-sm text-gray-500">
                          {new Date(enquiry.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </p>
                        {enquiry.phone && (
                          <p className="text-xs sm:text-sm text-gray-400">{enquiry.phone}</p>
                        )}
                      </div>
                      <button 
                        className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(enquiry);
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {showModal && selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="px-4 sm:px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Enquiry Details</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  {new Date(selectedEnquiry.created_at).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-200 rounded-lg transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[60vh]">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
                  {selectedEnquiry.name ? selectedEnquiry.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900">{selectedEnquiry.name || 'Unknown'}</h4>
                  <p className="text-sm text-gray-500">{selectedEnquiry.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                  <label className="text-xs font-medium text-gray-500 uppercase">Email</label>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-blue-600 hover:underline block mt-1 text-sm sm:text-base">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                  <label className="text-xs font-medium text-gray-500 uppercase">Phone</label>
                  {selectedEnquiry.phone ? (
                    <a href={`tel:${selectedEnquiry.phone}`} className="text-blue-600 hover:underline block mt-1 text-sm sm:text-base">
                      {selectedEnquiry.phone}
                    </a>
                  ) : (
                    <p className="text-gray-400 mt-1 text-sm sm:text-base">Not provided</p>
                  )}
                </div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase mb-2 block">Message</label>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                  <p className="text-gray-700 whitespace-pre-wrap text-sm sm:text-base">{selectedEnquiry.message}</p>
                </div>
              </div>
            </div>
            
            <div className="px-4 sm:px-6 py-4 border-t bg-gray-50 flex flex-col sm:flex-row justify-end gap-3">
              <a
                href={`mailto:${selectedEnquiry.email}?subject=Re: Your Enquiry&body=Dear ${selectedEnquiry.name},%0D%0A%0D%0A`}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Reply via Email
              </a>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 sm:px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
