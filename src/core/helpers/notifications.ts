/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class NotificationHelper {

  constructor(private alertCtrl: AlertController) {
  }

  public showAlert(message: string) {
    const alert = this.alertCtrl.create({
      title: 'Ionic Conference',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
