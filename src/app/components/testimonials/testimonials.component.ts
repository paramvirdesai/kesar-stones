import { Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [RevealOnScrollDirective],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  quotes = [
    { text: 'Their Calacatta installation transformed our villa into a gallery.', author: 'A. Mehta, Architect' },
    { text: 'Highly curated inventory and immaculate finish quality.', author: 'R. Kapoor, Homeowner' },
    { text: 'Concierge service from slab selection to final polish.', author: 'Studio Meridian' },
    { text: 'Project turnaround and on-site finishing were world class.', author: 'Crestline Hotels' }
  ];
}
