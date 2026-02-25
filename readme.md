# Task Manager Application

A full-stack task management platform featuring secure authentication, protected APIs, and a modern responsive user interface.

## Overview

This application demonstrates real-world MERN stack development with a focus on scalability, clean architecture, authentication, and performance.

It allows users to securely register, log in, and manage their personal tasks with full CRUD functionality.

## Key Features

- User authentication and authorization using JWT  
- Secure password hashing using bcrypt  
- Protected routes with authentication middleware  
- Task CRUD operations (Create, Read, Update, Delete)  
- User-specific task isolation  
- Input validation using Zod  
- Centralized error handling  
- Responsive UI for all screen sizes  
- Redux Toolkit state management  
- Toast notifications for better UX  

## Tech Stack

### Frontend

- React.js  
- Vite  
- Tailwind CSS  
- Redux Toolkit  
- React Hook Form  
- Axios  
- React Router DOM  

### Backend

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT Authentication  
- Zod Validation  
- Jest  
- Supertest  

## System Design

- RESTful API architecture  
- Authentication middleware for protected endpoints  
- MongoDB schema modeling with Mongoose  
- Centralized error handling middleware  
- Modular folder structure (controllers, routes, middleware, models)  

## Architecture Overview

- REST-based backend using Express and MongoDB  
- Token-based authentication using JWT  
- Secure password hashing using bcrypt  
- Client-server communication via Axios  
- Environment-based configuration for development and production  
- Deployed frontend and backend on separate cloud platforms  

## Environment Variables

Create a `.env` file in the backend directory:

### Backend

```
# Server
PORT=5000

# Database
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret
SALT_ROUNDS=10
```

### Frontend

Create a `.env` file in the client directory:

```
VITE_API_URL=http://localhost:5000
```

## Setup Instructions

```
git clone https://github.com/pnaik-dev/Task-Manager-Application.git
cd Task-Manager-Application
```

### Backend Setup

```
cd backend
npm install
npm run dev
```

### Frontend Setup

```
cd client
npm install
npm run dev
```

## API Structure

### Authentication Routes

- POST /api/user/signup  
- POST /api/user/signin  

### Task Routes (Protected)

- GET /api/tasks  
- GET /api/tasks/:taskId  
- POST /api/tasks  
- PATCH /api/tasks/:taskId  
- DELETE /api/tasks/:taskId  

## Deployment

- Frontend deployed on Vercel  
- Backend deployed on Render  
- Database hosted on MongoDB Atlas  

## Live Demo

https://task-manager-rust-three.vercel.app/

### Test Credentials

Email: testuser@gmail.com  
Password: Test@123  