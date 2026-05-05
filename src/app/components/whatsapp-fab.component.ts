import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  template: `
    <a
      href="https://wa.me/919876543210?text=Hi%20I%20want%20a%20luxury%20stone%20consultation"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      class="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-lg shadow-green-700/30 transition duration-300 hover:scale-110 hover:shadow-green-500/50"
    >
      <span>W</span>
    </a>
  `
})
export class WhatsappFabComponent {}
