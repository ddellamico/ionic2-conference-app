/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { ScheduleModel } from '../../../core/providers/schedule/schedule-model';

export interface ScheduleState {
  loaded: boolean;
  loading: boolean;
  scheduleModel: ScheduleModel;
  tracks: Array<string>;
}

