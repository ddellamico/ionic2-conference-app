import { SpeakerModel } from '../speakers/speaker.model';
/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

export class SessionModel {
  constructor(public _id: string,
              public name,
              public description: string,
              public speakerNames: Array<string>,
              public speakers: Array<SpeakerModel> = [],
              public hide: boolean = false,
              public tracks: Array<string>,
              public timeStart?: string,
              public timeEnd?: string) {
  }
}
