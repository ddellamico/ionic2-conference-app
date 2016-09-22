/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES, FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/common';
import { FormValidators } from '../../core/helpers/validators';

@Component({
  selector: 'auth-form',
  directives: [REACTIVE_FORM_DIRECTIVES],
  template: `
     <form [formGroup]="authForm" 
        (ngSubmit)="onLogin.emit({credentials: authForm.value, isValid: authForm.valid})" novalidate>
      <ion-item>
        <ion-label floating primary>Email</ion-label>
        <ion-input type="email" value="" formControlName="username"></ion-input>
      </ion-item>
      <p *ngIf="!authForm.controls.username.valid && authForm.controls.username.touched" danger padding-left>
        Invalid email !
      </p>
      <ion-item>
        <ion-label floating primary>Password</ion-label>
        <ion-input type="password" value="" formControlName="password"></ion-input>
      </ion-item>
      <p *ngIf="!authForm.controls.password.valid && authForm.controls.password.touched" danger padding-left>
        Password is required
      </p>
      <p *ngIf="errorMessage" danger padding-left>{{ errorMessage }}</p>
      <ion-row responsive-sm>
        <ion-col>
          <button [disabled]="!authForm.valid" type="submit" primary block>Login</button>
        </ion-col>
        <ion-col>
          <button (click)="onSignup.emit()" type="button" light block>Signup</button>
        </ion-col>
      </ion-row>
    </form>
  `
})
export class AuthFormComponent {

  private authForm: FormGroup;

  @Input() errorMessage: string;

  @Output() onLogin = new EventEmitter();
  @Output() onSignup = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, FormValidators.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

}
