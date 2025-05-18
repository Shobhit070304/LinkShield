import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{question}</h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        )}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen 
            ? 'max-h-96 opacity-100 pb-4' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600 dark:text-gray-300">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How secure are the shared links?",
      answer: "LinkShield uses industry-standard 256-bit encryption for all shared links. Files are encrypted both in transit and at rest, and access is controlled through multiple security layers including expiration dates, access limits, and optional password protection."
    },
    {
      question: "Can I revoke access to a shared file?",
      answer: "Yes, you can revoke access to any shared link at any time from your dashboard, even if the link hasn't expired yet. Once revoked, the link will no longer provide access to the file."
    },
    {
      question: "Is there a limit to file sizes?",
      answer: "Free accounts can share files up to 100MB, Pro accounts up to 1GB, and Business accounts up to 5GB per file. For larger file needs, please contact our enterprise sales team."
    },
    {
      question: "How do expiration dates work?",
      answer: "When you create a link, you can set a specific expiration date and time. Once that time is reached, the link is automatically deactivated and anyone trying to access it will receive an expiration notice. Free accounts can set expiration up to 7 days, while paid plans can set custom expirations up to 1 year."
    },
    {
      question: "Can I track who has accessed my files?",
      answer: "Yes, LinkShield provides detailed analytics for each shared link, including information about when the file was accessed, from what location, and on what device. Pro and Business plans provide more detailed analytics, including viewer engagement metrics."
    },
    {
      question: "Do you offer an API for integration?",
      answer: "Yes, Business and Enterprise plans include API access for custom integrations with your existing workflows and software systems. Our developer documentation provides comprehensive guidance for implementation."
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Find answers to common questions about LinkShield's features and capabilities.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Still have questions? We're here to help.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center transition-colors shadow-sm hover:shadow">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;