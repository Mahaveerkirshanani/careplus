'use client';

import { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

interface HeroSectionProps {
  userId: string;
}

const HeroSection = ({ userId }: HeroSectionProps) => {
  const [patients, setPatients] = useState(0);
  const [doctors, setDoctors] = useState(0);
  const [successRate, setSuccessRate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (patients < 25000) setPatients(patients + 500);
      if (doctors < 25) setDoctors(doctors + 1);
      if (successRate < 98) setSuccessRate(successRate + 1);
    }, 50);

    return () => clearInterval(interval);
  }, [patients, doctors, successRate]);

  return (
    <section className="relative bg-white py-12 px-6 md:py-24 md:px-12 lg:flex lg:items-center">
      <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left">
        <h1 className="md:text-5xl text-4xl font-bold text-gray-900 mb-4 capitalize">
          Get appointment
        </h1>
        <h2 className="md:text-5xl  text-4xl font-bold text-gray-900 mb-6  capitalize">
          <span className="text-teal-500">easy</span> and <span className="text-teal-500">fast</span>
        </h2>
        <div className="mb-8 space-y-4 space-x-3">
          <Link href={`/patients/${userId}/register`} className="inline-block text-sm px-3 md:px-8 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-600 transition-colors duration-300">
            Appointment
          </Link>
          <Link href="/plans" className="inline-block px-3 text-sm md:px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition-colors duration-300">
            Click Our Plan
          </Link>
        </div>
        <div className="flex justify-center   lg:justify-start space-x-2 md:space-x-6 mb-8">
          <div className="text-center ">
            <p className="md:text-3xl  font-bold text-teal-600">{patients.toLocaleString()}+</p>
            <p className="text-gray-700  max-sm:text-sm font-semibold">Happy Patients</p>
          </div>
          <div className="text-center">
            <p className="md:text-3xl font-bold text-teal-600">{doctors}</p>
            <p className="text-gray-700 max-sm:text-sm font-semibold">Specialist Doctors</p>
          </div>
          <div className="text-center">
            <p className="md:text-3xl font-bold text-teal-600">{successRate}%</p>
            <p className="text-gray-700 max-sm:text-sm font-semibold">Success Rate</p>
          </div>
        </div>
      </div>
      <div className="relative lg:w-1/2 lg:flex md:items-center lg:justify-end">
        <Image
          src="/sea enfermera.jpeg"
          alt="Doctor"
          width={500}
          height={500}
          className="w-full md:h-[80vh] h-[50vh] opacity-90"
        />
        <div className="absolute top-4 right-4 flex flex-col space-y-4 p-4">
          <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
            <FaFacebookF size={24} />
          </a>
          <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600 transition-colors duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" className="text-pink-500 hover:text-pink-700 transition-colors duration-300">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-900 transition-colors duration-300">
            <FaLinkedinIn size={24} />
          </a>
          <a href="https://youtube.com" className="text-red-600 hover:text-red-800 transition-colors duration-300">
            <FaYoutube size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
