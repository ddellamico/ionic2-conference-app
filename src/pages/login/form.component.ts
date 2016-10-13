/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

// Reference : http://blog.thoughtram.io/angular/2016/06/22/model-driven-forms-in-angular-2.html

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormValidators } from '../../core/helpers/validators';

@Component({
  selector: 'auth-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
     <form [formGroup]="authForm" 
        (ngSubmit)="onLogin.emit({credentials: authForm.value, isValid: authForm.valid})" novalidate>
      <ion-item>
        <ion-label floating color="primary">Email</ion-label>
        <ion-input type="email" value="" formControlName="username" spellcheck="false" autocapitalize="off"></ion-input>
      </ion-item>
      <p *ngIf="!authForm.controls['username'].valid && authForm.controls['username'].touched" 
          color="danger" padding-left>Invalid email !
      </p>
      <ion-item>
        <ion-label floating color="primary">Password</ion-label>
        <ion-input type="password" value="" formControlName="password"></ion-input>
      </ion-item>
      <p *ngIf="!authForm.controls['password'].valid && authForm.controls['password'].touched" 
          color="danger" padding-left>Password is required
      </p>
      <p *ngIf="errorMessage" color="danger" padding-left>Login failed :{{ errorMessage }}</p>
      <ion-row responsive-sm>
        <ion-col>
          <button ion-button [disabled]="!authForm.valid" type="submit" color="primary" block>Login</button>
        </ion-col>
        <ion-col>
          <button ion-button (click)="onSignup.emit()" type="button" color="light" block>Signup</button>
        </ion-col>
      </ion-row> 
    </form>
  `
})
export class AuthFormComponent {

  authForm: FormGroup;

  @Input() errorMessage: string;

  @Output() onLogin = new EventEmitter(false);
  @Output() onSignup = new EventEmitter(false);

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.authForm = this.fb.group({
      username: ['', [Validators.required, FormValidators.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
}
