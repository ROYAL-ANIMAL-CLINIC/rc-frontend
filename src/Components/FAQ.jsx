import React, { useState } from 'react';
import faqImage from '../assets/faq.jpg';

const faqs = [
  { 
    question: "How can I prevent my pet from getting parasites?",
    answer: "Regular use of flea and tick preventatives is highly recommended for outdoor pets. Additionally, we provide regular deworming services and can offer guidance on parasite control." 
  },
  {
    question: "What vaccinations does my pet need?", 
    answer: "Vaccination requirements vary depending on the type of pet and their age. We offer all standard vaccinations for dogs and cats, including rabies, distemper, parvovirus, and more." 
  },
  {
     question: "What should I bring to my first visit?", 
     answer: "Please bring your pet's medical history, any medications they may be taking, and a list of your concerns." 
  },
  {
     question: "Do you offer emergency services?", 
     answer: "Yes, we offer emergency services during clinic hours. For after-hours emergencies, we provide contact info for the nearest 24/7 hospital." 
  },
  {
     question: "How often should I bring my pet for check-ups?", 
     answer: "We recommend annual check-ups for healthy adult pets, and bi-annual visits for senior pets (7+ years)." 
  },
  {
     question: "Do you provide grooming services?", 
     answer: "Yes, we offer professional grooming services including bathing, nail trimming, ear cleaning, and full grooming packages." 
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about our clinic and your pet's health. 
            If you have further questions, please reach out to our staff.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Decorative Image Section */}
          <div className="lg:col-span-5 lg:sticky lg:top-12">
            <div className="relative group">
              {/* Decorative Glow Blobs */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              
              <img 
                src={faqImage} 
                className='relative h-[550px] w-full object-cover rounded-3xl shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-500' 
                alt="Clinic FAQ" 
              />
              
              {/* Floating Info Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/40">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Expert Care</p>
                </div>
                <p className="text-slate-800 text-sm font-medium">"Our team is dedicated to providing the highest quality medical care for your furry friends."</p>
              </div>
            </div>
          </div>

          {/* Right: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`overflow-hidden border-b border-slate-100 transition-all duration-300 ${
                  openIndex === index 
                  ? "bg-white border-indigo-200 shadow-lg ring-1 ring-indigo-50" 
                  : "bg-white/60 border-slate-200 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-4 text-left"
                >
                  <span className={`text-lg font-semibold transition-colors duration-300 ${
                    openIndex === index ? "text-indigo-700" : "text-slate-800"
                  }`}>
                    {faq.question}
                  </span>
                  
                  {/* Rotating Plus Icon */}
                  <div className={`relative w-6 h-6 transform transition-transform duration-300 ${openIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                    <div className={`absolute top-1/2 left-0 w-full h-0.5 transform -translate-y-1/2 transition-colors ${openIndex === index ? 'bg-indigo-500' : 'bg-slate-400'}`}></div>
                    <div className={`absolute top-0 left-1/2 h-full w-0.5 transform -translate-x-1/2 transition-colors ${openIndex === index ? 'bg-indigo-500' : 'bg-slate-400'}`}></div>
                  </div>
                </button>
                
                {/* Smooth Expandable Content */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-8 text-slate-600 leading-relaxed text-base">
                      <div className="h-px w-full bg-slate-100 mb-6"></div>
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default FAQ;