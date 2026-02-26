# ✅ Task Manager Application

A full-stack task management application built using the MERN stack, featuring secure JWT authentication, protected REST APIs, schema validation, user-specific task isolation, and a modern responsive UI.

This project demonstrates clean backend architecture, secure authentication design, input validation, centralized error handling, and production-level frontend state management.

---

# 🚀 Features

### 🔐 Authentication & Security
- JWT-based authentication
- Secure password hashing using bcrypt
- Protected API routes via authentication middleware
- Environment-based configuration
- Secure token validation on each protected request

### 📝 Task Management
- Create, Read, Update, Delete (CRUD) operations
- User-specific task isolation (multi-user secure architecture)
- Task status updates (e.g., completed / pending)
- Optimized database queries
- Input validation using Zod
- Structured API response handling

### 🧠 State & UX
- Global state management using Redux Toolkit
- Form handling with React Hook Form
- Axios-based API communication
- Toast notifications for real-time feedback
- Fully responsive UI using Tailwind CSS
- Client-side route protection using React Router

---

# 🏗️ System Architecture

## Backend Architecture

- RESTful API built with Express.js
- MongoDB database with Mongoose schema modeling
- JWT-based stateless authentication
- Zod schema validation for request payloads
- Middleware-based authentication and error handling
- Modular folder structure (controllers, routes, models, middleware)
- Centralized error handling mechanism

## Frontend Architecture

- React.js Single Page Application (Vite)
- Redux Toolkit for predictable global state management
- React Hook Form for optimized form validation
- Axios for API requests with token-based authentication
- Component-based reusable UI structure
- Responsive design with Tailwind CSS

---

# 🔄 Application Flow

### Authentication Flow
1. User registers or logs in  
2. JWT token generated and returned  
3. Token stored securely on client  
4. Protected routes validate JWT on each request  

### Task Flow
1. Authenticated user creates a task  
2. Task stored with user reference in MongoDB  
3. User fetches only their tasks  
4. Update/Delete operations restricted to task owner  
5. All requests validated using Zod before database interaction  

---

# 🧠 Tech Stack

## Frontend
- React.js  
- Vite  
- Tailwind CSS  
- Redux Toolkit  
- React Hook Form  
- Axios  
- React Router DOM  

## Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT Authentication  
- bcrypt  
- Zod Validation   

---

# 🔐 Security Features

- Password hashing with bcrypt + configurable salt rounds  
- JWT-based stateless authentication  
- Protected REST endpoints via middleware  
- User-specific data isolation  
- Input validation using Zod schemas  
- Centralized error handling  
- Environment variable protection  

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend directory:

```env
# Server
PORT=3000

# Database
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret
SALT_ROUNDS=10
```

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:3000
```

---

# 🛠️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/task-manager-application.git
cd task-manager-application
```

## 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

## 3️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## 4️⃣ Run Application

Start backend:

```bash
cd ../backend
npm run dev
```

Start frontend:

```bash
cd ../frontend
npm run dev
```

---

# 🌍 Deployment

- Frontend deployed on Vercel
- Backend deployed on Render

