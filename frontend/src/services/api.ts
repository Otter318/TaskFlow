import axios from 'axios';

export interface Task {
  id: number;
  title: string;
  description: string | null;
  is_completed: boolean;
  created_at: string;
  updated_at: string | null;
  user_id: number;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  is_completed?: boolean;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  is_completed?: boolean;
}

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    const response = await axios.get('/tasks/');
    return response.data;
  },
  
  getTask: async (id: number): Promise<Task> => {
    const response = await axios.get(`/tasks/${id}`);
    return response.data;
  },
  
  createTask: async (data: CreateTaskData): Promise<Task> => {
    const response = await axios.post('/tasks/', data);
    return response.data;
  },
  
  updateTask: async (id: number, data: UpdateTaskData): Promise<Task> => {
    const response = await axios.put(`/tasks/${id}`, data);
    return response.data;
  },
  
  deleteTask: async (id: number): Promise<void> => {
    await axios.delete(`/tasks/${id}`);
  }
};

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const authApi = {
  register: async (data: RegisterData) => {
    const response = await axios.post('/users/', data);
    return response.data;
  }
};

const API_URL = import.meta.env.VITE_API_URL || 'https://taskmanager-backend.fly.dev';