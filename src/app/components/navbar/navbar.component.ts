import { Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LogoComponent } from '../logo/logo.component';
import {
  COLLECTION_CATEGORIES,
  COLLECTION_ITEMS,
  CollectionItem,
  StoneCategory
} from '../../data/collections.catalog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, LogoComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly ngZone = inject(NgZone);
  private readonly host = inject(ElementRef<HTMLElement>);

  isScrolled = false;
  isHome = false;
  collectionsOpen = false;

  private readonly scrollThreshold = 48;
  private scrollRafId = 0;

  readonly categories = COLLECTION_CATEGORIES;
  readonly collectionItems = COLLECTION_ITEMS;

  readonly navLinks = [
    { path: '/', label: 'Home', exact: true },
    { path: '/about', label: 'About', exact: false },
    { path: '/certifications', label: 'Certificates', exact: false },
    { path: '/contact', label: 'Contact', exact: false }
  ];

  ngOnInit(): void {
    this.syncRoute(this.router.url);
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      this.syncRoute((e as NavigationEnd).urlAfterRedirects);
      this.collectionsOpen = false;
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

  get isCollectionsRoute(): boolean {
    return this.router.url.startsWith('/collections');
  }

  get headerClass(): string {
    if (this.isHome && !this.isScrolled) {
      return 'site-header--hero';
    }
    return this.isScrolled ? 'site-header--glass-solid' : 'site-header--glass';
  }

  itemsForCategory(category: StoneCategory): CollectionItem[] {
    return this.collectionItems.filter((item) => item.category === category);
  }

  toggleCollections(): void {
    this.collectionsOpen = !this.collectionsOpen;
  }

  closeCollections(): void {
    this.collectionsOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.collectionsOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.collectionsOpen = false;
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
