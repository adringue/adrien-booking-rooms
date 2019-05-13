import { BookingService } from './../booking/shared/booking.service';
import { HelperService } from './../common/service/helper.service';
import { AuthGuard } from './../auth/shared/auth.guard';
import { MapModule } from '../common/map/map.module';
import { UppercasePipe } from './../common/pipes/uppercase.pipe';
import { Routes, RouterModule } from '@angular/router';
import { RentalComponent } from './rental.component';
import { NgModule } from '@angular/core';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { CommonModule } from '@angular/common';
import { RentalService } from './shared/rental.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';
import { Daterangepicker } from 'ng2-daterangepicker';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'rentals', component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: ':rentalId', component: RentalDetailComponent , canActivate: [AuthGuard]}
    ],
  },
];
@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailComponent,
    UppercasePipe,
    RentalDetailBookingComponent
  ],
  imports: [CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule
  ],
  providers: [RentalService, HelperService, BookingService]
})
export class RentalModule {

 }
