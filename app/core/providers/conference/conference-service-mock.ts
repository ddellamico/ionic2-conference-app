/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Observable } from 'rxjs/Observable';

export class ConferenceServiceMock {

  public fakeResponse: any = null;

  public clearCache(): void {
  }

  public getSchedulesAndSpeakers(): Observable<any> {
    return Observable.from([]);
  }

  public getTimeline(dayIndex: number, queryText: string = '', excludeTracks: Array<string> = [],
                     segment: string = 'all'): Observable<any> {
    return Observable.of(this.fakeResponse);
  }

  public setResponse(data: any): void {
    this.fakeResponse = data;
  }

  public getSpeakers(): Observable<any> {
    return Observable.of(this.fakeResponse);
  }

  public getTracks(): Observable<any> {
    return Observable.of(this.fakeResponse);
  }
}
