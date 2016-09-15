/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { cloneDeep }  from 'lodash';
import { Store } from '@ngrx/store';
import { ScheduleService } from '../schedule/schedule-service';
import { SpeakerService } from '../speakers/speaker-service';
import { ScheduleModel } from '../schedule/schedule-model';
import { SpeakerModel } from '../speakers/speaker-model';
import { ConferenceModel } from './conference-model';
import { SessionModel } from '../schedule/session-model';
import { BaseService } from '../base-service';
import { UserModel } from '../auth/user-model';
import { AppState } from '../../../reducers/index';
import { SpeakerActions } from '../../../actions/speaker-action';

@Injectable()
export class ConferenceService extends BaseService {

  private conferenceModelCached: ConferenceModel = null;

  constructor(events: Events,
              private store: Store<AppState>,
              private speakerActions: SpeakerActions,
              private scheduleService: ScheduleService,
              private speakerService: SpeakerService) {
    super(events);
  }

  public clearCache(): void {
    this.conferenceModelCached = null;
  }

  public getSchedulesAndSpeakers(): Observable<ConferenceModel> {
    if (this.conferenceModelCached) {
      return Observable.of(this.conferenceModelCached);
    }
    return Observable.forkJoin(
      this.scheduleService.getSchedules(),
      this.speakerService.getSpeakers()
    ).map((data) => {
      const _conferenceModel: ConferenceModel = (this.processData(data[0], data[1]) as ConferenceModel);
      if (_conferenceModel.schedules.length && _conferenceModel.speakers.length) {
        this.conferenceModelCached = _conferenceModel;
      }
      return _conferenceModel;
    });
  }

  public getTimeline(dayIndex: number, queryText: string = '', excludeTracks: Array<string> = [],
                     segment: string = 'all'): Observable<ScheduleModel> {
    return this.getSchedulesAndSpeakers()
      .mergeMap((data: ConferenceModel) => {
        const day: ScheduleModel = data.schedules[dayIndex];
        day.shownSessions = 0;
        queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        const queryWords = queryText.split(' ').filter(w => !!w.trim().length);

        day.groups.forEach(group => {
          group.hide = true;
          group.sessions.forEach(session => {
            // check if this session should show or not
            this.filterSession(session, queryWords, excludeTracks, segment);

            if (!session.hide) {
              // if this session is not hidden then this group should show
              group.hide = false;
              day.shownSessions++;
            }
          });

        });
        return Observable.of(day);
      })
      .catch((err: any) => this.handleError(err));
  }

  public getSpeakers(): Observable<SpeakerModel[]> {
    return this.getSchedulesAndSpeakers()
      .mergeMap((data: ConferenceModel) => {
        return Observable.of(data.speakers);
      })
      .catch((err: any) => this.handleError(err));
  }

  /***
   * dispatch load action to store
   */
  public fetctSpeakers() {
    this.store.dispatch(
      this.speakerActions.loadCollection()
    );
  }

  public getTracks(): Observable<Array<string>> {
    return this.getSchedulesAndSpeakers()
      .map(data => data.tracks)
      .catch((err: any) => this.handleError(err));
  }

  private processData(schedules: Array<ScheduleModel>, speakers: Array<SpeakerModel>): ConferenceModel {
    const _schedules = cloneDeep(schedules);
    const _speakers = cloneDeep(speakers);

    const conferenceModel = new ConferenceModel(_schedules, _speakers);
    // loop through each day in the schedule
    conferenceModel.schedules.forEach(day => {
      // loop through each timeline group in the day
      day.groups.forEach(group => {
        // loop through each session in the timeline group
        group.sessions.forEach(session => {
          this.processSession(conferenceModel, session);
        });
      });
    });

    return conferenceModel;
  }

  private processSession(conferenceModel: ConferenceModel, session: SessionModel): void {
    // loop through each speaker and load the speaker data
    // using the speaker name as the key
    session.speakers = [];
    if (session.speakerNames) {
      session.speakerNames.forEach(speakerName => {
        const speaker: SpeakerModel = conferenceModel.speakers.find(s => s.name === speakerName);
        if (speaker) {
          session.speakers.push(speaker);
          speaker.sessions = speaker.sessions || [];
          speaker.sessions.push(session);
        }
      });
    }

    if (session.tracks) {
      session.tracks.forEach(track => {
        if (conferenceModel.tracks.indexOf(track) < 0) {
          conferenceModel.tracks.push(track);
        }
      });
    }
  }

  private filterSession(session, queryWords, excludeTracks, segment) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach(queryWord => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach(trackName => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segement is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (UserModel.hasFavorite(session.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }
}
