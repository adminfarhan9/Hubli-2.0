import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Package } from 'lucide-react';

export default function Profile() {
  const { user, profile, logout } = useAuth();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Profile</h1>
        <p className="text-gray-500 mb-6">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">My Account</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 text-3xl font-bold">
          {profile?.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
        </div>
        <div className="text-center sm:text-left flex-grow">
          <h2 className="text-2xl font-bold text-gray-900">{profile?.displayName || 'User'}</h2>
          <p className="text-gray-500">{user.email}</p>
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-700 capitalize">
            Role: {profile?.role || 'Customer'}
          </div>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-center p-12">
        <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">No active orders</h3>
        <p className="text-gray-500">Your recent orders will appear here.</p>
      </div>
    </div>
  );
}
