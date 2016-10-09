/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { MapModel } from '../../../core/providers/map/map.model';

export interface MapState {
  loading: boolean;
  mapList: MapModel[];
}

