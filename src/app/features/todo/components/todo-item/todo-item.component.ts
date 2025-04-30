import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;

  @Output() toggle = new EventEmitter<string>();

  @Output() remove = new EventEmitter<string>();
}
