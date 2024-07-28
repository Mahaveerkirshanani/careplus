"use client";

import PatientRegistrationForm from "@/components/PatientForm";
import { getUser } from "@/lib/appwrite.api";
import React from "react";

interface SearchParam {
  params: {
    userId: string;
  };
}

const PatientForm = async ({ params: { userId } }: SearchParam) => {
  const user = await getUser({ userId });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white flex flex-col items-center justify-center py-12 lg:px-4">
      <div className="w-full max-w-7xl bg-gray-900 lg:p-8 p-2 rounded-lg shadow-lg">
        <h1 className="md:text-4xl text-2xl font-extrabold md:tracking-wider text-center mb-4 text-teal-400">Patient Registraion Form</h1>
        <p className="md:text-lg  text-xs mb-8 text-center font-semibold md:tracking-wider text-gray-300">
          Please fill out the details to book your appointment. <br /> Our specialists are ready to assist you.
        </p>
        <PatientRegistrationForm user={user} />
      </div>
    </div>
  );
};

export default PatientForm;
