
import axiosInstance from '../axios/axiosconfig';
import Constants from "expo-constants";

const baseUrl = `http://${Constants.expoConfig?.extra?.config}:4000/graphql`; // Replace with your GraphQL backend URL


export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dob: string;
  password: string; // Keep 'password' here
  code?: string;
}

export interface GraphQLError {
  message: string;
  path?: string[];
  extensions?: Record<string, any>;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export interface CreateUserResponse {
  createUser: {
    id: number;
    message: string;
    token?: string;
  };
}


export interface LoginUserRequest {
  username: string;
  password: string;
}

export interface LoginUserResponse {
  login: {
    id: number;
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    dob: string,
    message: string;
    token?: string;
  };
}


export const createUser = async (data: CreateUserRequest): Promise<GraphQLResponse<CreateUserResponse>> => {

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
        token
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
    passwordHash: data.password, // Here, you map the 'password' to 'passwordHash' as expected in the mutation
    code: data.code || null,
  };

  try {

    console.log(baseUrl)
    const response = await axiosInstance.post<GraphQLResponse<CreateUserResponse>>(baseUrl, {
      query: mutation,
      variables,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};

//login function
export const loginUser = async (data: LoginUserRequest): Promise<GraphQLResponse<LoginUserResponse>> => {

  const mutation = `
    mutation LoginUser($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        id
        firstName
        lastName
        username
        email
        dob
        message
        token
      }
    }
  `;

  const variables = {
    username: data.username,
    password: data.password,
  };
  try {
    const response = await axiosInstance.post<GraphQLResponse<LoginUserResponse>>(baseUrl, {
      query: mutation,
      variables,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Error logging in");
  }
};
