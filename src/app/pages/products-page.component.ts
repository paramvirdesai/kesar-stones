import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { STONE_PRODUCTS } from '../data/products.data';
import { StoneProduct } from '../models/stone-product.model';
import { RevealOnScrollDirective } from '../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RevealOnScrollDirective],
  template: `
    <section class="section-shell">
      <div class="flex items-center justify-between" appRevealOnScroll>
        <h1 class="text-3xl font-semibold text-stonebrand-900">Stone Collections</h1>
        <button (click)="showFilter = true" class="btn-ghost">Filter Products</button>
      </div>

      <div class="mt-8 grid gap-5 md:grid-cols-3">
        <article *ngFor="let product of filteredProducts(); let i = index" class="group overflow-hidden rounded-2xl border border-stonebrand-300 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl" [appRevealOnScroll] [revealDelay]="i * 70">
          <div class="overflow-hidden">
            <img [src]="product.imageUrl" [alt]="product.name" class="h-56 w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-semibold">{{ product.name }}</h3>
            <p class="text-sm text-stonebrand-700">{{ product.type }} | {{ product.finish }} | {{ product.origin }}</p>
            <p class="mt-2 inline-block rounded-full bg-stonebrand-100 px-3 py-1 text-xs font-semibold">{{ product.priceTier }}</p>
            <div class="mt-4 flex gap-2">
              <button (click)="openProduct(product)" class="btn-premium !px-4 !py-2 !text-sm">View Details</button>
              <button (click)="showSampleMessage(product.name)" class="btn-ghost !px-4 !py-2 !text-sm">Request Sample</button>
            </div>
          </div>
        </article>
      </div>
    </section>

    <div *ngIf="showFilter" class="fixed inset-0 z-50 bg-black/55 p-4 transition">
      <div class="mx-auto mt-16 max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-semibold">Filter Products</h2>
          <button (click)="showFilter = false" class="text-stonebrand-700">Close</button>
        </div>
        <div class="grid gap-3">
          <select [(ngModel)]="selectedType" class="rounded-lg border border-stonebrand-300 p-2">
            <option value="">All Types</option><option>Marble</option><option>Granite</option><option>Quartzite</option>
          </select>
          <select [(ngModel)]="selectedFinish" class="rounded-lg border border-stonebrand-300 p-2">
            <option value="">All Finishes</option><option>Polished</option><option>Honed</option><option>Leathered</option>
          </select>
          <select [(ngModel)]="selectedColor" class="rounded-lg border border-stonebrand-300 p-2">
            <option value="">All Colors</option><option>White</option><option>Grey</option><option>Black</option><option>Gold</option>
          </select>
          <button (click)="clearFilters()" class="rounded-lg bg-stonebrand-900 px-4 py-2 font-medium text-white">Clear Filters</button>
        </div>
      </div>
    </div>

    <div *ngIf="selectedProduct" class="fixed inset-0 z-50 bg-black/70 p-4">
      <div class="mx-auto mt-8 max-w-4xl rounded-3xl bg-white p-6 shadow-2xl md:p-8">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-2xl font-semibold">{{ selectedProduct.name }}</h3>
            <p class="mt-1 text-stonebrand-600">{{ selectedProduct.type }} | {{ selectedProduct.finish }} | {{ selectedProduct.origin }}</p>
          </div>
          <button (click)="selectedProduct = null" class="text-stonebrand-700">Close</button>
        </div>
        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <img [src]="galleryImages[galleryIndex]" [alt]="selectedProduct.name" class="h-72 w-full rounded-2xl object-cover" />
            <div class="mt-3 flex gap-2">
              <button (click)="prevImage()" class="btn-ghost !px-4 !py-2">Prev</button>
              <button (click)="nextImage()" class="btn-ghost !px-4 !py-2">Next</button>
            </div>
          </div>
          <div>
            <p class="text-stonebrand-700">This stone offers dramatic movement, premium polish response, and excellent durability for statement interiors.</p>
            <button (click)="showSampleMessage(selectedProduct.name)" class="btn-premium mt-4">Request Sample</button>
            <p *ngIf="sampleMessage" class="mt-3 text-sm text-green-700">{{ sampleMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductsPageComponent {
  products: StoneProduct[] = STONE_PRODUCTS;
  showFilter = false;
  selectedProduct: StoneProduct | null = null;
  galleryIndex = 0;
  galleryImages: string[] = [];
  sampleMessage = '';
  selectedType = '';
  selectedFinish = '';
  selectedColor = '';

  filteredProducts(): StoneProduct[] {
    return this.products.filter(
      (p) =>
        (!this.selectedType || p.type === this.selectedType) &&
        (!this.selectedFinish || p.finish === this.selectedFinish) &&
        (!this.selectedColor || p.colorFamily === this.selectedColor)
    );
  }

  clearFilters(): void {
    this.selectedType = '';
    this.selectedFinish = '';
    this.selectedColor = '';
  }

  openProduct(product: StoneProduct): void {
    this.selectedProduct = product;
    this.galleryImages = [product.imageUrl, ...this.products.filter((p) => p.id !== product.id).slice(0, 2).map((p) => p.imageUrl)];
    this.galleryIndex = 0;
  }

  nextImage(): void {
    this.galleryIndex = (this.galleryIndex + 1) % this.galleryImages.length;
  }

  prevImage(): void {
    this.galleryIndex = (this.galleryIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
  }

  showSampleMessage(productName: string): void {
    this.sampleMessage = `Sample request initiated for ${productName}. Our team will contact you.`;
    setTimeout(() => (this.sampleMessage = ''), 2500);
  }
}
