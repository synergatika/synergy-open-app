// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  // apiUrl: 'https://api.synergatika.gr',
  // apiUrl: 'http://192.168.1.160:3000',
  // apiUrl: 'http://192.168.1.9:3000',
  appUrl: 'https://app.synergatika.gr',
  mapApiKey: 'AIzaSyC8tI34nghyWlMaQhGluC9f6jG7E8swyVQ',

  access: [
    true, // community,
    true, // loyalty,
    true, // microcredit,
    false // microfunding
  ],
  subAccess: [
    true, //partner_address,
    true, // partner_contact,
    true, // partner_payments, 
    true, // partner_auto_registration, 
    true  // partner_fixed_campaign
  ],

  version: '0.5.0'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
