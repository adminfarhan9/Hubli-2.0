import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Contacts from './pages/Contacts';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col h-screen w-full bg-white font-sans text-slate-900">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          {/* Bottom Admin Bar Peek */}
          <footer className="h-12 bg-black flex items-center px-4 sm:px-8 justify-between text-white text-[10px] font-bold tracking-widest flex-shrink-0">
            <div className="flex items-center space-x-6">
               <span>HUBLI ADMIN ENGINE V2.0</span>
               <span className="text-green-500 underline hidden sm:inline">CONNECTED TO FIREBASE</span>
            </div>
            <div className="flex items-center space-x-4">
               <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div> SERVER: ACTIVE</div>
               <div className="flex items-center opacity-40"><div className="w-2 h-2 rounded-full bg-slate-500 mr-2"></div> DEV MODE</div>
            </div>
          </footer>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
