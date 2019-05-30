import { ImageUploadModule } from './../common/components/image-upload/image-upload.module';
import { RentalGuard } from './shared/rental.guard';
import { EditableModule } from './../common/components/editable/editable.module';
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
import { NgPipesModule, UcWordsPipe } from 'ngx-pipes';
import { Daterangepicker } from 'ng2-daterangepicker';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { FormsModule } from '@angular/forms';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { RentalUpdateComponent } from './rental-update/rental-update.component';

const routes: Routes = [
  {
    path: 'rentals', component: RentalComponent,
    children: [
      { path: '', component: RentalListComponent },
      { path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard]},
      { path: ':rentalId/edit', component: RentalUpdateComponent, canActivate: [AuthGuard, RentalGuard]},
      { path: ':rentalId', component: RentalDetailComponent},
      { path: ':city/homes', component: RentalSearchComponent},
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
    RentalDetailBookingComponent,
    RentalSearchComponent,
    RentalCreateComponent,
    RentalUpdateComponent
  ],
  imports: [CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule,
    EditableModule,
    ImageUploadModule
  ],
  providers: [RentalService, HelperService, BookingService, UcWordsPipe, RentalGuard]
})
export class RentalModule {

 }
