import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-certifications-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './certifications-page.component.html',
  styleUrl: './certifications-page.component.scss'
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
