/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { AuthService } from './auth.service';
import { MapService } from './map.service';
import { ScheduleService } from './schedule.service';
import { SpeakerService } from './speaker.service';

export default [
  AuthService,
  MapService,
  ScheduleService,
  SpeakerService
];
