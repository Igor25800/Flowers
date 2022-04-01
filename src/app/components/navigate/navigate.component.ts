import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss']
})
export class NavigateComponent implements OnInit {

  arrRouter: Array<string> = [];
  name!: string

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getRouting()
  }

  getRouting(): void {
    const array = this.router.url.split('/').slice(1)
    if (array.length > 1) {
      array.pop();
    }
    this.arrRouter = array
  }

  routNavigate(name: string): void {
    this.router.navigate([name.toLowerCase()])
  }

}
