import {Component} from '@angular/core';
import {INews} from "../../shared/interfaces/news.interface";
import {news} from "../../until/array";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  arrayNews: Array<INews> = news;

}




