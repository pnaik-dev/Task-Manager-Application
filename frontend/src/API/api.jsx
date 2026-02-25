import axios from "axios";

// Create a common api for all the apis
const baseUrl = import.meta.env.VITE_API_URL; // Get the API URL from the .env file
const apiClient = axios.create({ // Create a new axios instance
  baseURL: baseUrl, // Set the base URL
  headers: {
    'Content-Type': 'application/json', // Set the content type
  }
});

// If there is a jwt token then attach it to the header of the request
apiClient.interceptors.request.use( // Interceptor for the request
  (config) => { 
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) { // If there is a token
      config.headers.Authorization = token; // Add the token to the header
    }
    return config; // Return the config
  },
  (error) => Promise.reject(error) // If there is an error then reject the error
);

export default apiClient;
