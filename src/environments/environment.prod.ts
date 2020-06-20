export const environment = {
  production: true,
  apiUrl: 'https://api.synergatika.gr', //'http://localhost:3000',//'http://localhost:3000'//'http://192.168.1.9:3000' // 'http://localhost:3000'
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
