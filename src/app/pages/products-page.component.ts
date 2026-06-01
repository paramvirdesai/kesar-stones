import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURED_MATERIALS } from '../data/products.data';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="premium-dark border-b border-white/5 pt-28">
      <div class="corp-container py-16">
        <p class="corp-eyebrow">Stone Collections</p>
        <h1 class="heading-serif mt-4">Export-grade materials catalog</h1>
        <p class="mt-6 max-w-2xl text-zinc-400">
          Bulk programs for granite, marble, quartzite, quartz slabs, and artificial stone —
          sourced from Iconic Stones quarries and partner processing facilities.
        </p>
      </div>
    </section>

    <section class="corp-section premium-dark-alt">
      <div class="corp-container">
        <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          @for (m of materials; track m.id) {
            <article class="group material-card">
              <div class="relative aspect-[4/3] overflow-hidden">
                @defer (on viewport) {
                  <img
                    [src]="m.imageUrl"
                    [alt]="m.name"
                    class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                } @placeholder {
                  <div class="h-full w-full animate-pulse bg-zinc-800"></div>
                }
                <div
                  class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                ></div>
                <div
                  class="absolute inset-x-0 bottom-0 translate-y-full p-5 transition-transform duration-500 ease-out group-hover:translate-y-0"
                >
                  <p class="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-300">Quick Specs</p>
                  <p class="mt-1 text-sm text-white">{{ m.quarryLabel }}</p>
                  <p class="mt-1 text-xs text-zinc-400">{{ m.finishNote }}</p>
                </div>
              </div>
              <div class="border-t border-white/5 p-6">
                <p class="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">{{ m.category }}</p>
                <h2 class="mt-2 font-display text-xl font-bold text-white">{{ m.name }}</h2>
                <p class="mt-2 line-clamp-2 text-sm text-zinc-400">{{ m.description }}</p>
                <a
                  routerLink="/contact"
                  [queryParams]="{ material: m.name }"
                  class="mt-6 inline-block text-xs font-semibold uppercase tracking-wider text-zinc-300 transition-colors hover:text-white"
                >
                  Request Quote →
                </a>
              </div>
            </article>
          }

          <article
            class="material-card flex flex-col items-center justify-center border-dashed border-white/20 bg-zinc-900/20 p-10 text-center"
          >
            <p class="font-display text-5xl font-light text-zinc-600">50+</p>
            <h2 class="mt-4 font-display text-xl font-bold text-white">Additional Varieties</h2>
            <p class="mt-3 max-w-xs text-sm text-zinc-400">
              Full catalog for container programs including mixed loads, artificial quartz, and specialty exotic grades.
            </p>
            <a routerLink="/contact" class="btn-ghost-glass mt-8">Request Full Catalog</a>
          </article>
        </div>
      </div>
    </section>
  `
})
export class ProductsPageComponent {
  materials = FEATURED_MATERIALS;
}
