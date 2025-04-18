import React from 'react';
import { Task } from '../services/api';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, data: { is_completed: boolean }) => Promise<void>;
  onEdit: (task: Task) => void;
  isLoading: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onDelete, 
  onUpdate, 
  onEdit,
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-pulse text-gray-400">Loading tasks...</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-md p-6 text-center">
        <p className="text-gray-400">No tasks found. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};