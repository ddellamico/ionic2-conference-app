/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

export class TimelineFilter {
  constructor(public dayIndex: number = 0,
              public queryText: string = '',
              public excludeTracks: Array<string>,
              public segment: string = 'all') {
  }
}
