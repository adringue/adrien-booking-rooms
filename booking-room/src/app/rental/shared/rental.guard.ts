import {
  catchError
} from 'rxjs/operators/catchError';
import {
  map
} from 'rxjs/operators/map';
import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {
  RentalService
} from './rental.service';
import {
  Observable
} from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RentalGuard implements CanActivate {
  constructor(private router: Router, private rentalService: RentalService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable < boolean > {
    const rentalId: string = route.params.rentalId;
    return this.rentalService.verifyRentalUser(rentalId).pipe(map(() => {
      return true;
    }), catchError(() => {
      this.router.navigate(['/rentals']);
      return Observable.of(false);
    }));
  }
}
