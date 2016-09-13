#Ionic Conference App with JWT authentication

[![Build Status](https://travis-ci.org/ddellamico/ionic2-conference-app.svg?branch=master)](https://travis-ci.org/ddellamico/ionic2-conference-app) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This project is an "extended" version of <https://github.com/driftyco/ionic-conference-app> that uses Webpack and consume REST API exposed by [API component](https://github.com/ddellamico/ionic-conference-api).
The API component for this application can be found [here](https://github.com/ddellamico/ionic-conference-api).

**Api component live demo:**: https://ion-conf-api.damiendev.com

The main goal for this project is to provide a simple way to add authentication to a ionic 2 application but also a more flexible and extensible build system ( using webpack ). 

Webpack configuration is heavily inspired from [survivejs.com](http://survivejs.com/webpack/introduction/)

Furthermore a lot of changes has been made in "providers" (app/core folder), in order to mainly use RxJs instead of Promises. 

**Note: This project is under development.**

## Features
  * Ionic 2 beta 11 : <https://github.com/driftyco/ionic>
  * [TypeScript](http://www.typescriptlang.org/)
  * [RxJS](https://github.com/Reactive-Extensions/RxJS)
  * JSON Web Token ([angular-jwt](https://github.com/auth0/angular-jwt)) authentication
  * [Webpack](http://webpack.github.io/)
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
  
  > Clone the repo
  ```bash
  $ git clone https://github.com/ddellamico/ionic-conference-app
  # change directory to our repo
  cd ionic-conference-app
  # install the repo with npm
  npm install
  # start the server (webpack-dev-server)
  npm run dev
  ```
  
  go to [http://0.0.0.0:8080](http://0.0.0.0:8080) or [http://localhost:8080](http://localhost:8080) in your browser

## Commands
  ```bash
  $ npm run dev             --> run dev server with webpack-dev-server ( development )
  $ npm run build           --> build files inside www folder ( production )
  $ npm run test            --> run test with Karma
  $ npm run ios:dev         --> start ios simulator (ionic run ios)
  $ npm run ios:release     --> build files for ios platform and generate xcodeproj (ionic build ios)
  $ npm run android:dev     --> start android simulator (ionic run android)
  $ npm run android:release --> build files for android platform and generate apk (ionic build android)
  ```
  
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

## Changelog

You can check the changelog [here](https://github.com/ddellamico/ionic-conference-app/blob/master/CHANGELOG.md)

## License

MIT
