/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { SessionModel } from './session-model';

export class ScheduleGroupModel {
  constructor(public time: Date,
              public hide: boolean = false,
              public sessions: Array<SessionModel>) {
  }
}
