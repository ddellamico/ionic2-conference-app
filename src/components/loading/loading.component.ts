/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

@Component({
  selector: 'loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ``
})
export class LoadingComponent {

  @Input() display: boolean;

  loading: Loading;

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
