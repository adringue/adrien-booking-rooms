import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';


@Injectable()
export class RentalService {

  private rentals: Rental[] =
    [
      {
        id: '1',
        title: 'Central Apartment',
        city: 'New York',
        street: 'Times Square',
        category: 'apartment',
        image: 'http://via.placeholder.com/350X250',
        bedrooms: 3,
        description: 'very nice apartment',
        dailyRate: 34,
        shared: false,
        createAt: '24/12/2017'
      },
      {
        id: '2',
        title: 'Central Apartment',
        city: 'New York',
        street: 'Times Square',
        category: 'apartment',
        image: 'http://via.placeholder.com/350X250',
        bedrooms: 3,
        description: 'very nice apartment',
        dailyRate: 34,
        shared: false,
        createAt: '24/12/2017'
      },
      {
        id: '3',
        title: 'Central Apartment',
        city: 'Paris',
        street: 'Times Square',
        category: 'apartment',
        image: 'http://via.placeholder.com/350X250',
        bedrooms: 3,
        description: 'very nice apartment',
        dailyRate: 34,
        shared: false,
        createAt: '24/12/2017'
      },
      {
        id: '4',
        title: 'Central Apartment',
        city: 'New York',
        street: 'Times Square',
        category: 'apartment',
        image: 'http://via.placeholder.com/350X250',
        bedrooms: 3,
        description: 'very nice apartment',
        dailyRate: 34,
        shared: false,
        createAt: '24/12/2017'
      }];
  public testFunction(): string {
    return '';
  }
  public getRentalById(rentalId: string): Observable<Rental> {
    return new Observable<Rental>((observer) => {
      setTimeout(() => {
        const foundRental = this.rentals.find((rental) => {
          return rental.id === rentalId;
        });
        observer.next(foundRental);
      }, 500);

    });
  }
  public getRentals(): Observable<Rental[]> {
    // tslint:disable-next-line:no-debugger
    // debugger;
    return new Observable<Rental[]>((observer) => {
      setTimeout(() => {
        // tslint:disable-next-line:no-debugger
        // debugger;
        observer.next(this.rentals);
      }, 1000);
    });
  }
}
