export interface Product {
  id?: string;
  images?: string[];
  discount: number;
  category?: string;
  phoneName: string;
  brand?: string;
  model?: string;
  detailPhone?: DetailPhone;
  price: number;
  color?: string[];
  capacity?: string[];
}

export interface DetailPhone {
  detail: string;
  isiKotak: string[];
}
