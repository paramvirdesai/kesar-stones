import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  template: `
    <a
      href="https://wa.me/919876543210?text=Iconic%20Stones%20B2B%20Export%20Inquiry"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp export desk"
      class="fixed bottom-6 right-6 z-50 flex h-12 items-center gap-2 border border-corporate-700 bg-white px-4 text-xs font-semibold uppercase tracking-wider text-corporate-900 shadow-lg transition hover:bg-corporate-900 hover:text-white"
    >
      WhatsApp
    </a>
  `
})
export class WhatsappFabComponent {}
