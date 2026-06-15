import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { finalize } from 'rxjs';
import { CollectionItem, getCollectionItem } from '../../data/collections.catalog';
import { CORPORATE_EMAIL } from '../../data/site.constants';
import { LeadApiService } from '../../services/lead-api.service';

@Component({
  selector: 'app-collection-item-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './collection-item-page.component.html',
  styleUrl: './collection-item-page.component.scss'
})
export class CollectionItemPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly leadApi = inject(LeadApiService);
  readonly location = inject(Location);

  item: CollectionItem | undefined;
  activeSlide = 0;
  specsOpen = false;
  inquiryOpen = true;
  formSubmitted = false;
  formLoading = false;
  formStatus: 'idle' | 'success' | 'error' = 'idle';
  readonly corporateEmail = CORPORATE_EMAIL;

  readonly inquiryForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    company: ['', [Validators.required, Validators.minLength(2)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const category = params.get('category') ?? '';
      const itemId = params.get('item') ?? '';
      this.item = getCollectionItem(category, itemId);
      this.activeSlide = 0;
      if (this.item) {
        this.inquiryForm.patchValue({
          message: `Product inquiry: ${this.item.name} (${this.item.category}).\n\n`
        });
      }
    });
  }

  prevSlide(): void {
    if (!this.item?.carousel.length) return;
    this.activeSlide = (this.activeSlide - 1 + this.item.carousel.length) % this.item.carousel.length;
  }

  nextSlide(): void {
    if (!this.item?.carousel.length) return;
    this.activeSlide = (this.activeSlide + 1) % this.item.carousel.length;
  }

  goToSlide(index: number): void {
    this.activeSlide = index;
  }

  toggleSpecs(): void {
    this.specsOpen = !this.specsOpen;
  }

  toggleInquiry(): void {
    this.inquiryOpen = !this.inquiryOpen;
  }

  submitInquiry(): void {
    if (!this.item) return;
    this.formSubmitted = true;
    this.formStatus = 'idle';
    if (this.inquiryForm.invalid) return;

    this.formLoading = true;
    const v = this.inquiryForm.getRawValue();
    this.leadApi
      .submitProductInquiry({
        name: v.name!,
        email: v.email!,
        company: v.company!,
        productName: this.item.name,
        category: this.item.category,
        message: v.message!
      })
      .pipe(finalize(() => (this.formLoading = false)))
      .subscribe({
        next: () => {
          this.formStatus = 'success';
          this.inquiryForm.reset({
            message: `Product inquiry: ${this.item!.name} (${this.item!.category}).\n\n`
          });
          this.formSubmitted = false;
        },
        error: () => (this.formStatus = 'error')
      });
  }
}
