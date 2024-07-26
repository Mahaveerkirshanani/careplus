// app/components/HowItWorks.tsx
import React from 'react';
import { FaLightbulb, FaCalendarAlt, FaCheckCircle, FaHandshake } from 'react-icons/fa';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-12 md:px-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="container mx-auto text-center">
        {/* Header */}
        <h2 className="text-5xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-500">
          How It Works
        </h2>
        <p className="text-gray-600 mb-12 text-lg leading-relaxed">
          Follow our simple process to see how we turn your ideas into reality with precision and care.
        </p>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400">
            <div className="flex items-center justify-center mb-4">
              <FaLightbulb className="text-teal-600 text-5xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 1: Idea Generation</h3>
            <p className="text-gray-700">We start by understanding your needs and brainstorming solutions to ensure we meet your goals.</p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400">
            <div className="flex items-center justify-center mb-4">
              <FaCalendarAlt className="text-blue-600 text-5xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 2: Planning</h3>
            <p className="text-gray-700">Our team plans out the project timeline, resources, and key milestones to ensure smooth execution.</p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-green-200 via-green-300 to-green-400">
            <div className="flex items-center justify-center mb-4">
              <FaCheckCircle className="text-green-600 text-5xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 3: Execution</h3>
            <p className="text-gray-700">We put our plan into action, executing each phase of the project with precision and care.</p>
          </div>
          
          {/* Step 4 */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 transform transition-transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400">
            <div className="flex items-center justify-center mb-4">
              <FaHandshake className="text-orange-600 text-5xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 4: Delivery & Feedback</h3>
            <p className="text-gray-700">Upon completion, we deliver the final product and gather feedback to ensure your satisfaction.</p>
          </div>
        </div>
        
        
      </div>
    </section>
  );
};

export default HowItWorks;
