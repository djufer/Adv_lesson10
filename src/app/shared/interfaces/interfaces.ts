
export interface CategoryRequest {
  name: string;
  path: string;
  imagePath: string;
}
export interface CategoryResponse extends CategoryRequest {
  id: number;
}

// -----------------------------------------
export interface PromotionRequest {
  date: Date;
  name: string;
  title: string;
  description: string;
  imagePath: string;
}
export interface PromotionResponse extends PromotionRequest{
  id: number;
}
// ---------------------------------------------
export interface ProductRequest {
  category: CategoryResponse;
  subCategory?: string;
  name: string;
  path: string;
  description: string;
  weight: string;
  price: number;
  imagePath: string;
  proteins: number;
  carbohydrates: number;
  fats: number;
  calories: number;
  count: number
}
export interface ProductResponse extends ProductRequest{
  id: number
}



export interface OrderRequest {
  clientName: string;
  products: ProductResponse[];
  totalPrice: number;
  status: number;
  amount: number;
  shippingAddress: string;
  orderDate: Date;
}
export interface OrderResponse extends OrderRequest {
  id: number;
}


export interface OrderStatus {
  id: number;
  name: string;
  title: string;
  description: string;
}

export interface Breadcrumb {
  label: string;
  url: string;
}

export interface ILogin{
  email: string,
  password: string
}