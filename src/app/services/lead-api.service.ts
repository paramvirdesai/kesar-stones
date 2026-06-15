import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CORPORATE_EMAIL } from '../data/site.constants';

export interface LeadPayload {
  name: string;
  email: string;
  company: string;
  message: string;
  recipientEmail?: string;
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

export interface ProductInquiryPayload {
  name: string;
  email: string;
  company: string;
  productName: string;
  category: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class LeadApiService {
  private readonly endpoint = `${environment.apiBaseUrl}/lead`;
  private readonly recipientEmail = environment.corporateEmail ?? CORPORATE_EMAIL;

  constructor(private readonly http: HttpClient) {}

  submitLead(payload: LeadPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.endpoint, {
      ...payload,
      recipientEmail: payload.recipientEmail ?? this.recipientEmail
    });
  }

  submitB2BInquiry(payload: B2BInquiryPayload): Observable<{ message: string }> {
    const lead: LeadPayload = {
      name: payload.name,
      email: payload.email,
      company: payload.company,
      recipientEmail: this.recipientEmail,
      message: [
        `B2B Export Inquiry → ${this.recipientEmail}`,
        `Destination Port / Market: ${payload.destinationPort}`,
        `Material Interest: ${payload.materialInterest}`,
        `Estimated Volume: ${payload.volume}`,
        ``,
        payload.message
      ].join('\n')
    };
    return this.submitLead(lead);
  }

  submitProductInquiry(payload: ProductInquiryPayload): Observable<{ message: string }> {
    const lead: LeadPayload = {
      name: payload.name,
      email: payload.email,
      company: payload.company,
      recipientEmail: this.recipientEmail,
      message: [
        `Product Inquiry → ${this.recipientEmail}`,
        `Product: ${payload.productName}`,
        `Category: ${payload.category}`,
        ``,
        payload.message
      ].join('\n')
    };
    return this.submitLead(lead);
  }
}
