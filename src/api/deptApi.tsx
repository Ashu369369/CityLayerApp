import axiosInstance from '../axios/axiosconfig';
import Constants from "expo-constants";

const baseUrl = `http://${Constants.expoConfig?.extra?.config}:4000/graphql`; // Replace with your GraphQL backend URL

export interface CreateDepartmentRequest {
  title: string;
  description: string;
  imageUrl?: string;
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

export interface CreateDepartmentResponse {
  createDepartment: {
    departmentid: number;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Department {
  departmentid: number;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetDepartmentResponse {
  getDepartment: Department;
}

export interface GetAllDepartmentsResponse {
  getAllDepartments: Department[];
}

export const createDepartment = async (data: CreateDepartmentRequest): Promise<GraphQLResponse<CreateDepartmentResponse>> => {
  const mutation = `
    mutation CreateDepartment($title: String!, $description: String!, $imageUrl: String) {
      createDepartment(title: $title, description: $description, imageUrl: $imageUrl) {
        departmentid
        title
        description
        imageUrl
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    title: data.title,
    description: data.description,
    imageUrl: data.imageUrl || 'https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg',
  };

  try {
    const response = await axiosInstance.post<GraphQLResponse<CreateDepartmentResponse>>(baseUrl, {
      query: mutation,
      variables,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Error creating department");
  }
};

export const getDepartment = async (departmentId: string): Promise<GraphQLResponse<GetDepartmentResponse>> => {
  const query = `
    query GetDepartment($departmentId: String!) {
      getDepartment(departmentId: $departmentId) {
        departmentid
        title
        description
        imageUrl
        createdAt
        updatedAt
      }
    }
  `;

  const variables = {
    departmentId,
  };

  try {
    const response = await axiosInstance.post<GraphQLResponse<GetDepartmentResponse>>(baseUrl, {
      query,
      variables,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Error fetching department");
  }
};

export const getAllDepartments = async (): Promise<GraphQLResponse<GetAllDepartmentsResponse>> => {
  const query = `
    query GetAllDepartments {
      getAllDepartments {
        departmentid
        title
        description
        imageUrl
        createdAt
        updatedAt
      }
    }
  `;

  try {
    const response = await axiosInstance.post<GraphQLResponse<GetAllDepartmentsResponse>>(baseUrl, {
      query,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Error fetching departments");
  }
};