import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserData } from '../../core/providers/user-data';
import { AuthService } from '../../core/providers/auth/auth-service';
import { LoginPage } from '../login/login';
import { UserModel } from '../../core/providers/auth/user-model';

@Component({
  template: require('./account.html')
})
export class AccountPage {
  username: string;
  private profile: UserModel = null;

  constructor(private nav: NavController,
              private alertCtrl: AlertController,
              private userData: UserData,
              private authService: AuthService) {
  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });
    alert.present();
  }

  getUsername() {
    this.authService.getLoggedUser().then((profileData: UserModel) => {
      this.profile = profileData;
      this.username = profileData.username;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.authService.logout();
    this.nav.setRoot(LoginPage);
  }
}
