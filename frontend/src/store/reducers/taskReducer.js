import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from '../../API/api'

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (_, thunkAPI) => { // thunkAPI is provided by createAsyncThunk
        try {
            const response = await apiClient.get('/api/tasks'); // Use the apiClient to make the request
            return response.data; // Return the response data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message); // Return the error message
        }
    }
);

// Async thunk for adding a task
export const addTaskAsync = createAsyncThunk(
    'tasks/addTask',
    async (taskData, thunkAPI) => { // thunkAPI is provided by createAsyncThunk
        try {
            const response = await apiClient.post('/api/tasks', taskData); // Use the apiClient to make the request
            return response.data; // Return the response data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data); // Return the error message
        }
    }
);

// Async thunk for updating a task
export const updateTaskAsync = createAsyncThunk(
    'tasks/updateTask',
    async ({ taskId, updates }, thunkAPI) => { // thunkAPI is provided by createAsyncThunk
        try {
            const response = await apiClient.put(`/api/tasks/${taskId}`, updates); // Use the apiClient to make the request
            return response.data; // Return the response data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message); // Return the error message
        }
    }
);

// Async thunk for removing a task
export const removeTaskAsync = createAsyncThunk(
    'tasks/removeTask',
    async (taskId, thunkAPI) => { // thunkAPI is provided by createAsyncThunk
        try {
            const response = await apiClient.delete(`/api/tasks/${taskId}`); // Use the apiClient to make the request
            return response.data; // Return the response data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data?.message); // Return the error message
        }
    }
);

const initialState = { // Initial state
    tasks: [], // Array to store tasks
    loading: false, // Boolean to indicate loading state
    error: null, // Error message
};

const taskSlice = createSlice({ // Create a slice
    name: 'tasks', // Name of the slice
    initialState, // Initial state
    reducers: { // Reducers
        clearTasks: (state) => { // Clear tasks
            state.tasks = []; // Clear the tasks array
        }
    },
    extraReducers: (builder) => { // Extra reducers
        builder 
            .addCase(fetchTasks.pending, (state) => { // Pending case
                state.loading = true; // Set loading to true
                state.error = null; // Set error to null
            })
            .addCase(fetchTasks.fulfilled, (state, action) => { // Fulfilled case
                state.loading = false; // Set loading to false
                state.tasks = action.payload; // Set tasks to the payload
            })
            .addCase(fetchTasks.rejected, (state, action) => { // Rejected case
                state.loading = false; // Set loading to false
                state.error = action.payload; // Set error to the payload
            })
            .addCase(addTaskAsync.pending, (state) => { // Pending case
                state.loading = true; // Set loading to true
                state.error = null; // Set error to null
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => { // Fulfilled case
                state.loading = false; // Set loading to false
                state.tasks.push(action.payload); // Add the new task to the tasks array
            })
            .addCase(addTaskAsync.rejected, (state, action) => { // Rejected case
                state.loading = false; // Set loading to false
                state.error = action.payload; // Set error to the payload
            })
            .addCase(updateTaskAsync.pending, (state) => { // Pending case
                state.loading = true; // Set loading to true
                state.error = null; // Set error to null
            })
            .addCase(updateTaskAsync.fulfilled, (state, action) => { // Fulfilled case
                state.loading = false; // Set loading to false
                const updatedTask = action.payload; // Get the updated task
                state.tasks = state.tasks.map(task => task._id === updatedTask._id ? updatedTask : task); // Update the task
            })
            .addCase(updateTaskAsync.rejected, (state, action) => { // Rejected case
                state.loading = false; // Set loading to false
                state.error = action.payload // Set error to the payload
            })
            .addCase(removeTaskAsync.pending, (state) => { // Pending case
                state.loading = true; // Set loading to true
                state.error = null; // Set error to null
            })
            .addCase(removeTaskAsync.fulfilled, (state, action) => { // Fulfilled case
                state.loading = false; // Set loading to false
                const deletedTask = action.payload; // Get the deleted task
                state.tasks = state.tasks.filter(task => task._id !== deletedTask._id); // Remove the task
            })
            .addCase(removeTaskAsync.rejected, (state, action) => { // Rejected case
                state.loading = false; // Set loading to false
                state.error = action.payload; // Set error to the payload
            });
    }
});

export const selectTasks = (state) => state.tasks;
export const { clearTasks } = taskSlice.actions;
const taskReducer = taskSlice.reducer;
export default taskReducer;
