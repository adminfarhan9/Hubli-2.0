import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="px-4 md:px-8 py-8 grid grid-cols-1 md:grid-cols-12 gap-6 h-full pb-8">
      
      {/* Sidebar: Departments */}
      <aside className="col-span-1 border-r border-transparent md:col-span-2 py-4">
        <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Departments</h2>
        <nav className="space-y-1">
          <Link to="/" className="block py-2 px-3 bg-green-50 text-green-700 rounded-lg font-semibold text-sm border-l-4 border-green-600">Fresh Produce</Link>
          <Link to="/" className="block py-2 px-3 text-slate-600 hover:bg-slate-50 rounded-lg text-sm transition-colors">Dairy & Eggs</Link>
          <Link to="/" className="block py-2 px-3 text-slate-600 hover:bg-slate-50 rounded-lg text-sm transition-colors">Bakery</Link>
          <Link to="/" className="block py-2 px-3 text-slate-600 hover:bg-slate-50 rounded-lg text-sm transition-colors">Meat & Seafood</Link>
          <Link to="/" className="block py-2 px-3 text-slate-600 hover:bg-slate-50 rounded-lg text-sm transition-colors">Pantry Essentials</Link>
        </nav>
      </aside>

      {/* Center: Hero & Featured */}
      <div className="col-span-1 md:col-span-10 flex flex-col space-y-8">
        
        {/* Seasonal Offer Banner */}
        <section className="relative h-64 bg-green-600 rounded-[2rem] overflow-hidden flex items-center px-8 md:px-12 shrink-0">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="white">
               <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" />
            </svg>
          </div>
          <div className="relative z-10 max-w-lg">
            <span className="bg-white text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Seasonal Selection</span>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-none mt-4 tracking-tighter">FRESH HARVEST<br/>FALL SALE.</h2>
            <p className="text-green-100 mt-4 font-medium max-w-md">Up to 40% off locally sourced organic vegetables. Delivered to your doorstep in under 60 minutes.</p>
            <button className="mt-6 px-8 py-3 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors">Shop Now</button>
          </div>
        </section>

        {/* Product List & Featured */}
        <section className="flex-1">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-xl font-black tracking-tight text-slate-900">Featured Items</h3>
            <Link to="/" className="text-xs font-bold text-green-600 border-b-2 border-green-200 uppercase tracking-wide">View all products</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-8">
            {/* Product Card 1 */}
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100">
              <div className="h-28 bg-white rounded-2xl mb-4 flex items-center justify-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3C7.5 3 3.5 6 2 10.5C2.5 15 6 18.5 10.5 20C15 19.5 18.5 16 20 11.5C19.5 7 16.5 3.5 12 3Z"/></svg>
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fresh Farm</p>
              <h4 className="font-bold text-sm mb-1 text-slate-900">Organic Gala Apples</h4>
              <p className="text-xs text-slate-500 mb-4 font-medium">1kg • High quality</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-lg font-black text-slate-900">$3.40</span>
                <button className="p-2 bg-green-600 text-white rounded-xl shadow-lg shadow-green-200 hover:bg-green-700 transition-colors">+</button>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100">
              <div className="h-28 bg-white rounded-2xl mb-4 flex items-center justify-center">
                 <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Daily Dairy</p>
              <h4 className="font-bold text-sm mb-1 text-slate-900">Whole Almond Milk</h4>
              <p className="text-xs text-slate-500 mb-4 font-medium">1L • Lactose Free</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-lg font-black text-slate-900">$4.50</span>
                <button className="p-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-none group-hover:shadow-lg group-hover:shadow-green-200">+</button>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100">
              <div className="h-28 bg-white rounded-2xl mb-4 flex items-center justify-center">
                 <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bakery</p>
              <h4 className="font-bold text-sm mb-1 text-slate-900">Sourdough Loaf</h4>
              <p className="text-xs text-slate-500 mb-4 font-medium">750g • Handcrafted</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-lg font-black text-slate-900">$2.99</span>
                <button className="p-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-none group-hover:shadow-lg group-hover:shadow-green-200">+</button>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex flex-col group transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100">
              <div className="h-28 bg-white rounded-2xl mb-4 flex items-center justify-center">
                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/></svg>
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Imported</p>
              <h4 className="font-bold text-sm mb-1 text-slate-900">Fresh Avocados</h4>
              <p className="text-xs text-slate-500 mb-4 font-medium">2 Pack • Perfectly Ripe</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="text-lg font-black text-slate-900">$5.00</span>
                <button className="p-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-none group-hover:shadow-lg group-hover:shadow-green-200">+</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
