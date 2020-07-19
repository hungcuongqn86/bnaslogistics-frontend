// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  basename: '',
  backend: 'http://localhost/',
  apiUrl: './api/',
  apiV1Url: '../api/v1/',
  appId: "bnaslogistics",
  firebase: {
    apiKey: "AIzaSyBtTPUa19nLkReMDWXTFr6U43D166n9MVE",
    authDomain: "banhangqc.firebaseapp.com",
    databaseURL: "https://banhangqc.firebaseio.com",
    projectId: "banhangqc",
    storageBucket: "banhangqc.appspot.com",
    messagingSenderId: "594019390478",
    appId: "1:594019390478:web:5f43aa461ff0bbd4c0185f",
    measurementId: "G-D5L6223LZ2"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
