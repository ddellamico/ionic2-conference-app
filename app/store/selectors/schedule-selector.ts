/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { AppState } from '../reducers/index';
import { ScheduleState } from '../reducers/schedule/schedule-state';
import { ScheduleModel } from '../../core/providers/schedule/schedule-model';

/**
 * reference : https://gist.github.com/btroncone/a6e4347326749f938510#extracting-selectors-for-reuse
 */
export class ScheduleSelector {

  /**
   * Every reducer module exports selector functions, however child reducers
   * have no knowledge of the overall state tree. To make them useable, we
   * need to make new selectors that wrap them.
   *
   * Once again our compose function comes in handy. From right to left, we
   * first select the schedules state then we pass the state to the schedule
   * reducer's _getScheduleItems selector, finally returning an observable
   * of search results.
   */
  public static getSchedule(): (selector: Observable<AppState>) => Observable<ScheduleModel> {
    return compose(this._getScheduleModel(), this.getScheduleState());
  }

  public static isLoading(): (selector: Observable<AppState>) => Observable<boolean> {
    return compose(this._isLoading(), this.getScheduleState());
  }

  public static getTrackers(excludedTrackNames: Array<string>): (selector: Observable<AppState>) =>
    Observable<Array<{name: string, isChecked: boolean}>> {
    return compose(this._getFilteredTrackers(excludedTrackNames), this.getScheduleState());
  }

  /**
   * A selector function is a map function factory. We pass it parameters and it
   * returns a function that maps from the larger state tree into a smaller
   * piece of state. This selector simply selects the `schedule` state.
   *
   * Selectors are used with the `let` operator. They take an input observable
   * and return a new observable. Here's how you would use this selector:
   *
   * ```ts
   * class MyComponent {
   * 	constructor(state$: Observable<AppState>) {
   * 	  this.schedulesState$ = state$.let(getScheduleState());
   * 	}
   * }
   * ```
   */
  private static getScheduleState(): Function {
    return (state$: Observable<AppState>) => state$
      .select(s => {
        return s.schedules;
      });
  }

  private static _getScheduleModel(): Function {
    return (state$: Observable<ScheduleState>) => state$
      .select(s => {
        return s.scheduleModel;
      });
  }

  private static _getTrackers() {
    return (state$: Observable<ScheduleState>) => state$
      .select(s => {
        return s.tracks;
      });
  }

  private static _getFilteredTrackers(excludedTrackNames: Array<string>) {
    return (state$: Observable<ScheduleState>) => state$
      .let(this._getTrackers())
      .map(s => {
        return s.map(i => {
          return {
            name: i,
            isChecked: (excludedTrackNames.indexOf(i) === -1)
          };
        });
      });
  }

/*  private static _isLoaded() {
    return (state$: Observable<ScheduleState>) => state$
      .select(s => s.loaded);
  }*/

  private static _isLoading(): Function {
    return (state$: Observable<ScheduleState>) => state$
      .select(s => s.loading);
  }
}
