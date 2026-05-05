import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';
import { WhatsappFabComponent } from './components/whatsapp-fab.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, WhatsappFabComponent],
  template: `
    <app-navbar />
    <main class="page-enter min-h-screen pt-16">
      <router-outlet />
    </main>
    <app-footer />
    <app-whatsapp-fab />
  `
})
export class AppComponent {}
