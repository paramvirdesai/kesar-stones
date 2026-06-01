import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from './logo.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  template: `
    <footer class="border-t border-white/10 premium-dark-alt">
      <div class="corp-container grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div class="flex items-center gap-2 text-white">
            <app-logo class="text-white" />
            <span class="font-display text-lg font-bold">Iconic Stones</span>
          </div>
          <p class="mt-4 text-sm leading-relaxed text-zinc-500">
            Premium quarry owners &amp; global exporters. USA headquarters · Rajsamand, Rajasthan operations.
          </p>
        </div>
        <div>
          <p class="corp-eyebrow">Export Markets</p>
          <ul class="mt-3 space-y-2 text-sm text-zinc-400">
            <li>North America (Expansion Focus)</li>
            <li>United States</li>
            <li>China</li>
            <li>UAE &amp; Middle East</li>
          </ul>
        </div>
        <div>
          <p class="corp-eyebrow">Company</p>
          <ul class="mt-3 space-y-2 text-sm text-zinc-400">
            <li><a routerLink="/products" class="transition-colors hover:text-white">Stone Collections</a></li>
            <li><a routerLink="/certifications" class="transition-colors hover:text-white">Certifications</a></li>
            <li><a routerLink="/about" class="transition-colors hover:text-white">About Us</a></li>
          </ul>
        </div>
        <div>
          <p class="corp-eyebrow">Export Desk</p>
          <ul class="mt-3 space-y-2 text-sm text-zinc-400">
            <li><a href="mailto:info@theexoticstones.com" class="transition-colors hover:text-white">info&#64;theexoticstones.com</a></li>
            <li>+1 (USA) · +91 (India)</li>
            <li>Rajsamand, Rajasthan, India</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/10 py-6 text-center text-xs text-zinc-600">
        © {{ year }} Iconic Stones. All rights reserved.
      </div>
    </footer>
  `
})
export class FooterComponent {
  year = new Date().getFullYear();
}
