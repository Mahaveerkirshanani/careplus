import { Gender, Status } from "@/lib/validate";
import { Models } from "node-appwrite";

export interface User {
  $id: string;            // Unique identifier for the user
  name: string;          // Full name of the user
  email: string;         // Email address of the user
  phone?: string;    
}


export interface Patient extends Models.Document {
  userId: string;
  name:string;
  email:string;
  phone:string;
  birthDate: Date;
  gender: Gender;
  address: string;
  cnicNumber: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  treatmentConsent: boolean;
  disclosureConsent: boolean;
  privacyConsent: boolean;
}



export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}


export type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};
