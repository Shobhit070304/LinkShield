import React from 'react';
import { ArrowRight } from 'lucide-react';
import Scene from '../3D/Scene';

const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.1),transparent_50%)]" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-10">
          <div>
            <div className="space-y-6">
              <div className="inline-flex items-center bg-white/5 px-4 py-1.5 rounded-full text-white/80 font-medium text-sm border border-white/10 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse" />
                Secure file sharing reimagined
              </div>
              
              <h1 className="text-6xl font-bold tracking-tight">
                Share with
                <span className="bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent"> confidence</span>
              </h1>
              
              <p className="text-lg text-white/60 max-w-xl">
                Experience the future of secure file sharing. Set expiry dates, control access, and track views with military-grade encryption.
              </p>

              <div className="flex gap-4">
                <button className="group bg-white hover:bg-accent text-black hover:bg-gray-300 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 flex items-center">
                  <a href="#feature">Get Started</a>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 cursor-pointer rounded-lg text-lg font-medium border border-white/10 hover:bg-white/5 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent blur-3xl -z-10" />
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <Scene />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
