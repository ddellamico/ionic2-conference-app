/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Effect, StateUpdates } from '@ngrx/effects';
import { AppState } from '../reducers/index';
import { SpeakerActions } from '../actions/speaker-action';
import { SpeakerModel } from '../core/providers/speakers/speaker-model';
import { SpeakerService } from '../core/providers/speakers/speaker-service';

@Injectable()
export class SpeakerEffect {

  constructor(
    private updates$: StateUpdates<AppState>,
    private speakerActions: SpeakerActions,
    private speakerService: SpeakerService
  ) {}

  /*@Effect() loadCollectionOnInit$ = Observable.of(this.speakerActions.loadCollection());*/

  @Effect() loadCollection$ = this.updates$
    .whenAction(SpeakerActions.LOAD_COLLECTION)
    .switchMap(() => this.speakerService.getSpeakers())
    .map((speakers: SpeakerModel[]) => this.speakerActions.loadCollectionSuccess(speakers));
}
