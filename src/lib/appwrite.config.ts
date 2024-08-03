import { Account, Client, Databases,  Messaging,  Storage, Users } from "node-appwrite";


// Importing environment variables



// Initialize the Appwrite client
const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Set endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!) // Set project ID
  .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY!); // Set API key

// Initialize Appwrite services

const databases = new Databases(client);
const storage = new Storage(client);
const messaging = new Messaging(client);
const users = new Users(client); // Use Users service
const accounts = new Account(client); // Use Users service

export { client, databases,messaging ,  accounts ,storage, users };
