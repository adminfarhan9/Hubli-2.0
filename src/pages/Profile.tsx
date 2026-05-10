import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Package, Edit2, Check, X } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function Profile() {
  const { user, profile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Profile</h1>
        <p className="text-gray-500 mb-6">Please log in to view your profile.</p>
      </div>
    );
  }

  const handleEditClick = () => {
    setDisplayName(profile?.displayName || '');
    setPhoneNumber(profile?.phoneNumber || '');
    setError('');
    setIsEditing(true);
  };

  const handleSave = async () => {
    setError('');
    const newPhoneNumber = phoneNumber.trim();
    if (newPhoneNumber && !/^[0-9]{11}$/.test(newPhoneNumber)) {
      setError('Phone number must be exactly 11 digits.');
      return;
    }
    
    setLoading(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName: displayName.trim(),
        phoneNumber: newPhoneNumber,
        updatedAt: Date.now()
      });
      setIsEditing(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">My Account</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
            {error}
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 text-3xl font-bold shrink-0">
            {profile?.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
          </div>
          
          <div className="text-center sm:text-left flex-grow w-full">
            {isEditing ? (
              <div className="space-y-4 max-w-md mx-auto sm:mx-0">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Name</label>
                  <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Phone Number (11 digits)</label>
                  <input 
                    type="text" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                    placeholder="e.g. 01234567890"
                    maxLength={11}
                  />
                </div>
                <div className="flex items-center gap-3 pt-2 justify-center sm:justify-start">
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900">{profile?.displayName || 'User'}</h2>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-center justify-center sm:justify-start mt-1">
                  {user.email && <p className="text-gray-500">{user.email}</p>}
                  {user.isAnonymous && <p className="text-gray-500 italic">Guest Session</p>}
                  {profile?.phoneNumber && (
                    <>
                      <span className="hidden sm:inline text-gray-300">•</span>
                      <p className="text-gray-500">{profile.phoneNumber}</p>
                    </>
                  )}
                </div>
                <div className="mt-4 inline-flex items-center gap-4">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-700 capitalize">
                    Role: {profile?.role || 'Customer'}
                  </div>
                  <button
                    onClick={handleEditClick}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-full transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>
          
          {!isEditing && (
            <div className="shrink-0 mt-4 sm:mt-0">
              <button 
                onClick={logout}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors w-full sm:w-auto"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-center p-12">
        <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">No active orders</h3>
        <p className="text-gray-500">Your recent orders will appear here.</p>
      </div>
    </div>
  );
}
