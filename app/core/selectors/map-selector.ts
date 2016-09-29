/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { AppState } from '../reducers/index';
import { MapState } from '../reducers/map/map-state';
import { MapModel } from '../providers/map/map-model';

/**
 * reference : https://gist.github.com/btroncone/a6e4347326749f938510#extracting-selectors-for-reuse
 */
export class MapSelector {

  /**
   * Every reducer module exports selector functions, however child reducers
   * have no knowledge of the overall state tree. To make them useable, we
   * need to make new selectors that wrap them.
   *
   * Once again our compose function comes in handy. From right to left, we
   * first select the maps state then we pass the state to the map
   * reducer's _getMapItems selector, finally returning an observable
   * of search results.
   */
  public static getMapItems(): (selector: Observable<AppState>) => Observable<MapModel[]> {
    return compose(this._getMapItems(), this.getMapState());
  }

  public static isLoading(): (selector: Observable<AppState>) => Observable<boolean> {
    return compose(this._isLoading(), this.getMapState());
  }

  /**
   * A selector function is a map function factory. We pass it parameters and it
   * returns a function that maps from the larger state tree into a smaller
   * piece of state. This selector simply selects the `map` state.
   *
   * Selectors are used with the `let` operator. They take an input observable
   * and return a new observable. Here's how you would use this selector:
   *
   * ```ts
   * class MyComponent {
   * 	constructor(state$: Observable<AppState>) {
   * 	  this.mapsState$ = state$.let(getMapState());
   * 	}
   * }
   * ```
   */
  private static getMapState() {
    return (state$: Observable<AppState>) => state$
      .select(s => {
        return s.map;
      });
  }

  private static _getMapItems() {
    return (state$: Observable<MapState>) => state$
      .select(s => {
        return s.mapList;
      });
  }

  private static _isLoading() {
    return (state$: Observable<MapState>) => state$
      .select(s => s.loading);
  }
}
