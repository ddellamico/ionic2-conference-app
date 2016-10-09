/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { ScheduleModel } from '../schedule/schedule.model';
import { SpeakerModel } from '../speakers/speaker.model';

export class ConferenceModel {
  constructor(public schedules: Array<ScheduleModel>,
              public speakers: Array<SpeakerModel>,
              public tracks: Array<string> = []) {
  }
}
