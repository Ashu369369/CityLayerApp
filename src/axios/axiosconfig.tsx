import axios from "axios";
import Constants from "expo-constants";

const axiosInstance = axios.create({

  baseURL: `http://${Constants.expoConfig?.extra?.config}:4000/graphql`,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to log request details
// axiosInstance.interceptors.request.use((request) => {
//   console.log('Request:', request);
//   return request;
// });

// Response interceptor to log response details
// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log('Response:', response);
//     return response;
//   },
//   (error) => {
//     console.error('Error:', error);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
