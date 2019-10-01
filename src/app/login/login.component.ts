import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public username: string;
  public password: string;
  
  constructor(private auth: AuthService, private router: Router , private spinner: NgxSpinnerService ,private toastr: ToastrService) { }

  public submit() {
    this.spinner.show();
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => {
          this.router.navigate(['home']);
          this.spinner.hide();

        } ,
        err => {
          this.toastr.error('Não foi possível autenticar!')
          this.spinner.hide();
        }
      ).closed;
  }
}
