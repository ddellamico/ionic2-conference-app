/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseProvider } from '../base.provider';
import { SpeakerModel } from './speaker.model';
import { JwtAuthHttp } from '../auth-http';

@Injectable()
export class SpeakerProvider extends BaseProvider {

  constructor(private authHttp: JwtAuthHttp) {
    super();
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
