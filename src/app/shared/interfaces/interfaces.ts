
export interface CategoryRequest {
  name: string;
  path: string;
  imagePath: string;
}
export interface CategoryResponse extends CategoryRequest {
  id: number | string;
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
  id: number | string;
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
  id: number | string;
}
// ------------------------------------------------------------
export interface OrderRequest {
  userId: string;
  products: ProductResponse[];
  totalPrice: number;
  status: OrderStatus;
  shippingAddress: string;
  orderDate: Date;
}
export interface OrderResponse extends OrderRequest {
  orderID: string;
}
// ------------------------------------------------------------
export interface OrderStatus {
  id: number;
  name: string;
  title: string;
  description: string;
}
// ----------------------------------------------------------
export interface Breadcrumb {
  label: string;
  url: string;
}
// ----------------------------------------------------------
export interface ILogin{
  email: string,
  password: string
}
// -----------------------------------------------------------
// інтерфейси по USER PROFILE

export interface UserProfile {
  personalData: PersonalData;
  ordersHistory: OrderRequest[];
  notifications: UserNotification[];
  deliveryAddresses: String[];
}
export interface PersonalData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: string
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
}
