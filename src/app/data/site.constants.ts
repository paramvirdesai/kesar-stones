export const CORPORATE_EMAIL = 'info@theiconicstones.com';

export interface CorporatePhone {
  e164: string;
  display: string;
}

export interface CorporatePhoneGroup {
  label: string;
  phones: readonly CorporatePhone[];
}

export const CORPORATE_PHONE_GROUPS: readonly CorporatePhoneGroup[] = [
  {
    label: 'USA & Canada',
    phones: [
      { e164: '+12267244709', display: '+1 226 724 4709' },
      { e164: '+16825835064', display: '+1 682 583 5064' }
    ]
  },
  {
    label: 'India',
    phones: [
      { e164: '+918849489672', display: '+91 88494 89672' },
      { e164: '+919783288888', display: '+91 97832 88888' }
    ]
  }
];

export const CORPORATE_PHONES = CORPORATE_PHONE_GROUPS.flatMap((group) => group.phones);

export const WHATSAPP_PHONE = CORPORATE_PHONE_GROUPS[1].phones[0];

export const GST_NUMBER = '24AFTPT9134N1ZH';
export const IEC_NUMBER = 'AFTPT9134N';
