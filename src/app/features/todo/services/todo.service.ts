import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Todo } from '../models/todo.model';

function getActiveTodos(todos: Todo[]) {
  return todos.filter((todo) => !todo.completed);
}

function getTodoById(todos: Todo[], id: string) {
  return todos.find((todo) => todo.id === id);
}

function excludeTodoById(todos: Todo[], id: string) {
  return todos.filter((todo) => todo.id !== id);
}

function createTodo(title: string) {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date(),
  };
}

function toggleTodo(todo: Todo) {
  return {
    ...todo,
    completed: !todo.completed,
  };
}

function updateTodo(todos: Todo[], id: string, updater: (todo: Todo) => Todo) {
  return todos.map((todo) => (todo.id === id ? updater(todo) : todo));
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly todos$ = new BehaviorSubject<Todo[]>([]);

  readonly todoList$: Observable<Todo[]> = this.todos$.asObservable();
  readonly remainingCount$: Observable<number> = this.todoList$.pipe(
    map((todos) => getActiveTodos(todos).length)
  );

  getTodos() {
    return this.todos$.value;
  }

  add(title: string) {
    const newTodo = createTodo(title);
    this.todos$.next([...this.todos$.value, newTodo]);
  }

  toggle(id: string) {
    const currentTodos = this.todos$.value;
    const todo = getTodoById(currentTodos, id);

    if (!todo) return;

    this.todos$.next(updateTodo(currentTodos, id, toggleTodo));
  }

  remove(id: string) {
    this.todos$.next(excludeTodoById(this.todos$.value, id));
  }

  clearCompleted() {
    this.todos$.next(getActiveTodos(this.todos$.value));
  }
}
