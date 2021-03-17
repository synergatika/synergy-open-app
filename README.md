# Synergy Open App

## Contibution Guide

```
mkdir open
cd open

git clone git@github.com:synergatika/synergy-open-app.git

cd synergy-open-app
npm install

cd src/environments/
```
| Create here a new file named "secrets.environment.ts" with the code in the end|
|-----------------------------------------|

```
cd ../../
npx ng serve
```

## Credits

This application is part of a project that has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement No 825268. 

*****
Insert the following code into the "secrets.environment.ts" file that has been created: 
```javascript
  const secrets = {
  // URLs
    apiUrl: 'https://api.mydomain.gr', // or localhost
    appUrl: 'https://wallet.mydomain.gr', // or localhost
    openUrl: 'https://open.mydomain.gr', // or localhost

    // Map Key
    mapApiKey: 'your key goes here',
}
```
*****