import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ quote, author, role, company, rating }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={`${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
          {author.split(' ').map(word => word[0]).join('')}
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">{author}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}, {company}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "LinkShield transformed how our team shares sensitive documents with clients. The expiry feature ensures our files don't remain accessible indefinitely.",
      author: "Sarah Johnson",
      role: "Legal Director",
      company: "Foster & Partners",
      rating: 5
    },
    {
      quote: "As a healthcare provider, security is paramount. LinkShield gives us the confidence that patient files are shared securely and with proper access controls.",
      author: "Dr. Michael Chen",
      role: "Chief of Medicine",
      company: "Westlake Medical",
      rating: 5
    },
    {
      quote: "The analytics feature is a game-changer. We now know exactly when and how often our proposals are being viewed by potential clients.",
      author: "Alex Rodriguez",
      role: "Business Development",
      company: "Nova Consulting",
      rating: 4
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by thousands of <span className="text-blue-600">professionals</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            See what our customers are saying about LinkShield's secure sharing capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              rating={testimonial.rating}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Trusted by leading organizations</h3>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            {/* Company logos would go here - using placeholder colored blocks */}
            <div className="h-12 w-32 bg-gray-400 dark:bg-gray-700 rounded-md"></div>
            <div className="h-10 w-36 bg-gray-400 dark:bg-gray-700 rounded-md"></div>
            <div className="h-14 w-28 bg-gray-400 dark:bg-gray-700 rounded-md"></div>
            <div className="h-10 w-40 bg-gray-400 dark:bg-gray-700 rounded-md"></div>
            <div className="h-12 w-32 bg-gray-400 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;