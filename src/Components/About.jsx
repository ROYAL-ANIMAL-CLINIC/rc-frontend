import React from "react";
import AboutImage from "../assets/about.png";

// Simple SVG Icons for the values
const HeartIcon = () => (
  <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
);
const ShieldIcon = () => (
  <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
);

function About() {
  return (
    <section className="relative w-full py-20 px-4 bg-slate-50 overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Side with Decorative Frame */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img
                src={AboutImage}
                alt="Our Veterinary Team"
                className="w-full h-[500px] object-cover"
              />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
              <p className="text-4xl font-bold text-indigo-600 mb-0">15+</p>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-tight">Years of Excellence</p>
            </div>

            {/* Behind-the-image decorative border */}
            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-indigo-100 rounded-3xl -z-0 hidden lg:block" />
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
                Our Story
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Compassionate Care for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">Every Family Member</span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-slate-600 leading-relaxed">
                At our clinic, we believe pets are more than just animals—they're family. 
                Our clinic is founded on the principles of trust and empathy, ensuring your pets 
                receive the best possible treatment in a safe environment.
              </p>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4 p-4 rounded-xl bg-white shadow-sm border border-slate-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-rose-50 rounded-lg flex items-center justify-center">
                    <HeartIcon />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Empathy First</h4>
                    <p className="text-sm text-slate-500 leading-snug">We treat every pet as if they were our own.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-white shadow-sm border border-slate-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <ShieldIcon />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Trusted Experts</h4>
                    <p className="text-sm text-slate-500 leading-snug">Top-notch medical care you can rely on.</p>
                  </div>
                </div>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed">
                Our mission is to support the health of animals in our community. We don't just provide 
                medical care; we provide guidance to help your pets live their happiest, healthiest lives.
              </p>
            </div>

           
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default About;