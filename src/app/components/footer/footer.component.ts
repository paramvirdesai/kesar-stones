import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { CORPORATE_EMAIL } from '../../data/site.constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, LogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly corporateEmail = CORPORATE_EMAIL;
}
