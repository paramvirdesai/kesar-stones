import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, LogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isHome = false;

  private readonly scrollThreshold = 48;
  private scrollRafId = 0;

  readonly navLinks = [
    { path: '/', label: 'Home', exact: true },
    { path: '/products', label: 'Collections', exact: false },
    { path: '/about', label: 'About', exact: false },
    { path: '/certifications', label: 'Certificates', exact: false },
    { path: '/contact', label: 'Contact', exact: false }
  ];

  constructor(
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.syncRoute(this.router.url);
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      this.syncRoute((e as NavigationEnd).urlAfterRedirects);
    });

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.onScroll();
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    if (this.scrollRafId) {
      cancelAnimationFrame(this.scrollRafId);
    }
  }

  get headerClass(): string {
    if (this.isHome && !this.isScrolled) {
      return 'site-header--hero';
    }
    return this.isScrolled ? 'site-header--glass-solid' : 'site-header--glass';
  }

  private readonly onScroll = (): void => {
    if (this.scrollRafId) {
      return;
    }
    this.scrollRafId = requestAnimationFrame(() => {
      this.scrollRafId = 0;
      const scrolled = window.scrollY > this.scrollThreshold;
      if (scrolled === this.isScrolled) {
        return;
      }
      this.ngZone.run(() => {
        this.isScrolled = scrolled;
      });
    });
  };

  private syncRoute(url: string): void {
    this.isHome = url === '/' || url === '';
    const scrolled = window.scrollY > this.scrollThreshold;
    if (scrolled !== this.isScrolled) {
      this.isScrolled = scrolled;
    }
  }
}
