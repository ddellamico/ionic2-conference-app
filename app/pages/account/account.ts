import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../core/providers/auth/auth-service';
import { LoginPage } from '../login/login';
import { UserModel } from '../../core/providers/auth/user-model';

@Component({
  template: require('./account.html')
})
export class AccountPage {
  private profile: UserModel = null;

  constructor(private nav: NavController,
              private authService: AuthService) {
  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  getUsername() {
    this.authService.getLoggedUser().then((profileData: UserModel) => {
      this.profile = profileData;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.authService.logout().subscribe(() => this.nav.setRoot(LoginPage));
  }
}
