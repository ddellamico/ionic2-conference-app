/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';

@Injectable()
export class CommonHelper {
  public static uid(): string {
    return Math.random().toString(35).substr(2, 10);
  }
}
