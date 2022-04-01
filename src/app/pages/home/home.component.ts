import {Component} from '@angular/core';
import {ICategory} from "../../shared/interfaces/category.interface";
import {category, flowers} from "../../until/array";
import {IFlower} from "../../shared/interfaces/flowers.interface";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {
  arrCategory: Array<ICategory> = category;
  arrFlowers: Array<IFlower> = flowers
}
