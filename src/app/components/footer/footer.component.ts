import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { collectionAsset } from '../../data/asset-url';
import { CORPORATE_EMAIL, CORPORATE_PHONE_GROUPS } from '../../data/site.constants';

const FOOTER_ASSETS = {
  marbleTexture: collectionAsset('footer/grunge-gold-marble-texture 3/grunge_gold_marble_texture.jpg'),
  tajSilhouette: collectionAsset('footer/silhouette-taj-mahal-vector/58379.jpg')
} as const;

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly corporateEmail = CORPORATE_EMAIL;
  readonly usaPhones = CORPORATE_PHONE_GROUPS[0].phones;
  readonly indiaPhones = CORPORATE_PHONE_GROUPS[1].phones;
  readonly assets = FOOTER_ASSETS;
  readonly instagramUrl =
    'https://www.instagram.com/iconic__stones?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';
}
