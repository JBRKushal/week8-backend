import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Edit2, Trash2, Clock, CheckCircle } from 'lucide-react';
import { useTask, Task } from '../../contexts/TaskContext';
import TaskForm from './TaskForm';
import { toast } from 'react-toastify';

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { toggleTask, deleteTask } = useTask();

  const handleToggle = async () => {
    try {
      await toggleTask(task.id);
      toast.success(task.completed ? 'Task marked as pending' : 'Task completed!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id);
        toast.success('Task deleted successfully');
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={`group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 ${
          task.completed ? 'opacity-75' : ''
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggle}
              className={`mt-1 p-1 rounded-full transition-colors ${
                task.completed
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-600'
              }`}
            >
              {task.completed ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <div className="h-5 w-5 border-2 border-current rounded-full" />
              )}
            </motion.button>

            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg font-medium transition-all duration-200 ${
                  task.completed
                    ? 'text-gray-500 line-through'
                    : 'text-gray-900'
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={`mt-1 text-sm transition-all duration-200 ${
                    task.completed ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {task.description}
                </p>
              )}
              <div className="flex items-center mt-3 text-xs text-gray-500 space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Created {formatDate(task.created_at)}</span>
                </div>
                {task.updated_at !== task.created_at && (
                  <div className="flex items-center space-x-1">
                    <Edit2 className="h-3 w-3" />
                    <span>Updated {formatDate(task.updated_at)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowEditForm(true)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit2 className="h-4 w-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <TaskForm
        isOpen={showEditForm}
        onClose={() => setShowEditForm(false)}
        task={task}
      />
    </>
  );
};

export default TaskCard;