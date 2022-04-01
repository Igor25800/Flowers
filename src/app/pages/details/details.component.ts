import {Component, OnInit} from '@angular/core';
import {FlowersService} from "../../shared/services/flowers/flowers.service";
import {IFlowerBack} from "../../shared/interfaces/flowers-back.interface";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-details',
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.scss']
})
export class DetailsComponent implements OnInit {

  obj!:IFlowerBack

  constructor(
    private flowersService: FlowersService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(): void {
    const id = Number(this.router.snapshot.paramMap.get('id'))
    this.flowersService.detailsFlowers(id).subscribe(res => {
      if(res) {
        this.obj = res
      }
    })
  }

  get url(): string {
    if(this.obj) {
      return `${environment.img}${this.obj.photo}`
    } else  {
      return ''
    }
  }
}
