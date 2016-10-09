/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { TestBed, async } from '@angular/core/testing';
import { SpeakerListPage } from './speaker-list';
import { ActionSheetController, NavController, IonicModule } from 'ionic-angular';
import { ConferenceProviderMock } from '../../core/providers/conference/conference.mock';
import { ConferenceProvider } from '../../core/providers/conference/conference.provider';
import { SpeakerService } from '../../core/services/speaker.service';

describe('SpeakerListPage', () => {

  class ActionSheetControllerMock {
    create(opts?: any): any {
    };
  }

  let speakerService: any;

  beforeEach(() => {
    const _mockSpeakerService = jasmine.createSpyObj('speakerService',
      ['dispatchLoadCollection', 'getSpeakerItems', 'isLoading']);

    const injector = TestBed.configureTestingModule({
      declarations: [SpeakerListPage],
      providers: [
        SpeakerService,
        NavController,
        {provide: SpeakerService, useValue: _mockSpeakerService},
        {provide: ConferenceProvider, useClass: ConferenceProviderMock},
        {provide: ActionSheetController, useClass: ActionSheetControllerMock}
      ],
      imports: [
        IonicModule
      ]
    });

    speakerService = injector.get(SpeakerService);

  });

  beforeEach(async(() => {
    TestBed.compileComponents();
  }));

  it('should render `ion-content`', () => {
    const fixture = TestBed.createComponent(SpeakerListPage);
    const element = fixture.nativeElement;
    const instance = fixture.componentInstance;
    fixture.detectChanges();
    expect(element).not.toBeNull();
    expect(instance).not.toBeNull();
    // var compiled = fixture.debugElement.nativeElement;
    // expect(compiled).toContainText('ABC');
    expect(element.querySelectorAll('ion-content').length).toBe(1);
  });


  it('should call `conferenceService` after `ionViewDidEnter` lifecycle hooks', () => {
    const fixture = TestBed.createComponent(SpeakerListPage);
    const instance = fixture.componentInstance;
    instance.ionViewDidEnter();
    fixture.detectChanges();

    expect(speakerService.getSpeakers).toHaveBeenCalled();
    // expect(instance.speakers).toBe(_response);
  });
});
