import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LeadPayload {
  name: string;
  email: string;
  company: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class LeadApiService {
  private readonly endpoint = `${environment.apiBaseUrl}/lead`;

  constructor(private readonly http: HttpClient) {}

  submitLead(payload: LeadPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.endpoint, payload);
  }
}
