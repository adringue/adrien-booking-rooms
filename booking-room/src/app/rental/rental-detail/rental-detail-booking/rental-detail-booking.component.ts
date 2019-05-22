import { AuthService } from './../../../auth/shared/auth.service';
import { Rental } from './../../shared/rental.model';
import { HelperService } from './../../../common/service/helper.service';
import { Booking } from './../../../booking/shared/booking.model';
import { Component, OnInit, Input, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { BookingService } from '../../../booking/shared/booking.service';
import { ToastrService } from 'ngx-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
@Component({
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:component-selector
  selector: 'booking-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;
  // @Input() bookings: Booking[];
  newBooking: Booking;
  daterange: any = {};
  bookedOutDates: any[] = [];
  modalRef: any;
  errors: any[] = [];
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: Booking.BOOKING_DATE_FORMAT },
    alwaysShowCalendars: false,
    opens: 'left',
    autoUpdateInput: false,
    isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(private helper: HelperService, private toastrService: ToastrService,
    private modalService: NgbModal, public auth: AuthService, private bookingService: BookingService) { }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }
  private checkForInvalidDates(date) {
    return (
      this.bookedOutDates.includes(
        date.format(this.helper.formatBookingDate(date))
      ) || date.diff(moment(), 'days') < 0
    );
    // date.diff(moment(), 'days') < 0, here wird gepueft if the date is before today date, it should return
    // today date if the difference is less than 0
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;
    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const bookedOutDatesNotDestructurized = this.helper.getBookingRangeOfDates(
          booking.startAt,
          booking.endAt
        );
        // without destructurization haben wir ein array aus array range
        this.bookedOutDates.push(...bookedOutDatesNotDestructurized);
      });
      if (this.bookedOutDates) {
        console.log(this.bookedOutDates);
      }
    }
  }
  private addNewBookedDates(bookingData: any) {
    const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...dateRange);
  }
  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }
  openConfirmModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
    // tslint:disable-next-line:no-unused-expression
    // this.picker.datePicker;
    // tslint:disable-next-line:no-debugger
    // debugger;
  }

  createBooking() {
    this.newBooking.rental = this.rental;
    this.bookingService.createBooking(this.newBooking).subscribe(
      (bookingData) => {
        this.addNewBookedDates(bookingData);
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastrService.success('Booking has been successfuly created, check out your booking detail in manage section!', 'Success!');
      },
      (errorResponse: any) => {
        this.errors = errorResponse.error.errors;
      });
  }
  public selectedDate(value: any, datepicker?: any) {
    // this is the date the iser selected
    // any object can be passed to the selected event and it will be passed back here
    // datepicker.start = value.start;
    // datepicker.end = value.end;
    this.options.autoUpdateInput = true;  // to get date visible only when entering date
    this.newBooking.startAt = this.helper.formatBookingDate(value.start);
    this.newBooking.endAt = this.helper.formatBookingDate(value.end);
    this.newBooking.days = -value.start.diff(value.end, 'days');
    this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
    //  console.log(this.newBooking);
    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }
}
