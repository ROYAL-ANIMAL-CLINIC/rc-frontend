import React from 'react';
import ShopBottomBanner from '../assets/shop-bottom-bg.png';

const features = [
  {
    title: 'Fastest Delivery',
    description: 'Fastest island-wide delivery straight to your doorstep.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'text-yellow-400',
  },
  {
    title: 'Premium Quality',
    description: 'Top-tier products sourced directly from trusted manufacturers.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-1.947 3.42 3.42 0 014.438 0c.901.901 2.154 1.254 3.303 1.103a3.42 3.42 0 013.346 3.346c-.151 1.149.202 2.402 1.103 3.303a3.42 3.42 0 010 4.438c-.901.901-1.254 2.154-1.103 3.303a3.42 3.42 0 01-3.346 3.346c-1.149-.151-2.402.202-3.303 1.103a3.42 3.42 0 01-4.438 0c-.901-.901-2.154-1.254-3.303-1.103a3.42 3.42 0 01-3.346-3.346c.151-1.149-.202-2.402-1.103-3.303a3.42 3.42 0 010-4.438c.901-.901 1.254-2.154 1.103-3.303a3.42 3.42 0 013.346-3.346c1.149.151 2.402-.202 3.303-1.103z" />
      </svg>
    ),
    color: 'text-emerald-400',
  },
  {
    title: 'Affordable Prices',
    description: 'High-quality essentials at unbeatable, competitive prices.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-blue-400',
  },
  {
    title: 'Trusted by Thousands',
    description: 'Join over 10,000+ happy pet parents across the nation.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-rose-400',
  },
];

function BottomshopBanner() {
  return (
    <section className="mt-24 bg-slate-900 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch">
        
        {/* Left: Image with Overlay */}
        <div className="lg:w-1/2 relative min-h-[400px]">
          <img
            src={ShopBottomBanner}
            alt="Shop collection"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          {/* Subtle gradient overlay to blend into the text side */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900 hidden lg:block"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900 lg:hidden"></div>
        </div>

        {/* Right: Content Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center py-16 px-8 lg:px-20 xl:px-28 relative z-10">
          <div className="max-w-xl">
           
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-10 leading-tight">
              Why We Are The Best <br className="hidden md:block"/> Choice For Your Pets
            </h1>

            <div className="grid gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-5 group"
                >
                  {/* Icon Container */}
                  <div className={`flex-shrink-0 p-3 rounded-xl bg-slate-800 border border-slate-700 transition-transform duration-300 group-hover:scale-110 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

   
          </div>
        </div>
      </div>
    </section>
  );
}

export default BottomshopBanner;