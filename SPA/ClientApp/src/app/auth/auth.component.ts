import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private notifier: NotifierService) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (!this.isLoginMode) {
      if (password != form.value.confirmPassword) {
        this.notifier.notify('warning', "Passwords Dont't Match")
        return;
      }
    }

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        this.isLoading = false;
        if (this.isLoginMode) {
          this.router.navigate(['/profiles']);
          this.notifier.notify('success', "Successfully Logged In")
        } else {
          this.isLoginMode = true;
          this.notifier.notify('success', "Successfully Registered Please Login")
        }
      },
      errorMessage => {
        this.notifier.notify('error', errorMessage ? errorMessage : "Error")
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
