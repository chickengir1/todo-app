import { Component, input } from '@angular/core';

@Component({
  selector: 'app-clipboard-icon',
  standalone: true,
  template: `
    <svg
      [class]="class()"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        [attr.stroke-width]="strokeWidth()"
        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  `,
})
export class ClipboardIconComponent {
  readonly class = input<string>('w-12 h-12');
  readonly strokeWidth = input<number>(2);
}
