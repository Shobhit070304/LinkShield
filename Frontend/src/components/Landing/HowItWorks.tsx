import React from 'react';
import { Upload, Shield, Link as LinkIcon, Send } from 'lucide-react';

const Step = ({ number, icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <Icon size={28} />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
          {number}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 max-w-sm">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Upload,
      title: 'Upload Your File',
      description: 'Drag and drop or select your file. LinkShield supports all file types up to 2GB per file.'
    },
    {
      number: 2,
      icon: Shield,
      title: 'Configure Security',
      description: 'Set expiration dates, access limits, passwords, and other security options to control access.'
    },
    {
      number: 3,
      icon: LinkIcon,
      title: 'Get Secure Link',
      description: 'LinkShield generates a secure, encrypted link with all your chosen security settings applied.'
    },
    {
      number: 4,
      icon: Send,
      title: 'Share & Monitor',
      description: 'Share your link via email, message, or social media, and track all access in real-time.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How LinkShield <span className="text-blue-600">works</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Sharing files securely is as easy as 1-2-3-4. No technical expertise required.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-28 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-200 dark:bg-blue-800 w-[80%] z-0">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-blue-600"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, index) => (
              <Step 
                key={index}
                number={step.number}
                icon={step.icon}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>

        {/* Demo screenshot/animation */}
        <div className="mt-20 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
          <div className="bg-gray-100 dark:bg-gray-700 p-3 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto text-sm text-gray-500 dark:text-gray-400">LinkShield - Secure File Sharing</div>
          </div>
          
          <div className="relative p-6 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 aspect-video flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block mb-6 relative">
                <div className="absolute inset-0 bg-blue-600 blur-xl opacity-20 rounded-full"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-full p-6 shadow-lg">
                  <Shield className="h-20 w-20 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">See LinkShield in action</h3>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center transition-colors">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                </svg>
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;