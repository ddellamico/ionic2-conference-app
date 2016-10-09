import { AuthProvider } from './auth/auth.provider';
import { ConferenceProvider } from './conference/conference.provider';
import { MapProvider } from './map/map.provider';
import { ScheduleProvider } from './schedule/schedule.provider';
import { SpeakerProvider } from './speakers/speaker.provider';
import { JwtAuthHttp } from './auth-http';

export default [
  JwtAuthHttp,
  AuthProvider,
  ConferenceProvider,
  MapProvider,
  ScheduleProvider,
  SpeakerProvider
];
