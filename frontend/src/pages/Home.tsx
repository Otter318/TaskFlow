import React, { useState, useEffect } from 'react';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { Task, taskApi, CreateTaskData, UpdateTaskData } from '../services/api';

export const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    try {
      const data = await taskApi.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (data: CreateTaskData) => {
    const newTask = await taskApi.createTask(data);
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const handleUpdateTask = async (id: number, data: UpdateTaskData) => {
    const updatedTask = await taskApi.updateTask(id, data);
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? updatedTask : task))
    );
  };

  const handleDeleteTask = async (id: number) => {
    await taskApi.deleteTask(id);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitEdit = async (data: UpdateTaskData) => {
    if (editingTask) {
      await handleUpdateTask(editingTask.id, data);
      setEditingTask(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-6">
          {editingTask ? 'Edit Task' : 'Create New Task'}
        </h1>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md">
          {editingTask ? (
            <>
              <TaskForm
                onSubmit={handleSubmitEdit}
                initialData={editingTask}
                buttonText="Update Task"
              />
              <button
                onClick={handleCancelEdit}
                className="mt-4 inline-flex justify-center rounded-md border border-gray-600 bg-gray-700 py-2 px-4 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <TaskForm onSubmit={handleCreateTask} buttonText="Add Task" />
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Your Tasks</h2>
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          onEdit={handleEditTask}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
