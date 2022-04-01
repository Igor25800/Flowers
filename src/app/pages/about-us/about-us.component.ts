import {Component} from '@angular/core';
import {advantages, flower} from "../../until/array";
import {IAdvantages} from "../../shared/interfaces/advantages.interface";

@Component({
  selector: 'app-about-us',
  templateUrl: 'about-us.component.html',
  styleUrls: ['about-us.component.scss']
})
export class AboutUsComponent {
  arrayFlower: Array<string> = flower;
  arrayCard: Array<IAdvantages> = advantages;

}
