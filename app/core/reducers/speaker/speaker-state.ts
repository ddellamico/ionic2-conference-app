/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { SpeakerModel } from '../../providers/speakers/speaker-model';

export interface SpeakerState {
  loaded: boolean;
  loading: boolean;
  speakerList: SpeakerModel[];
}

