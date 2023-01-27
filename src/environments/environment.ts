// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // add your custom environment configs
  // define any name:value pairs
  ecommerceApiUrl: "https://localhost:8443/api/v1",
  stripePublishableKey: "pk_test_51MUWRkGZOyLNVjLVIJCf5buo7nhKTYFTeK6mCMf1VMwTIjU2DN6EGCnmQYxTc2oJ5f44X6Y48CAzPdTLLmEPiCsF00s2teiP5g"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
