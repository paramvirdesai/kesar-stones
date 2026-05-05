import { Component, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  template: `
    <header
      class="fixed top-0 z-50 w-full border-b backdrop-blur-md transition-all duration-500"
      [ngClass]="isSolid ? 'border-stonebrand-300/40 bg-white/92' : 'border-white/10 bg-black/10'"
    >
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <a routerLink="/" class="text-xl font-semibold tracking-wide" [class.text-white]="!isSolid" [class.text-stonebrand-900]="isSolid">Marble & Granite Atelier</a>
        <div class="flex gap-4 text-sm font-medium">
          <a routerLink="/" routerLinkActive="text-stonebrand-900" [routerLinkActiveOptions]="{ exact: true }" class="transition" [class.text-white]="!isSolid" [class.text-stonebrand-600]="isSolid">Home</a>
          <a routerLink="/products" routerLinkActive="text-stonebrand-900" class="transition" [class.text-white]="!isSolid" [class.text-stonebrand-600]="isSolid">Collections</a>
          <a routerLink="/contact" routerLinkActive="text-stonebrand-900" class="transition" [class.text-white]="!isSolid" [class.text-stonebrand-600]="isSolid">Contact</a>
        </div>
      </nav>
    </header>
  `
})
export class NavbarComponent {
  isSolid = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.isSolid = window.scrollY > 24;
  }
}
