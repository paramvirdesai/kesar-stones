import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScrollTopService {
  private readonly router = inject(Router);

  init(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });
  }
}
