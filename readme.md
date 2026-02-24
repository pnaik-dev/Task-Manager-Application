# 🚀 Task Manager 🚀

Welcome to the Task Manager! This project is a RESTful API built with Node.js and Express, designed to manage tasks efficiently. It allows users to create, read, update, and delete tasks, while also providing user authentication and validation.

## 🌐 Live Demo

You can view the live version of the Task Manager at the following link:
[Task Manager Live Demo](https://task-manager-rust-three.vercel.app/)
[Test user details]: 
email: testuser@gmail.com
password: Test@123

## 📑 Table of Contents

- [Features](#features)
- [🛠️ Technologies Used](#technologies-used)
- [⚙️ Installation](#installation)
- [🚀 Usage](#usage)
- [📍 API Endpoints](#api-endpoints)
- [🧪 Testing](#testing)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

## ✨ Features

### Backend
- User authentication (signup and signin)
- Task management (CRUD operations)
- Input validation using Zod
- Error handling middleware
- Unit testing with Jest

### Frontend
- Responsive UI built with React and Vite
- State management using Redux Toolkit
- Form handling with React Hook Form
- Toast notifications for user feedback
- Dark mode support

## 🛠️ Technologies Used

### Backend
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js, used to build the API.
- **MongoDB**: NoSQL database for storing user and task data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Zod**: Schema validation library for input validation.
- **Jest**: Testing framework for running unit tests.
- **Supertest**: Library for testing HTTP servers.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Vite**: Build tool that provides a fast development environment.
- **Redux Toolkit**: For state management.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: For making HTTP requests.
- **React Router**: For routing in the application.
- **React Hook Form**: For handling form state and validation.
- **React Toastify**: For displaying notifications.

## ⚙️ Installation

To get started with the project, follow these steps:

### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-manager-server.git
   ```

2. Navigate to the project directory:
   ```bash
   cd task-manager-server
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:
   ```
   PORT=your_port
   MONGO_URI=your_mongo_uri
   SALT_ROUNDS=10
   JWT_SECRET=your_jwt_secret
   ```

### Frontend
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory and add your environment variables:
   ```
   VITE_BACK_END_URL=http://localhost:your_backend_port
   ```

## 🚀 Usage

### Backend
To start the server, run the following command from the backend directory:

```bash
npm run dev
```

The frontend will be running on `http://localhost:5173` by default.

## 📍 API Endpoints

### User Routes
- **POST /api/user/signup**: Register a new user.
- **POST /api/user/signin**: Authenticate a user and return a JWT.
- **GET /api/user**: Retrieve all users.

### Task Routes
- **GET /api/tasks**: Get all tasks for the authenticated user.
- **GET /api/tasks/:taskId**: Get a specific task by ID.
- **POST /api/tasks**: Create a new task.
- **PATCH /api/tasks/:taskId**: Update an existing task.
- **DELETE /api/tasks/:taskId**: Delete a task.

## 🧪 Testing

To run the tests for the backend, use the following command:
``` bash
npm test
```
This will execute all the tests defined in the `__test__` directory.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Thank you for checking out the Task Manager Server! If you have any questions or feedback, feel free to reach out.
