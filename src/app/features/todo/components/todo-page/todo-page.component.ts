import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { toSignal } from '@angular/core/rxjs-interop';
import type { Todo } from '../../models/todo.model';

interface CheckTodoArgs {
  todoList: Todo[];
  remainingCount: number;
}

interface AddTodoArgs {
  title: string;
  todoService: TodoService;
}

function checkHasCompletedTodos({ todoList, remainingCount }: CheckTodoArgs) {
  return todoList.length > 0 && remainingCount !== todoList.length;
}

function handleAddTodo({ title, todoService }: AddTodoArgs) {
  const trimmedTitle = title.trim();

  if (!trimmedTitle) return title;

  todoService.add(trimmedTitle);

  return '';
}

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  templateUrl: './todo-page.component.html',
})
export class TodoPageComponent {
  todoService = inject(TodoService);

  title = signal('');

  todoList = toSignal(this.todoService.todoList$, { initialValue: [] });

  remainingCount = toSignal(this.todoService.remainingCount$, {
    initialValue: 0,
  });

  hasCompletedTodos = computed(() =>
    checkHasCompletedTodos({
      todoList: this.todoList(),
      remainingCount: this.remainingCount(),
    })
  );

  addTodo() {
    this.title.set(
      handleAddTodo({
        title: this.title(),
        todoService: this.todoService,
      })
    );
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
