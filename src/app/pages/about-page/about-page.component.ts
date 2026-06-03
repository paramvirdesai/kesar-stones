import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_ASSETS } from '../../data/site-assets';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent {
  readonly heroImage = SITE_ASSETS.heroQuarryPanorama;

  standards = [
    { title: 'Fumigated Export Crates', text: 'ISPM-15 treated timber for US and EU customs compliance.' },
    { title: 'Shock-Absorbent Layering', text: 'High-density protection between slabs during ocean transit.' },
    { title: 'Container Securing', text: 'Professional lashing and chocking for high-seas stability.' }
  ];
}
