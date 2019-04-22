import { Rental } from './../shared/rental.model';
import { RentalService } from './../shared/rental.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {
  currentId: string;
  rental: Rental;
  constructor(private route: ActivatedRoute, private rentalService: RentalService) { }
  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        // tslint:disable-next-line:no-debugger
        // debugger;
        // this.currentId = params['rentalId'];
        this.getRental(params['rentalId']);
      }
    );
  }
  getRental(rentalId: string) {
    this.rentalService.getRentalById(rentalId).subscribe(
      (rental: Rental) => {
        this.rental = rental;
      });
  }
}
