/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component, ViewChild } from '@angular/core';
import { MapModel } from '../../core/providers/map/map.model';
import { MapService } from '../../core/services/map.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { NotificationHelper } from '../../core/helpers/notifications';
import { UxMessage } from '../../core/constants';

@Component({
  template: `
  <ion-header>
    <ion-navbar>
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title>Map</ion-title>
    </ion-navbar>
  </ion-header>
  <ion-content class="map-page">
    <div #map id="map" data-tap-disabled="true"></div>
  </ion-content>
  `
})
export class MapPage {

  private markers$: Observable<MapModel[]>;
  private markerSub: Subscription;

  @ViewChild('map') mapCanvas;
  private map: any = null;

  constructor(private mapStoreService: MapService,
              private notification: NotificationHelper) {

    this.markers$ = this.mapStoreService.getMapItems();
    this.markerSub = this.markers$.subscribe((markers: MapModel[]) => {
        if (markers.length > 0) {
          this.loadMap(markers);
        }
      },
      err => {
        this.notification.showAlert(UxMessage.UNKNOWN_ERROR);
        console.log(err);
      }
    );

  }

  ionViewDidLoad() {
    this.mapStoreService.dispachLoad();
  }

  ionViewDidEnter() {
    this.resizeMap();
  }

  private loadMap(markers: MapModel[] = []): void {
    if (!this.mapCanvas) {
      return;
    }
    const mapEle = this.mapCanvas.nativeElement;
    const markerCenter = markers.find(d => d.center);
    this.map = new google.maps.Map(mapEle, {
      center: markerCenter.position(),
      zoom: 16
    });

    markers.forEach((markerData: MapModel) => {
      const infoWindow = new google.maps.InfoWindow({
        content: `<h5>${markerData.name}</h5>`
      });

      const marker = new google.maps.Marker({
        position: markerData.position(),
        map: this.map,
        title: markerData.name
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.resizeMap();
      mapEle.classList.add('show-map');
    });
  }

  ngOnDestroy() {
    this.markerSub.unsubscribe();
  }

  private resizeMap(): void {
    if (this.map) {
      google.maps.event.trigger(this.map, 'resize');
    }
  }
}
