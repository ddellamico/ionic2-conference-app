/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidators } from '../../core/helpers/validators';

@Component({
  selector: 'signup-form',
  template: `
  <ion-list>
    <div class="logo">
      <img src="assets/img/appicon.svg">
    </div>
    <form [formGroup]="signUpForm" 
      (ngSubmit)="onSignup.emit({ data: signUpForm.value, isValid: signUpForm.valid})" novalidate>
      <ion-item>
        <ion-label floating color="primary">First name</ion-label>
        <ion-input type="text" value="" formControlName="firstName"></ion-input>
      </ion-item>
      <p *ngIf="!signUpForm.controls['firstName'].valid && signUpForm.controls['firstName'].touched" 
          color="danger" padding-left>
        First name is required (minimum 3 characters)
      </p>
      <ion-item>
        <ion-label floating color="primary">Last name</ion-label>
        <ion-input type="text" value="" formControlName="lastName"></ion-input>
      </ion-item>
      <p *ngIf="!signUpForm.controls['lastName'].valid && signUpForm.controls['lastName'].touched" 
          color="danger" padding-left>
        Last name is required (minimum 3 characters)
      </p>
      <ion-item>
        <ion-label floating color="primary">Email</ion-label>
        <ion-input type="email" value="" formControlName="username"></ion-input>
      </ion-item>
      <p *ngIf="!signUpForm.controls['username'].valid && signUpForm.controls['username'].touched" 
          color="danger" padding-left>
        Invalid email !
      </p>
      <ion-item>
        <ion-label floating color="primary">Password</ion-label>
        <ion-input type="password" value="" formControlName="password"></ion-input>
      </ion-item>
      <p *ngIf="!signUpForm.controls['password'].valid && signUpForm.controls['password'].touched" 
          color="danger" padding-left>
        Password is required
      </p>
      <div padding>
        <button ion-button [disabled]="!signUpForm.valid" type="submit" color="primary" block>Create</button>
      </div>
    </form>
  </ion-list>
  `
})

export class SignUpFormComponent {

  @Output() onSignup = new EventEmitter();

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, FormValidators.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
}
