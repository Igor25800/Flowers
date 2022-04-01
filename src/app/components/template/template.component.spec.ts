import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TemplateComponent} from "./template.component";
import {KeycloakService} from "keycloak-angular";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";


fdescribe('TemplateComponent', () => {
  let component: TemplateComponent;
  let fixture: ComponentFixture<TemplateComponent>;
  let service: KeycloakService;
  let router: Router
  let location: Location;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [KeycloakService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router)
    location = TestBed.get(Location);
    service = new KeycloakService();
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should  login', () => {
    const  rout = spyOn(router, 'navigate')
    component.login();
    expect(rout).toHaveBeenCalledWith(['account'])
  })
})
