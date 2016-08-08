import { Component } from '@angular/core';
import { MapService } from '../../core/providers/map/map-service';
import { MapModel } from '../../core/providers/map/map-model';

@Component({
  template: require('./map.html')
})
export class MapPage {
  constructor(private mapService: MapService) {
  }

  ionViewLoaded() {
    this.mapService.getMarkers().subscribe((mapData: MapModel[]) => {
        const mapEle = document.getElementById('map');

        const markerCenter = mapData.find(d => d.center);
        const map = new google.maps.Map(mapEle, {
          center: markerCenter.position(),
          zoom: 16
        });

        mapData.forEach(markerData => {
          let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${markerData.name}</h5>`
          });

          const marker = new google.maps.Marker({
            position: markerData.position(),
            map: map,
            title: markerData.name
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

        google.maps.event.addListenerOnce(map, 'idle', () => {
          google.maps.event.trigger(map, 'resize');
          mapEle.classList.add('show-map');
        });

      },
      error => console.log(error));
  }
}
