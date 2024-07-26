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

export const PatientRegistrationSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
  username: z.string().min(1, { message: "Username is required." }),
  userId: z.string().min(1, { message: "User ID is required." }),
  privacyConsent: z.boolean().refine(val => val === true, { message: "You must consent to privacy policy." }),
  gender: z.enum(['male', 'female', 'other']),
  birthDate: z.string().min(1, { message: "Birth date is required." }),
  address: z.string().min(1, { message: "Address is required." }),
  occupation: z.string().min(1, { message: "Occupation is required." }),
  emergencyContactName: z.string().min(1, { message: "Emergency contact name is required." }),
  emergencyContactNumber: z.string().min(1, { message: "Emergency contact number is required." }),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  city: z.string().min(1, { message: "City is required." }),
  cnicNumber: z.string().min(1, { message: "CNIC number is required." }),
  identificationDocumentUrl: z.string().url({ message: "Invalid URL for identification document." }),
  primaryPhysician: z.string().min(1, { message: "Primary physician is required." }),
});

export type PatientRegistrationSchemaType = z.infer<typeof PatientRegistrationSchema>;