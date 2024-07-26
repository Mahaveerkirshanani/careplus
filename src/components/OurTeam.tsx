// app/components/CEOBanner.tsx
import Image from 'next/image';
import React from 'react';
import { FaTrophy, FaCertificate, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const CEOData = {
  name: 'Dr. Suneel Kumar',
  image: '/1721983329592.jpg', // Update with your image path
  qualifications: [
    'M.D. in Cardiology',
    'Ph.D. in Medical Research',
    'Board Certified in Internal Medicine',
  ],
  achievements: [
    'Founder of Sunny Health Organization',
    'Published over 50 research papers in reputed journals',
    'Recipient of the National Health Excellence Award',
  ],
  successDescription: 'With over 25 years in the medical field, Dr. Suneel Kumar has been a leading figure in advancing cardiac care and innovative treatments. His dedication to improving patient outcomes and pioneering research has set new standards in healthcare.',
  successQuote: '“The greatest wealth is health.”',
};

const CEOBanner: React.FC = () => {
  return (
    <section className="py-12 px-6 bg-gradient-to-r from-blue-100 via-teal-100 to-green-100">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* CEO Picture */}
        <div className="relative w-full max-w-md mx-auto mb-8 lg:mb-0 lg:mr-8">
          <Image
            src={CEOData.image}
            alt={CEOData.name}
            width={500}
            height={500}
            className="w-full h-96 object-cover rounded-xl shadow-xl border-4 border-gradient-to-r from-blue-400 via-teal-400 to-green-400"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-bold py-2 px-4 rounded-lg shadow-md">
            CEO
          </div>
        </div>

        {/* CEO Details */}
        <div className="w-full md:w-2/3 space-y-8">
          <h2 className="lg:text-4xl text-3xl font-extrabold text-gray-800 mb-4">{CEOData.name}</h2>
          <div className="text-gray-700">
            <h3 className="text-2xl font-semibold mb-3">Qualifications:</h3>
            <ul className="list-disc list-inside pl-6 space-y-2">
              {CEOData.qualifications.map((qual, index) => (
                <li key={index} className="flex items-center text-lg">
                  <FaCertificate className="text-teal-600 mr-3 text-xl" />
                  {qual}
                </li>
              ))}
            </ul>
            <h3 className="text-2xl font-semibold mb-3 mt-6">Achievements:</h3>
            <ul className="list-disc list-inside pl-6 space-y-2">
              {CEOData.achievements.map((ach, index) => (
                <li key={index} className="flex items-center text-lg">
                  <FaTrophy className="text-teal-600 mr-3 text-xl" />
                  {ach}
                </li>
              ))}
            </ul>
            <h3 className="text-2xl font-semibold mb-3 mt-6">Success Description:</h3>
            <p className="text-gray-700 text-lg mb-6">
              {CEOData.successDescription}
            </p>
          </div>
        </div>
      </div>
      {/* Success Quote */}
      <div className="mt-12 p-6 bg-gradient-to-r from-teal-50 via-teal-100 to-teal-200 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <FaQuoteLeft className="text-teal-600 text-4xl mr-4" />
          <p className="text-lg font-semibold text-gray-700 text-center">
            {CEOData.successQuote}
          </p>
          <FaQuoteRight className="text-teal-600 text-4xl ml-4" />
        </div>
      </div>
    </section>
  );
};

export default CEOBanner;
