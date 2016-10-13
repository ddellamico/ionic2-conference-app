#Ionic Conference App + NgRx and JWT authentication

[![Build Status](https://travis-ci.org/ddellamico/ionic2-conference-app.svg?branch=master)](https://travis-ci.org/ddellamico/ionic2-conference-app) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This project is an "extended" version of [Ionic 2 Conference Application](https://github.com/driftyco/ionic-conference-app) using [ngrx](https://github.com/ngrx) suite and consuming REST API exposed by [backend API component](https://github.com/ddellamico/ionic-conference-api).
The API component for this application can be found [here](https://github.com/ddellamico/ionic-conference-api).

**Api component live demo/documentation:** https://ion-conf-api.damiendev.com

The main goal for this project is to provide a simple way to add jwt authentication utilizing ngrx libraries within a ionic 2 application. 

Check out the [Comprehensive Introduction to @ngrx/store](https://gist.github.com/btroncone/a6e4347326749f938510) for an overview.

Furthermore a lot of changes has been made in "providers" (app/core folder), in order to mainly use RxJs instead of Promises.

If you are looking for a great Ionic 2 boilerplate, take a look [here](https://github.com/marcoturi/ionic2-boilerplate).

**Note: This project is under development.**

## Features
  * [Ionic 2 Rc0](https://github.com/driftyco/ionic)
  * [TypeScript](http://www.typescriptlang.org/)
  * [RxJS](https://github.com/Reactive-Extensions/RxJS)
  * [NgRx Store](https://github.com/ngrx/store/)
  * [NgRx Effects](https://github.com/ngrx/effects/)
  * [angular-jwt](https://github.com/auth0/angular-jwt)
  * [tslint](https://github.com/palantir/tslint)
  * [Codelyzer](https://github.com/mgechev/codelyzer)
  * [Typedoc](https://github.com/TypeStrong/typedoc)

## Install
  **Make sure you have Node version >= 5.0 and NPM >= 3**
  
  **NOTE:** [better-npm-run](https://github.com/benoror/better-npm-run) is used to manage environment variables from a `.env` file.
  Place in root project a `.env` file and "overwrite" the default values.
  In `development` env, you can set the env variables by doing:

  ```bash
  cp .env.dev.example .env
  ```

  and replace the values there.
  
  ```bash
  # clone the repo
  git clone https://github.com/ddellamico/ionic2-conference-app.git
  # change directory to our repo
  cd ionic2-conference-app
  # install the repo with npm
  npm install && ionic state restore
  # start the server
  npm run dev
  ```
  
  go to [http://0.0.0.0:8100](http://0.0.0.0:8100) or [http://localhost:8100](http://localhost:8100) in your browser

## Commands
  
  | Task              | Description                                            |
  |-------------------|--------------------------------------------------------|
  | `dev`             | run ionic serve                                        |
  | `build`           | Full production build. Use `--dev` flag for dev build. |
  | `release`         | generate changelog based on commits                    |
  | `push`            | shortcut for git push origin master --follow-tags      |
  | `lint`            | lint with tslint                                       |
  | `docs`            | not working yet                                        |
  | `outdated`        | search npm packages for outdated dependencies          |
  | `ios:dev`         | build .ipa using dev environment vars                  |
  | `ios:release`     | build .ipa with production environment vars            |
  | `android:dev`     | build .apk using dev environment vars                  |
  | `android:release` | build .apk with production environment vars            |
  
## Commit:
  
  Follows [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)
  ```sh
  # Lint and execute tests before committing code.
  npm run commit
  # OR
  # use git commit directly with correct message convention.
  git commit -m "chore(ghooks): Add pre-commit and commit-msg ghook"
  ```

## Tests

```sh
$ npm test
```
  
 This post help me a lot to setup test environment with karma : http://lathonez.github.io/2016/ionic-2-unit-testing/
 Thanks [Lathonez](http://lathonez.github.io) !
 
 **NOTE:** With rc0, Ionic start using [rollupjs](http://rollupjs.org/) and to be honest, make test environment working is quite painful.
  So, before reintroducing test, I would prefer waiting until ionic will be run test out of the box (probably using [ng-cli](https://github.com/angular/angular-cli#running-unit-tests))  

## Changelog

You can check the changelog [here](https://github.com/ddellamico/ionic-conference-app/blob/master/CHANGELOG.md)

## License

MIT
