import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Stats from './Stats';

const Dashboard: React.FC = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <Stats />
          
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTaskForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Add New Task
            </motion.button>
          </div>

          <TaskList />
        </motion.div>
      </main>

      <TaskForm
        isOpen={showTaskForm}
        onClose={() => setShowTaskForm(false)}
      />
    </div>
  );
};

export default Dashboard;