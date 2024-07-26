// app/components/FAQ.tsx
import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What services do you offer?',
    answer: 'We offer a range of services including medical consultations, health screenings, and personalized treatment plans. Our team is dedicated to providing the best care and support for your health needs.',
  },
  {
    question: 'How can I make an appointment?',
    answer: 'You can make an appointment by visiting our website and using the online booking system, or by calling our customer service team. We offer flexible scheduling to accommodate your needs.',
  },
  {
    question: 'Do you accept insurance?',
    answer: 'Yes, we accept various insurance plans. Please contact our billing department for more details about coverage and to verify if your plan is accepted.',
  },
  {
    question: 'What should I bring to my appointment?',
    answer: 'Please bring your insurance card, a valid ID, and any relevant medical records. If you are visiting a specialist, please bring any referrals or previous test results.',
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can contact our customer support team via email, phone, or through the contact form on our website. We are here to assist you with any questions or concerns you may have.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 lg:px-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200">
      <div className="container mx-auto">
        <h2 className="md:text-4xl text-3xl font-extrabold text-teal-400 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <div key={index} className="mb-4">
              <button
                className={`w-full text-left border border-gray-300 rounded-lg p-4 shadow-md flex items-center justify-between bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-300 ${
                  openIndex === index ? 'bg-gray-100' : ''
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-800">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <FaMinus className="text-teal-600" />
                ) : (
                  <FaPlus className="text-teal-600" />
                )}
              </button>
              <div
                className={`transition-max-height duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-screen' : 'max-h-0'
                } overflow-hidden`}
              >
                <div className="p-4 rounded-md bg-[#95f9d3e8] border-t mt-1 border-gray-300 rounded-b-lg shadow-md">
                  <p className="text-gray-700 text-base">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
