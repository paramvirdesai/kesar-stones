import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RevealOnScrollDirective],
  template: `
    <section class="section-shell overflow-hidden">
      <h2 class="text-3xl font-semibold text-stonebrand-900" appRevealOnScroll>Trusted by Designers & Developers</h2>
      <div class="mt-8 flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory">
        <article *ngFor="let quote of quotes; let i = index" class="min-w-[320px] snap-start rounded-2xl border border-stonebrand-300 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl" [appRevealOnScroll] [revealDelay]="i * 80">
          <p class="text-stonebrand-700">"{{ quote.text }}"</p>
          <p class="mt-4 text-sm font-medium text-stonebrand-900">- {{ quote.author }}</p>
        </article>
      </div>
    </section>
  `
})
export class TestimonialsComponent {
  quotes = [
    { text: 'Their Calacatta installation transformed our villa into a gallery.', author: 'A. Mehta, Architect' },
    { text: 'Highly curated inventory and immaculate finish quality.', author: 'R. Kapoor, Homeowner' },
    { text: 'Concierge service from slab selection to final polish.', author: 'Studio Meridian' },
    { text: 'Project turnaround and on-site finishing were world class.', author: 'Crestline Hotels' }
  ];
}
