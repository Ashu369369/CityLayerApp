import axios from "axios";

// Create an Axios instance (you can customize it more if needed)
const axiosInstance = axios.create({

  baseURL: `http://${process.env.config}:4000/graphql`, // Replace with your backend URL

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
