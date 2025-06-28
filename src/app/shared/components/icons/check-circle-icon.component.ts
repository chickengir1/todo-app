import { Component, input } from '@angular/core';

@Component({
  selector: 'app-check-circle-icon',
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
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  `,
})
export class CheckCircleIconComponent {
  readonly class = input<string>('w-4 h-4');
  readonly strokeWidth = input<number>(2);
}
