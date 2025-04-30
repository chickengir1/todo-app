import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // ★ 추가
import type { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule], // ★ CommonModule 등록
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;

  @Output() toggle = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
}
