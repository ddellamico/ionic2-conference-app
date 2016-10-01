/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { cloneDeep }  from 'lodash';
import { ScheduleProvider } from '../schedule/schedule.provider';
import { SpeakerProvider } from '../speakers/speaker.provider';
import { ScheduleModel } from '../schedule/schedule.model';
import { SpeakerModel } from '../speakers/speaker.model';
import { ConferenceModel } from './conference.model';
import { SessionModel } from '../schedule/session.model';
import { BaseProvider } from '../base.provider';
import { UserModel } from '../auth/user.model';
import { ScheduleGroupModel } from '../schedule/schedule-group.model';
import { TimelineFilter } from './timeline-filter.model';

@Injectable()
export class ConferenceProvider extends BaseProvider {

  private conferenceModelCached: ConferenceModel = null;

  constructor(private scheduleService: ScheduleProvider,
              private speakerService: SpeakerProvider) {
    super();
  }

  public clearCache(): void {
    this.conferenceModelCached = null;
  }

  public getSchedulesAndSpeakers(): Observable<ConferenceModel> {
    if (this.conferenceModelCached) {
      return Observable.of(cloneDeep(this.conferenceModelCached));
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

  public getTimeline(filters: TimelineFilter): Observable<ScheduleModel> {
    return this.getSchedulesAndSpeakers()
      .map((data: ConferenceModel) => {
        const day: ScheduleModel = data.schedules[filters.dayIndex];
        day.shownSessions = 0;
        filters.queryText = filters.queryText.toLowerCase().replace(/,|\.|-/g, ' ');
        const queryWords = filters.queryText.split(' ').filter(w => !!w.trim().length);

        day.groups.forEach((group: ScheduleGroupModel) => {
          group.hide = true;
          group.sessions.forEach(session => {
            // check if this session should show or not
            this.filterSession(session, queryWords, filters.excludeTracks, filters.segment);
            if (!session.hide) {
              // if this session is not hidden then this group should show
              group.hide = false;
              day.shownSessions++;
            }
          });
        });
        return day;
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

    session.hide = true;
    if (matchesQueryText && matchesTracks && matchesSegment) {
      session.hide = false;
    }
  }
}
