import { Booking } from '../../booking/shared/booking.model';

export class Rental {
  static readonly CATEGORIES = ['house', 'apartment', 'condo'];
  _id: string;
  title: string;
  country: string;
  city: string;
  street: string;
  category: string;
  image: string;
  bedrooms: number;
  description: string;
  dailyRate: number;
  shared: boolean;
  createAt: String;
  bookings: Booking[];
}

