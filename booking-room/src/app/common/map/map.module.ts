import { MapComponent } from './map.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';
@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAIEzXWpn7H78ywKZBQbYr07FROTTe3Nyw'
    })
  ],
  exports: [MapComponent],
  declarations: [MapComponent],
  providers: [MapService, CamelizePipe]
})
export class MapModule {
  constructor() {
  }
}
