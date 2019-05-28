import { HttpErrorResponse } from '@angular/common/http';
import { RentalService } from './../shared/rental.service';
import { Rental } from '../shared/rental.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {
  newRental: Rental;
  rentalCategories = Rental.CATEGORIES;
  errors: any[] = [];
  constructor(private rentalService: RentalService, private router: Router) { }
  handleImageChange() {
    this.newRental.image = 'assets/images/images_hotel.jpeg';
  }
  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }
  createRental() {
    console.log(this.newRental);
    this.rentalService.createRental(this.newRental).subscribe(
      (rental: Rental) => {
        this.router.navigate([`/rentals/${rental._id}`]);
      },
      (errorResponse: HttpErrorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
