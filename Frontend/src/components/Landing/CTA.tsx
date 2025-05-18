import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <div className="flex flex-col md:flex-row items-center text-center md:text-left">
            <div className="flex-1 mb-6 md:mb-0 md:mr-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900/30 rounded-full text-blue-400 mb-6">
                <Shield size={32} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to secure your files?
              </h2>
              <p className="text-gray-400">
                Start sharing files securely with LinkShield today.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-3 rounded-lg text-lg font-medium transition-all inline-flex items-center group">
                <a href="#feature">Get Started</a>
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;