import React, { useState } from 'react';
import { CreateTaskData, UpdateTaskData, Task } from '../services/api';

interface TaskFormProps {
  onSubmit: (data: CreateTaskData | UpdateTaskData) => Promise<void>;
  initialData?: Task;
  buttonText: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({ 
  onSubmit, 
  initialData, 
  buttonText 
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [isCompleted, setIsCompleted] = useState(initialData?.is_completed || false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await onSubmit({ 
        title, 
        description: description || undefined,
        is_completed: isCompleted 
      });
      
      // Reset form if creating a new task
      if (!initialData) {
        setTitle('');
        setDescription('');
        setIsCompleted(false);
      }
    } catch (err) {
      setError('Failed to save task. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Task title"
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-700 bg-gray-800 text-gray-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Task description (optional)"
        />
      </div>
      
      <div className="flex items-center">
        <input
          id="is_completed"
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
          className="h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-gray-800"
        />
        <label htmlFor="is_completed" className="ml-2 block text-sm text-gray-300">
          Mark as completed
        </label>
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : buttonText}
        </button>
      </div>
    </form>
  );
};