/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base-service';
import { ScheduleModel } from './schedule-model';
import { JwtAuthHttp } from '../auth-http';

@Injectable()
export class ScheduleService extends BaseService {

  constructor(private authHttp: JwtAuthHttp) {
    super();
  }

  public getSchedules(): Observable<Array<ScheduleModel>> {
    return this.authHttp.get(`${process.env.API_URL}/schedules`)
      .map((res: Response) => res.json())
      .map((schedules: Array<any>) => {
        return schedules.map(s => new ScheduleModel(s._id, s.date, s.shownSessions, s.groups));
      })
      .catch((err: any) => this.handleError(err));
  }
}
