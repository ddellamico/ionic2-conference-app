/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { SpeakerSelector } from './speaker-selector';
import { ScheduleSelector } from './schedule-selector';
import { MapSelector } from './map-selector';
import { AuthSelector } from './auth-selector';

export default [
  AuthSelector,
  SpeakerSelector,
  ScheduleSelector,
  MapSelector
];
