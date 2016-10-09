/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { SessionModel } from '../schedule/session.model';

export class SpeakerModel {
  constructor(public _id: string,
              public name: string,
              public sessions: Array<SessionModel> = [],
              public twitter: string,
              public about: string,
              public profilePic?: string,
              public location?: string,
              public email?: string,
              public phone?: string) {
  }
}
