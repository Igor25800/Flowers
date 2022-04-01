import {IFlowerBack} from "./flowers-back.interface";

export interface IFlowersStandard {
  content: Array<IFlowerBack>;
  size: number;
  totalElements: number;
  totalPages: number;
  number: number
}
