import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="border-t border-stonebrand-300 bg-white">
      <div class="section-shell flex flex-col gap-4 py-8 text-sm text-stonebrand-700 md:flex-row md:items-center md:justify-between">
        <p>© {{ year }} Marble & Granite Atelier. Crafted for timeless spaces.</p>
        <p>Mon-Sat 9AM-7PM | +91 98765 43210 | concierge&#64;stoneatelier.com</p>
      </div>
    </footer>
  `
})
export class FooterComponent {
  year = new Date().getFullYear();
}
