import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'dateStringToDatePipe'
})
export class DateStringToDatePipe implements PipeTransform {
  transform(value): Date {
    return new Date(Number(value));
  }
}
