import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { updateTaskAsync, selectTasks } from "../store/reducers/taskReducer";
import { toast } from "react-toastify";

// EditTask component
const EditTask = () => {
    const { taskId } = useParams(); // Get task ID from URL
    const { state } = useLocation(); // Get state from location
    const { task: initialTask } = state.task || { task: null }; // Get task from state
    const { error } = useSelector(selectTasks); // Access the error from the Redux store
    const navigate = useNavigate(); // Get the navigate function
    const dispatch = useDispatch(); // Get the dispatch function

    const [task, setTask] = useState({ // Initialize the task state
        title: "",
        description: "",
        priority: "Medium",
        subtasks: [{ title: "", status: "Pending" }],
        deadLine: "",
    });

    useEffect(() => { // Update the task state
        if (initialTask) { // If initial task is available
            setTask({ // Update the task state
                ...initialTask, // Spread the initial task
                deadLine: initialTask.deadLine ? new Date(initialTask.deadLine).toISOString().split('T')[0] : '', // Convert date to string
            });
        }
    }, [initialTask]); // Run the effect when initial task changes

    const handleChange = (e) => { // Handle form input changes
        if (!e || !e.target) return; // If no event or target, return
        const { name, value } = e.target; // Get input name and value
 
        setTask((prevTask) => { // Update the task state
            let updatedValue = value; // Updated value
            if (name === "deadLine") { // If name is deadLine
                const selectedDate = new Date(value); // Get selected date
                const today = new Date(); // Get today's date
                today.setHours(0, 0, 0, 0); // Set time to 00:00:00
                if (selectedDate < today) { // If selected date is before today
                    alert("Please select a future date or today."); // Show alert
                    updatedValue = prevTask.deadLine; // Set updated value to previous value
                }
            }
            return { ...prevTask, [name]: updatedValue }; // Return updated task
        });
    };

    const handleSubtaskChange = (index, field, value) => { // Handle subtask input changes
        const updatedSubtasks = [...task.subtasks]; // Create a copy of subtasks
        updatedSubtasks[index][field] = value; // Update the field
        setTask((prevTask) => ({ ...prevTask, subtasks: updatedSubtasks })); // Update the task state
    };

    const addSubtask = () => { // Function to add a subtask
        setTask({ // Update the task state
            ...task, // Spread the previous task state
            subtasks: [...task.subtasks, { title: "", status: "Pending" }], // Add a new subtask
        });
    };

    const removeSubtask = (index) => { // Function to remove a subtask
        const updatedSubtasks = task.subtasks.filter((_, i) => i !== index); // Filter out the subtask to be removed
        setTask({ ...task, subtasks: updatedSubtasks }); // Update the task state
    };

    const handleSubmit = async (e) => { // Handle form submission
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            await dispatch(updateTaskAsync({ taskId, updates: task })).unwrap(); // Dispatch the updateTaskAsync action
            toast.success("Task updated successfully!"); // Show success message
            navigate("/"); // Navigate to the home page
        } catch (err) {
            toast.error(`Failed to update task.${err} `); // Show error message
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                        Edit Task
                    </h2>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={task.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                                name="title"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent rounded-xl"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Description
                            </label>
                            <textarea
                                value={task.description}
                                onChange={handleChange}
                                placeholder="Enter task description"
                                name="description"
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                                rows="4"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Priority
                            </label>
                            <select
                                value={task.priority}
                                onChange={(e) => setTask({ ...task, priority: e.target.value })}
                                name="priority"
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center justify-between mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 sm:mb-0">
                                    Subtasks
                                </label>
                                <button
                                    type="button"
                                    onClick={addSubtask}
                                    className="inline-flex items-center text-sm bg-blue-100 hover:bg-blue-200 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 px-4 py-2 rounded-xl transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add Subtask
                                </button>
                            </div>

                            <div className="space-y-3">
                                {task.subtasks.map((subtask, index) => (
                                    <div key={index} className="flex flex-wrap gap-2">
                                        <input
                                            type="text"
                                            value={subtask.title}
                                            onChange={(e) =>
                                                handleSubtaskChange(index, 'title', e.target.value)
                                            }
                                            placeholder="Subtask title"
                                            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                                            required
                                        />
                                        <select
                                            value={subtask.status}
                                            onChange={(e) =>
                                                handleSubtaskChange(index, 'status', e.target.value)
                                            }
                                            className="w-full sm:w-32 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                        <button
                                            type="button"
                                            onClick={() => removeSubtask(index)}
                                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full px-3 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Deadline
                            </label>
                            <input
                                type="date"
                                value={task.deadLine}
                                onChange={handleChange}
                                name="deadLine"
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            Update Task
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditTask;
