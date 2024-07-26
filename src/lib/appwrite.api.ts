import { ID, Query } from "node-appwrite";
import { users } from "./appwrite.config";

interface CreateUserParams {
  email: string;
  password: string;
  username: string;
  phone: string;
}

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
    const user = await users.get(userId);
    return user;
  } catch (error: any) {
    // Handle errors, e.g., user not found or other issues
    console.error("Failed to fetch user:", error);
    throw error;
  }
};
