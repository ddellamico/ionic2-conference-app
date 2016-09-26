/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Observable } from 'rxjs/Observable';

export class BaseService {
  constructor() {
  }

  // TODO manage "unauthorized" extending AuthHttp class
  protected handleError(error: any): Observable<any> {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
