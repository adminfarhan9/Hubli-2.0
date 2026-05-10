import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Settings, Image as ImageIcon, Users, Package, Tag, Images } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc, setDoc, collection, onSnapshot, query, orderBy, deleteDoc } from 'firebase/firestore';

export default function AdminPanel() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('settings');
  const [settings, setLocalSettings] = useState({ 
    cloudinaryCloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dxyz123', 
    cloudinaryUploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'hubli_preset',
    cloudinaryApiKey: '',
    cloudinaryApiSecret: ''
  });
  const [savingConfig, setSavingConfig] = useState(false);
  
  const [assets, setAssets] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (profile?.role !== 'admin') return;

    // Fetch Settings
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'global');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setLocalSettings({
            cloudinaryCloudName: data.cloudinaryCloudName || import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dxyz123',
            cloudinaryUploadPreset: data.cloudinaryUploadPreset || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'hubli_preset',
            cloudinaryApiKey: data.cloudinaryApiKey || '',
            cloudinaryApiSecret: data.cloudinaryApiSecret || ''
          });
        }
      } catch (err) {
        console.error("Failed to load settings", err);
      }
    };
    fetchSettings();

    // Fetch Assets
    const q = query(collection(db, 'assets'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAssets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'assets');
    });

    return () => unsubscribe();
  }, [profile]);

  const handleUpdateSettings = async () => {
    setSavingConfig(true);
    try {
      await setDoc(doc(db, 'settings', 'global'), {
        ...settings,
        updatedAt: Date.now()
      }, { merge: true });
      alert("Settings updated!");
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'settings/global');
    } finally {
      setSavingConfig(false);
    }
  };

  const handleResyncAssets = async () => {
    const { cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret } = settings;
    
    if (!cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
      alert("Please update settings with Cloud Name, API Key, and API Secret to resync existing assets.");
      return;
    }

    setSyncing(true);
    try {
      const auth = btoa(`${cloudinaryApiKey}:${cloudinaryApiSecret}`);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/resources/image?max_results=100`, {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      });
      
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      let syncedCount = 0;
      for (const item of data.resources) {
        const existing = assets.find(a => a.publicId === item.public_id);
        if (!existing) {
          const newDocRef = doc(collection(db, 'assets'));
          await setDoc(newDocRef, {
            url: item.secure_url,
            publicId: item.public_id,
            format: item.format,
            createdAt: new Date(item.created_at).getTime()
          });
          syncedCount++;
        }
      }
      alert(`Sync complete! ${syncedCount} new assets added to Firestore.`);
    } catch (err: any) {
      console.error(err);
      alert(`Sync failed: ${err.message || 'Check credentials or CORS settings.'}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudName = settings.cloudinaryCloudName || (import.meta as any).env.VITE_CLOUDINARY_CLOUD_NAME || 'dxyz123';
    const uploadPreset = settings.cloudinaryUploadPreset || (import.meta as any).env.VITE_CLOUDINARY_UPLOAD_PRESET || 'hubli_preset';

    if (!cloudName || !uploadPreset) {
      alert("Please configure Cloudinary credentials first.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);

      // Sync to Firestore
      const newDocRef = doc(collection(db, 'assets'));
      await setDoc(newDocRef, {
        url: data.secure_url,
        publicId: data.public_id,
        format: data.format,
        createdAt: Date.now()
      });
    } catch (err) {
      console.error(err);
      alert("File upload or sync failed.");
    } finally {
      setUploading(false);
    }
  };

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
            <button onClick={() => setActiveTab('uploaded_assets')} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'uploaded_assets' ? 'bg-brand-50 text-brand-600' : 'text-gray-600 hover:bg-gray-50'}`}><Images className="w-4 h-4"/> Uploaded Pictures</button>
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
                  <input 
                    type="text" 
                    value={settings.cloudinaryCloudName} 
                    onChange={e => setLocalSettings(s => ({...s, cloudinaryCloudName: e.target.value}))}
                    placeholder="e.g. dxyz123" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" 
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Preset (Unsigned)</label>
                  <input 
                    type="text" 
                    value={settings.cloudinaryUploadPreset} 
                    onChange={e => setLocalSettings(s => ({...s, cloudinaryUploadPreset: e.target.value}))}
                    placeholder="e.g. hubli_preset" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" 
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Key (Required for Resync)</label>
                  <input 
                    type="text" 
                    value={settings.cloudinaryApiKey} 
                    onChange={e => setLocalSettings(s => ({...s, cloudinaryApiKey: e.target.value}))}
                    placeholder="API Key" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" 
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">API Secret (Required for Resync)</label>
                  <input 
                    type="password" 
                    value={settings.cloudinaryApiSecret} 
                    onChange={e => setLocalSettings(s => ({...s, cloudinaryApiSecret: e.target.value}))}
                    placeholder="API Secret" 
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:outline-none" 
                  />
               </div>
               <button 
                onClick={handleUpdateSettings} 
                disabled={savingConfig}
                className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
               >
                 {savingConfig ? "Saving..." : "Update Credentials"}
               </button>
            </div>
            
            <hr className="border-gray-100 my-8"/>
            
            <h3 className="text-lg font-bold tracking-tight mb-4">Upload New Asset</h3>
            <label className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer block">
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload} 
                disabled={uploading} 
              />
              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 font-medium">
                {uploading ? "Uploading, please wait..." : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG up to 5MB</p>
            </label>
          </div>
        )}

        {activeTab === 'uploaded_assets' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold tracking-tight">Uploaded Pictures</h3>
              <div className="flex gap-4 items-center">
                <span className="text-sm text-gray-500">{assets.length} items</span>
                <button 
                  onClick={handleResyncAssets}
                  disabled={syncing}
                  className="bg-brand-50 text-brand-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-100 transition-colors disabled:opacity-50"
                >
                  {syncing ? "Syncing..." : "Resync from Cloudinary"}
                </button>
              </div>
            </div>
            {assets.length === 0 ? (
              <div className="text-center py-12 text-gray-500 border border-gray-100 rounded-xl bg-gray-50">
                No uploaded pictures found. Use the Images & Assets tab to upload some!
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {assets.map((asset) => (
                  <div key={asset.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
                    <img 
                      src={asset.url} 
                      alt="Uploaded Asset" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <p className="text-white text-xs font-mono break-all px-2 text-center line-clamp-3">
                        {asset.publicId}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
