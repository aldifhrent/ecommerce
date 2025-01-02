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
  color?: Color[];
  capacity?: string[];
}

export interface DetailPhone {
  detail: string;
  isiKotak: string[];
}

export interface Color {
  name: string;
  code: string;
}
