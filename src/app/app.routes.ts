import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page.component';
import { ProductsPageComponent } from './pages/products-page.component';
import { ContactPageComponent } from './pages/contact-page.component';

export const appRoutes: Routes = [
  { path: '', component: HomePageComponent, title: 'Luxury Stone | Home' },
  { path: 'products', component: ProductsPageComponent, title: 'Luxury Stone | Products' },
  { path: 'contact', component: ContactPageComponent, title: 'Luxury Stone | Contact' },
  { path: '**', redirectTo: '' }
];
