/*
import { NavController, MenuController } from 'ionic-angular';
import { beforeEach, beforeEachProviders, describe, expect, it, inject, async } from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }     from '@angular/compiler/testing';
import { TutorialPage } from './tutorial';

describe('TutorialPage', () => {

  beforeEachProviders(() => [
    TestComponentBuilder,
    NavController,
    MenuController
  ]);

  let tcb: TestComponentBuilder;
  beforeEach(async(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    tcb = _tcb;
  })));

  it('should render `ion-content`', () => {
    return tcb.createAsync(TutorialPage).then((fixture: ComponentFixture<TutorialPage>) => {
      const element = fixture.nativeElement;
      const instance = fixture.componentInstance;
      fixture.detectChanges();

      expect(element).not.toBeNull();
      expect(instance).not.toBeNull();
      expect(element.querySelectorAll('ion-content').length).toBe(1);
    });
  });

  it('should have 3 slides', () => {
    return tcb.createAsync(TutorialPage).then((fixture: ComponentFixture<TutorialPage>) => {
      const instance = fixture.componentInstance;
      fixture.detectChanges();
      expect(instance.slides.length).toBe(3);
    });
  });
});
*/
