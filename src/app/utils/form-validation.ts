import { AbstractControl, FormGroup } from '@angular/forms';

export function fieldInvalid(control: AbstractControl | null | undefined, submitted: boolean): boolean {
  return submitted && !!control?.invalid;
}

export function getFieldErrorMessage(
  control: AbstractControl | null | undefined,
  label: string,
  submitted: boolean
): string | null {
  if (!control || !submitted || !control.invalid) {
    return null;
  }

  const errors = control.errors;
  if (!errors) {
    return null;
  }

  if (errors['required']) {
    return `${label} is required.`;
  }
  if (errors['email']) {
    return 'Enter a valid business email (e.g. name@company.com).';
  }
  if (errors['minlength']) {
    const min = errors['minlength'].requiredLength;
    return `${label} must be at least ${min} characters.`;
  }

  return `Please check ${label.toLowerCase()}.`;
}

export function invalidFieldCount(form: FormGroup, submitted: boolean): number {
  if (!submitted) {
    return 0;
  }
  return Object.values(form.controls).filter((control) => control.invalid).length;
}

export function focusFirstFormError(): void {
  queueMicrotask(() => {
    document.querySelector<HTMLElement>('.form-field-error')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  });
}
