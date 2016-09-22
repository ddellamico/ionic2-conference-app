/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { ScheduleGroupModel } from './schedule-group-model';

export class ScheduleModel {
  constructor(public _id: string,
              public date: Date = new Date(),
              public shownSessions: number = 0,
              public groups: Array<ScheduleGroupModel> = []) {
  }
}
