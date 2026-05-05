export interface StoneProduct {
  id: number;
  name: string;
  type: 'Marble' | 'Granite' | 'Quartzite';
  finish: 'Polished' | 'Honed' | 'Leathered';
  colorFamily: 'White' | 'Grey' | 'Black' | 'Gold';
  origin: string;
  priceTier: 'Premium' | 'Elite';
  imageUrl: string;
}
