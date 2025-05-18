import React, { useState } from 'react';
import { Check } from 'lucide-react';

const PricingCard = ({ name, price, description, features, isPopular, buttonText, buttonStyle }) => {
  return (
    <div className={`relative bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border ${
      isPopular ? 'border-blue-400 dark:border-blue-500' : 'border-gray-200 dark:border-gray-700'
    }`}>
      {isPopular && (
        <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold text-gray-900 dark:text-white">${price}</span>
        {price > 0 && <span className="text-gray-500 dark:text-gray-400">/month</span>}
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <button className={buttonStyle}>
        {buttonText}
      </button>
    </div>
  );
};

const Pricing = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Essential features for individuals and small projects.",
      features: [
        "Up to 5 active links",
        "100MB file size limit",
        "7-day expiration limit",
        "Basic link analytics",
        "Standard support"
      ],
      buttonText: "Start for Free",
      buttonStyle: "w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium px-4 py-3 rounded-lg transition-colors"
    },
    {
      name: "Pro",
      price: annual ? 12 : 15,
      description: "Advanced security and sharing for professionals.",
      features: [
        "Unlimited active links",
        "1GB file size limit",
        "Custom expiration dates",
        "Password protection",
        "Detailed analytics",
        "Priority support"
      ],
      buttonText: "Get Started",
      buttonStyle: "w-full bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-3 rounded-lg transition-colors shadow-sm hover:shadow",
      isPopular: true
    },
    {
      name: "Business",
      price: annual ? 29 : 35,
      description: "Enterprise-grade security for teams and organizations.",
      features: [
        "Everything in Pro",
        "5GB file size limit",
        "Team management",
        "Custom branding",
        "Advanced security controls",
        "API access",
        "Dedicated support"
      ],
      buttonText: "Contact Sales",
      buttonStyle: "w-full bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium px-4 py-3 rounded-lg transition-colors"
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, transparent <span className="text-blue-600">pricing</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Choose the plan that fits your needs. All plans include core security features.
          </p>

          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                annual 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setAnnual(true)}
            >
              Annual
              <span className="ml-1 text-xs font-normal text-green-600 dark:text-green-400">Save 20%</span>
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !annual 
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard 
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
              buttonText={plan.buttonText}
              buttonStyle={plan.buttonStyle}
            />
          ))}
        </div>

        <div className="mt-16 text-center bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Need a custom solution?</h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Contact our sales team for custom enterprise solutions with dedicated support, advanced security features, and tailored integrations.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors shadow-sm hover:shadow">
            Contact Enterprise Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;