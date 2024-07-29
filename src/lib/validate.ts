// interfaces.ts

import { Control, UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Define a regular expression to match the phone number pattern
const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;


export const RegisterSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().regex(phoneNumberRegex, {
    message: "Invalid phone number format.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;


export const GenderOptions =["male","female","other"]



export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};




export const PatientRegistrationSchema = z.object({
  fullname: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  password: z.string().min(6, 'Password should be at least 6 characters long'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Please select a gender' }),
  }),
  address: z.string().optional(),
  primaryPhysician: z.string().min(1, 'Primary Physician is required'),
  occupation: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactNumber: z.string().optional(),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  city: z.string().optional(),
  cnicNumber: z.string().optional(),
  identificationDocumentUrl: z.string().optional(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Privacy consent is required',
  }),
  termsAndConditions: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  agreeToMarketing: z.boolean(),
});

export type PatientRegistrationSchemaType = z.infer<typeof PatientRegistrationSchema>;


interface PersonalInfo {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address?: string;
  city?: string;
}


export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}



interface MedicalHistory {
  primaryPhysician: string;
  occupation?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
}

interface Identification {
  cnicNumber?: string;
  identificationDocumentUrl?: string;
}

interface ConsentAndPrivacy {
  privacyConsent: boolean;
  termsAndConditions: boolean;
  agreeToMarketing: boolean;
}

interface RegisterForm {
  personalInfo: PersonalInfo;
  medicalHistory: MedicalHistory;
  identification: Identification;
  consentAndPrivacy: ConsentAndPrivacy;
}

export const Doctors = [
  { name: 'Dr. Shanker Lal', title: 'Chief Surgeon', image: '/WhatsApp Image 2024-07-26 at 16.10.37_3925ac99.jpg' },
  { name: 'Dr. Mahaveer Kumar', title: 'Pediatrician', image: '/WhatsApp Image 2024-07-19 at 12.05.12_a4b17941.jpg' },
  { name: 'Dr. Munesh Kumar', title: 'Medical Assistant', image: '/WhatsApp Image 2024-07-26 at 16.22.56_94b6abde.jpg' },
  { name: 'Dr. SK Sahb', title: 'Head Nurse', image: '/WhatsApp Image 2024-07-26 at 16.22.18_3ffc517a.jpg' },
  { name: 'Dr. Loono Mal', title: 'Cardiologist', image: '/WhatsApp Image 2024-07-18 at 17.40.31_9da62391.jpg' },
  { name: 'Dr. Suneel Sahb', title: 'Radiologic Technologist', image: '/1721975039430.jpg' },
  { name: 'Dr. Veenjhraj Ratnani', title: 'Orthopedic Surgeon', image: '/WhatsApp Image 2024-07-26 at 16.31.32_5849234b.jpg' },
  { name: 'Veer Akhani', title: 'Physical Therapist', image: '/IMG-20240526-WA0015.jpg' },
];

export const IdentificationTypes = [
    "Birth Certificate",
    "Driver's License",
    "Medical Insurance Card/Policy",
    "Military ID Card",
    "National Identity Card",
    "Passport",
    "Resident Alien Card (Green Card)",
    "Social Security Card",
    "State ID Card",
    "Student ID Card",
    "Voter ID Card",
  ];