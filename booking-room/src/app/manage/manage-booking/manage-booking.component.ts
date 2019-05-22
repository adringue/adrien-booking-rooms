import { BookingService } from './../../booking/shared/booking.service';
import { Component, OnInit } from '@angular/core';
import { Booking } from '../../booking/shared/booking.model';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {
  bookings: Booking[];
  constructor(private bookingService: BookingService) { }
  ngOnInit() {
    this.bookingService.getUserBookings().subscribe(
      (bookings: Booking[]) => {
        this.bookings = bookings;
      },
      () => {
      }
    );
  }
}
