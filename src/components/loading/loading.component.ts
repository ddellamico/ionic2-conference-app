/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ``
})
export class LoadingComponent {

  @Input() present: boolean = false;

  private loading: any = null;

  constructor(protected loadingCtrl: LoadingController) {
  }

  ngOnChanges({present}): void {
    const {currentValue, previousValue} = present;
    (currentValue && (currentValue !== previousValue)) ? this.displayLoading() : this.hideLoading();
  }

  displayLoading(): void {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  hideLoading(): void {
    if (!this.loading) {
      return;
    }
    // TODO why dismiss not working without setTimeout ?
    setTimeout(() => {
      this.loading.dismiss();
      this.loading = null;
    }, 100);
  }
}
