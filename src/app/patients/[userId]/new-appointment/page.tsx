import React from 'react';
import PatientRegistrationForm from '@/components/PatientForm';
import { getPatient, getUser } from '@/lib/appwrite.api';
import NewAppointment from '@/components/AppointmentForm';

interface SearchParam {
  params: {
    userId: string;
  };
}

const PatientForm = async ({ params: { userId } }: SearchParam) => {

  const patient = await getPatient({userId})

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center ">
      <div className="w-[95vw] md:w-[70vw] py-8   rounded-lg shadow-lg">
        
        <NewAppointment userId={userId}  patientId={patient.$id} type="create" />
      </div>
    </div>
  );
};

export default PatientForm;
