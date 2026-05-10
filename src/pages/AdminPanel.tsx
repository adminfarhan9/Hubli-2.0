import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings, Image as ImageIcon, Users, Package, Tag } from 'lucide-react';

export default function AdminPanel() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('settings');

  if (profile?.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-500">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-bold text-gray-900 tracking-tight">Admin Dashboard</h2>
          </div>
          <nav className="flex flex-col p-2 gap-1">
            <button onClick={() => setActiveTab('settings')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}><Settings className="w-4 h-4"/> Settings</button>
            <button onClick={() => setActiveTab('images')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'images' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}><ImageIcon className="w-4 h-4"/> Images & Assets</button>
            <button onClick={() => setActiveTab('products')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}><Package className="w-4 h-4"/> Products</button>
            <button onClick={() => setActiveTab('offers')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'offers' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}><Tag className="w-4 h-4"/> Offers</button>
            <button onClick={() => setActiveTab('users')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}><Users className="w-4 h-4"/> Users & Roles</button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        {activeTab === 'settings' && (
          <div>
            <h3 className="text-xl font-bold tracking-tight mb-6">Global Settings</h3>
            <div className="space-y-4 max-w-lg">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                  <input type="text" defaultValue="Hubli" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                  <input type="email" defaultValue="support@hubli.com" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
               </div>
               <button className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">Save Settings</button>
            </div>
          </div>
        )}
        
        {activeTab === 'images' && (
          <div>
            <h3 className="text-xl font-bold tracking-tight mb-2">Image Upload Settings</h3>
            <p className="text-sm text-gray-500 mb-6">Configure Cloudinary or other services here.</p>
            <div className="space-y-4 max-w-lg mb-8">
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cloudinary Cloud Name</label>
                  <input type="text" placeholder="e.g. dxyz123" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Preset (Unsigned)</label>
                  <input type="text" placeholder="e.g. hubli_preset" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" />
               </div>
               <button className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">Update Credentials</button>
            </div>
            
            <hr className="border-gray-100 my-8"/>
            
            <h3 className="text-lg font-bold tracking-tight mb-4">Upload New Asset</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG up to 5MB</p>
            </div>
          </div>
        )}
        
        {/* Placeholder for other tabs */}
        {['products', 'offers', 'users'].includes(activeTab) && (
           <div>
              <h3 className="text-xl font-bold tracking-tight mb-6 capitalize">{activeTab} Management</h3>
              <p className="text-gray-500 text-sm">Feature coming soon.</p>
           </div>
        )}
      </div>
    </div>
  );
}
