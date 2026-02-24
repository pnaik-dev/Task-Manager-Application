import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, selectTasks, clearTasks } from '../store/reducers/taskReducer';
import { selectUser } from '../store/reducers/userReducer';
import TaskCard from '../components/tasks/TaskCard';

export default function Homepage() {
  const { tasks } = useSelector(selectTasks);
  const { authToken } = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if(authToken){
        dispatch(fetchTasks());
    }
    else{
        dispatch(clearTasks())
    }
  }, [dispatch, authToken]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mx-5">
      <div className="max-w-5xl container mx-auto mt-5">
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Task Management
            </h1>
            <Link
              to="/add-task"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-xl transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
              Add Task
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Active Tasks
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {tasks?.length || 0}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Completed Tasks
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {tasks?.filter(task => task.subtasks?.every(subtask => subtask.status === 'Completed')).length || 0}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Pending Tasks
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {tasks?.filter(task => task.subtasks?.some(subtask => subtask.status === 'Pending')).length || 0}
            </div>
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks?.map(task => (
            <TaskCard key={task._id} task={task} />
          ))}
          {!tasks?.length && (
            <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="text-gray-500 dark:text-gray-400 mb-4">
                No tasks found
              </div>
              <Link
                to="/add-task"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-xl"
              >
                Create your first task
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
