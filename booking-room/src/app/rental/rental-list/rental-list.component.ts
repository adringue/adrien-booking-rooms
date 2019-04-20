import { Component, OnInit } from '@angular/core';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {
  rentals: Rental[] = [];

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    // tslint:disable-next-line:no-debugger
    // debugger;
    // this.rentalService.testFunction();
    const rentalObservable: Observable<Rental[]> = this.rentalService.getRentals();

    // tslint:disable-next-line:no-debugger
    // debugger;
    rentalObservable.subscribe(
      (rentals: Rental[]) => {
        // tslint:disable-next-line:no-debugger
        // debugger;
        this.rentals = rentals;
      },
      (err) => {
        // tslint:disable-next-line:no-debugger
        // debugger;
      },
      () => {
        // tslint:disable-next-line:no-debugger
        // debugger;
       }
    );
  }

}
