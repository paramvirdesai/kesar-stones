import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { finalize } from 'rxjs';
import { LeadApiService } from '../services/lead-api.service';
import { RevealOnScrollDirective } from '../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RevealOnScrollDirective],
  template: `
    <section class="section-shell" appRevealOnScroll>
      <h1 class="text-3xl font-semibold text-stonebrand-900">Contact Our Stone Concierge</h1>
      <p class="mt-2 text-stonebrand-700">Schedule slab viewing, pricing consultation, or turnkey installation support.</p>

      <form class="mt-8 max-w-2xl space-y-4 rounded-xl border border-stonebrand-300 bg-white p-6" [formGroup]="contactForm" (ngSubmit)="send()">
        <input class="w-full rounded-lg border border-stonebrand-300 p-3" placeholder="Full Name" formControlName="name" />
        <input class="w-full rounded-lg border border-stonebrand-300 p-3" placeholder="Email" formControlName="email" />
        <input class="w-full rounded-lg border border-stonebrand-300 p-3" placeholder="Company" formControlName="company" />
        <textarea class="w-full rounded-lg border border-stonebrand-300 p-3" rows="4" placeholder="How can we help?" formControlName="message"></textarea>
        <button [disabled]="loading" class="inline-flex items-center gap-2 rounded-lg bg-stonebrand-900 px-5 py-3 font-medium text-white transition hover:scale-[1.01] disabled:opacity-60" type="submit">
          <span *ngIf="loading" class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          {{ loading ? 'Sending...' : 'Send Message' }}
        </button>
        <p *ngIf="submitted && contactForm.invalid" class="text-sm text-red-600">Please enter valid name, email, company, and message.</p>
        <p *ngIf="status === 'success'" class="text-sm text-green-700">Message sent. We will connect within 24 hours.</p>
        <p *ngIf="status === 'error'" class="text-sm text-red-600">Unable to submit right now. Please retry.</p>
      </form>
    </section>
  `
})
export class ContactPageComponent {
  submitted = false;
  loading = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: ['', [Validators.required, Validators.minLength(2)]],
    message: ['', [Validators.required, Validators.minLength(12)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly leadApi: LeadApiService
  ) {}

  send(): void {
    this.submitted = true;
    this.status = 'idle';
    if (this.contactForm.invalid) {
      return;
    }
    this.loading = true;
    this.leadApi
      .submitLead(this.contactForm.getRawValue() as { name: string; email: string; company: string; message: string })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.status = 'success';
          this.contactForm.reset();
          this.submitted = false;
        },
        error: () => (this.status = 'error')
      });
  }
}
