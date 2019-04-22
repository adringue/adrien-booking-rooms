import { MapService } from './map.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() location: string;
  lat: number;
  lng: number;
  isPositionErrorr = false;
  constructor(private mapService: MapService, private ref: ChangeDetectorRef) { }
  ngOnInit() {
  }
  mapReadyHandler() {
    this.mapService.getGeoLocation(this.location).subscribe((coordinates) => {
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;
      this.ref.detectChanges();
    }, () => {
      //  error
      this.isPositionErrorr = true;
    });
  }
}
