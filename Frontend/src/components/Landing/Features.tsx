import React from 'react';
import { Clock, ShieldCheck, Eye, BarChart3 } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="rounded-lg w-12 h-12 flex items-center justify-center bg-blue-900/30 text-blue-400 mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Clock,
      title: 'Expiration Control',
      description: 'Set precise expiration dates and times for your shared links.'
    },
    {
      icon: ShieldCheck,
      title: 'Password Protection',
      description: 'Add an extra layer of security with password-protected links.'
    },
    {
      icon: Eye,
      title: 'View Limitations',
      description: 'Restrict the number of times your link can be accessed.'
    },
    {
      icon: BarChart3,
      title: 'Access Analytics',
      description: 'Track detailed access statistics for every shared link.'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;