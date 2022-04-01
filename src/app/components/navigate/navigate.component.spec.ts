import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {NavigateComponent} from "./navigate.component";


fdescribe('NavigateComponent', () => {
  let component: NavigateComponent;
  let fixture: ComponentFixture<NavigateComponent>;
  let router: Router
  let location: Location;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigateComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: []
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigateComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router)
    location = TestBed.get(Location);
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should getRouting',  () =>  {
      component.getRouting();
      const routing = 'name/catalog/pure-bliss'.split('/')
      expect(routing).toEqual(['name', 'catalog', 'pure-bliss'])
  });
})
