import { Component } from '@angular/core';
import { WHATSAPP_PHONE } from '../../data/site.constants';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  templateUrl: './whatsapp-fab.component.html',
  styleUrl: './whatsapp-fab.component.scss'
})
export class WhatsappFabComponent {
  readonly whatsappUrl = `https://wa.me/${WHATSAPP_PHONE.e164.replace('+', '')}?text=Iconic%20Stones%20B2B%20Export%20Inquiry`;
}
