// app/components/Testimonials.tsx
'use client';

import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import TestimonialCard from './TestonomialCard';

const testimonials = [
  {
    profilePicture: '/1721983329592.jpg',
    username: 'Suneel Kumar',
    rating: 4,
    description: 'The care I received was beyond my expectations. The team was attentive and the treatment was effective. I felt valued throughout my visit.',
  },
  {
    profilePicture: '/WhatsApp Image 2024-07-19 at 12.05.12_a4b17941.jpg',
    username: 'Mahaveer Kumar',
    rating: 5,
    description: 'Fantastic experience! The staff were incredibly warm and accommodating. My treatment was seamless and I felt in great hands.',
  },
  {
    profilePicture: '/1721975039430.jpg',
    username: 'Bhalwani sahb ',
    rating: 5,
    description: 'The quality of service was unmatched. Every aspect of my visit was handled with professionalism and empathy. Highly satisfied with the outcome.',
  },
  {
    profilePicture: 'https://i.pinimg.com/236x/4a/db/d0/4adbd0e50629b5c0b8acb8b6267ed47a.jpg',
    username: 'John Doe',
    rating: 5,
    description: 'Excellent service and care. The staff is highly professional and attentive. My experience was nothing short of exceptional.',
  },
  {
    profilePicture: 'https://i.pinimg.com/236x/f5/48/2a/f5482aef0c7f32e2fc7ecccd64f76a5e.jpg',
    username: 'Jane Smith',
    rating: 4,
    description: 'Very professional and friendly staff. The treatment was effective, and the environment was welcoming. I would recommend it to others.',
  },
  {
    profilePicture: 'https://i.pinimg.com/474x/49/23/78/4923783071bcbf79ab4a765b8a5b7d88.jpg',
    username: 'Alice Johnson',
    rating: 5,
    description: 'Highly recommend for their top-notch facilities. The doctors are knowledgeable and the care provided was thorough and compassionate.',
  },
  {
    profilePicture: 'https://i.pinimg.com/474x/23/06/9e/23069e12e8504134a51e182a7e7553ab.jpg',
    username: 'Michael Brown',
    rating: 5,
    description: 'Exceptional experience with a caring team. The attention to detail and patient care were outstanding.',
  },
  {
    profilePicture: 'https://i.pinimg.com/236x/69/84/09/6984095ea8a5d598a1cecb02d87f7383.jpg',
    username: 'Emily Davis',
    rating: 4,
    description: 'Great support and treatment. The staff was very attentive, and the overall experience was positive.',
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate the number of visible items and dots
  const isSmallScreen = window.innerWidth < 640; // Tailwind's 'sm' breakpoint
  const itemsToShow = isSmallScreen ? 1 : 3;
  const totalSlides = testimonials.length;
  const totalDots = Math.ceil(totalSlides / itemsToShow);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % totalDots
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + totalDots) % totalDots
    );
  };

  // Calculate the translateX percentage
  const slideWidthPercentage = (100 / itemsToShow) * currentIndex;

  return (
    <section className="py-12 lg:px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="md:text-5xl text-3xl  font-extrabold text-center text-teal-400 mb-6">
        Testimonial 
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${slideWidthPercentage}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-full ${isSmallScreen ? '' : 'w-full lg:w-1/3 px-4'}`}
                >
                  <TestimonialCard
                    profilePicture={testimonial.profilePicture}
                    username={testimonial.username}
                    rating={testimonial.rating}
                    description={testimonial.description}
                  />
                </div>
              ))}
            </div>
            <button
              className="absolute top-1/2 -left-7 transform -translate-y-1/2 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300 z-10"
              onClick={prevSlide}
            >
              <FaArrowLeft />
            </button>
            <button
              className="absolute top-1/2 -right-7 transform -translate-y-1/2 p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600 transition-colors duration-300 z-10"
              onClick={nextSlide}
            >
              <FaArrowRight />
            </button>
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 mx-1 rounded-full ${
                  index === currentIndex ? 'bg-teal-600' : 'bg-gray-400'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
