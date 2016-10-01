/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { provide } from '@angular/core';
import { beforeEach, beforeEachProviders, describe, expect, it, inject, async } from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }     from '@angular/compiler/testing';
import { NavController, ActionSheetController } from 'ionic-angular';
import { ConferenceProvider } from '../../core/providers/conference/conference.provider';
import { SpeakerListPage } from './speaker-list';
import { ConferenceProviderMock } from '../../core/providers/conference/conference.mock';

describe('SpeakerListPage', () => {

  class ActionSheetControllerMock {
    create(opts?: any): any {
    };
  }

  beforeEachProviders(() => [
    TestComponentBuilder,
    NavController,
    ActionSheetController,
    provide(ConferenceProvider, {useClass: ConferenceProviderMock}),
    provide(ActionSheetController, {useClass: ActionSheetControllerMock}),
  ]);

  let tcb: TestComponentBuilder, conferenceService: ConferenceProviderMock;
  beforeEach(async(inject([TestComponentBuilder, ConferenceProvider], (_tcb: TestComponentBuilder,
                                                                       _conferenceService: ConferenceProviderMock) => {
    tcb = _tcb;
    conferenceService = _conferenceService;
  })));

  it('should render `ion-content`', () => {
    return tcb.createAsync(SpeakerListPage).then((fixture: ComponentFixture<SpeakerListPage>) => {
      const element = fixture.nativeElement;
      const instance = fixture.componentInstance;
      fixture.detectChanges();

      expect(element).not.toBeNull();
      expect(instance).not.toBeNull();
      // var compiled = fixture.debugElement.nativeElement;
      // expect(compiled).toContainText('ABC');
      expect(element.querySelectorAll('ion-content').length).toBe(1);
    });
  });

  it('should call `conferenceService` after `ionViewDidEnter` lifecycle hooks', () => {
    spyOn(conferenceService, 'getSpeakers').and.callThrough();

    const _response = [{
      _id: 1,
      name: 'Chuck Norris'
    }, {
      _id: 2,
      name: 'Bruce Lee'
    }];

    conferenceService.setResponse(_response);

    return tcb.createAsync(SpeakerListPage).then((fixture: ComponentFixture<SpeakerListPage>) => {
      const instance = fixture.componentInstance;
      instance.ionViewDidEnter();
      fixture.detectChanges();

      expect(conferenceService.getSpeakers).toHaveBeenCalled();
      expect(instance.speakers).toBe(_response);
    });
  });

});
