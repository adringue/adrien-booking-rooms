import { AuthService } from './../../auth/shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
  }
  search(city: string) {
   const cityWithoutEmptyStartSpace = city;
  //  console.log(cityWithoutEmptyStartSpace);
  //  console.log(decodeURI(`/rentals/${ cityWithoutEmptyStartSpace }/homes`));
   cityWithoutEmptyStartSpace ?  this.router.navigate([`/rentals/${ cityWithoutEmptyStartSpace }/homes`]) :
    this.router.navigate(['/rentals']);
  }
}
