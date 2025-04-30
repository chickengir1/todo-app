import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import type { Todo } from '../../models/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';

function getActiveTodos(todos: Todo[]) {
  return todos.filter((todo) => !todo.completed);
}

function isTrimmed(value: string) {
  return value.trim() !== '';
}

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  templateUrl: './todo-page.component.html',
})
export class TodoPageComponent {
  todoService = inject(TodoService);

  title = signal<string>('');

  hasCompletedTodos = computed(() => {
    const currentList = this.todoService.getTodos();
    const remaining = getActiveTodos(currentList).length;
    return remaining !== currentList.length && currentList.length > 0;
  });

  addTodo() {
    const value = this.title();
    if (isTrimmed(value)) this.todoService.add(value);
    if (isTrimmed(value)) this.title.set('');
  }

  toggleTodo(id: string) {
    this.todoService.toggle(id);
  }

  removeTodo(id: string) {
    this.todoService.remove(id);
  }

  clearCompletedTodos() {
    this.todoService.clearCompleted();
  }
}
