import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURED_MATERIALS } from '../data/products.data';
import { RAW_HOVER_OVERLAY } from '../data/home-page.data';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="patagonia-bg border-b border-patagonia-border pt-28">
      <div class="corp-container py-16">
        <p class="corp-eyebrow">Stone Collections</p>
        <h1 class="heading-serif mt-4">Export-grade materials catalog</h1>
        <p class="body-text mt-6 max-w-2xl">
          Bulk programs for granite, marble, quartzite, quartz slabs, and artificial stone —
          sourced from Iconic Stones quarries and partner processing facilities.
        </p>
      </div>
    </section>

    <section class="corp-section patagonia-bg-alt">
      <div class="corp-container">
        <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          @for (m of materials; track m.id) {
            <article class="group showcase-card overflow-hidden">
              <div class="relative aspect-[4/3] overflow-hidden">
                @defer (on viewport) {
                  <img
                    [src]="m.imageUrl"
                    [alt]="m.name"
                    class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                } @placeholder {
                  <div class="h-full w-full animate-pulse bg-patagonia-border"></div>
                }
                <div
                  class="absolute inset-0 flex items-center justify-center bg-patagonia-copper/10 p-4 text-center opacity-0 transition-all duration-500 ease-out group-hover:opacity-100"
                >
                  <p class="text-[10px] font-semibold uppercase tracking-[0.18em] text-patagonia-chocolate">
                    {{ rawHoverOverlay }}
                  </p>
                </div>
              </div>
              <div class="border-t border-patagonia-border p-6">
                <p class="text-[10px] font-semibold uppercase tracking-widest text-patagonia-amber">{{ m.category }}</p>
                <h2 class="mt-2 font-display text-xl font-bold text-patagonia-chocolate">{{ m.name }}</h2>
                <p class="mt-1 text-xs text-patagonia-taupe/70">{{ m.quarryLabel }}</p>
                <p class="mt-2 line-clamp-2 text-sm text-patagonia-taupe/85">{{ m.description }}</p>
                <a
                  routerLink="/contact"
                  [queryParams]="{ material: m.name }"
                  class="link-editorial mt-6 inline-block"
                >
                  Request Quote →
                </a>
              </div>
            </article>
          }

          <article
            class="showcase-card flex flex-col items-center justify-center border-dashed border-patagonia-copper/30 bg-patagonia-cream/50 p-10 text-center"
          >
            <p class="font-display text-5xl font-light text-patagonia-amber/60">50+</p>
            <h2 class="mt-4 font-display text-xl font-bold text-patagonia-chocolate">Additional Varieties</h2>
            <p class="mt-3 max-w-xs text-sm text-patagonia-taupe/80">
              Full catalog for container programs including mixed loads, artificial quartz, and specialty exotic grades.
            </p>
            <a routerLink="/contact" class="btn-ghost-editorial mt-8">Request Full Catalog</a>
          </article>
        </div>
      </div>
    </section>
  `
})
export class ProductsPageComponent {
  materials = FEATURED_MATERIALS;
  rawHoverOverlay = RAW_HOVER_OVERLAY;
}
