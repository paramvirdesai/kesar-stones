import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LeadFormComponent } from '../components/lead-form.component';
import { TestimonialsComponent } from '../components/testimonials.component';
import { CommonModule } from '@angular/common';
import { RevealOnScrollDirective } from '../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, LeadFormComponent, TestimonialsComponent, CommonModule, RevealOnScrollDirective],
  template: `
    <section class="relative flex min-h-screen items-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&w=1800&q=80"
        alt="Premium marble surface"
        class="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80"></div>
      <div class="relative z-10 mx-auto max-w-6xl px-6 text-white">
        <p class="fade-up text-sm uppercase tracking-[0.35em] text-stonebrand-300">Luxury Stone Studio</p>
        <h1 class="fade-up mt-4 max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">
          Iconic Marble. Timeless Granite. Crafted for Signature Spaces.
        </h1>
        <p class="fade-up mt-6 max-w-2xl text-lg text-stonebrand-100">
          We source and finish statement stones for residences, hotels, and flagship projects.
        </p>
        <div class="fade-up mt-8 flex flex-wrap gap-4">
          <a routerLink="/products" class="btn-premium">Explore Collections</a>
          <a routerLink="/contact" class="btn-ghost">Book Design Consultation</a>
        </div>
      </div>
      <div class="scroll-indicator">
        <span></span>
      </div>
    </section>

    <section class="section-shell space-y-14">
      <article class="grid gap-8 md:grid-cols-2 md:items-center" appRevealOnScroll>
        <h2 class="text-4xl font-semibold text-stonebrand-900">From quarry selection to perfect installation.</h2>
        <p class="text-lg text-stonebrand-600">
          Every slab is evaluated for veining, structure, and finish response. We deliver a fully managed sourcing-to-installation workflow.
        </p>
      </article>
      <article class="grid gap-8 md:grid-cols-2 md:items-center" appRevealOnScroll [revealDelay]="80">
        <p class="text-lg text-stonebrand-600">
          Our project engineers and interior consultants collaborate to create seamless countertops, feature walls, and statement lobbies.
        </p>
        <h2 class="text-4xl font-semibold text-stonebrand-900">A bespoke process with global sourcing depth.</h2>
      </article>
    </section>

    <section class="section-shell" appRevealOnScroll>
      <h2 class="text-3xl font-semibold text-stonebrand-900">How It Works</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <div *ngFor="let step of steps; let i = index" class="rounded-2xl border border-stonebrand-300 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl">
          <p class="text-sm font-semibold tracking-wide text-stonebrand-500">STEP {{ i + 1 }}</p>
          <h3 class="mt-2 text-xl font-semibold">{{ step.title }}</h3>
          <p class="mt-2 text-stonebrand-600">{{ step.description }}</p>
        </div>
      </div>
    </section>

    <section class="section-shell" appRevealOnScroll>
      <div class="grid gap-6 rounded-3xl bg-black p-8 text-white md:grid-cols-4">
        <div *ngFor="let stat of stats">
          <p class="text-4xl font-semibold">{{ stat.value }}</p>
          <p class="mt-2 text-sm uppercase tracking-wider text-stonebrand-300">{{ stat.label }}</p>
        </div>
      </div>
    </section>
    <app-testimonials />
    <app-lead-form />
  `
})
export class HomePageComponent {
  steps = [
    { title: 'Design Brief', description: 'We align on moodboards, palettes, and usage context.' },
    { title: 'Stone Curation', description: 'Shortlisted slabs are matched to your design intent.' },
    { title: 'Delivery & Finish', description: 'Precision fabrication and white-glove installation.' }
  ];

  stats = [
    { value: '2,000+', label: 'Premium slabs sourced' },
    { value: '420+', label: 'Projects delivered' },
    { value: '18', label: 'Countries networked' },
    { value: '98%', label: 'Client retention' }
  ];
}
