import { Client, Account, Databases } from "appwrite";

export const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);                 // Your project ID

export const account = new Account(client);
export const database = new Databases(client);


export { ID, AppwriteException, OAuthProvider } from 'appwrite';
