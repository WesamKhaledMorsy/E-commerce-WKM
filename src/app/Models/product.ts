import { Category } from "./category";
import { SubCategory } from "./subCategory";

export interface Product {
  sold: number;
  images?:string[] ;
  subcategory?:SubCategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string ;
  quantity: number;
  price?: number;
  imageCover?: string;
  category?: Category;
  brand: Category;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number | null;
  availableColors?: (null)[] | null;
}


