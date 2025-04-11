import axiosInstance from "../axios/axiosconfig";
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

export const createDepartment = async (
  data: CreateDepartmentRequest
): Promise<GraphQLResponse<CreateDepartmentResponse>> => {
  const mutation = `
    mutation ($title: String!, $description: String!, $imageUrl: String) {
      createDepartment(title: $title, description: $description, imageUrl: $imageUrl) {
        departmentid
        title
        description
      }
    }
  `;

  const variables = {
    title: data.title,
    description: data.description,
    imageUrl:
      data.imageUrl ||
      "https://images.pexels.com/photos/1290141/pexels-photo-1290141.jpeg",
  };

  try {
    const response = await axiosInstance.post<
      GraphQLResponse<CreateDepartmentResponse>
    >(baseUrl, {
      query: mutation,
      variables,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || "Error creating department,dd"
    );
  }
};

export const getDepartment = async (
  departmentId: string
): Promise<GraphQLResponse<GetDepartmentResponse>> => {
  const query = `
    query GetDepartment($departmentid: ID!) {
      getDepartment(departmentid: $departmentId) {
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
    const response = await axiosInstance.post<
      GraphQLResponse<GetDepartmentResponse>
    >(baseUrl, {
      query,
      variables,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || "Error fetching department"
    );
  }
};

export const getAllDepartments = async (): Promise<
  GraphQLResponse<GetAllDepartmentsResponse>
> => {
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
    const response = await axiosInstance.post<
      GraphQLResponse<GetAllDepartmentsResponse>
    >(baseUrl, {
      query,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.response?.data?.message || "Error fetching departments"
    );
  }
};

//correct this function
export const deleteDepartment = async (
  departmentId: number
): Promise<{ success: boolean; message: string }> => {
  const mutation = `
    mutation DeleteDepartment($departmentId: ID!) {
      deleteDepartment(departmentId: $departmentId) {
        success
        message
      }
    }
  `;

  const variables = {
    departmentId: departmentId.toString(), // Ensure the ID is passed as a string
  };

  try {
    const response = await axiosInstance.post(baseUrl, {
      query: mutation,
      variables,
    });

    const data = response.data as GraphQLResponse<{
      deleteDepartment: { success: boolean; message: string };
    }>;

    if (data.errors) {
      throw new Error(data.errors[0]?.message || "Error deleting department");
    }

    return (
      data.data?.deleteDepartment || {
        success: false,
        message: "Unknown error",
      }
    );
  } catch (error: any) {
    console.error("Error deleting department:", error);
    throw new Error(
      error.response?.data?.message || "Error deleting department"
    );
  }
};
