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
import { SpeakerModel } from './speaker-model';

@Injectable()
export class SpeakerService extends BaseService {

  constructor(private authHttp: AuthHttp, events: Events) {
    super(events);
  }

  public getSpeakers(): Observable<Array<SpeakerModel>> {
    return this.authHttp.get(`${process.env.API_URL}/speakers`)
      .map((res: Response) => res.json())
      .map((speakers: Array<any>) => {
        return speakers.map(s => new SpeakerModel(s._id, s.name, s.sessions, s.twitter, s.about,
          s.profilePic, s.location));
      })
      .map((data: SpeakerModel[]) => {
        return data.sort((a, b) => {
          const aName: string = a.name.split(' ').pop();
          const bName: string = b.name.split(' ').pop();
          return aName.localeCompare(bName);
        });
      })
      .catch((err: any) => this.handleError(err));
  }
}
