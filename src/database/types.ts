export interface User {
  id: number;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface Todo {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  status: 'todo' | 'doing' | 'completed';
  created_at: Date;
  updated_at: Date;
}
