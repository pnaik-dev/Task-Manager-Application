import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from '../../API/api'

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, thunkAPI) => { // thunkAPI is provided by createAsyncThunk
    try {
      const response = await apiClient.post('/api/user/signup', userData); // Use the apiClient to make the request
      const data = await response.data; // Wait for the response
      return data; // Return the response data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message); // Return the error message
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'user/login',
  async (userData, thunkAPI) => { // thunkAPI is provided by createAsyncThunk
    try {
      const response = await apiClient.post('/api/user/signin', userData); // Use the apiClient to make the request
      const data = await response.data; // Wait for the response
      return data; // Return the response data
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message ? [err.response?.data?.message] : ["Failed to login.Invalid credentials!"]); // Return the error message
    }
  }
);

// Async thunk for updating user profile
export const updateUserAsync = createAsyncThunk(
    'user/update',
    async (userData, thunkAPI) => { // thunkAPI is provided by createAsyncThunk
        try {
            const response = await apiClient.put('/api/user/update', userData, { // Use the apiClient to make the request
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Add the token to the header
                }
            });
            return response.data; // Return the response data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update profile."); // Return the error message
        }
    }
);

// Async thunk for changing user password
export const changePasswordAsync = createAsyncThunk(
    'user/changePassword',
    async (passwords, thunkAPI) => { // thunkAPI is provided by createAsyncThunk
        try {
            const response = await apiClient.put('/api/user/change-password', passwords, { // Use the apiClient to make the request
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Add the token to the header
                }
            });
            return response.data; // Return the response data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to change password."); // Return the error message
        }
    }
);

// Initial state for the user slice
const initialState = {
  data:JSON.parse(localStorage.getItem("userDetails")) || null, // Parse the user details from local storage
  authToken: localStorage.getItem('token') || null, // Get the token from local storage
  loading: false, // Boolean to indicate loading state
  isRegistered:false, // Boolean to indicate if user is registered
  error: [], // Error message
};

// User slice
const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState, // Initial state
  reducers: { // Reducers
    logoutUser: (state) => { // Logout user
      state.data = null; // Set user details to null
      state.authToken = null; // Set token to null
      state.loading = false; // Set loading to false
      state.error = []; // Clear errors
      localStorage.removeItem('token'); // Remove token from local storage
      localStorage.removeItem('userDetails'); // Remove user details from local storage
    },
    setErrors: (state, action) => { // Set errors
        state.error = action.payload; // Set the errors
    }
  },
  extraReducers: (builder) => { // Extra reducers
    builder
      .addCase(registerUser.pending, (state) => { // Pending case
        state.loading = true; // Set loading to true
      })
      .addCase(registerUser.fulfilled, (state) => { // Fulfilled case
        state.loading = false; // Set loading to false
        state.error = null; // Set error to null
        state.isRegistered = true; // Set isRegistered to true
      })
      .addCase(registerUser.rejected, (state, action) => { // Rejected case
        state.loading = false; // Set loading to false
        state.error.push(action.payload); // Add the error to the error array
      })
      .addCase(loginUser.pending, (state) => { // Pending case
        state.loading = true; // Set loading to true
      })
      .addCase(loginUser.fulfilled, (state, action) => { // Fulfilled case
        state.data = action.payload.userDetails; // Set user details
        state.authToken = action.payload.token; // Set token
        localStorage.setItem('userDetails',JSON.stringify(state.data)) // Set user details in local storage
        localStorage.setItem('token', state.authToken); // Set token in local storage
        state.loading = false; // Set loading to false
        state.error = null; // Set error to null
      })
      .addCase(loginUser.rejected, (state, action) => { // Rejected case
        state.loading = false; // Set loading to false
      })
        .addCase(updateUserAsync.pending, (state) => { // Pending case
            state.loading = true; // Set loading to true
        })
        .addCase(updateUserAsync.fulfilled, (state, action) => { // Fulfilled case
            state.loading = false; // Set loading to false
            state.data = action.payload.updatedUser; // Set user details
            localStorage.setItem('userDetails',JSON.stringify(state.data)) // Set user details in local storage
            localStorage.setItem('token', state.authToken); // Set token in local storage
            state.error = null; // Set error to null
        })
        .addCase(updateUserAsync.rejected, (state, action) => { // Rejected case
            state.loading = false; // Set loading to false
            state.error = [action.payload]; // Set error
        })
        .addCase(logoutUser, (state) => { // Logout user
            state.data = null; // Set user details to null
            state.authToken = null; // Set token to null
            localStorage.removeItem('userDetails'); // Remove user details from local storage
            localStorage.removeItem('token'); // Remove token from local storage
            state.isRegistered = false; // Set isRegistered to false
        })
  },
});

export const { logoutUser } = userSlice.actions;
export const { setErrors } = userSlice.actions;
export const selectUser = (state) => state.user;
export const selectIsRegistered = (state) => state.user.isRegistered;
const userReducer = userSlice.reducer;
export default userReducer;
