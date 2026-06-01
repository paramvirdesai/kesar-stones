import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { SITE_ASSETS } from '../data/site-assets';
import {
  HERO_HEADLINE,
  LUXURY_APPLICATION_CARDS,
  RAW_HOVER_OVERLAY,
  RAW_INVENTORY_CARDS,
  STORY_MOSAIC
} from '../data/home-page.data';
import { MATERIAL_OPTIONS } from '../data/products.data';
import { LeadApiService } from '../services/lead-api.service';

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  location: string;
}

export interface ComplianceBadge {
  code: string;
  title: string;
  subtitle: string;
  value?: string;
  prominent?: boolean;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly leadApi = inject(LeadApiService);

  readonly assets = SITE_ASSETS;
  readonly heroHeadline = HERO_HEADLINE;
  readonly storyMosaic = STORY_MOSAIC;
  readonly luxuryCards = LUXURY_APPLICATION_CARDS;
  readonly rawInventoryCards = RAW_INVENTORY_CARDS;
  readonly rawHoverOverlay = RAW_HOVER_OVERLAY;
  readonly materialOptions = MATERIAL_OPTIONS;

  activeWorkflowStep = 0;
  formSubmitted = false;
  formLoading = false;
  formStatus: 'idle' | 'success' | 'error' = 'idle';

  readonly gstNumber = 'XXAAAAA0000A1Z5';
  readonly iecNumber = 'XXXXXXXXXX';

  readonly storyParagraphs = [
    'Iconic Stones owns and operates quarry assets in Rajsamand, Rajasthan — supplying granite, marble, quartzite, and engineered programs to distributors and developers across North America, China, and the Middle East.',
    'We are processors, not brokers. From block extraction and gang-saw processing to resin treatment, QA inspection, and ISPM-15 export crating, every container is documented for B2B procurement teams.',
    'Our asymmetric supply model pairs finished architectural applications with transparent raw bundle inventory — built for commercial importers who need both specification confidence and wholesale volume.'
  ];

  readonly workflow: WorkflowStep[] = [
    {
      step: 1,
      title: 'Sourcing · Rajsamand',
      description: 'Precision quarrying, vein mapping, and block grading at our Rajasthan operations.',
      location: 'Rajsamand District, India'
    },
    {
      step: 2,
      title: 'Quality Assurance',
      description: 'Thickness calibration, finish control, resin treatment, and pre-export inspection.',
      location: 'Processing & QA Facilities'
    },
    {
      step: 3,
      title: 'Global Delivery',
      description: 'Port programs to USA, China, UAE, and expanding North American distributor networks.',
      location: 'USA · China · UAE · Canada'
    }
  ];

  readonly complianceBadges: ComplianceBadge[] = [
    {
      code: 'GST',
      title: 'GST Registration',
      subtitle: 'Government of India',
      value: this.gstNumber,
      prominent: true
    },
    {
      code: 'IEC',
      title: 'Export-Import Code',
      subtitle: 'DGFT Authorized',
      value: this.iecNumber,
      prominent: true
    },
    {
      code: 'QA',
      title: 'Quality Assurance',
      subtitle: 'Pre-Export Inspection'
    },
    {
      code: 'EXP',
      title: 'Export Verified',
      subtitle: 'International Trade Ready'
    }
  ];

  readonly inquiryForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    destinationPort: ['', [Validators.required, Validators.minLength(2)]],
    materialInterest: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  setActiveWorkflow(step: number): void {
    this.activeWorkflowStep = step;
  }

  submitInquiry(): void {
    this.formSubmitted = true;
    this.formStatus = 'idle';
    if (this.inquiryForm.invalid) return;

    this.formLoading = true;
    const v = this.inquiryForm.getRawValue();
    this.leadApi
      .submitB2BInquiry({
        name: v.name!,
        email: v.email!,
        company: '—',
        destinationPort: v.destinationPort!,
        materialInterest: v.materialInterest!,
        volume: '—',
        message: v.message!
      })
      .pipe(finalize(() => (this.formLoading = false)))
      .subscribe({
        next: () => {
          this.formStatus = 'success';
          this.inquiryForm.reset();
          this.formSubmitted = false;
        },
        error: () => (this.formStatus = 'error')
      });
  }
}
