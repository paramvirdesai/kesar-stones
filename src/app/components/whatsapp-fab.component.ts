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
      class="fixed bottom-6 right-6 z-50 flex h-12 items-center gap-2 border border-patagonia-border bg-patagonia-white px-4 text-xs font-semibold uppercase tracking-wider text-patagonia-taupe shadow-editorial transition hover:border-patagonia-copper/40 hover:bg-patagonia-copper hover:text-white"
    >
      WhatsApp
    </a>
  `
})
export class WhatsappFabComponent {}
