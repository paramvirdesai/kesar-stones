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

export interface B2BInquiryPayload {
  name: string;
  email: string;
  company: string;
  destinationPort: string;
  materialInterest: string;
  volume: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class LeadApiService {
  private readonly endpoint = `${environment.apiBaseUrl}/lead`;

  constructor(private readonly http: HttpClient) {}

  submitLead(payload: LeadPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.endpoint, payload);
  }

  submitB2BInquiry(payload: B2BInquiryPayload): Observable<{ message: string }> {
    const lead: LeadPayload = {
      name: payload.name,
      email: payload.email,
      company: payload.company,
      message: [
        `B2B Export Inquiry`,
        `Destination Port / Market: ${payload.destinationPort}`,
        `Material Interest: ${payload.materialInterest}`,
        `Estimated Volume: ${payload.volume}`,
        ``,
        payload.message
      ].join('\n')
    };
    return this.submitLead(lead);
  }
}
