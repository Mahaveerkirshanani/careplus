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
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  name:"",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  cnicNumber:"",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
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



export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export interface RegisterUserParams  {
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

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
   .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  birthDate: z.coerce.date(),
  gender: z.enum(["male", "female", "other"]),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be at most 500 characters"),
  cnicNumber: z
    .string()
    .min(10, "CNIC number must be at least 10 characters")
    .max(50, "CNIC number must be at most 50 characters"),
   occupation: z
     .string()
     .min(2, "Occupation must be at least 2 characters")
     .max(500, "Occupation must be at most 500 characters"),
   emergencyContactName: z
     .string()
     .min(2, "Contact name must be at least 2 characters")
     .max(50, "Contact name must be at most 50 characters"),
   emergencyContactNumber: z
     .string()
     .refine(
       (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
       "Invalid phone number"
     ),
   primaryPhysician: z.string().min(2, "Select at least one doctor"),
   allergies: z.string().optional(),
   currentMedication: z.string().optional(),
   familyMedicalHistory: z.string().optional(),
   pastMedicalHistory: z.string().optional(),
   identificationType: z.string().optional(),
   identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
   treatmentConsent: z
     .boolean()
     .default(false)
     .refine((value) => value === true, {
       message: "You must consent to treatment in order to proceed",
     }),
   disclosureConsent: z
     .boolean()
     .default(false)
     .refine((value) => value === true, {
       message: "You must consent to disclosure in order to proceed",
     }),
   privacyConsent: z
     .boolean()
     .default(false)
     .refine((value) => value === true, {
       message: "You must consent to privacy in order to proceed",
     }),
});

export type PatientFormValidationType = z.infer<typeof PatientFormValidation>;



interface PersonalInfo {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  address?: string;
  city?: string;
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
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
  {
    name: "Dr. Shanker Lal",
    title: "Chief Surgeon",
    image: "/WhatsApp Image 2024-07-26 at 16.10.37_3925ac99.jpg",
  },
  {
    name: "Dr. Mahaveer Kumar",
    title: "Pediatrician",
    image: "/WhatsApp Image 2024-07-19 at 12.05.12_a4b17941.jpg",
  },
  {
    name: "Dr. Munesh Kumar",
    title: "Medical Assistant",
    image: "/WhatsApp Image 2024-07-26 at 16.22.56_94b6abde.jpg",
  },
  {
    name: "Dr. SK Sahb",
    title: "Head Nurse",
    image: "/WhatsApp Image 2024-07-26 at 16.22.18_3ffc517a.jpg",
  },
  {
    name: "Dr. Loono Mal",
    title: "Cardiologist",
    image: "/WhatsApp Image 2024-07-18 at 17.40.31_9da62391.jpg",
  },
  {
    name: "Dr. Suneel Sahb",
    title: "Radiologic Technologist",
    image: "/1721975039430.jpg",
  },
  {
    name: "Dr. Veenjhraj Ratnani",
    title: "Orthopedic Surgeon",
    image: "/WhatsApp Image 2024-07-26 at 16.31.32_5849234b.jpg",
  },
  {
    name: "Veer Akhani",
    title: "Physical Therapist",
    image: "/IMG-20240526-WA0015.jpg",
  },
];

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

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
