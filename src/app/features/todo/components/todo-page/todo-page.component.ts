import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { CheckCircleIconComponent } from '../../../../shared/components/icons/check-circle-icon.component';
import { ClipboardIconComponent } from '../../../../shared/components/icons/clipboard-icon.component';
import { TrashIconComponent } from '../../../../shared/components/icons/trash-icon.component';
import type { Todo, TodoPageViewModel } from '../../models/todo.model';

function getActiveTodos(todos: Todo[]): Todo[] {
  return todos.filter((todo) => !todo.completed);
}

function getTodoById(todos: Todo[], id: string): Todo | undefined {
  return todos.find((todo) => todo.id === id);
}

function excludeTodoById(todos: Todo[], id: string): Todo[] {
  return todos.filter((todo) => todo.id !== id);
}

function createTodo(title: string): Todo {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date(),
  };
}

function toggleTodo(todo: Todo): Todo {
  return {
    ...todo,
    completed: !todo.completed,
  };
}

function updateTodo(
  todos: Todo[],
  id: string,
  updater: (todo: Todo) => Todo
): Todo[] {
  return todos.map((todo) => (todo.id === id ? updater(todo) : todo));
}

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TodoItemComponent,
    CheckCircleIconComponent,
    ClipboardIconComponent,
    TrashIconComponent,
  ],
  templateUrl: './todo-page.component.html',
})
export class TodoPageComponent {
  private readonly _todos = signal<Todo[]>([]);
  readonly title = signal('');

  readonly vm = computed<TodoPageViewModel>(() => {
    const title = this.title();
    const todoList = this._todos();
    const activeTodos = getActiveTodos(todoList);
    const completedTodos = todoList.filter((todo) => todo.completed);
    const remainingCount = activeTodos.length;
    const totalCount = todoList.length;
    const hasCompletedTodos = completedTodos.length > 0;
    const isEmpty = todoList.length === 0;
    const canAddTodo = title.trim().length > 0;

    return {
      title,
      todoList,
      activeTodos,
      completedTodos,
      remainingCount,
      totalCount,
      hasCompletedTodos,
      isEmpty,
      canAddTodo,
    };
  });

  private readonly actions = {
    addTodo: (): void => {
      const title = this.title().trim();
      if (!title) return;

      const newTodo = createTodo(title);
      this._todos.update((todos) => [...todos, newTodo]);
      this.title.set('');
    },

    toggleTodo: (id: string): void => {
      const currentTodos = this._todos();
      const todo = getTodoById(currentTodos, id);

      if (!todo) return;

      this._todos.set(updateTodo(currentTodos, id, toggleTodo));
    },

    removeTodo: (id: string): void => {
      this._todos.update((todos) => excludeTodoById(todos, id));
    },

    clearCompleted: (): void => {
      this._todos.update((todos) => getActiveTodos(todos));
    },

    clearAll: (): void => {
      this._todos.set([]);
    },

    updateTodo: (
      id: string,
      updates: Partial<Omit<Todo, 'id' | 'createdAt'>>
    ): void => {
      this._todos.update((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
      );
    },

    onEnterKey: (): void => {
      this.actions.addTodo();
    },
  };

  readonly addTodo = this.actions.addTodo;
  readonly onToggleTodo = this.actions.toggleTodo;
  readonly onRemoveTodo = this.actions.removeTodo;
  readonly onClearCompleted = this.actions.clearCompleted;
  readonly onEnterKey = this.actions.onEnterKey;
}
