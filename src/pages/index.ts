/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { TutorialPage } from './tutorial/tutorial';
import { TabsPage } from './tabs/tabs';
import { SpeakerListPage } from './speaker-list/speaker-list';
import { SpeakerDetailPage } from './speaker-detail/speaker-detail';
import { SignupPage } from './signup/signup';
import { SessionDetailPage } from './session-detail/session-detail';
import { ScheduleFilterPage } from './schedule-filter/schedule-filter';
import { SchedulePage } from './schedule/schedule';
import { MapPage } from './map/map';
import { LoginPage } from './login/login';
import { AccountPage } from './account/account';
import { AboutPage, PopoverPage } from './about/about';
import { SpeakerListComponent } from './speaker-list/speaker-list.component';
import { AuthFormComponent } from './login/form.component';
import { SignUpFormComponent } from './signup/form.component';
import { ProfileComponent } from './account/profile.component';
import { TrackListComponent } from './schedule-filter/track-list.component';
import { ScheduleListComponent } from './schedule/schedule-list.component';
import { LoadingComponent } from '../components/loading/loading.component';
import { SideMenuComponent } from '../components/menu/menu.component';

export * from './login/login';
export * from './signup/signup';
export * from './tabs/tabs';
export * from './tutorial/tutorial';
export * from './speaker-list/speaker-list';
export * from './speaker-detail/speaker-detail';
export * from './about/about';
export * from './account/account';
export * from './schedule/schedule';
export * from './schedule-filter/schedule-filter';
export * from './map/map';

// using named function to make ngc happy ..

export function components() {
  return [
    SideMenuComponent,
    LoadingComponent,
    AboutPage,
    AccountPage,
    ProfileComponent,
    LoginPage,
    AuthFormComponent,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    ScheduleListComponent,
    TrackListComponent,
    SessionDetailPage,
    SignupPage,
    SignUpFormComponent,
    SpeakerDetailPage,
    SpeakerListPage,
    SpeakerListComponent,
    TabsPage,
    TutorialPage
  ];
}
