import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_ASSETS } from '../data/site-assets';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="relative min-h-[50vh] overflow-hidden premium-dark pt-28">
      <img
        [src]="heroImage"
        alt="Granite blocks at quarry"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-zinc-900/80 to-neutral-950/90"></div>
      <div class="corp-container relative py-16">
        <p class="corp-eyebrow">About Iconic Stones</p>
        <h1 class="heading-serif mt-4">Quarry owners. Global exporters. B2B partners.</h1>
        <p class="mt-6 max-w-2xl text-zinc-400">
          Headquartered in the USA with operational quarries in Rajsamand, Rajasthan — delivering natural and
          artificial stone to distributors and developers worldwide.
        </p>
      </div>
    </section>

    <section class="corp-section premium-dark-alt border-y border-white/5">
      <div class="corp-container grid gap-12 lg:grid-cols-2">
        <div>
          <h2 class="heading-display">Corporate profile</h2>
          <div class="mt-6 space-y-4 text-sm leading-relaxed text-zinc-400">
            <p>
              Iconic Stones is a premium quarry ownership and export enterprise specializing in granite, marble,
              quartzite, quartz slabs, and artificial stone for large-scale commercial supply chains.
            </p>
            <p>
              We are processors — not middlemen. From block extraction through gang saw processing, resin treatment,
              and export crating, every shipment is managed with industrial precision and full documentation.
            </p>
            <p>
              Our value proposition is straightforward: streamlined workflow, transparent execution, and an effortless
              sourcing experience for international clients expanding into North America, China, and the Middle East.
            </p>
          </div>
        </div>
        <div class="glass-panel p-8">
          <h3 class="font-display font-bold text-white">Operational footprint</h3>
          <ul class="mt-6 divide-y divide-white/10 text-sm text-zinc-400">
            <li class="py-4"><strong class="text-white">USA</strong> — Corporate headquarters &amp; North American expansion</li>
            <li class="py-4"><strong class="text-white">India</strong> — Rajsamand district quarries &amp; processing</li>
            <li class="py-4"><strong class="text-white">China</strong> — Established export pipeline</li>
            <li class="py-4"><strong class="text-white">UAE / Middle East</strong> — Active distributor programs</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="corp-section premium-dark">
      <div class="corp-container">
        <h2 class="heading-display">Export packaging standards</h2>
        <p class="mt-4 max-w-2xl text-zinc-400">
          ISPM-15 compliant crating, shock buffering, and container lashing protocols to minimize in-transit breakage.
        </p>
        <ul class="mt-10 grid gap-6 md:grid-cols-3">
          @for (item of standards; track item.title) {
            <li class="glass-panel glass-panel-hover p-6 text-sm text-zinc-400">
              <strong class="block font-display text-white">{{ item.title }}</strong>
              <span class="mt-2 block">{{ item.text }}</span>
            </li>
          }
        </ul>
        <a routerLink="/contact" class="btn-primary mt-10 inline-flex">Start B2B Inquiry</a>
      </div>
    </section>
  `
})
export class AboutPageComponent {
  readonly heroImage = SITE_ASSETS.heroQuarryPanorama;

  standards = [
    { title: 'Fumigated Export Crates', text: 'ISPM-15 treated timber for US and EU customs compliance.' },
    { title: 'Shock-Absorbent Layering', text: 'High-density protection between slabs during ocean transit.' },
    { title: 'Container Securing', text: 'Professional lashing and chocking for high-seas stability.' }
  ];
}
