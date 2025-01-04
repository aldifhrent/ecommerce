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
  color?: Color[] | undefined;
  capacity?: string[] | undefined[] | null[];
}

export interface DetailPhone {
  detail: string | string[];
  isiKotak: string[];
}

export interface Color {
  name: string | undefined;
  code: string | undefined;
}
