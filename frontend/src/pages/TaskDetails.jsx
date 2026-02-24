import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, selectTasks, removeTaskAsync } from '../store/reducers/taskReducer';
import { Calendar, CircleCheckBig, FlagTriangleRight, ListTodo, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const TaskDetail = () => {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tasks } = useSelector(selectTasks);
    const [task, setTask] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!tasks || tasks.length === 0) {
            dispatch(fetchTasks());
        }
    }, [dispatch, tasks]);

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            const foundTask = tasks.find(task => task._id === taskId);
            setTask(foundTask);
        }
    }, [tasks, taskId]);

    if (!task) {
        return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">Loading...</div>;
    }

    const completedSubtasks = task.subtasks?.filter(task => task.status === "Completed").length ?? 0;
    const totalSubtasks = task.subtasks?.length ?? 0;
    const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

    const priorityStyles = {
        High: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 ring-rose-500/20',
        Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 ring-amber-500/20',
        Low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 ring-emerald-500/20',
    };

    const progressBarStyles = {
        High: 'bg-rose-500 dark:bg-rose-400',
        Medium: 'bg-amber-500 dark:bg-amber-400',
        Low: 'bg-emerald-500 dark:bg-emerald-400',
    };

    const handleDelete = async (taskId) => {
        try {
            await dispatch(removeTaskAsync(taskId)).unwrap();
            toast.success("Task deleted successfully!");
            // Fetch tasks again after deletion
            await dispatch(fetchTasks()).unwrap();
            navigate("/");
        } catch (error) {
            console.error("Failed to delete task:", error);
            toast.error("Failed to delete task.");
        }
        setShowModal(false);
    };


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <div className={`w-fit rounded-full px-3 py-1 flex items-center gap-1.5 ring-1 ${priorityStyles[task.priority]}`}>
                        <FlagTriangleRight className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium">{task.priority}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-2">{task.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{task.description}</p>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                {completedSubtasks === totalSubtasks && totalSubtasks > 0 ? (
                                    <CircleCheckBig className="h-4 w-4 text-emerald-500" />
                                ) : (
                                    <ListTodo className="h-4 w-4 text-gray-400" />
                                )}
                                <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                {completedSubtasks}/{totalSubtasks}
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                                style={{ width: `${progress}%` }}
                                className={`h-full rounded-full transition-all duration-300 ${progressBarStyles[task.priority]}`}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-4">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                            Due: {new Date(task.deadLine).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </span>
                    </div>
                    {task.subtasks && task.subtasks.length > 0 && (
                        <div className="mt-4">
                            <h6 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Subtasks ({completedSubtasks}/{totalSubtasks})</h6>
                            <ul className="space-y-2 pl-2">
                                {task.subtasks.map((stask) => (
                                    <li key={stask._id} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {stask.title}
                                        </span>
                                        <span className={`px-2 py-1 rounded-xl text-xs font-medium ${
                                            stask.status === 'Completed'
                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                        }`}>
                                            {stask.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="flex justify-start gap-5 mt-6">
                        <button
                            onClick={() => navigate(`/edit-task/${task._id}`, { state: { task: { task } } })}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-xl transition-colors"
                        >
                            <Pencil className="h-4 w-4" />
                            Edit
                        </button>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-900/50 rounded-xl transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </button>
                    </div>
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confirm Delete</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">Are you sure you want to delete this task?</p>
                                <div className="flex justify-end gap-4">
                                    <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                                    <button onClick={() => handleDelete(task._id)} className="px-4 py-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition-colors">Delete</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
