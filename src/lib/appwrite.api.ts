import { ID, Query } from "node-appwrite";
import {
  accounts,
  databases,
  messaging,
  storage,
  users,
} from "./appwrite.config";
import { InputFile } from "node-appwrite/file";
import { parseStringify, RegisterUserParams, Status } from "./validate";
import { Appointment, Appoooo,  } from "../../interface";
import { revalidatePath } from "next/cache";

interface CreateUserParams {
  email: string;
  password: string;
  username: string;
  phone: string;
}

interface CreateAppointmentParams {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
}

interface GetUserParams {
  userId: string; // The unique ID of the user to retrieve
}

//  SEND SMS NOTIFICATION
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    // https://appwrite.io/docs/references/1.5.x/server-nodejs/messaging#createSms
    const message = await messaging.createSms(
      ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.error("An error occurred while sending sms:", error);
  }
};

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

    let userId = response.$id;
    const smsMessage = `Greetings from CarePulse , Regard  Mahaveer Rathore .`;
    const reply = await sendSMSNotification(userId, smsMessage);

    console.log(reply);
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
    const user = await users.get(userId);
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
  } catch (error: any) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

//===============================       APPIONTMENTS         ==============================//

// interface Appointment {
//   id: string;
//   doctorName: string;
//   patientName: string;
//   appointmentTime: string;
//   status: string;
// }

const getRecentAppointmentList = async () => {
  try {
    const appointments = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, // Your database ID
      process.env.NEXT_PUBLIC_APPWRITE_APPIONTMENT_COLLECTION_ID!, // Your collection ID
      [Query.orderDesc("$id")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent appointments:",
      error
    );
  }
};
export default getRecentAppointmentList;

//============================  APPOINTMENT ACTIONS       =================================//
export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_APPIONTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error: any) {
    console.error("Failed to create appointment :", error);
    throw error;
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appoitment = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_APPIONTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appoitment);
  } catch (error: any) {
    console.error("Failed to get appointment :", error);
    throw error;
  }
};

// //  UPDATE APPOINTMENT//
// export const updateAppointment = async ({
//   appointmentId,
//   userId,
//   appointment,
//   type,
// }: UpdateAppointmentParams) => {
//   try {
//     // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
//     const updatedAppointment = await databases.updateDocument(
//       process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
//       process.env.NEXT_PUBLIC_APPWRITE_APPIONTMENT_COLLECTION_ID!,
//       appointmentId,
//       appointment
//     );

//     if (!updatedAppointment) throw Error;

//     // const smsMessage = `Greetings from CarePulse. ${
//     //   type === "schedule"
//     //     ? `Your appointment is confirmed for ${
//     //         formatDateTime(appointment.schedule!).dateTime
//     //       } with Dr. ${appointment.primaryPhysician}`
//     //     : `We regret to inform that your appointment for ${
//     //         formatDateTime(appointment.schedule!).dateTime
//     //       } is cancelled. Reason:  ${appointment.cancellationReason}`
//     // }.`;
//     // await sendSMSNotification(userId, smsMessage);

//     revalidatePath("/admin");
//     return parseStringify(updatedAppointment);
//   } catch (error) {
//     console.error("An error occurred while scheduling an appointment:", error);
//   }
// };// Adjust the import path based on your project structure

export interface UpdateAppointmentParams {
  appointmentId: string;
  userId: string;
  appointment: Partial<Appoooo>;
  type: "create" | "cancel" | "schedule";
}

export const updateAppointment = async ({
  appointmentId,
  userId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) throw new Error("Failed to update appointment");

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while updating the appointment:", error);
  }
};

export const loginUser = async ({ email, password } :{email:string, password:string}) => {
  try {
    const user = await accounts.createEmailPasswordSession(email,password)
    return user;
  } catch (error) {
    console.error("Failed to login:", error);
    throw error;
  }
};
