/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AuthEvents } from '../constants';
import '../helpers/rxjs-operators';

export class BaseService {
  constructor(public events: Events) {
  }

  protected handleError(error: any): Observable<any> {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if (error.status === 401) {
      this.events.publish(AuthEvents.USER_UNAUTHORIZED);
    }
    return Observable.throw(errMsg);
  }
}
