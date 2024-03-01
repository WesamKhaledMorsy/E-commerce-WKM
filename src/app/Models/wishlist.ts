import { Brands } from "./brands";
import { Category } from "./category";
import { SubCategory } from "./subCategory";

export interface WishList {
  status: string;
  count: number;
  data?: (WishListData)[] | null;
}
export interface WishListData {
  sold: number;
  images?: (string)[] | null;
  subcategory?: (SubCategory)[] | null;
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brands;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

