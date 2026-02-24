import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CircleCheckBig, FlagTriangleRight, ListTodo, Pencil, Trash2, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { removeTaskAsync } from '../../store/reducers/taskReducer';

const TaskCard = React.memo(({ task }) => {
  const dispatch = useDispatch();
  const notify = () => toast("Task deleted successfully");
  const [showModal, setShowModal] = React.useState(false);

  const completedSubtasks = task.subtasks?.filter(task => task.status === "Completed").length ?? 0;
  const totalSubtasks = task.subtasks?.length ?? 0;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const handleDelete = (taskId) => {
    dispatch(removeTaskAsync(taskId));
    notify();
    setShowModal(false); // Close modal after deletion
  };

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

  return (
    <div className="group relative overflow-hidden bg-white dark:bg-gray-800/50 border dark:border-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 border-gray-200">
      <div className={`absolute top-0 right-0 w-20 h-20 -translate-x-10 translate-y-[-40px] rotate-45 ${progressBarStyles[task.priority]} opacity-10`} />
      <div>
        <Link to={`/task/${task._id}`} className='flex flex-col space-y-4'>
            <div className={`w-fit rounded-full px-3 py-1 flex items-center gap-1.5 ring-1 ${priorityStyles[task.priority]}`}>
            <FlagTriangleRight className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{task.priority}</span>
            </div>
            <div>
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-1">
                {task.title.length <= 30 ? task.title : `${task.title.substring(0, 25)}...`}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
                {task.description.length <= 50 ? task.description : `${task.description.substring(0, 35)}...`}
            </p>
            </div>
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
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
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
            <details className="group">
                <summary className="flex items-center gap-2 cursor-pointer list-none text-sm font-medium text-gray-600 dark:text-gray-400">
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                Subtasks ({completedSubtasks}/{totalSubtasks})
                </summary>
                <ul className="mt-3 space-y-2 pl-6">
                {task.subtasks.map((stask) => (
                    <li key={stask._id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {stask.title.length <= 20 ? stask.title : `${stask.title.substring(0, 20)}...`}
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
            </details>
            )}
        </Link>
        <div className="flex gap-3 pt-2">
          <Link
            to={`/edit-task/${task._id}`}
            state={{ task: { task } }}
            className="flex-1"
          >
            <button className="w-full flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 px-4 py-2 rounded-xl transition-colors duration-200">
              <Pencil className="h-4 w-4" />
              <span>Edit</span>
            </button>
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-rose-100 hover:bg-rose-200 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400 dark:hover:bg-rose-900/50 px-4 py-2 rounded-xl transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
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
  );
});

export default TaskCard;
