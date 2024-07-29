import React from 'react';
import PatientRegistrationForm from '@/components/PatientForm';
import { getUser } from '@/lib/appwrite.api';

interface SearchParam {
  params: {
    userId: string;
  };
}

const PatientForm = async ({ params: { userId } }: SearchParam) => {
  const user = await getUser({ userId });

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center ">
      <div className="w-[95vw] md:w-[70vw] py-8   rounded-lg shadow-lg">
        
        <PatientRegistrationForm user={user} />
      </div>
    </div>
  );
};

export default PatientForm;
