import React, { useState } from 'react';
import { Task } from '../services/api';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, data: { is_completed: boolean }) => Promise<void>;
  onEdit: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onDelete, 
  onUpdate,
  onEdit 
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await onDelete(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      await onUpdate(task.id, { is_completed: !task.is_completed });
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={`bg-gray-800 border ${task.is_completed ? 'border-green-600/30' : 'border-gray-700'} rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={handleToggleComplete}
            disabled={isUpdating}
            className="h-4 w-4 rounded border-gray-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-gray-800"
          />
          <div className="flex-1">
            <h3 className={`text-lg font-medium ${task.is_completed ? 'text-gray-400 line-through' : 'text-white'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`mt-1 text-sm ${task.is_completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                {task.description}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              Created: {new Date(task.created_at).toLocaleString()}
              {task.updated_at && ` | Updated: ${new Date(task.updated_at).toLocaleString()}`}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="rounded-md bg-gray-700 px-2.5 py-1.5 text-sm font-medium text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded-md bg-red-700 px-2.5 py-1.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};