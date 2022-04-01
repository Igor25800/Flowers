import {ICategoryBack} from "./category-back.interface";

export interface IFlowerBack {
  id: number;
  name: string;
  photo: string;
  priceDto: IPrice;
  shortDescription: string;
  thumbnail: string;
  category: ICategoryBack,
  description: string
  count?: number
}

export interface IPrice {
  id: number;
  price: string;
}
