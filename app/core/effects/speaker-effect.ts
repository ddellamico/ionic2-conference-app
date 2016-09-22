/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Effect, StateUpdates } from '@ngrx/effects';
import { SpeakerActions } from '../actions/speaker-action';
import { ConferenceService } from '../providers/conference/conference-service';
import { SpeakerModel } from '../providers/speakers/speaker-model';
import { AppState } from '../reducers/index';

@Injectable()
export class SpeakerEffect {

  constructor(
    private updates$: StateUpdates<AppState>,
    private speakerActions: SpeakerActions,
    private conferenceService: ConferenceService
  ) {}

  /*@Effect() loadCollectionOnInit$ = Observable.of(this.speakerActions.loadCollection());*/

  @Effect() loadCollection$ = this.updates$
    .whenAction(SpeakerActions.LOAD_COLLECTION)
    .switchMap(() => this.conferenceService.getSpeakers())
    .map((speakers: SpeakerModel[]) => this.speakerActions.loadCollectionSuccess(speakers));
}
