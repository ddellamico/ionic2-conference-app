/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { SpeakerActions } from '../actions/speaker.action';
import { ConferenceProvider } from '../../core/providers/conference/conference.provider';
import { SpeakerModel } from '../../core/providers/speakers/speaker.model';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SpeakerEffect {

  constructor(private actions$: Actions,
              private speakerActions: SpeakerActions,
              private conferenceService: ConferenceProvider) {
  }

  @Effect()
  loadCollection$: Observable<Action> = this.actions$
    .ofType(SpeakerActions.LOAD_COLLECTION)
    .switchMap(() => this.conferenceService.getSpeakers())
    .map((speakers: SpeakerModel[]) => this.speakerActions.loadCollectionSuccess(speakers));
}
