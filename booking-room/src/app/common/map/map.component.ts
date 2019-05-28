import {
  MapService
} from './map.service';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() location: string;
  @Input() locationSubject: Subject<any>;
  lat: number;
  lng: number;
  isPositionError = false;
  constructor(private mapService: MapService, private ref: ChangeDetectorRef) { }
  ngOnInit() {
    if (this.locationSubject) {
      this.locationSubject.subscribe((location: string) => {
        this.getLocation(location);
      });
    }
  }
  ngOnDestroy() {
    if (this.locationSubject) {
      this.locationSubject.unsubscribe();
    }
  }
  getLocation(location) {
    this.mapService.getGeoLocation(this.location).subscribe((coordinates) => {
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;
      this.ref.detectChanges();
    }, () => {
      //  error
      this.isPositionError = true;
      this.ref.detectChanges();
    });
  }
  mapReadyHandler() {
    this.getLocation(this.location);
  }
}
