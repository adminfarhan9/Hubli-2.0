import React from 'react';

const faqs = [
  { q: "How long does delivery take?", a: "We aim to deliver within 2 hours of your order placement." },
  { q: "Do you offer organic products?", a: "Yes! Look for the 'Organic' badge on our product listings." },
  { q: "What is your return policy?", a: "If you're not satisfied with a fresh product, let us know within 24 hours for a full refund." }
];

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
