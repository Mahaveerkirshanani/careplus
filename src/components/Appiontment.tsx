"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaCalendarAlt, FaHandsHelping, FaStethoscope } from "react-icons/fa";

interface HeroSectionProps {
  userId: string;
}

const RegisterAppointment = ({ userId }: HeroSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center  py-12 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="bg-white bg-opacity-10 p-10 rounded-lg shadow-lg backdrop-blur-md max-w-3xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-teal-300 flex justify-center items-center space-x-3">
            <FaStethoscope className="text-5xl" />
            <span>Book Your Appointment</span>
          </h1>
          <p className="text-lg">
            Experience the best ever hospital checkup with our specialist doctors.
          </p>
          <p className="text-lg mt-2">
            Register your appointment and we will be in touch with you in just minutes.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <Link href={`/patients/${userId}/register`} passHref>
            <Button className="flex items-center space-x-3 bg-teal-500 hover:bg-teal-600 text-lg px-6 py-7 rounded-lg transition-transform duration-300 ease-in-out">
              <FaCalendarAlt className="text-2xl" />
              <span>Register Appointment</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterAppointment;
