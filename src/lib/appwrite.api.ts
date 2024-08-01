import { ID, Query } from "node-appwrite";
import { databases, storage, users } from "./appwrite.config";
import { InputFile } from "node-appwrite/file";
import { parseStringify, RegisterUserParams, Status } from "./validate";

interface CreateUserParams {
  email: string;
  password: string;
  username: string;
  phone: string;
}

interface  CreateAppointmentParams  {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

interface GetUserParams {
  userId: string; // The unique ID of the user to retrieve
}

export const createUser = async ({
  email,
  password,
  username,
  phone,
}: CreateUserParams) => {
  try {
    const response = await users.create(
      ID.unique(),
      email,
      phone,
      password,
      username
    );
    return response;
  } catch (error: any) {
    if (error?.code === 409) {
      const document = await users.list([Query.equal("email", [email])]);
      return document?.users[0];
    }
    console.error("Failed to create user:", error);
    throw error;
  }
};

export const getUser = async ({ userId }: GetUserParams) => {
  try {
    // Fetch the user by their unique ID
    const user =  await users.get(userId);
    return user;
  } catch (error: any) {
    // Handle errors, e.g., user not found or other issues
    console.error("Failed to fetch user:", error);
    throw error;
  }
};
export const getPatient = async ({ userId }: GetUserParams) => {
  try {
    const patients = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );

    return parseStringify(patients.documents[0]);
  } catch (error: any) {
    // Handle errors, e.g., user not found or other issues
    console.error("Failed to fetch patient :", error);
    throw error;
  }
};

// REGISTER PATIENT

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      file = await storage.createFile(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
        ID.unique(),
        inputFile
      );
    }

    console.log({
      identificationDocumentId: file?.$id || null,
      identificationDocumentUrl: `${process.env
        .NEXT_PUBLIC_APPWRITE_ENDPOINT!}/storage/buckets/${process.env
        .NEXT_PUBLIC_APPWRITE_BUCKET_ID!}/files/${
        file?.$id
      }/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!}`,
      ...patient,
    });
    const newPatient = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${process.env
          .NEXT_PUBLIC_APPWRITE_ENDPOINT!}/storage/buckets/${process.env
          .NEXT_PUBLIC_APPWRITE_BUCKET_ID!}/files/${
          file?.$id
        }/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!}`,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error:any) {
    console.error("An error occurred while creating a new patient:", error);
  }
};










//============================  APPOINTMENT ACTIONS       =================================//
export const createAppointment = async (
  appointment: CreateAppointmentParams ) =>{
  try {
    const newAppointment = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_APPIONTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment)
  } catch (error:any) {
    console.error("Failed to create appointment :", error);
    throw error;
  }

}


export const getAppointment = async ( appointmentId: string )=>{
  try {
    const appoitment = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_APPIONTMENT_COLLECTION_ID!,
      appointmentId 
    )
    
    return parseStringify(appoitment)
  } catch (error:any) {
    console.error("Failed to get appointment :", error);
    throw error;
  }
}