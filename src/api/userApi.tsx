import axios from 'axios';
import axiosInstance from '../axios/axiosconfig';

const baseUrl = `http://localhost:4000/graphql`; // Replace with your GraphQL backend URL

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dob: string;
  password: string; // Keep 'password' here
  code?: string;
}

export interface CreateUserResponse {
  data: {
    createUser: {
      id: number;
      message: string;
    };
  };
}

export const createUser = async (data: CreateUserRequest): Promise<CreateUserResponse> => {
  const mutation = `
    mutation CreateUser(
      $firstName: String!,
      $lastName: String!,
      $username: String!,
      $email: String!,
      $dob: String!,
      $passwordHash: String!,
      $code: String
    ) {
      createUser(
        firstName: $firstName,
        lastName: $lastName,
        username: $username,
        email: $email,
        dob: $dob,
        passwordHash: $passwordHash,  # Consistent with the server-side mutation
        code: $code
      ) {
        id
        message
      }
    }
  `;

  // Create the variables object here
  const variables = {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    email: data.email,
    dob: data.dob,
    passwordHash: data.password,  // Here, you map the 'password' to 'passwordHash' as expected in the mutation
    code: data.code || null,
  };

  try {
    const response = await axiosInstance.post<CreateUserResponse>(baseUrl, {
      query: mutation,
      variables: {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        dob: data.dob,
        passwordHash: data.password,
        code: data.code || null,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || 'Error creating user');
  }
};
