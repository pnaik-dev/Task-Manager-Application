import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/layout/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import Tasks from './pages/AddTask'
import EditTask from './pages/EditTask'
import Profile from './pages/Profile'
import TaskDetails from './pages/TaskDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
        <Navbar/>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            className="w-full sm:w-auto"
        />
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<Register/>} />
            <Route path="/signin" element={<Login/>} />
            <Route path="/add-task" element={<Tasks/>} />
            <Route path="/edit-task/:taskId" element={<EditTask />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/task/:taskId" element={<TaskDetails />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
