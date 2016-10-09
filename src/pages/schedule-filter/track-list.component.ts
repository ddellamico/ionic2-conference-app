/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'track-list',
  // TODO for some reason I cannot set OnPush strategy due weirds behaviors with ion-toggle ...
  changeDetection: ChangeDetectionStrategy.Default,
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons start>
          <button ion-button (click)="dismiss.emit()">Cancel</button>
        </ion-buttons>
        <ion-title>Filter Sessions</ion-title>
        <ion-buttons end>
          <button ion-button (click)="applyFilters.emit(tracks)">Done</button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="outer-content">
        <ion-list>
        <ion-list-header>Tracks</ion-list-header>
        <ion-item *ngFor="let track of tracks" [attr.track]="track.name | lowercase">
          <span item-left class="dot"></span>
          <ion-label>{{track.name}}</ion-label>
          <ion-toggle [(ngModel)]="track.isChecked" color="secondary"></ion-toggle>
        </ion-item>
      </ion-list>
      <ion-list>
        <button ion-item (click)="resetFilters.emit()" danger detail-none class="reset-filters">
          Reset All Filters
        </button>
      </ion-list>
    </ion-content>
  `
})

export class TrackListComponent {
  @Input() tracks: Array<{name: string, isChecked: boolean}>;
  @Output() resetFilters = new EventEmitter(false);
  @Output() applyFilters = new EventEmitter(false);
  @Output() dismiss = new EventEmitter(false);
}
