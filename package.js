Package.describe({
  name: 'trepafi:mapbox',
  summary: 'Integrating MapBox.js with Meteor  ',
  version: '0.1.0',
  git: 'https://github.com/trepafi/meteor-mapbox.git'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.use("jquery", 'client');
  api.use("mizzao:build-fetcher@0.2.0", 'client');
  api.addFiles('mapbox.fetch.json', 'client');
});