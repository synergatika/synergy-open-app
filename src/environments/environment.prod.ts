import secrets from './secrets.environment';

export const environment = {
    production: true,

    // Import Keys & Links
    ...secrets,

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

    version: 'undefined'
};