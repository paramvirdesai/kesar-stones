import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-certifications-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="patagonia-bg border-b border-patagonia-border pt-28">
      <div class="corp-container py-16">
        <p class="corp-eyebrow">Compliance &amp; Credentials</p>
        <h1 class="heading-serif mt-4">Certifications &amp; corporate registration</h1>
        <p class="body-text mt-6 max-w-2xl">
          Iconic Stones maintains export compliance and quality standards for seamless international B2B transactions.
        </p>
      </div>
    </section>

    <section class="corp-section patagonia-bg-alt border-b border-patagonia-border">
      <div class="corp-container">
        <h2 class="heading-display text-2xl">Registered business credentials</h2>
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <div class="cert-badge-prominent">
            <p class="corp-eyebrow">GST Number</p>
            <p class="mt-4 font-mono text-2xl font-semibold text-patagonia-copper">{{ gstNumber }}</p>
            <p class="mt-3 text-sm text-patagonia-taupe/70">Goods and Services Tax registration — Government of India</p>
          </div>
          <div class="cert-badge-prominent">
            <p class="corp-eyebrow">Import-Export Code (IEC)</p>
            <p class="mt-4 font-mono text-2xl font-semibold text-patagonia-copper">{{ iecNumber }}</p>
            <p class="mt-3 text-sm text-patagonia-taupe/70">DGFT authorized — Ministry of Commerce, Govt. of India</p>
          </div>
        </div>
      </div>
    </section>

    <section class="corp-section patagonia-bg">
      <div class="corp-container">
        <h2 class="heading-display text-2xl">International quality certifications</h2>
        <div class="mt-12 grid gap-6 md:grid-cols-2">
          @for (cert of certifications; track cert.badge) {
            <article class="cert-badge bg-white">
              <div
                class="flex h-14 w-14 items-center justify-center border border-patagonia-border bg-patagonia-cream text-xs font-bold text-patagonia-chocolate"
              >
                {{ cert.badge }}
              </div>
              <h3 class="mt-6 font-display text-lg font-bold text-patagonia-chocolate">{{ cert.title }}</h3>
              <p class="mt-1 text-sm font-semibold text-patagonia-amber">{{ cert.subtitle }}</p>
              <p class="mt-4 text-sm leading-relaxed text-patagonia-taupe/80">{{ cert.details }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="corp-section patagonia-bg-alt border-t border-patagonia-border">
      <div class="corp-container text-center">
        <div class="editorial-card mx-auto max-w-2xl p-12">
          <h2 class="font-serif text-3xl font-light text-patagonia-chocolate">Partner with a verified exporter</h2>
          <p class="mx-auto mt-4 max-w-lg text-patagonia-taupe/85">Request compliance documents with your B2B inquiry.</p>
          <a routerLink="/contact" class="btn-cta-copper mt-8 inline-flex">Contact Export Desk</a>
        </div>
      </div>
    </section>
  `
})
export class CertificationsPageComponent {
  gstNumber = 'XXAAAAA0000A1Z5';
  iecNumber = 'XXXXXXXXXX';

  certifications = [
    {
      badge: 'IEC',
      title: 'IEC Registration',
      subtitle: 'Import Export Code',
      details: 'Authorizes Iconic Stones for lawful global stone export and customs clearance procedures.'
    },
    {
      badge: 'GST',
      title: 'GST Registration',
      subtitle: 'Tax Compliance India',
      details: 'Registered under GST Act for transparent domestic and international commercial invoicing.'
    },
    {
      badge: 'QA',
      title: 'Quality Assurance Program',
      subtitle: 'Pre-Export Inspection',
      details: 'Multi-stage slab inspection for thickness, finish, structural integrity, and packaging readiness.'
    },
    {
      badge: 'EXP',
      title: 'Export Council Alignment',
      subtitle: 'Verified Exporter',
      details: 'Aligned with national export promotion frameworks for natural stone and allied materials.'
    }
  ];
}
