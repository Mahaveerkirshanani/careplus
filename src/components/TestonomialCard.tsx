// app/components/TestimonialCard.tsx
import React from 'react';

interface TestimonialCardProps {
  profilePicture: string;
  username: string;
  rating: number;
  description: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ profilePicture, username, rating, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-[250px] flex flex-col relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-100 opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div className="relative z-10 flex items-center mb-4">
        <img
          src={profilePicture}
          alt={username}
          className="w-20 h-20 rounded-full border-4 border-teal-500 mr-4"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{username}</h3>
          <div className="text-yellow-500 flex items-center">
            {'★'.repeat(rating)}
            {'☆'.repeat(5 - rating)}
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm flex-grow overflow-hidden font-semibold text-ellipsis">
        {description}
      </p>
    </div>
  );
};

export default TestimonialCard;
