/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

export class MapModel {
  constructor(public _id: string,
              public name: string,
              public lat: number,
              public lng: number,
              public center: boolean = false) {
  }

  position() {
    return new google.maps.LatLng(this.lat, this.lng);
  }
}
