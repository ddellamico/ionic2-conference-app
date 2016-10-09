/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { AbstractControl } from '@angular/forms';

interface ValidationResult {
  [key: string]: boolean;
}

export class FormValidators {

  public static emailValidator(control: AbstractControl): boolean {
    // RFC 2822 compliant regex
    /* tslint:disable */
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      /* tslint:enable */
      return false;
    }
    return true;
  }
}
