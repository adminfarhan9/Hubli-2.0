import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, profile, logout } = useAuth();

  return (
    <>
      <div className="w-full bg-slate-50 border-b border-slate-100 py-2 px-4 sm:px-8 flex justify-between items-center text-[11px] font-medium tracking-wider text-slate-500 uppercase">
        <div className="flex space-x-4 sm:space-x-6">
          <Link to="/contacts" className="hover:text-green-600 transition-colors uppercase">Contact Us</Link>
          <Link to="/about" className="hover:text-green-600 transition-colors uppercase">About Hubli</Link>
          <Link to="/faq" className="hover:text-green-600 transition-colors uppercase">FAQ</Link>
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <Link to="/cart" className="flex items-center hover:text-green-600 transition-colors">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <span>Cart</span>
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="hover:text-green-600 transition-colors uppercase">My Profile</Link>
              <button 
                onClick={logout} 
                className="hover:text-red-600 transition-colors uppercase text-[10px] font-bold border-l border-slate-200 pl-4"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-green-600 transition-colors uppercase">
              Sign In
            </Link>
          )}
        </div>
      </div>

      <header className="px-4 sm:px-8 py-4 flex flex-col sm:flex-row justify-between items-center bg-white gap-4 border-b border-slate-100">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" fillOpacity="0.3"/>
              <path d="M12 4l-4 10h8L12 4z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-slate-900">HUBLI<span className="text-green-600 text-3xl leading-none">.</span></h1>
        </Link>
        
        <div className="flex-1 w-full sm:max-w-md sm:mx-12">
          <div className="relative">
            <input type="text" placeholder="Search organic groceries..." className="w-full bg-slate-100 border-none rounded-full py-2 px-6 text-sm focus:ring-2 focus:ring-green-500 transition-all outline-none text-slate-900" />
            <div className="absolute right-4 top-2 text-slate-400 font-bold italic">/</div>
          </div>
        </div>

        <div className="flex space-x-2">
          {user && profile?.role === 'admin' && (
            <Link to="/admin" className="px-4 py-2 text-xs font-bold rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 uppercase">Admin</Link>
          )}
          {user && profile?.role === 'delivery' && (
             <span className="px-4 py-2 text-xs font-bold rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 uppercase cursor-pointer">Delivery</span>
          )}
          {user && profile?.role === 'supplier' && (
             <span className="px-4 py-2 text-xs font-bold rounded-full border border-slate-200 text-slate-400 hover:bg-slate-50 uppercase cursor-pointer">Supplier</span>
          )}
          {user && profile?.role === 'customer' && (
             <span className="px-4 py-2 text-xs font-bold rounded-full bg-black text-white uppercase">Customer</span>
          )}
        </div>
      </header>
    </>
  );
}
