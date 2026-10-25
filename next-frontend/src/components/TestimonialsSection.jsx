import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/siteData';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-xs font-black uppercase tracking-widest block mb-3">
            Client Outcomes
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tight">
            Trusted by Founders, CEOs & Marketing Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div 
              key={t.id}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed italic mb-8">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <img 
                  src={t.image} 
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <h4 className="font-extrabold text-[#0f172a] text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-500">{t.role}, <span className="text-primary font-semibold">{t.company}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
