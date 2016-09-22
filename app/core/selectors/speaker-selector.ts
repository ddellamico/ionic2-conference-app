/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { AppState } from '../reducers/index';
import { SpeakerState } from '../reducers/speaker/speaker-state';
import { SpeakerModel } from '../../core/providers/speakers/speaker-model';

/**
 * reference : https://gist.github.com/btroncone/a6e4347326749f938510#extracting-selectors-for-reuse
 */
export class SpeakerSelector {

  /**
   * Every reducer module exports selector functions, however child reducers
   * have no knowledge of the overall state tree. To make them useable, we
   * need to make new selectors that wrap them.
   *
   * Once again our compose function comes in handy. From right to left, we
   * first select the speakers state then we pass the state to the speaker
   * reducer's _getSpeakerItems selector, finally returning an observable
   * of search results.
   */
  public static getSpeakerItems(): (selector: Observable<AppState>) => Observable<SpeakerModel[]> {
    return compose(this._getSpeakerItems(), this.getSpeakerState());
  }

  public static isLoading(): (selector: Observable<AppState>) => Observable<boolean> {
    return compose(this._isLoading(), this.getSpeakerState());
  }

  /**
   * A selector function is a map function factory. We pass it parameters and it
   * returns a function that maps from the larger state tree into a smaller
   * piece of state. This selector simply selects the `speaker` state.
   *
   * Selectors are used with the `let` operator. They take an input observable
   * and return a new observable. Here's how you would use this selector:
   *
   * ```ts
   * class MyComponent {
   * 	constructor(state$: Observable<AppState>) {
   * 	  this.speakersState$ = state$.let(getSpeakerState());
   * 	}
   * }
   * ```
   */
  private static getSpeakerState(): Function {
    return (state$: Observable<AppState>) => state$
      .select(s => {
        return s.speakers;
      });
  }

  private static _getSpeakerItems(): Function {
    return (state$: Observable<SpeakerState>) => state$
      .select(s => {
        return s.speakerList;
      });
  }

/*  private static _isLoaded(): Function {
    return (state$: Observable<SpeakerState>) => state$
      .select(s => s.loaded);
  }*/

  private static _isLoading(): Function {
    return (state$: Observable<SpeakerState>) => state$
      .select(s => s.loading);
  }
}
