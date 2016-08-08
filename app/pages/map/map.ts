import { Component } from '@angular/core';
import { MapService } from '../../core/providers/map/map-service';
import { MapModel } from '../../core/providers/map/map-model';

@Component({
  template: require('./map.html')
})
export class MapPage {

  private map = null;

  constructor(private mapService: MapService) {
  }

  ionViewDidEnter() {
    this.resizeMap();
  }

  ionViewLoaded() {
    this.mapService.getMarkers().subscribe((mapData: MapModel[]) => {
        const mapEle = document.getElementById('map');

        const markerCenter = mapData.find(d => d.center);
        this.map = new google.maps.Map(mapEle, {
          center: markerCenter.position(),
          zoom: 16
        });

        mapData.forEach(markerData => {
          let infoWindow = new google.maps.InfoWindow({
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

      },
      error => console.log(error));
  }

  private resizeMap(): void {
    if (this.map) {
      google.maps.event.trigger(this.map, 'resize');
    }
  }
}
