import {Component, Input, OnInit, Output, EventEmitter, HostListener} from '@angular/core';
import {FlowersService} from "../../shared/services/flowers/flowers.service";
import {ICategoryBack} from "../../shared/interfaces/category-back.interface";
import {IFlowersStandard} from "../../shared/interfaces/flowersStandard.interface";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./../../pages/catalog/catalog.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() getPages = new EventEmitter<number>();
  @Output() arrayFlowers = new EventEmitter();
  @Output() selected = new EventEmitter();
  @Input() arrCategoryFilter: Array<ICategoryBack> = [];
  @Input() objFlower!: IFlowersStandard;
  @Input() set changeArray(val: string[]) {
    this.array = val;
    this.filter();
  }
  @Input() set pages(page: number) {
    this.pageNumber = page
    if(page >= 0) {
      this.filter();
    }
  }
  @Input() name!: string
  @Input() title!: string
  pageNumber!: number;

  progress!: boolean;
  padding!: number;
  selectedSort = true;
  checked!: string
  categoryId!: number;
  price = {
    minx: 0,
    max: 1000
  };
  array: string[] = []
  formGroupRadio!: FormGroup

  constructor(
    private flowersServices: FlowersService,
  ) {
    this.getForm();
  }

  ngOnInit(): void {
    this.setForm();
  }

  getForm(): void {
    this.formGroupRadio = new FormGroup({
      rangeValues: new FormControl([0, 1000]),
      radio: new FormControl(''),
      min: new FormControl(0),
      max: new FormControl(1000)
    })
  }

  get changeArray(): Array<string> {
    return this.array
  }


  setForm(): void {
    this.formGroupRadio.valueChanges.subscribe(res => {
      this.formGroupRadio.patchValue({
        min: res.rangeValues[0],
        max: res.rangeValues[1]
      }, {emitEvent: false})
    })
  }

  @HostListener('window:resize', ['$event'])
  resizeHandler(event: any) {
    if (event.target.innerWidth >= 1024) {
      this.selectedSort = true;
    }
  }

  filter(): void {
    const {min, max} = this.formGroupRadio.value;
    const [name, direction] = this.changeArray
    const param = {
      categoryId: this.categoryId,
      size: 9,
      maxPrice: max,
      minPrice: min,
      sortProperty: name,
      direction: direction,
      name: this.name,
      page: this.pageNumber
    }
    let filterObj = Object.entries(param).filter(([key, value]: string[]) => value)
      .reduce((accum: any, [key, value]: string[], i: number) => {
        accum[key] = value
        return accum
      }, {})
    this.flowersServices.filterFlowers(filterObj).subscribe((res: any) => {
      this.arrayFlowers.emit({array: res, totalElement: res.totalElements})
      this.getPages.emit(res.totalPages);
      this.progress = false
    })
  }

  filterEvent(): void {
    this.progress = true;
    this.selectedSort = true;
  }

  sortingEvent(): void {
    this.progress = true;
    this.selectedSort = false;
  }

  close(): void {
    this.progress = false
  }

  selectedCheckbox(name: ICategoryBack): void {
    this.checked = name.name;
    this.categoryId = +name.id;
  }

  clearFilter(): void {
    this.arrayFlowers.emit({array: this.objFlower, totalElement: this.objFlower.totalElements})
    this.getPages.emit(this.objFlower.totalPages);
    this.checked = '';
    this.formGroupRadio.patchValue({rangeValues: [0, 1000]})
  }

  sorting(): void {
    this.selected.emit(this.formGroupRadio.get('radio'))
  }


}
