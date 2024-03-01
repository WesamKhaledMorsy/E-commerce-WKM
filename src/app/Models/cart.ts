export interface Cart {
  status: string;
  message: string;
  numOfCartItems: number;
  data: Data;
}
export interface Data {
  _id: string;
  cartOwner: string;
  products?: (ProductsEntity)[] | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}
export interface ProductsEntity {
  count: number;
  _id: string;
  product: string;
  price: number;
}
