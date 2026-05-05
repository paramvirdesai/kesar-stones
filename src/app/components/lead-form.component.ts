import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { finalize } from 'rxjs';
import { LeadApiService } from '../services/lead-api.service';
import { RevealOnScrollDirective } from '../directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RevealOnScrollDirective],
  template: `
    <section class="section-shell" appRevealOnScroll>
      <div class="rounded-3xl bg-stonebrand-900 p-8 text-white shadow-2xl md:p-10">
        <h2 class="text-3xl font-semibold">Request a Private Consultation</h2>
        <form class="mt-6 grid gap-4 md:grid-cols-2" [formGroup]="leadForm" (ngSubmit)="submit()">
          <input class="rounded-xl px-4 py-3 text-stonebrand-900" placeholder="Full Name" formControlName="name" />
          <input class="rounded-xl px-4 py-3 text-stonebrand-900" placeholder="Company" formControlName="company" />
          <input class="rounded-lg px-3 py-3 text-stonebrand-900 md:col-span-2" placeholder="Email" formControlName="email" />
          <textarea class="rounded-xl px-4 py-3 text-stonebrand-900 md:col-span-2" rows="4" placeholder="Project details" formControlName="message"></textarea>
          <div class="md:col-span-2">
            <button [disabled]="loading" class="inline-flex items-center gap-2 rounded-xl bg-stonebrand-300 px-6 py-3 font-semibold text-stonebrand-900 transition hover:scale-[1.02] hover:shadow-lg disabled:opacity-60" type="submit">
              <span *ngIf="loading" class="h-4 w-4 animate-spin rounded-full border-2 border-stonebrand-700 border-t-transparent"></span>
              {{ loading ? 'Submitting...' : 'Submit Lead' }}
            </button>
            <p *ngIf="submitted && leadForm.invalid" class="mt-2 text-sm text-red-200">Please complete required fields with valid details.</p>
            <p *ngIf="status === 'success'" class="mt-2 text-sm text-green-200">Lead submitted. Our concierge will contact you shortly.</p>
            <p *ngIf="status === 'error'" class="mt-2 text-sm text-red-200">Submission failed. Please try again in a moment.</p>
          </div>
        </form>
      </div>
    </section>
  `
})
export class LeadFormComponent {
  submitted = false;
  loading = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  leadForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    company: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly leadApi: LeadApiService
  ) {}

  submit(): void {
    this.submitted = true;
    this.status = 'idle';
    if (this.leadForm.invalid) {
      return;
    }
    this.loading = true;
    this.leadApi
      .submitLead(this.leadForm.getRawValue() as { name: string; email: string; company: string; message: string })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.status = 'success';
          this.leadForm.reset();
          this.submitted = false;
        },
        error: () => {
          this.status = 'error';
        }
      });
  }
}
