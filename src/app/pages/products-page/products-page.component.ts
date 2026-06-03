import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FEATURED_MATERIALS } from '../../data/products.data';
import { RAW_HOVER_OVERLAY } from '../../data/home-page.data';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent {
  materials = FEATURED_MATERIALS;
  rawHoverOverlay = RAW_HOVER_OVERLAY;
}
