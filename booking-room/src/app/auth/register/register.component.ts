import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formData: any = {};  // 2 ways binding
  errors: any[] = [];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  register(data) {
    this.authService.register(this.formData).subscribe(
      () => {
        this.router.navigate(['/login', { registered: 'success' }]);
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
