import {Component, OnInit} from '@angular/core';
import {IFlowerBack} from "../../shared/interfaces/flowers-back.interface";
import {IFlowersStandard} from "../../shared/interfaces/flowersStandard.interface";
import {FlowersService} from "../../shared/services/flowers/flowers.service";
import {ICategoryBack} from "../../shared/interfaces/category-back.interface";
import {Router} from "@angular/router";
import {CategoryService} from "../../shared/services/category/category.service";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {

  arrCategoryFilter: Array<ICategoryBack> = [];
  objFlower: any;
  arrFlower: Array<IFlowerBack> = [];
  arrayPage: Array<number> = [];
  page!: number;
  totalPages!: number;
  isPage = true;
  totalElements!: number | string;
  disabled!: string;
  search!: string;
  arrSearch: Array<IFlowerBack> = [];
  name!: string;

  constructor(
    private flowersServices: FlowersService,
    private router: Router,
    private categoryServices: CategoryService,
    private toaster: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getCategory();
    this.getFlowers()
  }

  getFlowers(): void {
    this.flowersServices.getFLowersSearch().subscribe((flower: IFlowersStandard) => {
      this.totalElements = flower.totalElements;
      if (this.isPage) {
        this.getPages(flower.totalPages);
      }
      this.arrFlower = flower.content;
      this.objFlower = flower;
    })
  }

  getCategory(): void {
    this.categoryServices.getCategory().subscribe(category => {
      this.arrCategoryFilter = category;
    })
  }

  getPages(totalPages: number): void {
    this.arrayPage = [];
    for (let i = 0; i <= totalPages - 1; i++) {
      this.arrayPage.push(i);
    }
  }

  change({array, totalElement}: { array: IFlowersStandard, totalElement: number }): void {
    this.arrFlower = array.content
    this.totalElements = totalElement
  }

  get url(): string {
    return environment.img;
  }

  pageNext(page: number): void {
    this.isPage = false;
    this.page = page;
  }

  isActivePage(page: number): boolean {
    return this.page === page;
  }

  urlFlower({id, name}: IFlowerBack): void {
    const flowers = name.replace(/ /g, '-').toLowerCase()
    this.router.navigate([`catalog/${flowers}/${id}`])
  }

  selectedSort(value: any): void {
    if (value.value && value.value !== this.disabled) {
      const [name, direction] = value.value.split(' ')
      this.flowersServices.sortFlowers(name, direction).subscribe((res: any) => {
        this.arrFlower = res.content
      })
    }
    this.disabled = value.value
  }

  onEnter(): void {
    this.name = this.search
    this.flowersServices.getSearch(this.search).subscribe((flower: IFlowerBack[]) => {
      this.arrSearch = flower
      this.arrFlower = flower;
      if(flower.length) {
        this.toaster.success('Success!');
        this.totalElements = flower.length
        this.getPages(1);
      } else {
        this.toaster.error('no product');
        this.totalElements = 'no'
      }

    }, error => {
      this.toaster.error('no product');
    })
  }

  closeSearch(): void  {
    this.arrSearch = []
    this.search = ''
  }
}
