/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

// Reference https://scotch.io/tutorials/using-angular-2s-model-driven-forms-with-formgroup-and-formcontrol

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators } from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { AuthService } from '../../core/providers/auth/auth-service';
import { FormValidators } from '../../core/helpers/form-validators';
import { NotificationService } from '../../core/helpers/notification-service';
import { UxMessage } from '../../core/constants/ux-message';

@Component({
  template: require('./login.html'),
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class LoginPage {
  authForm: FormGroup;
  errorMessage: string = null;

  constructor(private nav: NavController,
              private notification: NotificationService,
              private securityService: AuthService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, FormValidators.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onLogin(model: any, isValid: boolean) {
    if (!isValid) {
      this.notification.showAlert(UxMessage.INVALID_CREDENTIALS);
    }
    this.securityService.token(model.username, model.password)
      .subscribe(
        loggedIn => {
          if (loggedIn) {
            this.nav.push(TabsPage);
          } else {
            this.notification.showAlert(UxMessage.INVALID_CREDENTIALS);
          }
        },
        error => {
          console.log(error);
          this.notification.showAlert(UxMessage.UNKNOWN_ERROR);
        }
      );
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
}
