import React from 'react';

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
           {/* Windmill SVG abstract */}
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 12 C12 6, 18 6, 18 12 M12 12 C18 12, 18 18, 12 18 M12 12 C12 18, 6 18, 6 12 M12 12 C6 12, 6 6, 12 6"/>
            </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-4">About Hubli</h1>
        <p className="text-lg text-gray-600">Bringing quality groceries to your doorstep efficiently and affordably.</p>
      </div>

      <div className="prose prose-brand max-w-none text-gray-700">
        <p>
          Hubli started with a simple idea: everyone deserves access to fresh, high-quality groceries without the hassle of long queues or overpriced local stores.
        </p>
        <p>
          Our windmill logo represents the constant, fresh breeze of quality and the continuous cycle of sourcing the best seasonal produce for our community. We partner directly with trusted suppliers, ensuring you get the best while they get a fair price.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 text-center">
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-900 mb-2">Quality</h3>
            <p className="text-sm">Rigorous quality checks before anything reaches your door.</p>
          </div>
          <div className="p-6 bg-brand-500 text-white rounded-2xl shadow-md">
            <h3 className="font-bold text-xl mb-2">Efficiency</h3>
            <p className="text-sm opacity-90">Optimized routing for our delivery heroes.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl text-gray-900 mb-2">Value</h3>
            <p className="text-sm">Reasonable pricing by connecting you straight to the source.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
