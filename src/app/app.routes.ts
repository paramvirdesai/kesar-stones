import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { CertificationsPageComponent } from './pages/certifications-page/certifications-page.component';

export const appRoutes: Routes = [
  { path: '', component: HomePageComponent, title: 'Iconic Stones | Global Stone Export' },
  { path: 'products', component: ProductsPageComponent, title: 'Iconic Stones | Stone Collections' },
  { path: 'about', component: AboutPageComponent, title: 'Iconic Stones | About Us' },
  { path: 'certifications', component: CertificationsPageComponent, title: 'Iconic Stones | Certifications' },
  { path: 'contact', component: ContactPageComponent, title: 'Iconic Stones | Request a Quote' },
  { path: '**', redirectTo: '' }
];
