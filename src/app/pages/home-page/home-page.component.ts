import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { SITE_ASSETS } from '../../data/site-assets';
import {
  COMPLIANCE_BADGES,
  GALLERY_SHOWCASE,
  HERO_SUBTITLE,
  HERO_TAGLINE,
  HERO_TITLE_PRIMARY,
  HERO_TITLE_SECONDARY,
  RAW_HOVER_OVERLAY,
  RAW_SLIDER_CARDS,
  STORY_MOSAIC,
  STORY_PARAGRAPHS,
  WORKFLOW_STEPS
} from '../../data/home-page.data';
import { MATERIAL_OPTIONS } from '../../data/products.data';
import { LeadApiService } from '../../services/lead-api.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgClass, RouterLink, ReactiveFormsModule, RevealOnScrollDirective],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly leadApi = inject(LeadApiService);

  readonly assets = SITE_ASSETS;
  readonly heroTitlePrimary = HERO_TITLE_PRIMARY;
  readonly heroTitleSecondary = HERO_TITLE_SECONDARY;
  readonly heroTagline = HERO_TAGLINE;
  readonly heroSubtitle = HERO_SUBTITLE;
  readonly storyParagraphs = STORY_PARAGRAPHS;
  readonly storyMosaic = STORY_MOSAIC;
  readonly galleryShowcase = GALLERY_SHOWCASE;
  readonly rawSliderCards = RAW_SLIDER_CARDS;
  readonly rawHoverOverlay = RAW_HOVER_OVERLAY;
  readonly workflow = WORKFLOW_STEPS;
  readonly complianceBadges = COMPLIANCE_BADGES;
  readonly materialOptions = MATERIAL_OPTIONS;

  activeWorkflowStep = 0;
  formSubmitted = false;
  formLoading = false;
  formStatus: 'idle' | 'success' | 'error' = 'idle';

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
