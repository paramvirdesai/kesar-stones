import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { LeadApiService } from '../../services/lead-api.service';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lead-form.component.html',
  styleUrl: './lead-form.component.scss'
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
