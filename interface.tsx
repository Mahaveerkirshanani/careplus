export interface User {
  $id: string;            // Unique identifier for the user
  name: string;          // Full name of the user
  email: string;         // Email address of the user
  phone?: string;    
}