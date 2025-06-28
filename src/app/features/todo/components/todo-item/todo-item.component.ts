import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  readonly todo = input.required<Todo>();
  readonly toggle = output<string>();
  readonly remove = output<string>();

  readonly onToggle = (): void => this.toggle.emit(this.todo().id);
  readonly onRemove = (): void => this.remove.emit(this.todo().id);
}
