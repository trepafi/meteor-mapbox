Package.describe({
  name: 'trepafi:mapbox',
  summary: 'Integrating MapBox.js with Meteor  ',
  version: '0.0.1',
  git: 'https://github.com/trepafi/meteor-mapbox.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use(['tracker', 'underscore'], ['client']);
  api.addFiles(['mapbox.js'], ['client']);
  api.export('Mapbox', ['client']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('trepafi:mapbox');
  api.addFiles('mapbox-tests.js');
});
