/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { NotificationHelper } from './notifications';
import { CommonHelper } from './common';

export function helpers() {
  return [
    NotificationHelper,
    CommonHelper
  ];
}
