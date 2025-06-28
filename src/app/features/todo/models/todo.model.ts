export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoPageViewModel {
  todoList: Todo[];
  remainingCount: number;
  totalCount: number;
  hasCompletedTodos: boolean;
  canAddTodo: boolean;
}
