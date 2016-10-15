/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

/*export interface TimelineFilter {
  dayIndex: number;
  queryText: string;
  excludeTracks: Array<string>;
  segment: string;
}*/

export class TimelineFilter {
  constructor(public queryText: string = '',
              public segment: string = 'all',
              public excludeTracks: Array<string> = [],
              public dayIndex: number = 0) {
  }
}
