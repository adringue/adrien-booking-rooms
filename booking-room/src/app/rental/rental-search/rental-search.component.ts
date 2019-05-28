import { Rental } from './../shared/rental.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.scss']
})
export class RentalSearchComponent implements OnInit {
  city: string;
  rentals: Rental[] = [];
  errors: any[] = [];
  subscription: Subscription;
  confirmAllRentalsContainsCity = false;
  constructor(private route: ActivatedRoute, private rentalService: RentalService) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.city = params['city'].trim();
      this.getRentals();
    });
  }

  getRentals() {
    this.errors = [];
    this.rentals = [];
    this.subscription = this.rentalService.getRentalsByCity(this.city).subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
        this.confirmAllRentalsContainsCity = this.allRentalsContainsCity();
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      });
  }
  allRentalsContainsCity(): boolean {
    const containOnlyCity = this.rentals.filter(rental =>
      rental.city.includes(this.city)
    );
    if (this.rentals.length === containOnlyCity.length) {
      return true;
    }
  }
}
