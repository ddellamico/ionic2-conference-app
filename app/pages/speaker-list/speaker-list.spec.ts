/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { provide, Type } from '@angular/core';
import { beforeEachProviders, inject, async } from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }     from '@angular/compiler/testing';
import { NavController, ActionSheetController } from 'ionic-angular';
import { ConferenceService } from '../../core/providers/conference/conference-service';
import { SpeakerListPage } from './speaker-list';

describe('SpeakerListPage', () => {

  class ConferenceServiceMock {
    public clearCache(): void {
    }
  }

  class ActionSheetControllerMock {
    create(opts?: any): any {
    };
  }

  beforeEachProviders(() => [
    TestComponentBuilder,
    NavController,
    ActionSheetController,
    provide(ConferenceService, {useClass: ConferenceServiceMock}),
    provide(ActionSheetController, {useClass: ActionSheetControllerMock}),
  ]);

  let tcb;
  beforeEach(async(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  })));

  it('should render `ion-content`', () => {
    return tcb.createAsync(SpeakerListPage).then((fixture: ComponentFixture<Type>) => {
      const element = fixture.nativeElement;
      const instance = fixture.componentInstance;
      fixture.detectChanges();

      expect(element).not.toBeNull();
      expect(instance).not.toBeNull();
      expect(element.querySelectorAll('ion-content').length).toBe(1);
    });
  });

});
