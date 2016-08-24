import { Component } from '@angular/core';
import { Validators } from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { FormValidators } from '../../core/helpers/form-validators';
import { AuthService } from '../../core/providers/auth/auth-service';
import { NotificationService } from '../../core/helpers/notification-service';
import { UxMessage } from '../../core/constants/ux-message';

@Component({
  template: require('./signup.html'),
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class SignupPage {
  signUpForm: FormGroup;

  constructor(private nav: NavController,
              private securityService: AuthService,
              private notification: NotificationService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, FormValidators.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSignup(model: any, isValid: boolean) {
    if (!isValid) {
      this.notification.showAlert(UxMessage.SIGNUP_ERROR);
    }
    if (isValid) {
      this.securityService.signUp(model.firstName, model.lastName,
        model.username, model.password).subscribe(
        loggedIn => {
          if (loggedIn) {
            this.nav.push(TabsPage);
          } else {
            this.notification.showAlert(UxMessage.SIGNUP_ERROR);
          }
        },
        error => {
          this.notification.showAlert(UxMessage.UNKNOWN_ERROR);
          console.log(error);
        }
      );
    }
  }
}
