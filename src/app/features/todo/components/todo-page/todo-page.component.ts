import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  templateUrl: './todo-page.component.html',
})
export class TodoPageComponent {
  title = signal<string>('');

  constructor(public todoService: TodoService) {}

  addTodo() {
    const value = this.title();

    const resetAndAdd = () => {
      this.title.set('');
      this.todoService.add(value);
    };

    if (value.trim()) resetAndAdd();
  }
}
