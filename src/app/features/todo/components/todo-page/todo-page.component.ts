import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, signal, computed } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import type { Todo, TodoPageViewModel } from '../../models/todo.model';
import { COMMON_IMPORTS } from '../../../../shared';

const createTodo = (title: string): Todo => ({
  id: crypto.randomUUID(),
  title: title.trim(),
  completed: false,
  createdAt: new Date(),
});

const toggleTodo = (todo: Todo): Todo => ({
  ...todo,
  completed: !todo.completed,
});

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ...COMMON_IMPORTS, TodoItemComponent],
  templateUrl: './todo-page.component.html',
})
export class TodoPageComponent {
  private readonly _todos = signal<Todo[]>([]);
  readonly title = signal('');

  readonly vm = computed<TodoPageViewModel>(() => {
    const todoList = this._todos();
    const activeTodos = todoList.filter((todo) => !todo.completed);
    const completedTodos = todoList.filter((todo) => todo.completed);

    return {
      todoList,
      remainingCount: activeTodos.length,
      totalCount: todoList.length,
      hasCompletedTodos: completedTodos.length > 0,
      canAddTodo: this.title().trim().length > 0,
    };
  });

  readonly addTodo = (): void => {
    const title = this.title().trim();
    if (!title) return;

    this._todos.update((todos) => [...todos, createTodo(title)]);
    this.title.set('');
  };

  readonly onToggleTodo = (id: string): void => {
    this._todos.update((todos) =>
      todos.map((todo) => (todo.id === id ? toggleTodo(todo) : todo))
    );
  };

  readonly onRemoveTodo = (id: string): void => {
    this._todos.update((todos) => todos.filter((todo) => todo.id !== id));
  };

  readonly onClearCompleted = (): void => {
    this._todos.update((todos) => todos.filter((todo) => !todo.completed));
  };

  readonly onEnterKey = (): void => {
    this.addTodo();
  };
}
