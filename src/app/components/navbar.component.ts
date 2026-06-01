import { Component, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoComponent } from './logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, LogoComponent],
  template: `
    <header class="fixed top-0 z-50 w-full transition-all duration-500" [ngClass]="headerClass">
      <nav class="corp-container flex items-center justify-between py-4 md:py-5">
        <a routerLink="/" class="flex items-center gap-3">
          <app-logo class="text-patagonia-chocolate" />
          <span class="leading-tight">
            <span class="font-display block text-lg font-bold tracking-tight text-patagonia-chocolate md:text-xl">
              Iconic Stones
            </span>
            <span class="block text-[10px] font-medium uppercase tracking-[0.32em] text-patagonia-amber">
              Global Stone Export
            </span>
          </span>
        </a>

        <div class="hidden items-center gap-8 lg:flex">
          @for (link of navLinks; track link.path) {
            <a
              [routerLink]="link.path"
              routerLinkActive="nav-link--active"
              [routerLinkActiveOptions]="link.exact ? { exact: true } : undefined"
              class="nav-link nav-link--light"
            >
              {{ link.label }}
            </a>
          }
        </div>

        <a routerLink="/contact" class="btn-cta-copper hidden text-[10px] md:inline-flex">Request Quote</a>
        <a routerLink="/contact" class="btn-cta-copper text-[10px] md:hidden">Quote</a>
      </nav>
    </header>
  `
})
export class NavbarComponent {
  isScrolled = false;

  readonly navLinks = [
    { path: '/', label: 'Home', exact: true },
    { path: '/products', label: 'Collections', exact: false },
    { path: '/about', label: 'About', exact: false },
    { path: '/certifications', label: 'Certificates', exact: false },
    { path: '/contact', label: 'Contact', exact: false }
  ];

  get headerClass(): string {
    return this.isScrolled ? 'site-header--glass-solid' : 'site-header--glass';
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 24;
  }
}
