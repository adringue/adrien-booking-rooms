import { UcWordsPipe } from 'ngx-pipes';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Rental
} from './../shared/rental.model';
import {
  RentalService
} from './../shared/rental.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Subject
} from 'rxjs';
import {
  ToastrService
} from 'ngx-toastr';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {
  currentId: string;
  rental: Rental;
  rentalCategories: string[] = Rental.CATEGORIES;
  locationSubject: Subject<any> = new Subject();
  constructor(private route: ActivatedRoute,
    private upperPipe: UcWordsPipe,
    private toastrService: ToastrService,
     private rentalService: RentalService) {
       this.transformLocation = this.transformLocation.bind(this);
     }
  ngOnInit() {
    this.route.params.subscribe(
      (params) => {

        this.getRental(params['rentalId']);
      }
    );
  }
  transformLocation(location: string): string {

    return this.upperPipe.transform(location);
  }
  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe(
      (rental: Rental) => {
        this.rental = rental;
      });
  }
  updateRental(rentalId: string, rentalData: any) {
    this.rentalService.updateRental(rentalId, rentalData).subscribe(
      (updatedRental: Rental) => {
        this.rental = updatedRental;
        if (rentalData.city || rentalData.street || rentalData.country) {
          this.locationSubject.next(this.rental.city + ',' + this.rental.country + ',' + this.rental.street);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastrService.success(errorResponse.error.errors[0].detail, 'Error');
        this.getRental(rentalId);
      }
    );
  }
  countBedroomAssets(assetsNum: number) {
    return parseInt(<any>this.rental.bedrooms || 0, 10) + assetsNum;
  }
}
