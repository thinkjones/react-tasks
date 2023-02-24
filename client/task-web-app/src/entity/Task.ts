export type TaskStatus = 'all' | 'completed' | 'todo';

export type TaskPriority = 'high' | 'medium' | 'low';

export interface TaskItem {
  id?: number;
  title: string;
  description?: string;
  dueAt?: string;
  priority: TaskPriority;
  completedAt?: string;
}

export interface TasksFilter {
  searchTerm?: string;
  status?: TaskStatus;
  dueAt?: string;
  priority?: TaskPriority;
}
