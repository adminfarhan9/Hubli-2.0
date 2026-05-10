import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Your Cart</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-brand-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't added any fresh groceries to your cart yet.</p>
        <Link to="/" className="inline-flex bg-brand-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-500 transition-colors shadow-sm">
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
