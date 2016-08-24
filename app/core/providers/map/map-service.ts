/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { BaseService } from '../base-service';
import { MapModel } from './map-model';

@Injectable()
export class MapService extends BaseService {

  constructor(private authHttp: AuthHttp, events: Events) {
    super(events);
  }

  public getMarkers(): Observable<Array<MapModel>> {
    return this.authHttp.get(`${process.env.API_URL}/maps`)
      .map((res: Response) => res.json())
      .map((markers: Array<any>) => {
        return markers.map(m => new MapModel(m._id, m.name, m.lat, m.lng, m.center));
      })
      .catch((err: any) => this.handleError(err));
  }
}
