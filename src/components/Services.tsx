// app/components/Services.tsx
'use client';

import { FaStethoscope, FaAmbulance, FaUserMd, FaChild, FaDumbbell, FaAppleAlt, FaBrain, FaHeartbeat } from 'react-icons/fa';
import ServiceCard from '@/components/ServiceCard';
import Link from 'next/link';

interface ServicesProps {
  userId: string;
}

const services = [
  {
    title: 'Physical Therapy',
    description: 'Personalized rehabilitation programs designed to help you recover from injuries, improve mobility, and alleviate pain through targeted exercises and techniques.',
    icon: <FaDumbbell className="text-teal-500 text-4xl mb-4" />,
  },
  {
    title: 'Nutritional Counseling',
    description: 'Expert advice on diet and nutrition to help you achieve your health goals, manage chronic conditions, and maintain a balanced diet for overall well-being.',
    icon: <FaAppleAlt className="text-teal-500 text-4xl mb-4" />,
  },
  {
    title: 'Mental Health Support',
    description: 'Professional counseling and therapy services to support mental health, address emotional challenges, and promote psychological resilience and well-being.',
    icon: <FaBrain className="text-teal-500 text-4xl mb-4" />,
  },
  {
    title: 'Preventive Health Screenings',
    description: 'Comprehensive screenings to detect potential health issues early, including cardiovascular health assessments, cancer screenings, and routine check-ups to prevent future health problems.',
    icon: <FaHeartbeat className="text-teal-500 text-4xl mb-4" />,
  },
  {
    title: 'General Consultation',
    description: 'Comprehensive general health consultations for all age groups.',
    icon: <FaStethoscope />,
  },
  {
    title: 'Emergency Services',
    description: '24/7 emergency care with a team of experienced medical professionals.',
    icon: <FaAmbulance />,
  },
  {
    title: 'Surgery',
    description: 'State-of-the-art surgical facilities and skilled surgeons.',
    icon: <FaUserMd />,
  },
  {
    title: 'Pediatrics',
    description: 'Specialized care for infants, children, and adolescents.',
    icon: <FaChild />,
  },
];

const Services = ({ userId }: ServicesProps) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-teal-400 mb-4">
          Our Premium Services
        </h2>
        <h3 className="text-xl font-semibold text-center text-gray-600 mb-12">
          Offering top-tier healthcare solutions tailored to your needs.
        </h3>
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href={`/patients/${userId}/register`}
            className="inline-block px-8 py-3 bg-teal-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-teal-700 transition-colors duration-300"
          >
            Get Appointment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
