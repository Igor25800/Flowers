import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Output() isExit  = new EventEmitter<boolean>();
  name: string | undefined = ''

  constructor(
    private keyCloakServices: KeycloakService,
  ) { }

  ngOnInit(): void {
    this.getName();
  }

  exit(): void {
    this.isExit.emit(false)
  }

  getName(): void {
    this.keyCloakServices.isLoggedIn().then(isLogged => {
        if (isLogged) {
          this.name = this.keyCloakServices.getUsername();
        }
      }
    )
  }

  get url(): string {
    if (this.name) {
      return 'account'
    } else {
      return 'registration'
    }
  }


}
