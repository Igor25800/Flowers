import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Loader} from "@googlemaps/js-api-loader";
import {style} from "../../until/styleMaps";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})

export class MapsComponent implements OnInit {
  @ViewChild('map') divMap!: ElementRef;
  private map!: google.maps.Map;

  @Input() set address(value: any) {
    this.position = value;
    this.initMap()
  }
  @Input() height!: string;
  @Output() changeValueMaps = new EventEmitter();
  @Input() zoom!: number;
  @Input() location!: boolean
  position!: any
  @Input() arrayMyCoordinates: Array<any> = []

  constructor() {
  }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const loader = new Loader({
      apiKey: environment.mapsApi
    });
    loader.load().then(() => {
      new google.maps.DirectionsService();
      new google.maps.DirectionsRenderer();
      this.map = new google.maps.Map(this.divMap.nativeElement, {
        center: this.position,
        zoom: this.zoom,
        styles: style,
        disableDefaultUI: true,
      })
      let marker = new google.maps.Marker({
        position: this.position,
        map: this.map,
        icon: '../../../assets/img/icons.png',
        draggable: true,
      })

      let flightPlanCoordinates = this.location ? [
        new google.maps.LatLng(53.966089,27.465588),
        new google.maps.LatLng(53.970936,27.644116),
        new google.maps.LatLng(53.970128,27.697674),
        new google.maps.LatLng(53.943463,27.726514),
        new google.maps.LatLng(53.953969,27.733380),
        new google.maps.LatLng(53.976590,27.763592),
        new google.maps.LatLng(53.981435,27.766339),
        new google.maps.LatLng(53.975782,27.797925),
        new google.maps.LatLng(53.954777,27.807538),
        new google.maps.LatLng(53.925676,27.806164),
        new google.maps.LatLng(53.894128,27.808911),
        new google.maps.LatLng(53.899792,27.804791),
        new google.maps.LatLng(53.881178,27.764966),
        new google.maps.LatLng(53.870653,27.737500),
        new google.maps.LatLng(53.852835,27.730633),
        new google.maps.LatLng(53.829337,27.711407),
        new google.maps.LatLng(53.813935,27.657849),
        new google.maps.LatLng(53.797716,27.590558),
        new google.maps.LatLng(53.804204,27.505414),
        new google.maps.LatLng(53.822042,27.454602),
        new google.maps.LatLng(53.830148,27.373578),
        new google.maps.LatLng(53.873082,27.351605),
        new google.maps.LatLng(53.928102,27.352978),
        new google.maps.LatLng(53.946696,27.376324),
        new google.maps.LatLng(53.966897,27.451855),
        new google.maps.LatLng(53.967705,27.462842)
      ] : []

      let delivery = new google.maps.Polygon({
          paths: flightPlanCoordinates,
          strokeColor: '#FF5D7D',
          strokeWeight: 2,
          strokeOpacity: 1,
          fillColor: '#FF5D7D',
          fillOpacity: 0.35
        })
        delivery.setMap(this.map)

      marker.addListener("dragend", (e: any) => {
       const geocode = new google.maps.Geocoder();
       geocode.geocode({'location': e.latLng}).then(res => {
          this.changeValueMaps.emit(res)
       })
     });
   })

  }
}
