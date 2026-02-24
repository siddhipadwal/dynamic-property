"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin', JSON.stringify(data.admin));
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3 py-6">
      <div className="bg-white p-6 sm:p-8 rounded-lg sm:rounded-xl shadow-md w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold font-lora" style={{ color: '#02333B' }}>Admin Login</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Sign in to manage properties</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition"
              style={{ '--tw-ring-color': '#B39359' }}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-5 sm:mb-6">
            <label htmlFor="password" className="block text-sm font-bold mb-2" style={{ color: '#02333B' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 transition"
              style={{ '--tw-ring-color': '#B39359' }}
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-2 sm:py-3 px-4 rounded-md hover:opacity-90 transition disabled:opacity-50 font-medium"
            style={{ background: '#02333B' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm hover:opacity-70 transition" style={{ color: '#B39359' }}>
            Back to Home
          </Link>
        </div>

        <div className="mt-4 p-3 sm:p-4 rounded text-sm text-gray-600" style={{ background: 'rgba(179, 147, 89, 0.1)' }}>
          <p className="font-semibold" style={{ color: '#02333B' }}>Demo Credentials:</p>
          <p className="mt-1">Username: admin</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
}
