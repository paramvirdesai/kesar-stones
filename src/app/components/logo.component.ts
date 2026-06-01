import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  template: `
    <!-- TODO: Replace with official SVG logo from assets folder once received -->
    <svg
      class="h-10 w-10 shrink-0"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="4" class="fill-current opacity-10" />
      <path
        d="M8 36L16 12H20L28 36H24L22.2 30.4H13.8L12 36H8ZM14.8 26.8H21.2L18 16.4L14.8 26.8Z"
        class="fill-current"
      />
      <path d="M30 12H34V36H30V12Z" class="fill-current" />
    </svg>
  `
})
export class LogoComponent {}
