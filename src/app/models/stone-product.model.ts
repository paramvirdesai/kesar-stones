export interface StoneProduct {
  id: number;
  name: string;
  category: 'Granite' | 'Marble' | 'Quartzite' | 'Artificial' | 'Other';
  origin: string;
  description: string;
  imageUrl: string;
  quarryLabel: string;
  finishNote: string;
  featured?: boolean;
}
