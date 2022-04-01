import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-template',
  templateUrl: 'template.component.html',
  styleUrls: ['template.component.scss']
})

export class TemplateComponent {

  @Input() nameRouter!: string;

  constructor(
    private keyCloakServices: KeycloakService,
    private router: Router
  ) {
  }

  login(): void {
    this.router.navigate(['account'])
  }
}
