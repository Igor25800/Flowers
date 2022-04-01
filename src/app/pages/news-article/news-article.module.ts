import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsArticleComponent} from "./news-article.component";
import {NewsArticleRoutingModule} from "./news-article-routing.module";
import {SharedModule} from "../../module/shared.module";


@NgModule({
  imports: [
    CommonModule,
    NewsArticleRoutingModule,
    SharedModule
  ],
  declarations: [NewsArticleComponent],


})
export class NewsArticleModule {
}
