export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoPageViewModel {
  title: string;
  todoList: Todo[];
  activeTodos: Todo[];
  completedTodos: Todo[];
  remainingCount: number;
  totalCount: number;
  hasCompletedTodos: boolean;
  isEmpty: boolean;
  canAddTodo: boolean;
}
