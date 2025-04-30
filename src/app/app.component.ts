import { Component } from '@angular/core';
import { TodoPageComponent } from './features/todo/components/todo-page/todo-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoPageComponent],
  template: `<app-todo-page></app-todo-page>`,
})
export class AppComponent {
  title = 'todo-app';
}
