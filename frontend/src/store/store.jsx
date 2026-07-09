import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import taskReducer from './reducers/taskReducer';

const store = configureStore({ // Configure the Redux store
  reducer: { // Define the reducers
    user: userReducer, // Define the user reducer
    tasks: taskReducer, // Define the tasks reducer
  }
});

export default store;
