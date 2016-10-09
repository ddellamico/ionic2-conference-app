import { NgModule } from '@angular/core';
import { AuthConfig, AUTH_PROVIDERS, JwtHelper } from 'angular2-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

// ngrx
import '@ngrx/core/add/operator/select';

// RxJS
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/Delay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/combineLatest';

import pages from '../pages';
import providers from '../core/providers';
import services from '../core/services';
import helpers from '../core/helpers';
import effects from '../store/effects';
import actions from '../store/actions';

import { reducer } from '../store/reducers';

import { ConferenceApp } from './app.component';
import { Http } from '@angular/http';
import { JwtAuthHttp } from '../core/providers/auth-http';
import { AuthActions } from '../store/actions/auth.action';
import { AuthConst } from '../core/constants';


@NgModule({
  declarations: [
    ConferenceApp,
    pages
  ],
  imports: [
    IonicModule.forRoot(ConferenceApp),
    ReactiveFormsModule,

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     *
     * Source: https://github.com/ngrx/store/blob/master/src/ng2.ts#L43-L69
     */
    StoreModule.provideStore(reducer),

    ...effects.map(effect => EffectsModule.run(effect))
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    pages
  ],
  providers: [AUTH_PROVIDERS, providers, services, helpers, Storage, actions,
    {
      provide: JwtAuthHttp, useFactory: (http, authActions, store, storage) => {
      return new JwtAuthHttp(new AuthConfig({
        tokenGetter: () => getToken(storage),
        tokenName: AuthConst.TOKEN_KEY,
        globalHeaders: [{'Accept': 'application/json'}],
        noJwtError: true
      }), http, authActions, store);
    }, deps: [Http, AuthActions, Store, Storage]
    },
    {
      provide: JwtHelper, useFactory: () => new JwtHelper()
    }
  ]
})
export class AppModule {
}


export function getToken(storage: Storage) {
  return storage.get(AuthConst.TOKEN_KEY).then((token) => token)
    .catch((err) => {
      // TODO Manage error: Uncaught InvalidStateError: Failed to execute 'transaction' on 'IDBDatabase'
      console.log(err);
    });
}
