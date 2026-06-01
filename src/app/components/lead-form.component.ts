import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { finalize } from 'rxjs';
import { LeadApiService } from '../services/lead-api.service';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <section class="cin-section bg-stonebrand-950 text-stonebrand-100">
      <div class="cin-container grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <p class="cin-eyebrow text-stonebrand-400">Private Consultation</p>
          <h2 class="font-display mt-6 text-4xl font-light leading-tight text-stonebrand-50 md:text-5xl">
            Begin a material<br />conversation.
          </h2>
          <p class="mt-8 max-w-md text-sm leading-relaxed text-stonebrand-400">
            Share your project vision. Our atelier team will respond with curated selections,
            samples, and a tailored sourcing approach.
          </p>
        </div>

        <form class="consult-panel bg-stonebrand-900/40 border-stonebrand-700" [formGroup]="leadForm" (ngSubmit)="submit()">
          <input class="consult-input text-stonebrand-100 placeholder:text-stonebrand-500" placeholder="Name" formControlName="name" />
          <input class="consult-input text-stonebrand-100 placeholder:text-stonebrand-500" placeholder="Studio / Company" formControlName="company" />
          <input class="consult-input text-stonebrand-100 placeholder:text-stonebrand-500" placeholder="Email" formControlName="email" />
          <textarea
            class="consult-input min-h-[120px] resize-none text-stonebrand-100 placeholder:text-stonebrand-500"
            rows="4"
            placeholder="Project narrative"
            formControlName="message"
          ></textarea>
          <div class="mt-10">
            <button
              [disabled]="loading"
              class="btn-cinema-light w-full justify-center disabled:opacity-50"
              type="submit"
            >
              <span *ngIf="loading" class="mr-2 inline-block h-3 w-3 animate-spin rounded-full border border-white/30 border-t-white"></span>
              {{ loading ? 'Sending' : 'Request Consultation' }}
            </button>
            <p *ngIf="submitted && leadForm.invalid" class="mt-4 text-xs text-red-300/90">
              Please complete all fields with valid details.
            </p>
            <p *ngIf="status === 'success'" class="mt-4 text-xs text-stonebrand-300">
              Thank you. Our atelier will be in touch shortly.
            </p>
            <p *ngIf="status === 'error'" class="mt-4 text-xs text-red-300/90">
              Unable to send. Please try again.
            </p>
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
    if (this.leadForm.invalid) return;

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
        error: () => (this.status = 'error')
      });
  }
}
