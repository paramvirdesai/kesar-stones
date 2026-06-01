import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { LeadApiService } from '../services/lead-api.service';
import { MATERIAL_OPTIONS } from '../data/products.data';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="premium-dark border-b border-white/5 pt-28">
      <div class="corp-container py-16">
        <p class="corp-eyebrow">B2B Export Desk</p>
        <h1 class="heading-serif mt-4">Request a quote</h1>
        <p class="mt-6 max-w-2xl text-zinc-400">
          For distributors, developers, and procurement teams — submit your port, material, and volume requirements.
        </p>
      </div>
    </section>

    <section class="corp-section premium-dark-alt">
      <div class="corp-container grid gap-12 lg:grid-cols-5">
        <aside class="lg:col-span-2">
          <h2 class="heading-display text-2xl">Export desk contact</h2>
          <p class="mt-6 text-sm leading-relaxed text-zinc-400">
            Response within 1–2 business days for qualified B2B inquiries. Include destination port and estimated
            container volume for fastest quotation.
          </p>
          <div class="glass-panel mt-8 space-y-6 p-8 text-sm">
            <div>
              <p class="corp-eyebrow">Email</p>
              <a href="mailto:info@theexoticstones.com" class="mt-2 block font-semibold text-white hover:text-zinc-300">
                info&#64;theexoticstones.com
              </a>
            </div>
            <div class="border-t border-white/10 pt-6">
              <p class="corp-eyebrow">Headquarters</p>
              <p class="mt-2 text-zinc-300">United States</p>
            </div>
            <div class="border-t border-white/10 pt-6">
              <p class="corp-eyebrow">Quarry Operations</p>
              <p class="mt-2 text-zinc-300">Rajsamand District, Rajasthan, India</p>
            </div>
            <div class="border-t border-white/10 pt-6">
              <p class="corp-eyebrow">Active Export Markets</p>
              <p class="mt-2 text-zinc-300">USA · Canada · China · UAE · Middle East</p>
            </div>
          </div>
        </aside>

        <form
          class="glass-panel lg:col-span-3 p-8 md:p-10"
          [formGroup]="inquiryForm"
          (ngSubmit)="send()"
        >
          <h2 class="font-display text-lg font-bold text-white">B2B inquiry form</h2>
          <div class="mt-8 grid gap-6 md:grid-cols-2">
            <div class="float-field">
              <input id="name" class="peer float-input" formControlName="name" placeholder=" " autocomplete="name" />
              <label class="float-label" for="name">Full Name *</label>
            </div>
            <div class="float-field">
              <input id="company" class="peer float-input" formControlName="company" placeholder=" " autocomplete="organization" />
              <label class="float-label" for="company">Company Name *</label>
            </div>
            <div class="float-field md:col-span-2">
              <input id="email" type="email" class="peer float-input" formControlName="email" placeholder=" " autocomplete="email" />
              <label class="float-label" for="email">Business Email *</label>
            </div>
            <div class="float-field">
              <input
                id="destinationPort"
                class="peer float-input"
                formControlName="destinationPort"
                placeholder=" "
              />
              <label class="float-label" for="destinationPort">Destination Port *</label>
            </div>
            <div class="md:col-span-1">
              <label class="sr-only" for="materialInterest">Material Interest</label>
              <select id="materialInterest" class="float-select" formControlName="materialInterest">
                <option value="">Select material *</option>
                @for (opt of materialOptions; track opt) {
                  <option [value]="opt">{{ opt }}</option>
                }
              </select>
            </div>
            <div class="float-field md:col-span-2">
              <input id="volume" class="peer float-input" formControlName="volume" placeholder=" " />
              <label class="float-label" for="volume">Estimated Volume / Container Load *</label>
            </div>
            <div class="float-field md:col-span-2">
              <textarea
                id="message"
                class="peer float-input min-h-[140px] resize-y pt-6"
                rows="5"
                formControlName="message"
                placeholder=" "
              ></textarea>
              <label class="float-label" for="message">Project Details &amp; Requirements *</label>
            </div>
          </div>

          <button [disabled]="loading" class="btn-cta-gold mt-8 w-full disabled:opacity-50" type="submit">
            {{ loading ? 'Submitting Inquiry...' : 'Submit B2B Inquiry' }}
          </button>

          @if (submitted && inquiryForm.invalid) {
            <p class="mt-4 text-sm text-rose-300/80">
              Please complete all required fields with valid business information.
            </p>
          }
          @if (status === 'success') {
            <p class="mt-4 text-sm text-emerald-400/90">
              Inquiry received. Our export desk will contact you shortly.
            </p>
          }
          @if (status === 'error') {
            <p class="mt-4 text-sm text-rose-300/80">
              Submission failed. Email info&#64;theexoticstones.com or retry shortly.
            </p>
          }
        </form>
      </div>
    </section>
  `
})
export class ContactPageComponent implements OnInit {
  submitted = false;
  loading = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  materialOptions = MATERIAL_OPTIONS;

  inquiryForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    company: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    destinationPort: ['', [Validators.required, Validators.minLength(2)]],
    materialInterest: ['', Validators.required],
    volume: ['', [Validators.required, Validators.minLength(2)]],
    message: ['', [Validators.required, Validators.minLength(15)]]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly leadApi: LeadApiService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const material = this.route.snapshot.queryParamMap.get('material');
    if (material) {
      const match = this.materialOptions.find((o) => o.includes(material));
      if (match) {
        this.inquiryForm.patchValue({ materialInterest: match });
      }
    }
  }

  send(): void {
    this.submitted = true;
    this.status = 'idle';
    if (this.inquiryForm.invalid) return;

    this.loading = true;
    this.leadApi
      .submitB2BInquiry(this.inquiryForm.getRawValue() as {
        name: string;
        email: string;
        company: string;
        destinationPort: string;
        materialInterest: string;
        volume: string;
        message: string;
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          this.status = 'success';
          this.inquiryForm.reset();
          this.submitted = false;
        },
        error: () => (this.status = 'error')
      });
  }
}
