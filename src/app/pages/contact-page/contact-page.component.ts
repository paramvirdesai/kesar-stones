import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { CORPORATE_EMAIL, CORPORATE_PHONE_GROUPS } from '../../data/site.constants';
import { LeadApiService } from '../../services/lead-api.service';
import { MATERIAL_OPTIONS } from '../../data/products.data';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent implements OnInit {
  submitted = false;
  loading = false;
  status: 'idle' | 'success' | 'error' = 'idle';
  materialOptions = MATERIAL_OPTIONS;
  readonly corporateEmail = CORPORATE_EMAIL;
  readonly phoneGroups = CORPORATE_PHONE_GROUPS;

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
      } else {
        this.inquiryForm.patchValue({ materialInterest: material });
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
